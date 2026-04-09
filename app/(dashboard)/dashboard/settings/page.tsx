import { createClient } from '@/lib/supabase/server'
import { Settings } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, city, category, table_count, booking_url_slug, description')
    .eq('owner_id', user!.id)
    .single()

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
          <Settings className="w-6 h-6 text-forest-600" /> Paramètres
        </h1>
        <p className="text-forest-600/70 text-sm mt-1">Gérez les informations de votre restaurant</p>
      </div>

      <div className="card-organic p-8 space-y-6">
        <h2 className="font-display font-bold text-forest-900 text-lg border-b border-nature-100 pb-3">
          Informations du restaurant
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Nom</label>
            <input defaultValue={restaurant?.name ?? ''}
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Ville</label>
            <input defaultValue={restaurant?.city ?? ''}
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Catégorie</label>
            <input defaultValue={restaurant?.category ?? ''}
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Nombre de tables</label>
            <input type="number" defaultValue={restaurant?.table_count ?? 10}
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-semibold text-forest-900">Description</label>
            <textarea defaultValue={restaurant?.description ?? ''} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm resize-none" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-sm font-semibold text-forest-900">URL de réservation</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-forest-500 shrink-0">tablevista.fr/r/</span>
              <input defaultValue={restaurant?.booking_url_slug ?? ''}
                className="flex-1 px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-nature-100 flex justify-end">
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  )
}
