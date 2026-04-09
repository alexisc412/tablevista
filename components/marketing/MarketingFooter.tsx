import Link from 'next/link'
import { Leaf, Twitter, Linkedin, Instagram } from 'lucide-react'

const LINKS = {
  Produit: [
    { label: 'Fonctionnalités', href: '/#features' },
    { label: 'Tarifs', href: '/#pricing' },
    { label: 'Simulateur ROI', href: '/#roi' },
    { label: 'Comparatif concurrents', href: '/#comparison' },
    { label: 'Site web sur mesure', href: '/website-builder' },
    { label: 'Application mobile', href: '/mobile-app' },
  ],
  Solutions: [
    { label: 'Restaurant indépendant', href: '/solutions/independant' },
    { label: 'Groupe & multi-sites', href: '/solutions/groupe' },
    { label: 'Bistrots & brasseries', href: '/solutions/bistrot' },
    { label: 'Restaurants gastronomiques', href: '/solutions/gastronomique' },
    { label: 'Bars & cafés', href: '/solutions/bar' },
  ],
  Ressources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Guide de migration', href: '/guide-migration' },
    { label: 'Documentation API', href: '/docs/api' },
    { label: 'Centre d\'aide', href: '/help' },
    { label: 'Statut plateforme', href: '/status' },
  ],
  Entreprise: [
    { label: 'À propos', href: '/about' },
    { label: 'Partenaires', href: '/partners' },
    { label: 'Presse', href: '/press' },
    { label: 'Carrières', href: '/jobs' },
    { label: 'Nous contacter', href: '/contact' },
  ],
}

const SOCIAL = [
  { icon: Twitter, href: 'https://twitter.com/tablevista', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/tablevista', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/tablevista', label: 'Instagram' },
]

export function MarketingFooter() {
  return (
    <footer className="bg-forest-950 text-forest-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-forest-700 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-forest-300" />
              </div>
              <span className="font-display font-bold text-white text-lg">TableVista</span>
            </Link>
            <p className="text-sm text-forest-500 leading-relaxed mb-5 max-w-xs">
              La plateforme de réservation sans commission pour les restaurants qui refusent de payer pour leurs propres clients.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-forest-800 hover:bg-forest-700 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-forest-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}
                      className="text-sm text-forest-500 hover:text-forest-200 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Eco banner */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-forest-600">
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3 h-3 text-forest-500" />
              Hébergement éco-responsable · Serveurs Supabase Europe (France) · Empreinte carbone compensée
            </span>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-forest-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest-600">
          <p>© {new Date().getFullYear()} TableVista SAS · Tous droits réservés</p>
          <div className="flex items-center gap-5">
            <Link href="/legal/mentions" className="hover:text-forest-400 transition-colors">Mentions légales</Link>
            <Link href="/legal/privacy" className="hover:text-forest-400 transition-colors">Confidentialité</Link>
            <Link href="/legal/cgu" className="hover:text-forest-400 transition-colors">CGU</Link>
            <Link href="/legal/cookies" className="hover:text-forest-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
