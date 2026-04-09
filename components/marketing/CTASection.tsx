'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, Shield, Zap, Ban, TrendingUp } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Star,   text: '4,9/5 sur 320+ restaurants' },
  { icon: Shield, text: 'Données hébergées en France' },
  { icon: Zap,    text: 'Configuration en 10 minutes' },
  { icon: Ban,    text: 'Zéro commission à vie' },
]

const STATS = [
  { value: '320+', label: 'Restaurants actifs' },
  { value: '0 €',  label: 'Commission prise' },
  { value: '14 j', label: 'Essai gratuit' },
  { value: '10\'', label: 'Pour configurer' },
]

export function CTASection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-forest-950 overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(22,101,52,0.35) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 dot-bg opacity-[0.04] pointer-events-none" />

      {/* Blobs */}
      <motion.div
        className="absolute top-8 left-1/4 w-80 h-80 blob-1 bg-forest-700/20 pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-1/4 w-64 h-64 blob-2 bg-ember-700/15 pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 3 }}
      />

      {/* Top gradient stripe */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-600 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Stars badge */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 border border-forest-700
                     text-forest-300 text-sm font-semibold mb-8"
        >
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />)}
          &nbsp;Rejoint par 320+ restaurants
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.08]"
        >
          Arrêtez de payer des commissions.{' '}
          <span className="text-gradient-warm italic">Gardez vos marges.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-forest-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          14 jours gratuits. Sans carte bancaire. Sans engagement.
          Votre restaurant mérite un outil qui travaille <em>pour</em> vous, pas contre vous.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link href="/register"
            className="btn-primary btn-lg text-base hover-lift inline-flex items-center gap-2.5">
            Commencer l'essai gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#roi"
            className="inline-flex items-center gap-2 text-forest-300 hover:text-white
                       font-semibold px-6 py-4 rounded-full border border-forest-700
                       hover:border-forest-500 transition-all duration-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            Voir le simulateur ROI
          </Link>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-forest-400 text-sm">
              <Icon className="w-4 h-4 text-forest-500 shrink-0" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-forest-800/60 rounded-3xl overflow-hidden border border-forest-800"
        >
          {STATS.map((s, i) => (
            <div key={s.label}
              className="bg-forest-900/80 px-6 py-5 text-center backdrop-blur-sm">
              <p className="font-display font-bold text-3xl text-white leading-none mb-1">{s.value}</p>
              <p className="text-xs text-forest-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-12 pt-10 border-t border-forest-800/60"
        >
          <p className="text-forest-600 text-xs uppercase tracking-widest mb-5">
            Ils ont déjà fait le switch
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              'Le Jardin des Saveurs · Lyon',
              'Bistrot Bio · Paris',
              'L\'Olivier · Marseille',
              'Cave & Cuisine · Annecy',
              'Groupe Vert Table',
            ].map(name => (
              <span key={name} className="text-forest-600 font-medium text-sm hover:text-forest-400 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
