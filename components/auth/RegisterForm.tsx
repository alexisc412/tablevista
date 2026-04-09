'use client'

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function RegisterForm() {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [show,     setShow]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [done,     setDone]     = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) throw error
      setDone(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed')) {
        setError('Impossible de joindre le serveur. Vérifiez que votre fichier .env.local contient NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY, puis relancez le serveur de développement.')
      } else {
        setError(msg || 'Erreur lors de la création du compte.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center mx-auto">
          <span className="text-2xl">✉️</span>
        </div>
        <h3 className="font-display font-bold text-forest-900 text-lg">Vérifiez votre email</h3>
        <p className="text-forest-700/70 text-sm max-w-xs mx-auto">
          Un lien de confirmation a été envoyé à <strong className="text-forest-900">{email}</strong>.
          Cliquez dessus pour activer votre compte.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-forest-900">
          Votre nom
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Sophie Lemaire"
          className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-forest-900">
          Adresse email professionnelle
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="chef@monrestaurant.fr"
          className="w-full px-4 py-3 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="reg-password" className="text-sm font-semibold text-forest-900">
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="8 caractères minimum"
            className="w-full px-4 py-3 pr-11 rounded-xl border border-nature-300 bg-white text-forest-900 placeholder:text-forest-400/60 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition"
          />
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Création du compte…' : 'Créer mon compte gratuit'}
      </button>

      <p className="text-center text-xs text-forest-500/70">
        En créant un compte, vous acceptez nos{' '}
        <a href="/legal/cgu" className="underline underline-offset-2 hover:text-forest-700">CGU</a>
        {' '}et notre{' '}
        <a href="/legal/privacy" className="underline underline-offset-2 hover:text-forest-700">politique de confidentialité</a>.
      </p>
    </form>
  )
}
