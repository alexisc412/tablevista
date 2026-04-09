import { createClient } from '@/lib/supabase/server'
import { CreditCard, Check, Zap, ArrowRight, Receipt } from 'lucide-react'
import Link from 'next/link'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    desc: 'Pour démarrer',
    features: ['Jusqu\'à 100 réservations/mois', 'Plan de salle 2D', 'Page publique', 'Support email'],
    color: 'border-nature-200',
    badge: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 89,
    desc: 'Le plus populaire',
    features: ['Réservations illimitées', 'Plan de salle 2D & 3D', 'Site web sur mesure', 'CRM clients', 'Campagnes SMS & email', 'Support prioritaire'],
    color: 'border-forest-500',
    badge: 'Populaire',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 149,
    desc: 'Multi-restaurants',
    features: ['Tout Pro inclus', 'Jusqu\'à 10 restaurants', 'API publique', 'Manager dédié', 'Intégrations caisse', 'SLA 99,9 %'],
    color: 'border-ember-400',
    badge: 'Multi-sites',
  },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: org } = await supabase
    .from('organisations')
    .select('plan, name')
    .eq('owner_id', user!.id)
    .single()

  const currentPlan = org?.plan ?? 'starter'

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-forest-600" /> Facturation
        </h1>
        <p className="text-forest-600/70 text-sm mt-1">Gérez votre abonnement et vos paiements</p>
      </div>

      {/* Current plan banner */}
      <div className="card-organic p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center">
          <Zap className="w-5 h-5 text-forest-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-forest-900">
            Plan actuel : <span className="capitalize text-forest-700">{currentPlan}</span>
          </p>
          <p className="text-xs text-forest-500 mt-0.5">
            Essai gratuit — aucune carte bancaire requise pour le moment
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-forest-100 text-forest-700">
          14 jours gratuits
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map(plan => {
          const isCurrent = plan.id === currentPlan
          return (
            <div key={plan.id} className={`card-organic p-6 flex flex-col border-2 ${plan.color} ${isCurrent ? 'ring-2 ring-forest-400 ring-offset-2' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display font-bold text-forest-950 text-lg">{plan.name}</p>
                  <p className="text-xs text-forest-500">{plan.desc}</p>
                </div>
                {plan.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-700">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="mb-5">
                <span className="font-display text-3xl font-bold text-forest-950">{plan.price} €</span>
                <span className="text-forest-500 text-sm">/mois HT</span>
              </div>
              <ul className="space-y-2 flex-1 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-forest-700">
                    <Check className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div className="w-full py-2.5 rounded-xl bg-forest-50 text-forest-600 text-sm font-semibold text-center">
                  Plan actuel
                </div>
              ) : (
                <button className="w-full btn-primary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  Passer à {plan.name} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Invoices placeholder */}
      <div className="card-organic overflow-hidden">
        <div className="px-5 py-3.5 border-b border-nature-100 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-forest-600" />
          <h2 className="font-semibold text-forest-900 text-sm">Historique de facturation</h2>
        </div>
        <div className="px-5 py-10 text-center text-forest-500/60 text-sm">
          Aucune facture pour l'instant — vous êtes en période d'essai gratuit.
        </div>
      </div>
    </div>
  )
}
