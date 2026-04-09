import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: 'TableVista — Zéro commission, 100% votre restaurant',
    template: '%s | TableVista',
  },
  description: 'La plateforme SaaS écoresponsable pour les restaurants. Plan de salle 2D/3D, réservations zéro commission, CRM, site web sur mesure. +40% de visibilité, -70% de no-shows.',
  keywords: ['réservation restaurant', 'logiciel restaurant', 'plan de salle', 'alternative réservation', 'zéro commission', 'gestion restaurant'],
  authors: [{ name: 'TableVista' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'TableVista',
    title: 'TableVista — La plateforme restaurant écoresponsable',
    description: 'Zéro commission. Plan de salle 2D/3D. Site web inclus. CRM & fidélisation. La plateforme restaurant qui travaille pour vous.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TableVista — Zéro commission, 100% votre restaurant',
  },
}

export const viewport: Viewport = {
  themeColor: '#166534',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
