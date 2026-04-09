import { FloorPlanEditor } from '@/components/dashboard/FloorPlanEditor'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function FloorPlanEditorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, table_count')
    .eq('owner_id', user.id)
    .single()

  const { data: tables } = await supabase
    .from('tables')
    .select('*')
    .eq('restaurant_id', restaurant?.id ?? '')
    .order('created_at')

  return (
    <FloorPlanEditor
      restaurantId={restaurant?.id ?? ''}
      restaurantName={restaurant?.name ?? ''}
      initialTables={tables ?? []}
    />
  )
}
