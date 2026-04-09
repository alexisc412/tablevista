import { createClient } from '@/lib/supabase/server'
import { BarChart3, TrendingUp, Users, Ban } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants').select('id, name').eq('owner_id', user!.id).single()

  // Get monthly reservation counts by status
  const firstOfMonth = new Date()
  firstOfMonth.setDate(1)
  const firstStr = firstOfMonth.toISOString().split('T')[0]

  const [{ count: monthlyTotal }, { count: noShows }, { count: totalClients }] = await Promise.all([
    supabase.from('reservations').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant?.id ?? '').gte('date', firstStr),
    supabase.from('reservations').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant?.id ?? '').eq('status', 'cancelled').gte('date', firstStr),
    supabase.from('customers').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant?.id ?? ''),
  ])

  const noShowRate = monthlyTotal ? Math.round(((noShows ?? 0) / monthlyTotal) * 100) : 0
  const commissionSaved = (monthlyTotal ?? 0) * 1.5 // avg 1.5€ per cover saved vs commission-based platforms

  const kpis = [
    { label: 'Réservations ce mois', value: monthlyTotal ?? 0, icon: BarChart3, color: 'bg-forest-100 text-forest-700', suffix: '' },
    { label: 'Taux de no-show', value: noShowRate, icon: TrendingUp, color: 'bg-amber-100 text-amber-700', suffix: ' %' },
    { label: 'Clients total', value: totalClients ?? 0, icon: Users, color: 'bg-blue-100 text-blue-700', suffix: '' },
    { label: 'Commissions économisées', value: commissionSaved, icon: Ban, color: 'bg-ember-100 text-ember-700', isCurrency: true },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-forest-600" /> Analytiques
        </h1>
        <p className="text-forest-600/70 text-sm mt-1">Performances de {restaurant?.name}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, color, suffix, isCurrency }) => (
          <div key={label} className="card-organic p-5">
            <div className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold font-display text-forest-900">
              {isCurrency ? formatCurrency(value as number) : `${value}${suffix}`}
            </p>
            <p className="text-xs text-forest-600/65 mt-0.5 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* Placeholder chart area */}
      <div className="card-organic p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-7 h-7 text-forest-600" />
        </div>
        <h3 className="font-display font-bold text-forest-900 mb-2">Graphiques détaillés</h3>
        <p className="text-forest-600/70 text-sm max-w-sm mx-auto">
          Les graphiques de fréquentation, chiffre d'affaires par table et prévisions IA
          s'afficheront ici une fois vos premières réservations enregistrées.
        </p>
      </div>
    </div>
  )
}
