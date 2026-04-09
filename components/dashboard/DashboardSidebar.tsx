'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Leaf, LayoutDashboard, CalendarDays, Map, Users, BarChart3,
  Globe, Settings, CreditCard, LogOut, Menu, X, UserSquare2,
} from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',            icon: LayoutDashboard, label: 'Vue d\'ensemble' },
  { href: '/dashboard/reservations', icon: CalendarDays,   label: 'Réservations' },
  { href: '/dashboard/floor-plan',  icon: Map,             label: 'Plan de salle' },
  { href: '/dashboard/clients',     icon: Users,           label: 'CRM Clients' },
  { href: '/dashboard/analytics',   icon: BarChart3,       label: 'Analytiques' },
  { href: '/dashboard/team',        icon: UserSquare2,     label: 'Équipe' },
  { href: '/dashboard/website',     icon: Globe,           label: 'Site web' },
]

const BOTTOM_NAV = [
  { href: '/dashboard/billing',    icon: CreditCard, label: 'Facturation' },
  { href: '/dashboard/settings',   icon: Settings,   label: 'Paramètres' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen]   = useState(false)

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-forest-800/50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-forest-700 flex items-center justify-center group-hover:bg-forest-600 transition-colors">
            <Leaf className="w-4 h-4 text-forest-300" />
          </div>
          <span className="font-display font-bold text-white text-base">TableVista</span>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden text-forest-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              isActive(href)
                ? 'bg-forest-700 text-white'
                : 'text-forest-400 hover:bg-forest-800 hover:text-forest-100',
            )}>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 border-t border-forest-800/50 space-y-0.5">
        {BOTTOM_NAV.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              isActive(href)
                ? 'bg-forest-700 text-white'
                : 'text-forest-400 hover:bg-forest-800 hover:text-forest-100',
            )}>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
        <button onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-forest-400 hover:bg-forest-800 hover:text-forest-100 transition-all">
          <LogOut className="w-4 h-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-white shadow-lg"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile slide-in */}
      <aside className={cn(
        'fixed left-0 top-0 bottom-0 z-50 w-56 bg-forest-900 transition-transform duration-300',
        'lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        <SidebarContent />
      </aside>
    </>
  )
}
