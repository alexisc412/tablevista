'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Leaf, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  {
    label: 'Fonctionnalités', href: '#features',
    children: [
      { label: 'Plan de salle 2D/3D',    href: '#floor-plan' },
      { label: 'Réservations en ligne',  href: '#reservations' },
      { label: 'Site web sur mesure',    href: '#website' },
      { label: 'CRM & Fidélisation',     href: '#crm' },
      { label: 'Paiements & Acomptes',   href: '#payments' },
    ],
  },
  { label: 'Tarifs',       href: '#pricing' },
  { label: 'Comparatif',  href: '#comparison' },
  { label: 'Simulateur ROI', href: '#roi', highlight: true },
]

export function MarketingHeader() {
  const [open,       setOpen]   = useState(false)
  const [scrolled,   setScrolled] = useState(false)
  const [dropdown,   setDropdown] = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled
        ? 'bg-white/94 backdrop-blur-xl shadow-soft border-b border-nature-200/60'
        : 'bg-transparent',
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300',
            'bg-forest-800 shadow-green-glow group-hover:scale-105 group-hover:bg-forest-700',
          )}>
            <Leaf className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-[1.15rem] text-forest-900 tracking-tight">
            Table<span className="text-gradient-warm">Vista</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.children && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  item.highlight
                    ? 'text-ember-600 hover:bg-ember-50/80 font-semibold'
                    : 'text-forest-800/75 hover:text-forest-900 hover:bg-forest-50/80',
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
              </a>

              {/* Dropdown */}
              {item.children && dropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-56 card-organic py-2 z-50
                                animate-scale-in origin-top-left">
                  {item.children.map(child => (
                    <a key={child.href} href={child.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-forest-800/80
                                 hover:text-forest-900 hover:bg-forest-50/80 transition-colors">
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/login"
            className="text-sm font-medium text-forest-800/65 hover:text-forest-900 transition-colors px-3 py-2 rounded-xl hover:bg-forest-50/70">
            Connexion
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2.5 px-5 rounded-full">
            Essai gratuit →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden btn-icon"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/97 backdrop-blur-xl border-t border-nature-200/60 px-4 py-4 space-y-1 animate-fade-up">
          {NAV.map(item => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                item.highlight
                  ? 'text-ember-600 bg-ember-50 font-semibold'
                  : 'text-forest-800/80 hover:bg-forest-50',
              )}>
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-nature-100 flex flex-col gap-2.5">
            <Link href="/login"
              className="block text-center py-3 text-sm font-medium text-forest-800/70 hover:text-forest-900">
              Connexion
            </Link>
            <Link href="/register" className="btn-primary justify-center py-3 rounded-2xl">
              Essai gratuit 14 jours
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
