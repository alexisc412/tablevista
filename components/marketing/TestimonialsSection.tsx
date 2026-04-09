'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, TrendingUp, Users, Clock, Zap } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sophie Lemaire',
    role: 'Propriétaire · Le Jardin des Saveurs',
    location: 'Lyon',
    avatar: 'SL',
    avatarBg: 'bg-forest-100 text-forest-700',
    rating: 5,
    text: 'On utilisait une autre plateforme depuis 3 ans. Le switch a pris 2 heures. On économise 480 € de commissions par mois et nos clients adorent choisir leur table. Le plan 3D est bluffant.',
    metric: '+480 €/mois',
    metricLabel: 'économisés sur commissions',
    metricColor: 'text-forest-700',
    metricBg: 'bg-forest-50',
    icon: TrendingUp,
  },
  {
    name: 'Marc Delacroix',
    role: 'Chef & Co-fondateur · Bistrot Bio',
    location: 'Paris 11e',
    avatar: 'MD',
    avatarBg: 'bg-ember-100 text-ember-700',
    rating: 5,
    text: 'On avait 22 % de no-shows. On est passé à 5 % grâce aux acomptes automatiques. Et le site web TableVista nous ramène 3× plus de réservations directes.',
    metric: '−78 %',
    metricLabel: 'de no-shows',
    metricColor: 'text-forest-700',
    metricBg: 'bg-forest-50',
    icon: Clock,
  },
  {
    name: 'Isabelle Fontaine',
    role: 'Directrice · Groupe Vert Table',
    location: '4 restaurants',
    avatar: 'IF',
    avatarBg: 'bg-purple-100 text-purple-700',
    rating: 5,
    text: 'La gestion multi-sites est imbattable. Un seul tableau de bord pour 4 restaurants, les analytics consolidées, et le support répond en moins d\'une heure. Impossible de revenir en arrière.',
    metric: '4 sites',
    metricLabel: 'gérés depuis un dashboard',
    metricColor: 'text-ember-600',
    metricBg: 'bg-ember-50',
    icon: Users,
  },
  {
    name: 'Thomas Renaud',
    role: 'Gérant · La Serre Gourmande',
    location: 'Bordeaux',
    avatar: 'TR',
    avatarBg: 'bg-blue-100 text-blue-700',
    rating: 5,
    text: 'L\'application PWA pour les serveurs change tout. Mon équipe voit le plan de salle en temps réel sur iPhone. Plus de confusions sur les tables, plus d\'erreurs d\'assignation.',
    metric: '+30 min',
    metricLabel: 'gagnées par service',
    metricColor: 'text-forest-700',
    metricBg: 'bg-forest-50',
    icon: Zap,
  },
  {
    name: 'Céline Moreau',
    role: 'Sommelière & Propriétaire · Cave & Cuisine',
    location: 'Annecy',
    avatar: 'CM',
    avatarBg: 'bg-amber-100 text-amber-700',
    rating: 5,
    text: 'Le programme de fidélité a boosté nos retours clients de 40 %. Les campagnes anniversaire se font toutes seules. Mes clients se sentent reconnus et reviennent plus souvent.',
    metric: '+40 %',
    metricLabel: 'de clients fidèles',
    metricColor: 'text-ember-600',
    metricBg: 'bg-ember-50',
    icon: Users,
  },
  {
    name: 'Karim Benhaddad',
    role: 'Chef étoilé · L\'Olivier',
    location: 'Marseille',
    avatar: 'KB',
    avatarBg: 'bg-forest-100 text-forest-700',
    rating: 5,
    text: 'Le site web sur mesure à 29 €/mois est ridiculeusement bien fait. SEO natif, réservation intégrée, galerie photos. On est passé en première page Google en 3 semaines.',
    metric: '1ʳᵉ page',
    metricLabel: 'Google en 3 semaines',
    metricColor: 'text-forest-700',
    metricBg: 'bg-forest-50',
    icon: TrendingUp,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function TestimonialsSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-nature-100">

      {/* Background */}
      <div className="absolute inset-0 leaf-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-500 via-forest-300 to-ember-400" />
      <div className="absolute -top-24 left-1/3 w-[400px] h-[400px] blob-2 bg-forest-200/25 pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] blob-4 bg-ember-200/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="chip-orange inline-flex mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              &nbsp;4,9/5 · 320+ restaurants
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            Ils ont changé d'outil.{' '}
            <span className="text-gradient-hero italic">Ils ne regrettent rien.</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-forest-700/70 text-lg max-w-2xl mx-auto">
            Des restaurateurs qui ont fait le switch et mesurent les résultats chaque mois.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              className="group bg-white rounded-3xl border border-nature-200/80 shadow-card
                         hover:shadow-card-hover hover:-translate-y-1.5
                         transition-all duration-400 ease-organic flex flex-col overflow-hidden"
            >
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-forest-400/40 via-forest-300 to-ember-400/40" />

              <div className="p-6 flex flex-col flex-1">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-forest-200 mb-3 shrink-0" />

                {/* Text */}
                <p className="text-forest-800/80 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>

                {/* Metric pill */}
                <div className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full ${t.metricBg} mb-5`}>
                  <t.icon className={`w-3.5 h-3.5 ${t.metricColor} shrink-0`} />
                  <span className={`text-xs font-bold ${t.metricColor}`}>{t.metric}</span>
                  <span className="text-xs text-forest-600/60">{t.metricLabel}</span>
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-nature-100 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${t.avatarBg} flex items-center justify-center
                                  font-bold text-sm shrink-0 font-display`}>
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="font-semibold text-forest-900 text-sm truncate">{t.name}</p>
                    <p className="text-xs text-forest-600/55 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 card-glass px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
            {[
              { value: '320+', label: 'restaurants actifs' },
              { value: '0 €', label: 'de commission' },
              { value: '4,9/5', label: 'satisfaction' },
              { value: '14 j', label: 'essai gratuit' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-forest-900 text-xl leading-none">{s.value}</p>
                <p className="text-xs text-forest-600/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="shrink-0 text-xs text-forest-500/60 text-center sm:text-right max-w-[180px]">
            Données vérifiées · Mis à jour en avril 2026
          </div>
        </motion.div>
      </div>
    </section>
  )
}
