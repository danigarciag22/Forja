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
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          interval: string | null
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          interval?: string | null
          plan: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          interval?: string | null
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recent_posts: {
        Row: {
          created_at: string
          external_id: string
          id: number
          kind: string | null
          kicker: string
          permalink: string
          platform: string
          position: number
          published_at: string | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          created_at?: string
          external_id: string
          id?: never
          kind?: string | null
          kicker: string
          permalink: string
          platform: string
          position?: number
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          created_at?: string
          external_id?: string
          id?: never
          kind?: string | null
          kicker?: string
          permalink?: string
          platform?: string
          position?: number
          published_at?: string | null
          thumbnail_url?: string | null
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
export type RecentPostRow = Database["public"]["Tables"]["recent_posts"]["Row"]
export type RecentPostInsert = Database["public"]["Tables"]["recent_posts"]["Insert"]
export type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"]
export type SubscriptionInsert = Database["public"]["Tables"]["subscriptions"]["Insert"]
