'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [show,     setShow]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      window.location.href = '/dashboard'
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Identifiants incorrects. Vérifiez votre email et mot de passe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-forest-900">
          Adresse email
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
        <div className="flex justify-between items-baseline">
          <label htmlFor="password" className="text-sm font-semibold text-forest-900">
            Mot de passe
          </label>
          <Link href="/forgot-password" className="text-xs text-forest-600 hover:text-forest-800 underline underline-offset-2">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
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
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}
