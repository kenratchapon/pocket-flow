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
          name: string
          update_at: string
          userId: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          update_at?: string
          userId: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          update_at?: string
          userId?: string
        }
        Relationships: []
      }
      category: {
        Row: {
          account_id: string
          activity: string
          created_at: string
          icon: string
          id: number
          name: string
          update_at: string
        }
        Insert: {
          account_id: string
          activity: string
          created_at?: string
          icon: string
          id: number
          name: string
          update_at?: string
        }
        Update: {
          account_id?: string
          activity?: string
          created_at?: string
          icon?: string
          id?: number
          name?: string
          update_at?: string
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
          account_id: string
          amount: number
          category_id: number
          created_at: string
          id: number
          memo: string
          time: string
          update_at: string
        }
        Insert: {
          account_id: string
          amount: number
          category_id: number
          created_at?: string
          id?: number
          memo: string
          time: string
          update_at?: string
        }
        Update: {
          account_id?: string
          amount?: number
          category_id?: number
          created_at?: string
          id?: number
          memo?: string
          time?: string
          update_at?: string
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']