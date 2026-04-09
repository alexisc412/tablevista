'use client'

import { useState } from 'react'
import { CalendarDays, Users, Clock, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateTimeSlots } from '@/lib/utils'

const TIMES = generateTimeSlots('12:00', '22:00', 30)

type Step = 'form' | 'details' | 'confirm' | 'done'

export function BookingWidget({ restaurantId, restaurantName }: { restaurantId: string; restaurantName: string }) {
  const [step,       setStep]       = useState<Step>('form')
  const [date,       setDate]       = useState('')
  const [time,       setTime]       = useState('')
  const [partySize,  setPartySize]  = useState(2)
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [phone,      setPhone]      = useState('')
  const [notes,      setNotes]      = useState('')
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  const minDate = new Date().toISOString().split('T')[0]

  async function submit() {
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()

      // Upsert customer
      const { data: customer, error: custErr } = await supabase
        .from('customers')
        .upsert({ restaurant_id: restaurantId, name, email: email || null, phone: phone || null },
          { onConflict: 'restaurant_id,email', ignoreDuplicates: false })
        .select('id')
        .single()
      if (custErr) throw custErr

      // Create reservation
      const { error: resErr } = await supabase.from('reservations').insert({
        restaurant_id: restaurantId,
        customer_id: customer.id,
        date, time, party_size: partySize,
        notes: notes || null,
        status: 'pending',
      })
      if (resErr) throw resErr

      setStep('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="card-organic p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center mx-auto">
          <Check className="w-7 h-7 text-forest-600" />
        </div>
        <h3 className="font-display font-bold text-forest-900 text-lg">Réservation confirmée ! 🎉</h3>
        <p className="text-forest-600/70 text-sm">
          Votre demande pour le <strong>{date}</strong> à <strong>{time}</strong> ({partySize} pers.)
          a bien été enregistrée. Vous recevrez une confirmation par email.
        </p>
        <button onClick={() => { setStep('form'); setDate(''); setTime('') }}
          className="text-sm font-semibold text-forest-600 hover:text-forest-900 underline underline-offset-2">
          Faire une autre réservation
        </button>
      </div>
    )
  }

  return (
    <div className="card-organic p-6 space-y-5 sticky top-6">
      <h2 className="font-display font-bold text-forest-900 text-lg flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-forest-600" /> Réserver une table
      </h2>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {/* Date */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-forest-900">Date</label>
        <input type="date" min={minDate} value={date} onChange={e => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
      </div>

      {/* Time */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-forest-900 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Heure
        </label>
        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
          {TIMES.map(t => (
            <button key={t} onClick={() => setTime(t)}
              className={`py-2 text-sm rounded-xl border font-medium transition-all ${
                time === t ? 'bg-forest-800 text-white border-forest-800' : 'bg-white text-forest-700 border-nature-300 hover:border-forest-400'
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Party size */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-forest-900 flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> Nombre de personnes
        </label>
        <div className="flex items-center gap-3">
          <button onClick={() => setPartySize(v => Math.max(1, v - 1))}
            className="w-10 h-10 rounded-xl border border-nature-300 bg-white text-forest-900 font-bold text-lg hover:border-forest-400 transition">−</button>
          <span className="flex-1 text-center font-bold font-display text-forest-900 text-xl">{partySize}</span>
          <button onClick={() => setPartySize(v => Math.min(20, v + 1))}
            className="w-10 h-10 rounded-xl border border-nature-300 bg-white text-forest-900 font-bold text-lg hover:border-forest-400 transition">+</button>
        </div>
      </div>

      {step === 'form' && (
        <button
          onClick={() => date && time ? setStep('details') : null}
          disabled={!date || !time}
          className="w-full btn-primary py-3 rounded-xl text-sm font-semibold disabled:opacity-50">
          Continuer →
        </button>
      )}

      {step === 'details' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-sm">
            <strong>{date}</strong> à <strong>{time}</strong> · {partySize} personne{partySize > 1 ? 's' : ''}
            <button onClick={() => setStep('form')} className="ml-2 text-forest-600 underline text-xs">modifier</button>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Votre nom *</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Sophie Lemaire"
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="sophie@email.fr"
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Téléphone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-forest-900">Notes / Allergies</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
              placeholder="Chaise haute, allergie aux noix…"
              className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm resize-none" />
          </div>

          <button
            onClick={submit}
            disabled={loading || !name.trim()}
            className="w-full btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Envoi…' : 'Confirmer la réservation'}
          </button>
          <p className="text-center text-xs text-forest-500/60">0 € demandé · Gratuit à réserver</p>
        </div>
      )}
    </div>
  )
}
