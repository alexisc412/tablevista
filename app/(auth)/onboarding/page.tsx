import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingWizard } from '@/components/auth/OnboardingWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bienvenue — TableVista',
}

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_done')
    .eq('id', user.id)
    .single() as { data: { onboarding_done: boolean } | null }

  if (profile?.onboarding_done) redirect('/dashboard')

  return (
    <div className="flex items-center justify-center w-full py-12 px-4">
      <OnboardingWizard userId={user.id} />
    </div>
  )
}
