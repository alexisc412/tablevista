import { createClient } from '@/lib/supabase/server'
import { Users, Star, Search, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants').select('id').eq('owner_id', user!.id).single()

  const { data: clientsData } = restaurant?.id ? await supabase
    .from('customers')
    .select('id, name, email, phone, visit_count, total_spent, vip, tags, last_visit')
    .eq('restaurant_id', restaurant.id)
    .order('visit_count', { ascending: false })
    .limit(50) : { data: null }

  const clients = clientsData ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
            <Users className="w-6 h-6 text-forest-600" /> CRM Clients
          </h1>
          <p className="text-forest-600/70 text-sm mt-1">{clients.length} client{clients.length !== 1 ? 's' : ''} enregistrés</p>
        </div>
        <Link href="/dashboard/clients/new"
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
          <Plus className="w-4 h-4" /> Ajouter un client
        </Link>
      </div>

      <div className="card-organic p-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
          <input placeholder="Rechercher par nom, email, téléphone…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-nature-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500" />
        </div>
      </div>

      <div className="card-organic overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-nature-50 border-b border-nature-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Visites</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Dépensé</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Dernière visite</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-forest-600 uppercase tracking-wide">Tags</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-nature-100">
              {clients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-forest-500/60 text-sm">
                    Aucun client enregistré pour l'instant.
                  </td>
                </tr>
              )}
              {clients.map((c: any) => (
                <tr key={c.id} className="hover:bg-nature-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-sm font-bold text-forest-700 shrink-0">
                        {c.name?.charAt(0) ?? '?'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-forest-900 truncate">{c.name}</p>
                          {c.vip && <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />}
                        </div>
                        <p className="text-xs text-forest-500 truncate">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-forest-800 font-semibold">{c.visit_count ?? 0}</td>
                  <td className="px-5 py-3.5 text-forest-800">{c.total_spent ? `${c.total_spent} €` : '—'}</td>
                  <td className="px-5 py-3.5 text-forest-600/70">{c.last_visit ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {(c.tags ?? []).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-nature-100 text-forest-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/clients/${c.id}`}
                      className="text-xs font-semibold text-forest-600 hover:text-forest-900 underline underline-offset-2">
                      Voir fiche
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
