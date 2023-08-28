export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          created_at: string
          id: string
          name: string | null
          update_at: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          update_at?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          update_at?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      category: {
        Row: {
          account_id: string | null
          activity: string | null
          created_at: string
          icon: string | null
          id: number
          name: string | null
          update_at: string | null
        }
        Insert: {
          account_id?: string | null
          activity?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          name?: string | null
          update_at?: string | null
        }
        Update: {
          account_id?: string | null
          activity?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          name?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "account"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction: {
        Row: {
          account_id: string | null
          amount: number | null
          category_id: number | null
          created_at: string
          id: number
          memo: string | null
          time: string | null
          update_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          category_id?: number | null
          created_at?: string
          id?: number
          memo?: string | null
          time?: string | null
          update_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          category_id?: number | null
          created_at?: string
          id?: number
          memo?: string | null
          time?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T];