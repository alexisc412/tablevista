'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus, Trophy } from 'lucide-react'

const ROWS = [
  { feature: 'Commission par réservation',     tablevista: '0 €',              other: '1–3 € / couvert',      winner: 'tv' },
  { feature: 'Plan de salle 2D interactif',    tablevista: true,               other: true,                    winner: 'tie' },
  { feature: 'Plan de salle 3D',               tablevista: true,               other: false,                   winner: 'tv' },
  { feature: 'Choix de table par le client',   tablevista: true,               other: false,                   winner: 'tv' },
  { feature: 'Site web sur mesure',            tablevista: '+29 €/mois',       other: '+39–59 €/mois',        winner: 'tv' },
  { feature: 'Pré-paiement / acompte',         tablevista: true,               other: true,                    winner: 'tie' },
  { feature: 'QR Code paiement à table',       tablevista: true,               other: false,                   winner: 'tv' },
  { feature: 'Programme de fidélité',          tablevista: true,               other: false,                   winner: 'tv' },
  { feature: 'Campagnes SMS & email auto',     tablevista: true,               other: 'payant en plus',       winner: 'tv' },
  { feature: 'Click & Collect / Bons cadeaux', tablevista: true,               other: 'partiel',              winner: 'tv' },
  { feature: 'IA suggestions de tables',       tablevista: true,               other: false,                   winner: 'tv' },
  { feature: 'API publique',                   tablevista: 'Pro & Premium',    other: 'Offre Entreprise',     winner: 'tv' },
  { feature: 'Hébergement EU (RGPD)',          tablevista: '🇫🇷 France',       other: 'Variable',             winner: 'tv' },
  { feature: 'Support humain FR',              tablevista: true,               other: true,                    winner: 'tie' },
  { feature: 'Essai gratuit',                  tablevista: '14 jours',         other: 'Démo sur demande',     winner: 'tv' },
]

function Cell({ value, isWinner }: { value: boolean | string | null; isWinner: boolean }) {
  if (value === true)  return <Check className={`w-5 h-5 mx-auto ${isWinner ? 'text-forest-600' : 'text-forest-400'}`} />
  if (value === false) return <X className="w-5 h-5 mx-auto text-red-400/70" />
  if (value === null)  return <Minus className="w-5 h-5 mx-auto text-nature-400" />
  return (
    <span className={`text-sm font-medium ${isWinner ? 'text-forest-800 font-semibold' : 'text-nature-500'}`}>
      {value}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const rowVariant = (i: number) => ({
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.035 } },
})

export function ComparisonSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tvWins = ROWS.filter(r => r.winner === 'tv').length

  return (
    <section id="comparison" ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-nature-100">

      <div className="absolute inset-0 leaf-bg opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nature-300 to-transparent" />

      <div className="relative max-w-5xl mx-auto">

        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <span className="chip inline-flex mb-6">
              <Trophy className="w-3.5 h-3.5 text-forest-600" />
              Comparatif honnête
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            TableVista vs les autres —{' '}
            <span className="text-gradient-hero italic">sans langue de bois</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-forest-700/70 text-lg max-w-2xl mx-auto">
            On gagne sur <strong className="text-forest-900">{tvWins} points sur {ROWS.length}</strong>. Vérifiez par vous-même.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-nature-200/80 shadow-card overflow-hidden"
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_150px_150px] bg-nature-50 border-b border-nature-200">
            <div className="px-6 py-4 text-sm font-semibold text-nature-700/70">Fonctionnalité</div>
            <div className="px-4 py-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-forest-800 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                <span className="text-forest-300 text-base">🍃</span> TableVista
              </div>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-nature-200 text-nature-700 text-sm font-medium px-3 py-1.5 rounded-xl">
                Les autres
              </div>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              variants={rowVariant(i)}
              className={`grid grid-cols-[1fr_150px_150px] border-b border-nature-100/80 last:border-0 transition-colors ${
                row.winner === 'tv' ? 'hover:bg-forest-50/50' : 'hover:bg-nature-50/80'
              }`}
            >
              <div className="px-6 py-3.5 flex items-center gap-2.5">
                {row.winner === 'tv' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-400 shrink-0" />
                )}
                <span className="text-sm text-forest-900">{row.feature}</span>
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center bg-forest-50/20">
                <Cell value={row.tablevista} isWinner={row.winner === 'tv' || row.winner === 'tie'} />
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center">
                <Cell value={row.other} isWinner={false} />
              </div>
            </motion.div>
          ))}

          <div className="grid grid-cols-[1fr_150px_150px] bg-forest-900">
            <div className="px-6 py-4 text-white font-semibold text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold-400" />
              Score final
            </div>
            <div className="px-4 py-4 text-center bg-forest-800/50">
              <span className="font-display font-bold text-forest-300 text-2xl">{tvWins}</span>
              <span className="text-forest-400 text-sm ml-1">✓</span>
            </div>
            <div className="px-4 py-4 text-center">
              <span className="font-display text-nature-500 text-2xl font-bold">{ROWS.length - tvWins}</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-nature-500 mt-4">
          * Comparatif établi en avril 2026 sur les offres moyennes du marché. Tarifs susceptibles d'évoluer.
        </motion.p>
      </div>
    </section>
  )
}
