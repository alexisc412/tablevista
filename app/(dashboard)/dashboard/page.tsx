import { createClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/utils'
import { CalendarDays, Users, TrendingUp, Ban, ArrowRight } from 'lucide-react'
import Link from 'next/link'

async function getDashboardStats(restaurantId: string) {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const [{ count: todayRes }, { count: pendingRes }, { data: recentRes }] = await Promise.all([
    supabase.from('reservations').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId).eq('date', today).neq('status', 'cancelled'),
    supabase.from('reservations').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId).eq('status', 'pending'),
    supabase.from('reservations').select('id, date, time, party_size, status, customer:customers(name, email)')
      .eq('restaurant_id', restaurantId).order('created_at', { ascending: false }).limit(5),
  ])

  return {
    todayRes: todayRes ?? 0,
    pendingRes: pendingRes ?? 0,
    recentRes: recentRes ?? [],
  }
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending:   'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  seated:    'bg-blue-100 text-blue-700',
  completed: 'bg-forest-100 text-forest-700',
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmée',
  pending:   'En attente',
  cancelled: 'Annulée',
  seated:    'En salle',
  completed: 'Terminée',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, city')
    .eq('owner_id', user!.id)
    .single()

  const stats = restaurant
    ? await getDashboardStats(restaurant.id)
    : { todayRes: 0, pendingRes: 0, recentRes: [] }

  const cards = [
    { label: 'Réservations aujourd\'hui', value: stats.todayRes, icon: CalendarDays, color: 'bg-forest-100 text-forest-700', href: '/dashboard/reservations' },
    { label: 'En attente de confirmation', value: stats.pendingRes, icon: Users, color: 'bg-amber-100 text-amber-700', href: '/dashboard/reservations?status=pending' },
    { label: 'Commissions économisées', value: formatCurrency(stats.todayRes * 1.5), icon: Ban, color: 'bg-ember-100 text-ember-700', href: '/dashboard/analytics' },
    { label: 'No-shows ce mois', value: '3 %', icon: TrendingUp, color: 'bg-blue-100 text-blue-700', href: '/dashboard/analytics' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-950">
          Bonjour 👋 {restaurant?.name ?? 'mon restaurant'}
        </h1>
        <p className="text-forest-600/70 text-sm mt-1">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href}
            className="card-organic p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
            <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-display text-forest-900">{value}</p>
            <p className="text-xs text-forest-600/65 mt-0.5 leading-snug">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent reservations */}
      <div className="card-organic overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-nature-100">
          <h2 className="font-display font-bold text-forest-900">Dernières réservations</h2>
          <Link href="/dashboard/reservations"
            className="text-sm font-semibold text-forest-600 hover:text-forest-900 flex items-center gap-1">
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {stats.recentRes.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-forest-600/60 text-sm">Aucune réservation pour l'instant.</p>
            <Link href="/dashboard/reservations" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-forest-700 hover:text-forest-900">
              Ajouter une réservation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-nature-100">
            {stats.recentRes.map((res: any) => (
              <div key={res.id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-nature-50 transition-colors">
                <div className="min-w-0">
                  <p className="font-semibold text-forest-900 text-sm truncate">
                    {(res.customer as any)?.name ?? 'Client'}
                  </p>
                  <p className="text-xs text-forest-600/60">
                    {res.date} à {res.time} · {res.party_size} pers.
                  </p>
                </div>
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[res.status] ?? 'bg-nature-100 text-forest-600'}`}>
                  {STATUS_LABELS[res.status] ?? res.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/dashboard/reservations/new', label: 'Nouvelle réservation', desc: 'Ajouter manuellement' },
          { href: '/dashboard/floor-plan', label: 'Plan de salle', desc: 'Vue en temps réel' },
          { href: '/dashboard/clients', label: 'Base clients', desc: 'CRM & fidélité' },
        ].map(({ href, label, desc }) => (
          <Link key={href} href={href}
            className="card-organic p-5 flex items-center justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all group">
            <div>
              <p className="font-semibold text-forest-900 text-sm">{label}</p>
              <p className="text-xs text-forest-600/60 mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-forest-400 group-hover:text-forest-700 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}
