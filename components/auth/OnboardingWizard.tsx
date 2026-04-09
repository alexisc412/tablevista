'use client'

import { useState } from 'react'
import { Check, Loader2, Building2, CreditCard, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, label: 'Organisation', icon: Building2 },
  { id: 2, label: 'Plan',         icon: CreditCard },
  { id: 3, label: 'Restaurant',   icon: MapPin },
]

const PLANS = [
  { id: 'starter', name: 'Starter',  price: '49 €/mois', desc: 'Jusqu\'à 100 réservations/mois' },
  { id: 'pro',     name: 'Pro',      price: '89 €/mois', desc: 'Réservations illimitées + 3D', popular: true },
  { id: 'premium', name: 'Premium',  price: '149 €/mois', desc: 'Multi-sites jusqu\'à 10 restaurants' },
]

const CATEGORIES = [
  'Restaurant gastronomique', 'Brasserie / Bistrot', 'Bar & Cocktails',
  'Fast-food / Snack', 'Pizzeria', 'Sushi / Japonais', 'Vegan / Bio', 'Autre',
]

export function OnboardingWizard({ userId }: { userId: string }) {
  const [step,      setStep]     = useState(1)
  const [loading,   setLoading]  = useState(false)
  const [error,     setError]    = useState<string | null>(null)

  // Step 1 — Org
  const [orgName,   setOrgName]  = useState('')

  // Step 2 — Plan
  const [plan,      setPlan]     = useState('pro')

  // Step 3 — Restaurant
  const [restName,  setRestName] = useState('')
  const [city,      setCity]     = useState('')
  const [category,  setCategory] = useState('')
  const [tables,    setTables]   = useState('')

  async function finish() {
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()

      // Insert organisation
      const { data: org, error: orgErr } = await supabase
        .from('organisations')
        .insert({ name: orgName, owner_id: userId, plan })
        .select('id')
        .single()
      if (orgErr) throw orgErr

      // Insert restaurant
      const { error: restErr } = await supabase
        .from('restaurants')
        .insert({
          organisation_id: org.id,
          owner_id: userId,
          name: restName,
          city,
          category,
          table_count: parseInt(tables) || 10,
        })
      if (restErr) throw restErr

      // Mark onboarding done
      await supabase
        .from('profiles')
        .update({ onboarding_done: true })
        .eq('id', userId)

      window.location.href = '/dashboard'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              step > s.id  ? 'bg-forest-600 text-white' :
              step === s.id ? 'bg-forest-800 text-white ring-4 ring-forest-200' :
              'bg-nature-200 text-forest-500',
            )}>
              {step > s.id ? <Check className="w-4 h-4" /> : s.id}
            </div>
            <span className={cn('text-xs font-medium hidden sm:block', step === s.id ? 'text-forest-900' : 'text-forest-500')}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={cn('w-8 h-px mx-1', step > s.id ? 'bg-forest-500' : 'bg-nature-300')} />
            )}
          </div>
        ))}
      </div>

      <div className="card-organic p-8">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {/* STEP 1 — Organisation */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-forest-950 mb-1">Bienvenue ! 🎉</h2>
              <p className="text-forest-600/70 text-sm">Comment appelle-t-on votre établissement (ou groupe) ?</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-forest-900">Nom de l'organisation</label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                placeholder="Ex : Groupe Vert Table"
                className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm"
              />
            </div>
            <button
              onClick={() => orgName.trim() && setStep(2)}
              disabled={!orgName.trim()}
              className="w-full btn-primary py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
            >
              Continuer →
            </button>
          </div>
        )}

        {/* STEP 2 — Plan */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-forest-950 mb-1">Choisissez votre plan</h2>
              <p className="text-forest-600/70 text-sm">Modifiable à tout moment depuis votre tableau de bord.</p>
            </div>
            <div className="space-y-3">
              {PLANS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all',
                    plan === p.id ? 'border-forest-600 bg-forest-50' : 'border-nature-200 hover:border-nature-300',
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-forest-900 text-sm">{p.name}</span>
                      {p.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-700">
                          Populaire
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-forest-600/70 mt-0.5">{p.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold text-forest-900 text-sm">{p.price}</p>
                    <p className="text-[10px] text-forest-500">HT · après essai</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline px-5 py-3 rounded-xl text-sm">← Retour</button>
              <button onClick={() => setStep(3)} className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold">
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Restaurant */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-forest-950 mb-1">Votre restaurant</h2>
              <p className="text-forest-600/70 text-sm">Ces informations alimenteront votre page publique.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-forest-900">Nom du restaurant</label>
              <input type="text" value={restName} onChange={e => setRestName(e.target.value)}
                placeholder="Le Jardin des Saveurs"
                className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-forest-900">Ville</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)}
                  placeholder="Paris"
                  className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-forest-900">Nombre de tables</label>
                <input type="number" min={1} max={200} value={tables} onChange={e => setTables(e.target.value)}
                  placeholder="15"
                  className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-forest-900">Catégorie</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm">
                <option value="">Sélectionnez…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-outline px-5 py-3 rounded-xl text-sm">← Retour</button>
              <button
                onClick={finish}
                disabled={loading || !restName.trim() || !city.trim()}
                className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Création…' : 'Accéder au tableau de bord 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
