// Generated from the live Supabase project (yczbxzpkhgexrhbtwobn).
// Regenerate: supabase gen types typescript --project-id yczbxzpkhgexrhbtwobn
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          email: string
          id: string
          product_id: string | null
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          email: string
          id?: string
          product_id?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          email?: string
          id?: string
          product_id?: string | null
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          price_cents: number
          slug: string
          stripe_price_id: string | null
          title: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          price_cents: number
          slug: string
          stripe_price_id?: string | null
          title: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          price_cents?: number
          slug?: string
          stripe_price_id?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// --- convenience aliases used across the app ---
export type ProductRow = Database["public"]["Tables"]["products"]["Row"]
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"]
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"]
