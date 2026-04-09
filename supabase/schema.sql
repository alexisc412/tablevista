-- TableVista v2 — Supabase Schema
-- Run in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── CLEAN SLATE (app tables only) ───────────────────────────────────────────
drop table if exists public.reservations  cascade;
drop table if exists public.customers     cascade;
drop table if exists public.tables        cascade;
drop table if exists public.restaurants   cascade;
drop table if exists public.organisations cascade;

drop function if exists public.set_booking_slug() cascade;

-- ─── PROFILES ────────────────────────────────────────────────────────────────
-- Supabase may have auto-created this table — we just ensure our columns exist
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

alter table public.profiles
  add column if not exists onboarding_done boolean not null default false;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── ORGANISATIONS ───────────────────────────────────────────────────────────
create table public.organisations (
  id                      uuid primary key default uuid_generate_v4(),
  name                    text not null,
  owner_id                uuid not null references auth.users on delete cascade,
  plan                    text not null default 'starter' check (plan in ('starter', 'pro', 'premium')),
  stripe_customer_id      text,
  stripe_subscription_id  text,
  created_at              timestamptz not null default now()
);

-- ─── RESTAURANTS ─────────────────────────────────────────────────────────────
create table public.restaurants (
  id                 uuid primary key default uuid_generate_v4(),
  organisation_id    uuid not null references public.organisations on delete cascade,
  owner_id           uuid not null references auth.users on delete cascade,
  name               text not null,
  city               text,
  category           text,
  description        text,
  table_count        integer not null default 10,
  booking_url_slug   text unique,
  cover_image_url    text,
  created_at         timestamptz not null default now()
);

-- Auto-generate booking slug from name
create or replace function public.set_booking_slug()
returns trigger language plpgsql as $$
declare
  base_slug  text;
  final_slug text;
  suffix     int := 0;
begin
  if new.booking_url_slug is not null then
    return new;
  end if;
  base_slug  := lower(regexp_replace(new.name, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug  := trim(both '-' from base_slug);
  final_slug := base_slug;
  while exists (
    select 1 from public.restaurants
    where booking_url_slug = final_slug and id != new.id
  ) loop
    suffix     := suffix + 1;
    final_slug := base_slug || '-' || suffix;
  end loop;
  new.booking_url_slug := final_slug;
  return new;
end;
$$;

create trigger before_restaurant_insert
  before insert on public.restaurants
  for each row
  execute procedure public.set_booking_slug();

-- ─── TABLES ──────────────────────────────────────────────────────────────────
create table public.tables (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references public.restaurants on delete cascade,
  name           text not null,
  capacity       integer not null default 4,
  zone           text,
  x              numeric not null default 0,
  y              numeric not null default 0,
  shape          text not null default 'round' check (shape in ('round', 'square', 'rectangle')),
  created_at     timestamptz not null default now()
);

-- ─── CUSTOMERS ───────────────────────────────────────────────────────────────
create table public.customers (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references public.restaurants on delete cascade,
  name           text not null,
  email          text,
  phone          text,
  visit_count    integer not null default 0,
  total_spent    numeric(10,2),
  vip            boolean not null default false,
  tags           text[] not null default '{}',
  notes          text,
  allergies      text,
  last_visit     date,
  created_at     timestamptz not null default now(),
  unique (restaurant_id, email)
);

-- ─── RESERVATIONS ────────────────────────────────────────────────────────────
create table public.reservations (
  id              uuid primary key default uuid_generate_v4(),
  restaurant_id   uuid not null references public.restaurants on delete cascade,
  customer_id     uuid references public.customers on delete set null,
  table_id        uuid references public.tables on delete set null,
  date            date not null,
  time            time not null,
  party_size      integer not null,
  status          text not null default 'pending'
                    check (status in ('pending','confirmed','seated','completed','cancelled','no_show')),
  notes           text,
  deposit_amount  numeric(10,2),
  deposit_paid    boolean not null default false,
  created_at      timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
alter table public.profiles     enable row level security;
alter table public.organisations enable row level security;
alter table public.restaurants  enable row level security;
alter table public.tables       enable row level security;
alter table public.customers    enable row level security;
alter table public.reservations enable row level security;

-- Profiles
drop policy if exists "Users can view own profile"   on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Organisations
create policy "Owner manages organisation"
  on public.organisations for all using (auth.uid() = owner_id);

-- Restaurants
create policy "Owner manages restaurant"
  on public.restaurants for all using (auth.uid() = owner_id);
create policy "Public can read restaurants"
  on public.restaurants for select using (true);

-- Tables
create policy "Owner manages tables"
  on public.tables for all using (
    exists (select 1 from public.restaurants r where r.id = restaurant_id and r.owner_id = auth.uid())
  );

-- Customers
create policy "Owner manages customers"
  on public.customers for all using (
    exists (select 1 from public.restaurants r where r.id = restaurant_id and r.owner_id = auth.uid())
  );

-- Reservations
create policy "Owner manages reservations"
  on public.reservations for all using (
    exists (select 1 from public.restaurants r where r.id = restaurant_id and r.owner_id = auth.uid())
  );
create policy "Public can create reservations"
  on public.reservations for insert with check (true);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
create index idx_reservations_restaurant_date on public.reservations (restaurant_id, date);
create index idx_reservations_status         on public.reservations (status);
create index idx_customers_restaurant        on public.customers (restaurant_id);
create index idx_customers_email             on public.customers (email);
create index idx_tables_restaurant           on public.tables (restaurant_id);
