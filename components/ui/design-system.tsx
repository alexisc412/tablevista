'use client'

/**
 * TableVista Design System Showcase
 * Use this file as a reference for buttons, cards, inputs, badges, and modals.
 * Route: /design-system (add to (marketing)/design-system/page.tsx for dev preview)
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf, Star, Check, X, ArrowRight, Zap, Globe, Users,
  CreditCard, Bell, Info, AlertTriangle, CheckCircle,
} from 'lucide-react'

/* ────────────────────────────────────────────────────────────
   BUTTONS
   ──────────────────────────────────────────────────────────── */
export function ButtonShowcase() {
  return (
    <section className="space-y-6 p-8 bg-nature-50 rounded-3xl">
      <h3 className="font-display text-xl font-bold text-forest-950">Buttons</h3>

      {/* Primary — green → orange on hover */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-primary">
          Commencer gratuitement
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="btn-primary btn-lg">
          Grand bouton
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="btn-primary btn-sm">
          Petit bouton
        </button>
        <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
          Désactivé
        </button>
      </div>

      {/* Accent — orange */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-accent">
          Voir le simulateur ROI
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="btn-accent btn-lg">Grand accent</button>
        <button className="btn-accent btn-sm">Petit accent</button>
      </div>

      {/* Outline */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-outline">En savoir plus</button>
        <button className="btn-outline btn-lg">Grand outline</button>
        <button className="btn-outline btn-sm">Petit outline</button>
      </div>

      {/* Ghost */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-ghost">Ghost button</button>
        <button className="btn-icon"><Leaf className="w-4 h-4" /></button>
      </div>

      {/* With icons */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-primary">
          <Zap className="w-4 h-4" /> Avec icône gauche
        </button>
        <button className="btn-accent">
          <Globe className="w-4 h-4" /> Site web
        </button>
        <button className="btn-outline">
          <Users className="w-4 h-4" /> Équipe
        </button>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   CARDS
   ──────────────────────────────────────────────────────────── */
export function CardShowcase() {
  return (
    <section className="space-y-6 p-8 bg-sage-50 rounded-3xl">
      <h3 className="font-display text-xl font-bold text-forest-950">Cards</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* Organic card */}
        <div className="card-organic p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-forest-700" />
          </div>
          <h4 className="font-display font-bold text-forest-900">Card Organic</h4>
          <p className="text-sm text-forest-700/70">
            Style de base : fond blanc, bordure douce, ombre subtile.
          </p>
        </div>

        {/* Hover card */}
        <div className="card-organic-hover p-6 space-y-3 cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-ember-100 flex items-center justify-center">
            <Zap className="w-5 h-5 text-ember-600" />
          </div>
          <h4 className="font-display font-bold text-forest-900">Card Hoverable</h4>
          <p className="text-sm text-forest-700/70">
            Survole-moi : légère élévation et déplacement vertical.
          </p>
        </div>

        {/* Glass card */}
        <div className="card-glass p-6 space-y-3" style={{ background: 'linear-gradient(145deg,rgba(255,255,255,0.72),rgba(245,240,232,0.45))' }}>
          <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center">
            <Globe className="w-5 h-5 text-forest-700" />
          </div>
          <h4 className="font-display font-bold text-forest-900">Card Glass</h4>
          <p className="text-sm text-forest-700/70">
            Effet glassmorphism : backdrop-blur + transparence.
          </p>
        </div>

        {/* Feature card */}
        <div className="card-feature">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4
                          group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-forest-900 text-sm mb-1">Card Feature</h4>
          <p className="text-xs text-forest-700/65">
            Hover avec icône animée. Idéal pour les sections fonctionnalités.
          </p>
        </div>

        {/* Glow green card */}
        <div className="card-glow-green p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-forest-700" />
          </div>
          <h4 className="font-display font-bold text-forest-900">Card Glow Green</h4>
          <p className="text-sm text-forest-700/70">
            Halo vert autour de la carte.
          </p>
        </div>

        {/* Glow orange card */}
        <div className="card-glow-orange p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-ember-100 flex items-center justify-center">
            <Star className="w-5 h-5 text-ember-600" />
          </div>
          <h4 className="font-display font-bold text-forest-900">Card Glow Orange</h4>
          <p className="text-sm text-forest-700/70">
            Halo orange autour de la carte.
          </p>
        </div>
      </div>

      {/* Pricing-style card */}
      <div className="card-elevated p-8 max-w-sm">
        <div className="chip mb-5">
          <Zap className="w-3.5 h-3.5 text-forest-600" />
          Le plus populaire
        </div>
        <h4 className="font-display text-2xl font-bold text-forest-950 mb-1">Pro</h4>
        <p className="text-forest-600/70 text-sm mb-4">La solution complète.</p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-display text-4xl font-bold text-forest-900">89 €</span>
          <span className="text-sm text-forest-600/60">HT / mois</span>
        </div>
        <button className="btn-primary w-full justify-center">
          Commencer l'essai gratuit
        </button>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   BADGES
   ──────────────────────────────────────────────────────────── */
export function BadgeShowcase() {
  return (
    <section className="space-y-5 p-8 bg-white rounded-3xl border border-nature-200">
      <h3 className="font-display text-xl font-bold text-forest-950">Badges & Chips</h3>

      <div className="flex flex-wrap gap-2.5">
        <span className="badge-green">0 % commission</span>
        <span className="badge-orange">+40 % visibilité</span>
        <span className="badge-amber">−70 % no-shows</span>
        <span className="badge-blue">API publique</span>
        <span className="badge-purple">IA incluse</span>
        <span className="badge-nature">RGPD France</span>
        <span className="badge-live">En direct</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <span className="chip">
          <Leaf className="w-3.5 h-3.5 text-forest-600" />
          Fonctionnalités
        </span>
        <span className="chip-orange">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          4,9 / 5
        </span>
        <span className="chip-amber">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          14 jours gratuits
        </span>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-1.5">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
        <span className="text-sm font-semibold text-forest-800 ml-1">4,9 / 5</span>
        <span className="text-sm text-forest-600/60">· 320 avis</span>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   INPUTS
   ──────────────────────────────────────────────────────────── */
export function InputShowcase() {
  return (
    <section className="space-y-6 p-8 bg-nature-50 rounded-3xl">
      <h3 className="font-display text-xl font-bold text-forest-950">Inputs & Forms</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        <div className="input-group">
          <label className="label">Email</label>
          <input type="email" placeholder="chef@restaurant.fr" className="input" />
        </div>
        <div className="input-group">
          <label className="label">Téléphone</label>
          <input type="tel" placeholder="06 12 34 56 78" className="input" />
        </div>
        <div className="input-group">
          <label className="label">Nom du restaurant</label>
          <input type="text" placeholder="Le Jardin des Saveurs" className="input-lg" />
        </div>
        <div className="input-group">
          <label className="label">Erreur</label>
          <input type="text" placeholder="Champ invalide" className="input input-error" />
          <p className="text-xs text-red-500 mt-1">Ce champ est requis.</p>
        </div>
        <div className="input-group sm:col-span-2">
          <label className="label">Message</label>
          <textarea rows={3} placeholder="Votre message…"
            className="input resize-none" />
        </div>
        <div className="input-group">
          <label className="label">Catégorie</label>
          <select className="input">
            <option>Brasserie / Bistrot</option>
            <option>Restaurant gastronomique</option>
            <option>Bar & Cocktails</option>
          </select>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   ALERTS / TOASTS
   ──────────────────────────────────────────────────────────── */
export function AlertShowcase() {
  return (
    <section className="space-y-4 p-8 bg-white rounded-3xl border border-nature-200">
      <h3 className="font-display text-xl font-bold text-forest-950">Alerts</h3>

      {[
        { icon: CheckCircle, title: 'Réservation confirmée', desc: 'Table 3 confirmée pour ce soir à 20h00.', bg: 'bg-forest-50 border-forest-200', icon_cls: 'text-forest-600', title_cls: 'text-forest-900', desc_cls: 'text-forest-700/70' },
        { icon: Info, title: 'Nouveau message support', desc: 'L\'équipe TableVista vous a répondu.', bg: 'bg-blue-50 border-blue-200', icon_cls: 'text-blue-600', title_cls: 'text-blue-900', desc_cls: 'text-blue-700/70' },
        { icon: AlertTriangle, title: 'No-show détecté', desc: 'La table 7 n\'est pas arrivée. Envoyer un SMS ?', bg: 'bg-amber-50 border-amber-200', icon_cls: 'text-amber-600', title_cls: 'text-amber-900', desc_cls: 'text-amber-700/70' },
        { icon: X, title: 'Échec du paiement', desc: 'La carte bancaire du client a été refusée.', bg: 'bg-red-50 border-red-200', icon_cls: 'text-red-600', title_cls: 'text-red-900', desc_cls: 'text-red-700/70' },
      ].map(a => (
        <div key={a.title} className={`flex gap-3 p-4 rounded-2xl border ${a.bg}`}>
          <a.icon className={`w-5 h-5 shrink-0 mt-0.5 ${a.icon_cls}`} />
          <div>
            <p className={`text-sm font-semibold ${a.title_cls}`}>{a.title}</p>
            <p className={`text-sm mt-0.5 ${a.desc_cls}`}>{a.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   MODAL
   ──────────────────────────────────────────────────────────── */
export function ModalShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <section className="space-y-4 p-8 bg-nature-50 rounded-3xl">
      <h3 className="font-display text-xl font-bold text-forest-950">Modal</h3>

      <button className="btn-primary" onClick={() => setOpen(true)}>
        Ouvrir un modal
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-forest-950/55 backdrop-blur-sm"
            />

            {/* Modal panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.38, ease: [0.34, 1.3, 0.64, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="card-organic w-full max-w-md p-8 pointer-events-auto relative">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-5 right-5 btn-icon text-forest-400"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-3xl bg-forest-100 flex items-center justify-center mb-5">
                  <CreditCard className="w-7 h-7 text-forest-700" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-forest-950 mb-2">
                  Ajouter un acompte
                </h3>
                <p className="text-sm text-forest-700/70 mb-6 leading-relaxed">
                  Demandez un acompte à votre client pour sécuriser la réservation
                  et réduire les no-shows.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="input-group">
                    <label className="label">Montant de l'acompte</label>
                    <div className="relative">
                      <input type="number" placeholder="20" className="input pr-10" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-500 font-semibold">€</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setOpen(false)} className="btn-outline flex-1 justify-center">
                    Annuler
                  </button>
                  <button onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">
                    <Check className="w-4 h-4" />
                    Confirmer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────
   FULL DESIGN SYSTEM PAGE
   ──────────────────────────────────────────────────────────── */
export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-nature-100 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="chip mx-auto mb-4">
            <Leaf className="w-3.5 h-3.5 text-forest-600" />
            Design System
          </div>
          <h1 className="font-display text-4xl font-bold text-forest-950 mb-3">
            TableVista <span className="text-gradient-green">Design System</span>
          </h1>
          <p className="text-forest-600/70">
            Palette, typographie, composants — tous les éléments du thème Vert Floral.
          </p>
        </div>

        {/* Color palette */}
        <section className="card-organic p-8 space-y-5">
          <h3 className="font-display text-xl font-bold text-forest-950">Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Forest 800',  hex: '#166534', cls: 'bg-forest-800' },
              { name: 'Forest 400',  hex: '#4ade80', cls: 'bg-forest-400' },
              { name: 'Ember 500',   hex: '#f97316', cls: 'bg-ember-500' },
              { name: 'Nature 100',  hex: '#f5f0e8', cls: 'bg-nature-100 border' },
              { name: 'Sage 50',     hex: '#ecfdf5', cls: 'bg-sage-50 border' },
              { name: 'Nature 50',   hex: '#faf9f6', cls: 'bg-nature-50 border' },
              { name: 'Forest 950',  hex: '#052e16', cls: 'bg-forest-950' },
              { name: 'Ember 200',   hex: '#fed7aa', cls: 'bg-ember-200' },
            ].map(c => (
              <div key={c.name} className="space-y-2">
                <div className={`h-16 rounded-2xl ${c.cls}`} title={c.hex} />
                <p className="text-xs font-semibold text-forest-800">{c.name}</p>
                <p className="text-[10px] font-mono text-forest-500">{c.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="card-organic p-8 space-y-5">
          <h3 className="font-display text-xl font-bold text-forest-950">Typographie</h3>
          <div className="space-y-4">
            <p className="font-display text-5xl font-bold text-forest-950 leading-tight">Playfair Display Bold</p>
            <p className="font-display text-3xl font-semibold text-forest-800 leading-tight italic">Playfair Italic Semibold</p>
            <p className="font-sans text-xl font-semibold text-forest-900">Inter Semibold — Titres secondaires</p>
            <p className="font-sans text-base text-forest-700/75 leading-relaxed max-w-xl">
              Inter Regular — Corps de texte, descriptions, paragraphes. Une lisibilité optimale pour tous les contenus longs.
            </p>
            <p className="text-label text-forest-500/70">Label uppercase · Tracking-widest</p>
          </div>

          {/* Gradient headline examples */}
          <div className="space-y-2 pt-4 border-t border-nature-100">
            <p className="font-display text-3xl font-bold text-gradient-green">Dégradé Vert → Lime</p>
            <p className="font-display text-3xl font-bold text-gradient-warm">Dégradé Orange → Ambre</p>
            <p className="font-display text-3xl font-bold text-gradient-hero">Dégradé Hero Vert → Orange</p>
          </div>
        </section>

        <ButtonShowcase />
        <CardShowcase />
        <BadgeShowcase />
        <InputShowcase />
        <AlertShowcase />
        <ModalShowcase />
      </div>
    </div>
  )
}
