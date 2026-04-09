import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MapPin, Star, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import { BookingWidget } from '@/components/public/BookingWidget'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('restaurants').select('name, city, description').eq('booking_url_slug', slug).single()
  if (!data) return { title: 'Restaurant introuvable' }
  return {
    title: `${data.name} · Réserver une table — TableVista`,
    description: data.description ?? `Réservez une table au ${data.name} à ${data.city}.`,
  }
}

export default async function RestaurantPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, city, category, description, cover_image_url, table_count')
    .eq('booking_url_slug', slug)
    .single()

  if (!restaurant) notFound()

  return (
    <div className="min-h-screen bg-nature-100">
      {/* Hero */}
      <div className="relative h-56 sm:h-72 bg-forest-800 overflow-hidden">
        {restaurant.cover_image_url ? (
          <img src={restaurant.cover_image_url} alt={restaurant.name}
            className="w-full h-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 leaf-bg opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="font-display text-3xl font-bold text-white mb-1">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-forest-200 text-sm">
            {restaurant.city && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {restaurant.city}
              </span>
            )}
            {restaurant.category && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> {restaurant.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          {restaurant.description && (
            <div className="card-organic p-6">
              <h2 className="font-display font-bold text-forest-900 mb-3">À propos</h2>
              <p className="text-forest-700/75 text-sm leading-relaxed">{restaurant.description}</p>
            </div>
          )}

          <div className="card-organic p-6">
            <h2 className="font-display font-bold text-forest-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest-600" /> Horaires
            </h2>
            <p className="text-forest-600/70 text-sm">Contactez le restaurant pour les horaires d'ouverture.</p>
          </div>
        </div>

        {/* Booking widget */}
        <div>
          <BookingWidget restaurantId={restaurant.id} restaurantName={restaurant.name} />
        </div>
      </div>
    </div>
  )
}
