import { createClient } from '@/lib/supabase/server'
import { Map } from 'lucide-react'
import Link from 'next/link'

export default async function FloorPlanPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants').select('id, name').eq('owner_id', user!.id).single()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
            <Map className="w-6 h-6 text-forest-600" /> Plan de salle
          </h1>
          <p className="text-forest-600/70 text-sm mt-1">Éditeur 2D et vue 3D — {restaurant?.name}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/floor-plan/editor"
            className="btn-outline flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl">
            Modifier le plan
          </Link>
          <Link href="/dashboard/floor-plan/3d"
            className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl">
            Vue 3D
          </Link>
        </div>
      </div>

      {/* Live floor plan placeholder */}
      <div className="card-organic overflow-hidden">
        <div className="bg-forest-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-forest-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-forest-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-forest-700" />
            </div>
            <span className="text-forest-300 text-xs font-mono">Plan en temps réel · Service du soir</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-forest-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /> Libre</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Réservée</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-ember-400" /> Occupée</span>
          </div>
        </div>

        <div className="p-8 bg-nature-50 min-h-96 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-forest-100 flex items-center justify-center mx-auto">
              <Map className="w-8 h-8 text-forest-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-forest-900 mb-1">Configurez votre plan de salle</h3>
              <p className="text-forest-600/70 text-sm max-w-sm">
                Utilisez l'éditeur pour placer vos tables, définir vos zones et configurer la capacité.
                La vue en temps réel s'activera automatiquement.
              </p>
            </div>
            <Link href="/dashboard/floor-plan/editor"
              className="inline-flex btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold">
              Ouvrir l'éditeur →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
