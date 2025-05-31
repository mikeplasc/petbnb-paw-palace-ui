export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adoption_requests: {
        Row: {
          created_at: string
          id: string
          pet_id: string | null
          pet_image: string
          pet_name: string
          shelter_name: string
          status: string
          updated_at: string
          user_id: string | null
          user_info: Json
        }
        Insert: {
          created_at?: string
          id?: string
          pet_id?: string | null
          pet_image: string
          pet_name: string
          shelter_name: string
          status?: string
          updated_at?: string
          user_id?: string | null
          user_info: Json
        }
        Update: {
          created_at?: string
          id?: string
          pet_id?: string | null
          pet_image?: string
          pet_name?: string
          shelter_name?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          user_info?: Json
        }
        Relationships: [
          {
            foreignKeyName: "adoption_requests_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          end_date: string
          host_id: string | null
          host_image: string
          host_name: string
          id: string
          location: string
          notes: string | null
          pet_info: Json | null
          pet_type: string
          preferred_time: string | null
          service_type: string | null
          services: Json
          start_date: string
          status: string
          total_price: number
          type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          host_id?: string | null
          host_image: string
          host_name: string
          id?: string
          location: string
          notes?: string | null
          pet_info?: Json | null
          pet_type: string
          preferred_time?: string | null
          service_type?: string | null
          services?: Json
          start_date: string
          status?: string
          total_price: number
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          host_id?: string | null
          host_image?: string
          host_name?: string
          id?: string
          location?: string
          notes?: string | null
          pet_info?: Json | null
          pet_type?: string
          preferred_time?: string | null
          service_type?: string | null
          services?: Json
          start_date?: string
          status?: string
          total_price?: number
          type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
        ]
      }
      hosts: {
        Row: {
          accepted_pets: Json | null
          availability: boolean
          certifications: Json
          city: string
          created_at: string
          description: string
          experience: string | null
          id: string
          images: Json
          location: string
          name: string
          price_per_night: number
          rating: number
          response_time: string
          review_count: number
          services: Json
          specialties: Json | null
          type: string
          updated_at: string
        }
        Insert: {
          accepted_pets?: Json | null
          availability?: boolean
          certifications?: Json
          city: string
          created_at?: string
          description: string
          experience?: string | null
          id?: string
          images?: Json
          location: string
          name: string
          price_per_night: number
          rating?: number
          response_time: string
          review_count?: number
          services?: Json
          specialties?: Json | null
          type: string
          updated_at?: string
        }
        Update: {
          accepted_pets?: Json | null
          availability?: boolean
          certifications?: Json
          city?: string
          created_at?: string
          description?: string
          experience?: string | null
          id?: string
          images?: Json
          location?: string
          name?: string
          price_per_night?: number
          rating?: number
          response_time?: string
          review_count?: number
          services?: Json
          specialties?: Json | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      pets: {
        Row: {
          adoption_fee: number
          age: string
          breed: string
          characteristics: Json
          created_at: string
          date_added: string
          description: string
          gender: string
          id: string
          image: string
          location: string
          name: string
          owner_id: string | null
          pet_category: string
          shelter_contact: string
          shelter_name: string
          size: string
          sterilized: boolean
          type: string
          updated_at: string
          urgent: boolean
          vaccinated: boolean
        }
        Insert: {
          adoption_fee?: number
          age: string
          breed: string
          characteristics?: Json
          created_at?: string
          date_added?: string
          description: string
          gender: string
          id?: string
          image: string
          location: string
          name: string
          owner_id?: string | null
          pet_category?: string
          shelter_contact: string
          shelter_name: string
          size: string
          sterilized?: boolean
          type: string
          updated_at?: string
          urgent?: boolean
          vaccinated?: boolean
        }
        Update: {
          adoption_fee?: number
          age?: string
          breed?: string
          characteristics?: Json
          created_at?: string
          date_added?: string
          description?: string
          gender?: string
          id?: string
          image?: string
          location?: string
          name?: string
          owner_id?: string | null
          pet_category?: string
          shelter_contact?: string
          shelter_name?: string
          size?: string
          sterilized?: boolean
          type?: string
          updated_at?: string
          urgent?: boolean
          vaccinated?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          date: string
          host_id: string | null
          id: string
          pet_name: string
          rating: number
          user_avatar: string | null
          user_name: string
        }
        Insert: {
          comment: string
          created_at?: string
          date?: string
          host_id?: string | null
          id?: string
          pet_name: string
          rating: number
          user_avatar?: string | null
          user_name: string
        }
        Update: {
          comment?: string
          created_at?: string
          date?: string
          host_id?: string | null
          id?: string
          pet_name?: string
          rating?: number
          user_avatar?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
