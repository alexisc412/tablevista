'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock, Ban, ArrowRight, Leaf, ChevronUp } from 'lucide-react'
import { calculateROI, formatCurrency, formatNumber } from '@/lib/utils'
import Link from 'next/link'

function Slider({
  label, min, max, step, value, onChange, unit, hint,
}: {
  label: string; min: number; max: number; step: number
  value: number; onChange: (v: number) => void; unit: string; hint?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-semibold text-forest-900">{label}</label>
        <span className="text-lg font-bold text-forest-800 font-display">
          {unit === '€' ? `${value} ${unit}` : unit === '%' ? `${value} ${unit}` : `${value} ${unit}`}
        </span>
      </div>
      <div className="relative h-2 bg-nature-200 rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-forest-600 to-forest-400 rounded-full transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-forest-600 shadow-md transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {hint && <p className="text-xs text-forest-600/60">{hint}</p>}
    </div>
  )
}

function AnimatedNumber({ value, prefix = '', suffix = '', className = '' }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const [displayed, setDisplayed] = useState(0)
  const ref = useRef<number>(0)

  useEffect(() => {
    const start   = ref.current
    const end     = value
    const diff    = end - start
    const steps   = 30
    const stepVal = diff / steps
    let i = 0
    const id = setInterval(() => {
      i++
      ref.current = start + stepVal * i
      setDisplayed(Math.round(ref.current))
      if (i >= steps) { ref.current = end; setDisplayed(end); clearInterval(id) }
    }, 16)
    return () => clearInterval(id)
  }, [value])

  return (
    <span className={className}>
      {prefix}{formatNumber(displayed)}{suffix}
    </span>
  )
}

