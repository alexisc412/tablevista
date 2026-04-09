import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-nature-100 leaf-bg flex flex-col">
      {/* Top bar */}
      <header className="px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-forest-800 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-forest-300" />
          </div>
          <span className="font-display font-bold text-forest-900 text-lg">TableVista</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>

      <footer className="px-6 py-4 text-center">
        <p className="text-xs text-forest-500/60">
          © {new Date().getFullYear()} TableVista ·{' '}
          <Link href="/legal/privacy" className="hover:text-forest-700">Confidentialité</Link>
          {' · '}
          <Link href="/legal/cgu" className="hover:text-forest-700">CGU</Link>
        </p>
      </footer>
    </div>
  )
}
