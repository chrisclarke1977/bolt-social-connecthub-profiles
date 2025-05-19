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
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string | null
          cover_image_url: string | null
          bio: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          avatar_url?: string | null
          cover_image_url?: string | null
          bio?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          cover_image_url?: string | null
          bio?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      social_links: {
        Row: {
          id: string
          profile_id: string
          platform: string
          url: string
          username: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          platform: string
          url: string
          username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          platform?: string
          url?: string
          username?: string | null
          created_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_image_url: string | null
          created_by: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cover_image_url?: string | null
          created_by: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cover_image_url?: string | null
          created_by?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      collection_members: {
        Row: {
          collection_id: string
          profile_id: string
          added_at: string
        }
        Insert: {
          collection_id: string
          profile_id: string
          added_at?: string
        }
        Update: {
          collection_id?: string
          profile_id?: string
          added_at?: string
        }
      }
    }
  }
}