export function ROISimulator() {
  const [tables,        setTables]       = useState(15)
  const [coversPerDay,  setCoversPerDay] = useState(80)
  const [avgSpend,      setAvgSpend]     = useState(38)
  const [noshowPercent, setNoshowPct]    = useState(18)
  const [workDays,      setWorkDays]     = useState(22)
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  const roi = useMemo(() => calculateROI({
    tables, coversPerDay, avgSpend, noshowPercent, workDaysMonth: workDays,
  }), [tables, coversPerDay, avgSpend, noshowPercent, workDays])

  return (
    <section id="roi" ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-nature-100 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 blob-1 bg-forest-50 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 blob-2 bg-ember-50 opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="chip-orange inline-flex mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            Simulateur de retour sur investissement
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            Calculez combien TableVista{' '}
            <span className="text-gradient-warm italic">vous fait gagner</span>
          </h2>
          <p className="text-forest-700/70 text-lg max-w-2xl mx-auto">
            Ajustez les paramètres de votre restaurant et découvrez votre gain réel — en euros et en temps.
            <strong className="text-forest-800"> Sans engagement.</strong>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: Sliders ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-organic p-8 space-y-7"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-forest-100 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest-600" />
              </div>
              <h3 className="font-display font-bold text-forest-900">Votre restaurant</h3>
            </div>

            <Slider label="Nombre de tables" min={3} max={100} step={1}
              value={tables} onChange={setTables} unit="tables"
              hint="Toutes zones confondues (salle, terrasse, bar…)" />

            <Slider label="Couverts par jour" min={10} max={400} step={5}
              value={coversPerDay} onChange={setCoversPerDay} unit="couverts/j"
              hint="Moyenne sur vos jours d'ouverture" />

            <Slider label="Panier moyen" min={15} max={150} step={1}
              value={avgSpend} onChange={setAvgSpend} unit="€/pers"
              hint="Dépense moyenne par couvert (hors boissons si séparé)" />

            <Slider label="Taux de no-show actuel" min={2} max={40} step={1}
              value={noshowPercent} onChange={setNoshowPct} unit="%"
              hint="% de réservations qui ne se présentent pas. Moyenne secteur : 15–20 %" />

            <Slider label="Jours d'ouverture / mois" min={10} max={30} step={1}
              value={workDays} onChange={setWorkDays} unit="jours"
              hint="En moyenne, les restaurants ouvrent 22 jours/mois" />

            {/* Current situation recap */}
            <div className="p-4 rounded-2xl bg-nature-100 border border-nature-200">
              <p className="text-xs font-semibold text-forest-700 mb-2 uppercase tracking-wide">Situation actuelle</p>
              <div className="flex justify-between text-sm">
                <span className="text-forest-700/70">CA mensuel estimé</span>
                <span className="font-bold text-forest-900">{formatCurrency(roi.currentMonthlyRevenue)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-forest-700/70">Pertes no-shows/mois</span>
                <span className="font-bold text-red-600">−{formatCurrency(roi.noshowLossMonthly)}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {/* Main gain card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-forest-800 via-forest-700 to-forest-900 p-8 text-white overflow-hidden shadow-green-glow">
              <div className="absolute top-0 right-0 w-40 h-40 blob-1 bg-white/5" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 blob-2 bg-forest-600/30" />

              <div className="relative">
                <p className="text-forest-200 text-sm font-semibold uppercase tracking-wider mb-2">Avec TableVista</p>
                <p className="text-forest-300 text-base mb-1">Gain mensuel estimé</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <AnimatedNumber
                    value={roi.totalMonthlyGain}
                    prefix="+"
                    suffix=" €"
                    className="text-5xl font-bold font-display text-white"
                  />
                  <span className="text-forest-300 text-sm">/mois</span>
                </div>
                <p className="text-forest-300 text-sm">
                  soit <strong className="text-white">{formatCurrency(roi.totalMonthlyGain * 12)}/an</strong>
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-2xl p-3">
                    <p className="text-forest-300 text-xs mb-1">Économie no-shows</p>
                    <AnimatedNumber value={roi.savedFromNoshows} prefix="+" suffix=" €" className="text-xl font-bold text-forest-100 font-display" />
                    <p className="text-forest-300 text-[11px] mt-0.5">−{roi.noshowReduction}% de no-shows</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3">
                    <p className="text-forest-300 text-xs mb-1">Gain visibilité +40%</p>
                    <AnimatedNumber value={roi.gainFromVisibility} prefix="+" suffix=" €" className="text-xl font-bold text-forest-100 font-display" />
                    <p className="text-forest-300 text-[11px] mt-0.5">+12% de couverts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time & ROI cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-organic p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-ember-100 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-ember-600" />
                  </div>
                  <span className="text-sm font-semibold text-forest-800">Temps gagné</span>
                </div>
                <AnimatedNumber
                  value={Math.round(roi.timeSavedHoursWeek)}
                  suffix=" h/sem"
                  className="text-3xl font-bold font-display text-ember-600"
                />
                <p className="text-xs text-forest-600/60 mt-1">
                  Administration automatisée, confirmations, rappels SMS
                </p>
              </div>

              <div className="card-organic p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-100 flex items-center justify-center">
                    <ChevronUp className="w-4.5 h-4.5 text-forest-600" />
                  </div>
                  <span className="text-sm font-semibold text-forest-800">ROI en</span>
                </div>
                <div className="text-3xl font-bold font-display text-forest-800">
                  &lt; 1 mois
                </div>
                <p className="text-xs text-forest-600/60 mt-1">
                  Abonnement Pro à {roi.planCost} €/mois amorti immédiatement
                </p>
              </div>
            </div>

            {/* Commission saving */}
            <div className="card-organic p-5 border-l-4 border-forest-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 flex items-center justify-center">
                  <Ban className="w-4.5 h-4.5 text-forest-600" />
                </div>
                <div>
                  <p className="font-semibold text-forest-900 text-sm">Zéro commission sur vos réservations</p>
                  <p className="text-xs text-forest-600/70">Les autres facturent 1–2 € / couvert</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display text-forest-700">
                  <AnimatedNumber
                    value={Math.round(coversPerDay * workDays * 1.5)}
                    prefix="+"
                    suffix=" €"
                  />
                </span>
                <span className="text-sm text-forest-600/70">économisés vs les autres/mois</span>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-ember-500 to-ember-600 rounded-3xl p-6 text-white shadow-orange-glow">
              <h3 className="font-display font-bold text-xl mb-2">
                Prêt à gagner {formatCurrency(roi.totalMonthlyGain)}/mois ?
              </h3>
              <p className="text-ember-100 text-sm mb-4">
                Essai gratuit 14 jours. Sans carte bancaire. Configuration en 10 minutes.
              </p>
              <Link href="/register"
                className="inline-flex items-center gap-2 bg-white text-ember-700 font-bold px-6 py-3 rounded-full hover:bg-ember-50 transition-colors text-sm shadow-sm">
                Commencer maintenant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-forest-600/40 mt-8">
          * Estimations basées sur les données moyennes secteur. Résultats réels variables selon votre restaurant.
          Gain de visibilité issu de l'effet SEO du site web sur mesure + référencement TableVista.
        </p>
      </div>
    </section>
  )
}
