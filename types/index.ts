export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          onboarding_done: boolean
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          onboarding_done?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          onboarding_done?: boolean
          created_at?: string
        }
      }
      organisations: {
        Row: {
          id: string
          name: string
          owner_id: string
          plan: 'starter' | 'pro' | 'premium'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          owner_id: string
          plan?: 'starter' | 'pro' | 'premium'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          owner_id?: string
          plan?: 'starter' | 'pro' | 'premium'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          organisation_id: string
          owner_id: string
          name: string
          city: string | null
          category: string | null
          description: string | null
          table_count: number
          booking_url_slug: string | null
          cover_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          owner_id?: string
          name: string
          city?: string | null
          category?: string | null
          description?: string | null
          table_count?: number
          booking_url_slug?: string | null
          cover_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          owner_id?: string
          name?: string
          city?: string | null
          category?: string | null
          description?: string | null
          table_count?: number
          booking_url_slug?: string | null
          cover_image_url?: string | null
          created_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          capacity: number
          zone: string | null
          x: number
          y: number
          shape: 'round' | 'square' | 'rectangle'
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          capacity?: number
          zone?: string | null
          x?: number
          y?: number
          shape?: 'round' | 'square' | 'rectangle'
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          capacity?: number
          zone?: string | null
          x?: number
          y?: number
          shape?: 'round' | 'square' | 'rectangle'
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          email: string | null
          phone: string | null
          visit_count: number
          total_spent: number | null
          vip: boolean
          tags: string[]
          notes: string | null
          allergies: string | null
          last_visit: string | null
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          email?: string | null
          phone?: string | null
          visit_count?: number
          total_spent?: number | null
          vip?: boolean
          tags?: string[]
          notes?: string | null
          allergies?: string | null
          last_visit?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          visit_count?: number
          total_spent?: number | null
          vip?: boolean
          tags?: string[]
          notes?: string | null
          allergies?: string | null
          last_visit?: string | null
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          restaurant_id: string
          customer_id: string | null
          table_id: string | null
          date: string
          time: string
          party_size: number
          status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes: string | null
          deposit_amount: number | null
          deposit_paid: boolean
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          customer_id?: string | null
          table_id?: string | null
          date: string
          time: string
          party_size: number
          status?: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          customer_id?: string | null
          table_id?: string | null
          date?: string
          time?: string
          party_size?: number
          status?: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'
          notes?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience aliases
export type Profile      = Database['public']['Tables']['profiles']['Row']
export type Organisation = Database['public']['Tables']['organisations']['Row']
export type Restaurant   = Database['public']['Tables']['restaurants']['Row']
export type Table        = Database['public']['Tables']['tables']['Row']
export type Customer     = Database['public']['Tables']['customers']['Row']
export type Reservation  = Database['public']['Tables']['reservations']['Row']
