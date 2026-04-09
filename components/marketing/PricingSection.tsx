'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check, Leaf, Zap, Crown, Globe, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Leaf,
    monthly: 49,
    annual: 39,
    description: 'Pour démarrer et tester la plateforme sans risque.',
    color: 'border-nature-200',
    bg: 'bg-white',
    headerBg: 'bg-nature-50',
    iconBg: 'bg-forest-100 text-forest-600',
    ctaVariant: 'outline' as const,
    features: [
      '1 restaurant',
      'Jusqu\'à 100 réservations/mois',
      'Plan de salle 2D',
      'Réservations en ligne (0 % commission)',
      'Confirmations SMS & email',
      'Page publique TableVista',
      'Application mobile (PWA)',
      'Support par email',
    ],
    notIncluded: ['Plan de salle 3D', 'Site web sur mesure', 'CRM avancé', 'Programme fidélité', 'Pré-paiements'],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Zap,
    monthly: 89,
    annual: 71,
    description: 'La solution complète pour les restaurants établis.',
    color: 'border-forest-600',
    bg: 'bg-forest-800',
    headerBg: 'bg-forest-800',
    iconBg: 'bg-forest-600/30 text-forest-200',
    ctaVariant: 'primary' as const,
    highlighted: true,
    badge: 'Le plus populaire',
    features: [
      '1 restaurant',
      'Réservations illimitées (0 % commission)',
      'Plan de salle 2D & 3D',
      'Choix de table par le client',
      'IA suggestion de tables',
      'CRM complet + programme fidélité',
      'Campagnes SMS & email automatiques',
      'Pré-paiements & acomptes',
      'QR Code paiement à table',
      'Analytiques avancées',
      'Gestion équipe',
      'Support prioritaire',
    ],
    notIncluded: [],
    addon: {
      label: 'Site web sur mesure',
      price: 29,
      icon: Globe,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    monthly: 149,
    annual: 119,
    description: 'Pour les groupes, chaînes et restaurants multi-sites.',
    color: 'border-amber-300',
    bg: 'bg-white',
    headerBg: 'bg-amber-50',
    iconBg: 'bg-amber-100 text-amber-700',
    ctaVariant: 'accent' as const,
    badge: 'Multi-sites',
    features: [
      'Jusqu\'à 10 restaurants',
      'Réservations illimitées (0 % commission)',
      'Plan de salle 2D & 3D pour chaque site',
      'Tout le plan Pro inclus',
      'Site web sur mesure INCLUS (−29 €/mois)',
      'Click & Collect & Bons cadeaux',
      'API publique + intégrations caisses',
      'Analytics consolidées multi-sites',
      'Rôles & permissions avancés',
      'Onboarding dédié',
      'SLA 99,9 % + support téléphonique',
    ],
    notIncluded: [],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const cardVariant = (i: number) => ({
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: i === 1 ? 1.02 : 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 } },
})

export function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] blob-2 bg-forest-100/50 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[320px] h-[320px] blob-4 bg-ember-100/30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <span className="chip inline-flex mb-6">Tarifs transparents</span>
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            Simple, honnête,{' '}
            <span className="text-gradient-hero italic">sans mauvaise surprise</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-forest-700/70 text-lg max-w-xl mx-auto mb-8">
            Zéro commission sur les réservations. Zéro frais cachés. Résiliez quand vous voulez.
          </motion.p>

          {/* Annual/monthly toggle */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-1.5 bg-nature-100 border border-nature-200 rounded-full p-1.5">
            <button onClick={() => setAnnual(false)}
              className={cn('px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                !annual ? 'bg-white text-forest-900 shadow-soft' : 'text-forest-600 hover:text-forest-800')}>
              Mensuel
            </button>
            <button onClick={() => setAnnual(true)}
              className={cn('flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                annual ? 'bg-white text-forest-900 shadow-soft' : 'text-forest-600 hover:text-forest-800')}>
              Annuel
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ember-500 text-white">−20 %</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.annual : plan.monthly
            const isHighlighted = !!plan.highlighted

            return (
              <motion.div
                key={plan.id}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                variants={cardVariant(i)}
                className={cn(
                  'relative rounded-3xl border-2 overflow-hidden flex flex-col transition-all duration-400 ease-organic',
                  'hover:-translate-y-1.5',
                  plan.color,
                  isHighlighted
                    ? 'shadow-green-glow'
                    : 'bg-white shadow-card hover:shadow-card-hover',
                )}
              >
                {plan.badge && (
                  <div className={cn(
                    'absolute top-4 right-4 text-[11px] font-bold px-3 py-1 rounded-full z-10',
                    isHighlighted ? 'bg-forest-300 text-forest-900' : 'bg-amber-300 text-amber-900',
                  )}>
                    {plan.badge}
                  </div>
                )}

                {/* Header */}
                <div className={cn('p-6', plan.headerBg, isHighlighted && 'text-white')}>
                  <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center mb-4', plan.iconBg)}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <h3 className={cn('font-display font-bold text-2xl mb-1',
                    isHighlighted ? 'text-white' : 'text-forest-900')}>
                    {plan.name}
                  </h3>
                  <p className={cn('text-sm', isHighlighted ? 'text-forest-300' : 'text-forest-600/70')}>
                    {plan.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className={cn('text-5xl font-bold font-display',
                      isHighlighted ? 'text-white' : 'text-forest-900')}>
                      {price}
                    </span>
                    <span className={cn('text-sm', isHighlighted ? 'text-forest-300' : 'text-forest-600/60')}>
                      € HT/mois{annual && <span className="block text-[11px] mt-0.5">facturé annuellement</span>}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 flex-1 space-y-2.5 bg-white">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-forest-800">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map(f => (
                    <div key={f} className="flex items-start gap-2.5 opacity-35">
                      <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-xs text-forest-400">—</span>
                      <span className="text-sm text-forest-700">{f}</span>
                    </div>
                  ))}

                  {plan.addon && (
                    <div className="mt-4 pt-4 border-t border-nature-100">
                      <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50 border border-blue-100">
                        <plan.addon.icon className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-blue-800">{plan.addon.label}</p>
                          <p className="text-[11px] text-blue-600">Add-on disponible · +{plan.addon.price} €/mois</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="p-6 pt-0 bg-white">
                  <Link href="/register"
                    className={cn(
                      'w-full justify-center py-3.5 rounded-2xl font-semibold text-sm inline-flex items-center gap-2 transition-all duration-400',
                      plan.ctaVariant === 'primary' && 'btn-primary',
                      plan.ctaVariant === 'accent'  && 'btn-accent',
                      plan.ctaVariant === 'outline' && 'btn-outline',
                    )}>
                    Commencer l'essai gratuit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-[11px] text-forest-500/55 mt-2">
                    14 jours gratuits · Sans carte bancaire
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Enterprise row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 card-glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs text-forest-500 uppercase tracking-widest font-semibold mb-1">Entreprise</p>
            <h3 className="font-display font-bold text-forest-900 text-lg">Vous gérez un groupe de restaurants ?</h3>
            <p className="text-forest-700/65 text-sm mt-1">
              Tarif sur mesure, intégrations caisse, accompagnement dédié, SLA renforcé.
            </p>
          </div>
          <Link href="/contact"
            className="shrink-0 btn-outline text-sm py-2.5 px-6 whitespace-nowrap">
            Nous contacter →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
