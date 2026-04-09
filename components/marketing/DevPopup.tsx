'use client'

import { useEffect, useState } from 'react'
import { X, Code2, FlaskConical } from 'lucide-react'

export function DevPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('dev-popup-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  function close() {
    sessionStorage.setItem('dev-popup-dismissed', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-lift max-w-md w-full p-8 border border-nature-200 overflow-hidden">

        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-500 via-ember-400 to-gold-400 rounded-t-3xl" />

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-nature-100 hover:bg-nature-200 flex items-center justify-center text-forest-500 hover:text-forest-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icons */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-forest-100 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-forest-600" />
          </div>
          <div className="w-11 h-11 rounded-2xl bg-ember-100 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-ember-500" />
          </div>
        </div>

        {/* Content */}
        <h2 className="font-display text-xl font-bold text-forest-950 mb-3 leading-snug">
          Hey Faycal 👋
        </h2>
        <p className="text-forest-700/80 text-sm leading-relaxed mb-4">
          C'est <strong className="text-forest-900">Aleksa</strong> — je développe en ce moment
          une plateforme SaaS de réservation pour les restaurants.
        </p>
        <p className="text-forest-700/80 text-sm leading-relaxed mb-6">
          Ce site est encore en construction, mais toi tu seras mon{' '}
          <span className="inline-flex items-center gap-1 text-ember-600 font-semibold">
            cobaye <FlaskConical className="w-3.5 h-3.5" />
          </span>{' '}
          — le premier restaurant à le tester pour de vrai. Bientôt !
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={close}
            className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-semibold"
          >
            J'ai hâte !
          </button>
          <button
            onClick={close}
            className="px-4 py-2.5 rounded-xl border border-nature-200 text-forest-600 hover:bg-nature-50 text-sm font-medium transition-colors"
          >
            Fermer
          </button>
        </div>

        <p className="text-center text-xs text-forest-400 mt-4">
          Site en développement actif — certaines fonctionnalités sont encore en cours
        </p>
      </div>
    </div>
  )
}
