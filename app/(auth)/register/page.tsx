import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { GoogleOAuthButton } from '@/components/auth/GoogleOAuthButton'
import { Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Créer un compte — TableVista',
}

const PERKS = [
  '14 jours gratuits, sans carte bancaire',
  '0 % de commission sur les réservations',
  'Configuration en 10 minutes',
  'Support humain inclus dès le départ',
]

export default function RegisterPage() {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

      {/* Left — perks */}
      <div className="hidden lg:block space-y-6 pt-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest-950 mb-3 leading-tight">
            Zéro commission.<br />
            <span className="text-gradient-green">Pour toujours.</span>
          </h1>
          <p className="text-forest-700/70 text-base">
            Rejoignez 320+ restaurants qui ont repris le contrôle de leurs réservations.
          </p>
        </div>

        <ul className="space-y-3">
          {PERKS.map(perk => (
            <li key={perk} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-forest-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-forest-700" />
              </div>
              <span className="text-forest-800 text-sm">{perk}</span>
            </li>
          ))}
        </ul>

        <div className="card-organic p-5 border-l-4 border-forest-500">
          <p className="text-sm text-forest-800/80 italic leading-relaxed">
            "Le switch a pris 2 heures. On économise 480 € de commissions par mois."
          </p>
          <p className="text-xs text-forest-600/60 mt-2">Sophie L. · Le Jardin des Saveurs, Lyon</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="card-organic p-8 sm:p-10">
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-bold text-forest-950 mb-1">
            Créer votre compte gratuit
          </h2>
          <p className="text-forest-600/70 text-sm">14 jours — aucune carte requise</p>
        </div>

        <GoogleOAuthButton label="S'inscrire avec Google" />

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nature-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-forest-500">ou par email</span>
          </div>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-forest-600/70 mt-5">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-forest-700 hover:text-forest-900 underline underline-offset-2">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
