import { createClient } from '@/lib/supabase/server'
import { UserSquare2, Plus, Mail, Shield, Clock } from 'lucide-react'

const ROLES = [
  { id: 'admin',   label: 'Admin',    desc: 'Accès complet', color: 'bg-forest-100 text-forest-700' },
  { id: 'manager', label: 'Manager',  desc: 'Sans facturation', color: 'bg-blue-100 text-blue-700' },
  { id: 'staff',   label: 'Employé',  desc: 'Réservations uniquement', color: 'bg-nature-100 text-nature-700' },
]

const MOCK_MEMBERS = [
  { name: 'Vous (propriétaire)', email: '', role: 'admin', status: 'active', joined: "Aujourd'hui" },
]

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest-950 flex items-center gap-2">
            <UserSquare2 className="w-6 h-6 text-forest-600" /> Équipe
          </h1>
          <p className="text-forest-600/70 text-sm mt-1">Gérez les accès de votre personnel</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
          <Plus className="w-4 h-4" /> Inviter un membre
        </button>
      </div>

      {/* Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ROLES.map(r => (
          <div key={r.id} className="card-organic p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.color}`}>{r.label}</span>
              <Shield className="w-4 h-4 text-forest-400" />
            </div>
            <p className="text-xs text-forest-600/70">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Members list */}
      <div className="card-organic overflow-hidden">
        <div className="px-5 py-3.5 border-b border-nature-100 flex items-center justify-between">
          <h2 className="font-semibold text-forest-900 text-sm">Membres actifs</h2>
          <span className="text-xs text-forest-500">1 membre</span>
        </div>
        <div className="divide-y divide-nature-100">
          <div className="px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center text-sm font-bold text-forest-700 shrink-0">
              {profile?.full_name?.charAt(0) ?? user?.email?.charAt(0) ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-forest-900 text-sm">{profile?.full_name ?? 'Propriétaire'}</p>
              <p className="text-xs text-forest-500 truncate">{user?.email}</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-forest-100 text-forest-700">Admin</span>
            <div className="flex items-center gap-1 text-xs text-forest-400">
              <Clock className="w-3.5 h-3.5" /> Propriétaire du compte
            </div>
          </div>
        </div>
      </div>

      {/* Invite form */}
      <div className="card-organic p-6 border-dashed border-2 border-nature-200">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6 text-forest-500" />
          </div>
          <div>
            <h3 className="font-display font-bold text-forest-900 mb-1">Inviter des membres</h3>
            <p className="text-forest-600/70 text-sm max-w-sm mx-auto">
              Invitez votre personnel à accéder au tableau de bord selon leur rôle.
              Disponible sur les plans Pro et Premium.
            </p>
          </div>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input type="email" placeholder="email@restaurant.fr"
              className="flex-1 px-3 py-2 rounded-xl border border-nature-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
            <button className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold">
              Inviter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
