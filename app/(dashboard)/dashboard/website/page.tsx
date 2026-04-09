import { createClient } from '@/lib/supabase/server'
import { Globe, ExternalLink, Palette, Search, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function WebsitePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, booking_url_slug, city')
    .eq('owner_id', user!.id)
    .single()

  const publicUrl = restaurant?.booking_url_slug
    ? `${process.env.NEXT_PUBLIC_APP_URL}/r/${restaurant.booking_url_slug}`
    : null

  const FEATURES = [
    { icon: Palette, title: 'Design personnalisé', desc: 'Couleurs, logo, photos — votre identité visuelle complète.' },
    { icon: Search,  title: 'SEO optimisé',        desc: 'Référencement local Google, balises meta, schema.org.' },
    { icon: Star,    title: 'Avis intégrés',        desc: 'Collecte et affichage de vos avis clients.' },
    { icon: Globe,   title: 'Domaine sur mesure',   desc: 'Connectez votre domaine en 2 clics (monrestaurant.fr).' },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
          <Globe className="w-6 h-6 text-forest-600" /> Site web
        </h1>
        <p className="text-forest-600/70 text-sm mt-1">
          Votre page publique de réservation et site web sur mesure
        </p>
      </div>

      {/* Public booking URL */}
      <div className="card-organic p-5">
        <p className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-2">Page publique</p>
        {publicUrl ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-nature-50 border border-nature-200 rounded-xl px-4 py-2.5">
              <Globe className="w-4 h-4 text-forest-500 shrink-0" />
              <span className="text-sm text-forest-800 font-mono truncate">{publicUrl}</span>
            </div>
            <a href={publicUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0">
              <ExternalLink className="w-4 h-4" /> Voir
            </a>
          </div>
        ) : (
          <p className="text-sm text-forest-500">Finalisez l'onboarding pour activer votre page publique.</p>
        )}
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-organic p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-forest-600" />
            </div>
            <div>
              <p className="font-semibold text-forest-900 text-sm mb-0.5">{title}</p>
              <p className="text-xs text-forest-600/70">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-forest-800 to-forest-900 p-8 text-white">
        <h2 className="font-display text-xl font-bold mb-2">Site web sur mesure — +29 €/mois</h2>
        <p className="text-forest-300 text-sm mb-5 max-w-lg">
          Obtenez un site web professionnel connecté à votre système de réservation.
          Domaine inclus la première année. Design responsive et optimisé SEO.
        </p>
        <Link href="/dashboard/billing"
          className="inline-flex items-center gap-2 bg-white text-forest-800 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-forest-50 transition-colors">
          Activer le site web <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
