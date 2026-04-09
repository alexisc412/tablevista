import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'
import { GoogleOAuthButton } from '@/components/auth/GoogleOAuthButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion — TableVista',
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card-organic p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-forest-950 mb-1">
            Bon retour 👋
          </h1>
          <p className="text-forest-600/70 text-sm">
            Connectez-vous à votre espace TableVista
          </p>
        </div>

        <GoogleOAuthButton />

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nature-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-forest-500">ou par email</span>
          </div>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-forest-600/70 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-semibold text-forest-700 hover:text-forest-900 underline underline-offset-2">
            Essai gratuit 14 jours →
          </Link>
        </p>
      </div>
    </div>
  )
}
