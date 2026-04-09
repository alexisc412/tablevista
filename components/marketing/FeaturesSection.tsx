'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Map, CalendarDays, Globe, Users, CreditCard, BarChart3, Smartphone, Star, Zap, Shield } from 'lucide-react'

const FEATURES = [
  {
    icon: Map,
    color: 'bg-forest-100 text-forest-700',
    ring:  'group-hover:ring-forest-200',
    title: 'Plan de salle 2D & 3D',
    description: 'Modélisez votre restaurant en glisser-déposer. Tables, zones, terrasse, bar. Vue 3D immersive. Vos clients choisissent leur table exacte.',
    badge: 'Exclusif',
    badgeColor: 'bg-forest-100 text-forest-700 border-forest-200',
  },
  {
    icon: CalendarDays,
    color: 'bg-ember-100 text-ember-700',
    ring:  'group-hover:ring-ember-200',
    title: 'Réservations 0 % commission',
    description: 'Zéro euro par couvert. Téléphone, walk-in, en ligne, widget embarqué — tout passe par vous. Confirmations SMS/email automatiques.',
    badge: '0 % commission',
    badgeColor: 'bg-ember-100 text-ember-700 border-ember-200',
  },
  {
    icon: Globe,
    color: 'bg-blue-100 text-blue-700',
    ring:  'group-hover:ring-blue-200',
    title: 'Site web sur mesure',
    description: 'Site pro SEO-optimisé avec éditeur drag & drop, widget réservation intégré, galerie, menus, bons cadeaux. +40 % de visibilité Google.',
    badge: '+40 % Google',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    icon: Users,
    color: 'bg-purple-100 text-purple-700',
    ring:  'group-hover:ring-purple-200',
    title: 'CRM & Programme fidélité',
    description: 'Profil client unifié, historique complet, tags VIP, allergies, préférences. Programme de points automatique. Campagnes anniversaire.',
    badge: 'CRM Avancé',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    icon: CreditCard,
    color: 'bg-amber-100 text-amber-700',
    ring:  'group-hover:ring-amber-200',
    title: 'Paiements & Acomptes',
    description: 'Pré-paiement, acompte ou empreinte bancaire à la réservation. Paiement à table QR. Bons cadeaux. Via Stripe Connect.',
    badge: 'Stripe intégré',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    icon: BarChart3,
    color: 'bg-forest-100 text-forest-700',
    ring:  'group-hover:ring-forest-200',
    title: 'Analytiques & Prévisions IA',
    description: 'Tableaux de bord temps réel, taux d\'occupation, CA par table, prévisions IA. Export en un clic.',
    badge: 'IA incluse',
    badgeColor: 'bg-forest-100 text-forest-700 border-forest-200',
  },
  {
    icon: Smartphone,
    color: 'bg-ember-100 text-ember-700',
    ring:  'group-hover:ring-ember-200',
    title: 'PWA pour serveurs',
    description: 'App installable sur iPad et smartphone. Plan de salle temps réel, assignation tables, notifications push. Équipe synchronisée.',
    badge: 'PWA',
    badgeColor: 'bg-ember-100 text-ember-700 border-ember-200',
  },
  {
    icon: Star,
    color: 'bg-amber-100 text-amber-700',
    ring:  'group-hover:ring-amber-200',
    title: 'E-réputation & Avis',
    description: 'Collecte automatique d\'avis post-repas. Modération centralisée, réponse rapide. Score e-réputation affiché sur votre page.',
    badge: 'Avis auto',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    icon: Zap,
    color: 'bg-blue-100 text-blue-700',
    ring:  'group-hover:ring-blue-200',
    title: 'Liste d\'attente & Walk-in',
    description: 'File d\'attente digitale avec SMS automatique quand une table se libère. Walk-in en 10 secondes. Service optimisé.',
    badge: 'Temps réel',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    icon: Shield,
    color: 'bg-forest-100 text-forest-700',
    ring:  'group-hover:ring-forest-200',
    title: 'RGPD 100 % France',
    description: 'Hébergement Supabase Europe (France). Données jamais revendues. DPO disponible. Conformité RGPD totale.',
    badge: '🇫🇷 Données FR',
    badgeColor: 'bg-forest-100 text-forest-700 border-forest-200',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function FeaturesSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-white">

      {/* Subtle background */}
      <div className="absolute inset-0 leaf-bg opacity-35 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-200 to-transparent" />

      {/* Decorative blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] blob-1 bg-forest-100/60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] blob-3 bg-ember-100/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="chip inline-flex mb-6">
              <Zap className="w-3.5 h-3.5 text-forest-600" />
              Tout ce dont vous avez besoin
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            Une plateforme,{' '}
            <span className="text-gradient-hero italic">toutes les fonctionnalités</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-forest-700/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Arrêtez de payer 3 outils différents. TableVista remplace votre logiciel de réservation,
            votre site web et votre CRM — en mieux et moins cher.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`group relative bg-white rounded-3xl border border-nature-200/80 p-5
                          shadow-card hover:shadow-card-hover hover:-translate-y-1.5
                          transition-all duration-400 ease-organic cursor-default
                          ring-2 ring-transparent ${f.ring} transition-shadow
                          ${i === 0 ? 'xl:col-span-2 xl:row-span-1' : ''}
                          ${i === 2 ? 'xl:col-span-2' : ''}
                `}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-nature-200 to-transparent" />

              <div className={`w-10 h-10 rounded-2xl ${f.color} flex items-center justify-center mb-4
                               group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-5 h-5" />
              </div>

              <div className="flex items-start justify-between gap-2 mb-2.5">
                <h3 className="font-display font-bold text-forest-900 text-sm leading-snug">{f.title}</h3>
              </div>

              <p className="text-[12px] text-forest-700/60 leading-relaxed mb-3">{f.description}</p>

              <span className={`inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${f.badgeColor}`}>
                {f.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-forest-600/60 text-sm">
            Et aussi : click & collect, bons cadeaux, API publique, gestion multi-sites, intégrations caisses…
          </p>
        </motion.div>
      </div>
    </section>
  )
}
