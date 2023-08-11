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
          createdAt: string
          id: string
          name: string | null
          updateAt: string | null
          userId: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
          updateAt?: string | null
          userId?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
          updateAt?: string | null
          userId?: string | null
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
// etc.
