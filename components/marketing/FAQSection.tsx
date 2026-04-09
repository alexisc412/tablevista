'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Quelle est la différence avec les autres plateformes de réservation ?',
    a: 'La principale différence : TableVista prend 0 € de commission. Les autres plateformes facturent 1 à 2 € par couvert — sur 3 000 couverts/mois, jusqu\'à 6 000 €/an perdus. TableVista inclut en plus un plan 3D, un site web sur mesure et un programme de fidélité que les concurrents facturent en supplément.',
  },
  {
    q: 'Est-ce que la migration depuis une autre plateforme est compliquée ?',
    a: 'Non, elle prend en moyenne 2 heures. Nous fournissons un guide d\'import CSV pour vos clients et réservations existants, et notre équipe vous accompagne par chat. Plusieurs restaurateurs ont migré en soirée entre deux services.',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit de 14 jours ?',
    a: 'Aucune carte bancaire requise. Vous accédez à l\'intégralité du plan Pro pendant 14 jours. À la fin, vous choisissez votre plan ou vous arrêtez — sans frais ni engagement. Vos données sont conservées 30 jours supplémentaires.',
  },
  {
    q: 'Le plan de salle 3D nécessite-t-il une formation spéciale ?',
    a: 'Non. L\'éditeur fonctionne en glisser-déposer depuis votre navigateur. Vous importez un plan ou dessinez depuis zéro, placez vos tables, définissez les zones, et la vue 3D se génère automatiquement. La plupart finalisent en moins de 30 minutes lors de l\'onboarding.',
  },
  {
    q: 'Puis-je utiliser TableVista avec mon logiciel de caisse actuel ?',
    a: 'Oui. TableVista propose une API publique (plans Pro & Premium) compatible avec les principales caisses : Lightspeed, Zelty, L\'Addition, Sumeria… Le plan Premium inclut des intégrations natives et un accompagnement pour la connexion avec votre système.',
  },
  {
    q: 'Comment fonctionnent les paiements et acomptes ?',
    a: 'Les paiements sont gérés via Stripe Connect, la référence mondiale. Vous pouvez demander un pré-paiement total, un acompte (fixe ou pourcentage), ou une simple empreinte bancaire. Les fonds arrivent directement sur votre compte. TableVista ne touche aucune commission.',
  },
  {
    q: 'Que se passe-t-il si je veux résilier ?',
    a: 'Vous résiliez quand vous voulez depuis votre tableau de bord — en 2 clics, sans pénalité. Vous restez actif jusqu\'à la fin de la période payée. Vos données restent exportables en CSV pendant 90 jours après la résiliation.',
  },
  {
    q: 'Mes données clients sont-elles en sécurité ?',
    a: 'Absolument. Toutes les données sont hébergées en France (EU) sur Supabase avec chiffrement au repos et en transit. Nous ne revendons jamais vos données. DPO disponible. Conformité RGPD totale, Privacy by Design.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function FAQItem({ q, a, open, onToggle, index, inView }: {
  q: string; a: string; open: boolean; onToggle: () => void; index: number; inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-nature-200/80 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className={cn(
          'font-semibold text-sm sm:text-base leading-snug transition-colors duration-200',
          open ? 'text-forest-800' : 'text-forest-900 group-hover:text-forest-700',
        )}>
          {q}
        </span>
        <div className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300',
          open ? 'bg-forest-100 rotate-180' : 'bg-nature-100 group-hover:bg-forest-50',
        )}>
          <ChevronDown className={cn('w-4 h-4', open ? 'text-forest-700' : 'text-forest-400')} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-forest-700/75 leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 leaf-bg opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nature-200 to-transparent" />
      <div className="absolute -top-20 right-1/4 w-[300px] h-[300px] blob-1 bg-sage-50/60 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp}>
            <span className="chip inline-flex mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-forest-600" />
              Questions fréquentes
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold text-forest-950 mb-5 leading-tight">
            Tout ce que vous voulez savoir{' '}
            <span className="text-gradient-hero italic">avant de vous lancer</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-forest-700/70 text-lg">
            Des réponses directes. Pas de jargon.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-nature-200/80 shadow-card px-6 sm:px-8"
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              index={i}
              inView={inView}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-forest-600/55 mt-8"
        >
          Une autre question ?{' '}
          <a href="mailto:bonjour@tablevista.fr"
            className="text-forest-700 font-semibold underline underline-offset-2 hover:text-forest-900 transition-colors">
            Écrivez-nous
          </a>{' '}
          — on répond en moins d'une heure.
        </motion.p>
      </div>
    </section>
  )
}
