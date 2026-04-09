import { createClient } from '@/lib/supabase/server'
import { CalendarDays, Plus, Search, Filter } from 'lucide-react'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending:   'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  seated:    'bg-blue-100 text-blue-700',
  completed: 'bg-forest-100 text-forest-700',
}
const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmée', pending: 'En attente', cancelled: 'Annulée',
  seated: 'En salle', completed: 'Terminée',
}

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; date?: string }>
}) {
  const { status, date } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants').select('id').eq('owner_id', user!.id).single()

  let query = supabase
    .from('reservations')
    .select('id, date, time, party_size, status, notes, customer:customers(name, email, phone)')
    .eq('restaurant_id', restaurant?.id ?? '')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (status) query = query.eq('status', status)
  if (date)   query = query.eq('date', date)
  else        query = query.gte('date', new Date().toISOString().split('T')[0])

  const { data: reservations = [] } = await query.limit(50)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-forest-600" /> Réservations
          </h1>
          <p className="text-forest-600/70 text-sm mt-1">Gérez toutes vos réservations en temps réel</p>
        </div>
        <Link href="/dashboard/reservations/new"
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
          <Plus className="w-4 h-4" /> Nouvelle réservation
        </Link>
      </div>

      {/* Filters */}
      <div className="card-organic p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
          <input placeholder="Rechercher un client…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-nature-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500" />
        </div>
        <input type="date" defaultValue={date ?? new Date().toISOString().split('T')[0]}
          className="px-3 py-2 text-sm rounded-xl border border-nature-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500" />
        <div className="flex gap-2 flex-wrap">
          {['', 'pending', 'confirmed', 'seated', 'completed', 'cancelled'].map(s => (
            <Link key={s} href={s ? `/dashboard/reservations?status=${s}` : '/dashboard/reservations'}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                status === s || (!status && !s)
                  ? 'bg-forest-800 text-white border-forest-800'
                  : 'bg-white text-forest-600 border-nature-300 hover:border-forest-400'
              }`}>
              {s ? (STATUS_LABELS[s] ?? s) : 'Toutes'}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-organic overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-nature-50 border-b border-nature-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Date & Heure</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Couverts</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Statut</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Notes</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-nature-100">
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-forest-500/60 text-sm">
                    Aucune réservation pour ces critères.
                  </td>
                </tr>
              )}
              {reservations.map((r: any) => (
                <tr key={r.id} className="hover:bg-nature-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-forest-900">{(r.customer as any)?.name ?? '—'}</p>
                    <p className="text-xs text-forest-500">{(r.customer as any)?.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-forest-800">
                    {r.date} <span className="text-forest-500">à</span> {r.time}
                  </td>
                  <td className="px-5 py-3.5 text-forest-800 font-semibold">{r.party_size}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[r.status] ?? 'bg-nature-100 text-forest-600'}`}>
                      {STATUS_LABELS[r.status] ?? r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-forest-600/70 max-w-xs truncate">{r.notes ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/reservations/${r.id}`}
                      className="text-xs font-semibold text-forest-600 hover:text-forest-900 underline underline-offset-2">
                      Détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
