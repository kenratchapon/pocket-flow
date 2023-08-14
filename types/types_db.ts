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
      transaction: {
        Row: {
          account_id: string | null
          amount: number | null
          created_at: string
          id: number
          memo: string | null
          time: string | null
          update_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          created_at?: string
          id?: number
          memo?: string | null
          time?: string | null
          update_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number | null
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
