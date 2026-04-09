'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, TrendingUp, Users, Ban, Clock } from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Status = 'available' | 'occupied' | 'reserved' | 'selected'

interface TableDef {
  id: number; zone: string; x: number; y: number
  size: number; shape: 'round' | 'square'; label: string; capacity: number
}

/* ─── Floor-plan data ────────────────────────────────────────────────────── */
const TABLES: TableDef[] = [
  { id: 1,  zone: 'Salle',    x: 9,  y: 14, size: 50, shape: 'round',  label: '1',  capacity: 4 },
  { id: 2,  zone: 'Salle',    x: 30, y: 14, size: 50, shape: 'round',  label: '2',  capacity: 4 },
  { id: 3,  zone: 'Salle',    x: 52, y: 14, size: 44, shape: 'round',  label: '3',  capacity: 2 },
  { id: 4,  zone: 'Salle',    x: 9,  y: 44, size: 58, shape: 'square', label: '4',  capacity: 6 },
  { id: 5,  zone: 'Salle',    x: 38, y: 42, size: 50, shape: 'round',  label: '5',  capacity: 4 },
  { id: 6,  zone: 'Terrasse', x: 70, y: 10, size: 44, shape: 'round',  label: 'T1', capacity: 2 },
  { id: 7,  zone: 'Terrasse', x: 87, y: 10, size: 44, shape: 'round',  label: 'T2', capacity: 2 },
  { id: 8,  zone: 'Terrasse', x: 78, y: 36, size: 54, shape: 'square', label: 'T3', capacity: 4 },
  { id: 9,  zone: 'Privatif', x: 15, y: 72, size: 62, shape: 'square', label: 'P1', capacity: 8 },
  { id: 10, zone: 'Privatif', x: 52, y: 74, size: 50, shape: 'round',  label: 'P2', capacity: 4 },
]

const STATUS_STYLE: Record<Status, { bg: string; ring: string; dot: string; textColor: string }> = {
  available: { bg: 'rgba(220,252,231,0.9)', ring: 'rgba(34,197,94,0.5)',  dot: '#16a34a', textColor: '#166534' },
  occupied:  { bg: 'rgba(255,237,213,0.9)', ring: 'rgba(249,115,22,0.5)', dot: '#f97316', textColor: '#9a3412' },
  reserved:  { bg: 'rgba(254,249,195,0.9)', ring: 'rgba(234,179,8,0.5)',  dot: '#ca8a04', textColor: '#92400e' },
  selected:  { bg: 'rgba(187,247,208,0.95)', ring: 'rgba(22,101,52,0.8)', dot: '#166534', textColor: '#052e16' },
}

const INITIAL: Record<number, Status> = {
  1: 'occupied', 2: 'reserved',  3: 'available',
  4: 'occupied', 5: 'available', 6: 'available',
  7: 'reserved', 8: 'available', 9: 'reserved', 10: 'available',
}

const AVAILABLE_IDS = Object.entries(INITIAL)
  .filter(([, s]) => s === 'available')
  .map(([id]) => parseInt(id))

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { icon: Ban,       value: '0 %',    label: 'de commission',       color: 'text-forest-700', bg: 'bg-forest-50 border-forest-200' },
  { icon: TrendingUp, value: '+40 %', label: 'visibilité Google',   color: 'text-ember-600',  bg: 'bg-ember-50 border-ember-200' },
  { icon: Clock,     value: '−70 %',  label: 'de no-shows',         color: 'text-forest-700', bg: 'bg-forest-50 border-forest-200' },
  { icon: Users,     value: '5 h',    label: 'gagnées / semaine',   color: 'text-ember-600',  bg: 'bg-ember-50 border-ember-200' },
]

/* ─── Animation variants ─────────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Leaf SVG decoration ─────────────────────────────────────────────────── */
function LeafSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M32 4C18 16 6 32 10 54C14 72 50 72 54 54C58 32 46 16 32 4Z" fill="currentColor" />
      <path d="M32 4C32 4 32 78 32 78" stroke="currentColor" strokeWidth="1.5"
        opacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Floating badge ─────────────────────────────────────────────────────── */
function FloatBadge({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Interactive Floor Plan ─────────────────────────────────────────────── */
function FloorPlan() {
  const [statuses, setStatuses] = useState<Record<number, Status>>(INITIAL)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showNotif, setShowNotif] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    const tick = () => {
      const id = AVAILABLE_IDS[idx.current % AVAILABLE_IDS.length]
      setSelectedId(id)
      setShowNotif(true)
      setStatuses(p => ({ ...p, [id]: 'selected' }))
      setTimeout(() => {
        setStatuses(p => ({ ...p, [id]: 'available' }))
        setSelectedId(null)
        setShowNotif(false)
      }, 2000)
      idx.current++
    }
    tick()
    const timer = setInterval(tick, 3900)
    return () => clearInterval(timer)
  }, [])

  const selTable = TABLES.find(t => t.id === selectedId)

  return (
    <div className="relative">
      {/* Selection notification */}
      <AnimatePresence>
        {showNotif && selTable && (
          <motion.div
            key="notif"
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap
                       bg-white border border-forest-200/80 rounded-2xl px-3.5 py-2
                       shadow-card flex items-center gap-2 text-xs font-semibold text-forest-800"
          >
            <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse-dot shrink-0" />
            Table {selTable.label} — réservation en cours…
          </motion.div>
        )}
      </AnimatePresence>

      {/* The 3D card */}
      <motion.div
        className="floor-plan-3d rounded-3xl overflow-hidden border border-forest-700/30"
        style={{ boxShadow: '0 24px 80px rgba(5,46,22,0.35), 0 4px 16px rgba(5,46,22,0.20)' }}
        initial={{ opacity: 0, scale: 0.9, rotateY: -14 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ delay: 0.3, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top bar */}
        <div className="bg-forest-950/95 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between
                        border-b border-forest-800/60">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-[11px] text-forest-400/65 ml-1">Plan de salle · Live</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-forest-400/60">EN DIRECT</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative bg-gradient-to-br from-forest-950 via-[#0d231a] to-[#0a1e14]"
             style={{ height: '300px' }}>

          {/* Grid */}
          <div className="absolute inset-0 opacity-100"
               style={{
                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L32 0 M0 0 L0 32' stroke='%23166534' stroke-opacity='0.08' stroke-width='0.6'/%3E%3C/svg%3E\")",
                 backgroundSize: '32px 32px',
               }} />

          {/* Zone: Salle */}
          <div className="absolute rounded-xl border border-dashed border-forest-500/20"
               style={{ left: '4%', top: '6%', width: '60%', height: '53%' }}>
            <span className="absolute -top-2 left-3 bg-forest-950/95 px-2 text-[8.5px] uppercase
                             font-bold tracking-widest text-forest-400/60 rounded-full">Salle</span>
          </div>
          {/* Zone: Terrasse */}
          <div className="absolute rounded-xl border border-dashed border-ember-500/20"
               style={{ left: '66%', top: '5%', width: '30%', height: '45%' }}>
            <span className="absolute -top-2 left-2 bg-forest-950/95 px-2 text-[8.5px] uppercase
                             font-bold tracking-widest text-ember-400/55 rounded-full">Terrasse</span>
          </div>
          {/* Zone: Privatif */}
          <div className="absolute rounded-xl border border-dashed border-amber-400/18"
               style={{ left: '4%', top: '64%', width: '75%', height: '28%' }}>
            <span className="absolute -top-2 left-3 bg-forest-950/95 px-2 text-[8.5px] uppercase
                             font-bold tracking-widest text-amber-400/55 rounded-full">Privatif</span>
          </div>

          {/* Tables */}
          {TABLES.map(t => {
            const st = STATUS_STYLE[statuses[t.id] ?? 'available']
            const isSel = selectedId === t.id
            return (
              <div
                key={t.id}
                className="absolute flex flex-col items-center justify-center"
                style={{
                  left:           `${t.x}%`,
                  top:            `${t.y}%`,
                  width:          `${t.size}px`,
                  height:         `${t.size}px`,
                  transform:      `translate(-50%, -50%) scale(${isSel ? 1.15 : 1})`,
                  borderRadius:   t.shape === 'round' ? '50%' : '10px',
                  background:     st.bg,
                  boxShadow:      `0 0 0 2px ${st.ring}, 0 4px 18px rgba(0,0,0,0.4)`,
                  backdropFilter: 'blur(3px)',
                  transition:     'all 0.42s cubic-bezier(0.34,1.4,0.64,1)',
                  zIndex:         isSel ? 20 : 1,
                }}
              >
                <span style={{ color: st.textColor, fontSize: '10px', fontWeight: 700 }}>{t.label}</span>
                <span style={{ color: st.dot, fontSize: '7px', opacity: 0.75 }}>{t.capacity}p</span>
                <span style={{
                  position: 'absolute', bottom: '4px', right: '4px',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: st.dot, boxShadow: '0 0 0 1.5px rgba(0,0,0,0.25)',
                }} />
              </div>
            )
          })}
        </div>

        {/* Legend footer */}
        <div className="bg-forest-950/95 backdrop-blur-sm border-t border-forest-800/60
                        px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {[
              { label: 'Libre',    dot: '#16a34a' },
              { label: 'Réservée', dot: '#ca8a04' },
              { label: 'Occupée',  dot: '#f97316' },
            ].map(item => (
              <span key={item.label} className="flex items-center gap-1.5 text-[10px] text-forest-400/70">
                <span className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                {item.label}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-mono text-forest-500/50">
            {Object.values(statuses).filter(s => s === 'available' || s === 'selected').length} libres
          </span>
        </div>
      </motion.div>

      {/* Badge: 0 % commission */}
      <FloatBadge
        delay={0.85}
        className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-card
                   border border-nature-200/70 px-3.5 py-2.5 flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
          <Ban className="w-4 h-4 text-forest-700" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-forest-900 leading-none">0 % commission</p>
          <p className="text-[9px] text-forest-600/65 mt-0.5">Chaque réservation = 100 % à vous</p>
        </div>
      </FloatBadge>

      {/* Badge: gain mensuel */}
      <FloatBadge
        delay={1.05}
        className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl shadow-card
                   border border-nature-200/70 px-3.5 py-2.5 flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-ember-100 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-ember-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-forest-900 leading-none">+2 340 € / mois</p>
          <p className="text-[9px] text-forest-600/65 mt-0.5">gain moyen estimé</p>
        </div>
      </FloatBadge>
    </div>
  )
}

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
export function HeroSection() {
  const ref   = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-nature-50"
    >
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 leaf-bg pointer-events-none" />

      {/* Green orb top-left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[550px] h-[550px] blob-1 bg-forest-400/8 pointer-events-none"
        animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Orange orb bottom-right */}
      <motion.div
        className="absolute -bottom-28 -right-28 w-[420px] h-[420px] blob-2 bg-ember-400/8 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 2.5 }}
      />
      {/* Sage center wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[600px] blob-3 bg-sage-50/50 pointer-events-none" />

      {/* Decorative leaves — CSS-only animation */}
      <div className="absolute top-20 right-[7%] text-forest-400/22 pointer-events-none hidden xl:block animate-leaf-float"
           style={{ animationDelay: '0s' }}>
        <LeafSvg className="w-14 h-[4.5rem]" />
      </div>
      <div className="absolute bottom-28 left-[5%] text-forest-300/18 pointer-events-none hidden xl:block animate-leaf-float-2"
           style={{ animationDelay: '2.5s' }}>
        <LeafSvg className="w-9 h-12" />
      </div>
      <div className="absolute top-48 left-[11%] text-ember-400/15 pointer-events-none hidden 2xl:block animate-leaf-float-3"
           style={{ animationDelay: '4s' }}>
        <LeafSvg className="w-6 h-8" />
      </div>

      {/* Top stripe */}
      <div className="top-stripe" />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-20 items-center">

          {/* ── Left: text ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-7"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <div className="chip-orange inline-flex">
                <span className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </span>
                4,9/5 · La meilleure alternative du marché
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1 className="font-display font-bold leading-[1.07] tracking-tight text-forest-950
                             text-[2.6rem] sm:text-5xl lg:text-[3.3rem]">
                Le restaurant qui{' '}
                <br className="hidden sm:block" />
                <span className="text-gradient-hero italic">garde toutes</span>
                <br className="hidden sm:block" />
                ses réservations.
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-forest-700/72 leading-relaxed max-w-xl">
              Zéro commission. Plan de salle{' '}
              <span className="font-semibold text-forest-800">2D & 3D interactif</span>,
              site web sur mesure, CRM et fidélisation — tout-en-un.{' '}
              <strong className="text-forest-800">14 jours offerts, sans carte bancaire.</strong>
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3.5 pt-1">
              <Link href="/register" className="btn-primary btn-lg group text-base hover-lift">
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link href="#roi" className="btn-outline btn-lg text-base hover-lift">
                Calculer mon gain →
              </Link>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-forest-500/65">
              {['✓ Sans carte bancaire','✓ Config en 10 min','✓ Support humain','✓ Données en France'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </motion.div>

            {/* Stat cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {STATS.map(({ icon: Icon, value, label, color, bg }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`${bg} border rounded-2xl p-3.5 flex flex-col gap-1.5 hover-lift transition-organic`}
                >
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                  <p className={`font-display text-[1.35rem] font-bold ${color} leading-none`}>{value}</p>
                  <p className="text-[10px] text-forest-600/60 leading-tight">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Floor plan ── */}
          <div className="relative lg:pl-6 xl:pl-10">
            <FloorPlan />

            {/* Stars trust badge */}
            <FloatBadge
              delay={1.25}
              className="absolute -bottom-12 right-2 z-20 glass rounded-2xl px-4 py-2.5
                         flex items-center gap-2 shadow-glass"
            >
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-xs font-semibold text-forest-800">320+ restaurants</span>
            </FloatBadge>
          </div>
        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
             className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 60 L0 30C240 58 480 10 720 26C960 42 1200 12 1440 30L1440 60Z" fill="white" fillOpacity=".55" />
          <path d="M0 60 L0 42C360 22 720 50 1080 34C1260 26 1380 38 1440 42L1440 60Z" fill="white" fillOpacity=".4" />
        </svg>
      </div>
    </section>
  )
}
