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
          created_at: string | null
          id: string
          pet_id: string
          pet_image: string | null
          pet_name: string
          shelter_name: string
          status: string | null
          updated_at: string | null
          user_id: string
          user_info: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          pet_id: string
          pet_image?: string | null
          pet_name: string
          shelter_name: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          user_info: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          pet_id?: string
          pet_image?: string | null
          pet_name?: string
          shelter_name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
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
          {
            foreignKeyName: "adoption_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string | null
          end_date: string
          host_id: string
          host_image: string | null
          host_name: string
          id: string
          location: string | null
          notes: string | null
          pet_info: Json | null
          pet_type: string | null
          preferred_time: string | null
          service_type: string | null
          services: Json | null
          start_date: string
          status: string | null
          total_price: number
          type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          host_id: string
          host_image?: string | null
          host_name: string
          id?: string
          location?: string | null
          notes?: string | null
          pet_info?: Json | null
          pet_type?: string | null
          preferred_time?: string | null
          service_type?: string | null
          services?: Json | null
          start_date: string
          status?: string | null
          total_price: number
          type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          host_id?: string
          host_image?: string | null
          host_name?: string
          id?: string
          location?: string | null
          notes?: string | null
          pet_info?: Json | null
          pet_type?: string | null
          preferred_time?: string | null
          service_type?: string | null
          services?: Json | null
          start_date?: string
          status?: string | null
          total_price?: number
          type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      host_applications: {
        Row: {
          accepted_pets: string[]
          address: string
          city: string
          created_at: string
          description: string
          email: string
          experience: string
          id: string
          name: string
          photos: string[] | null
          price_per_night: number
          services: string[]
          status: string | null
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          accepted_pets: string[]
          address: string
          city: string
          created_at?: string
          description: string
          email: string
          experience: string
          id?: string
          name: string
          photos?: string[] | null
          price_per_night: number
          services: string[]
          status?: string | null
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          accepted_pets?: string[]
          address?: string
          city?: string
          created_at?: string
          description?: string
          email?: string
          experience?: string
          id?: string
          name?: string
          photos?: string[] | null
          price_per_night?: number
          services?: string[]
          status?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hosts: {
        Row: {
          accepted_pets: string[] | null
          availability: boolean | null
          certifications: string[] | null
          city: string
          created_at: string | null
          description: string | null
          email: string | null
          experience: string | null
          id: string
          images: string[] | null
          location: string
          name: string
          owner_id: string | null
          phone: string | null
          price_per_night: number
          rating: number | null
          response_time: string | null
          review_count: number | null
          services: string[] | null
          specialties: string[] | null
          type: string
          updated_at: string | null
        }
        Insert: {
          accepted_pets?: string[] | null
          availability?: boolean | null
          certifications?: string[] | null
          city: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          images?: string[] | null
          location: string
          name: string
          owner_id?: string | null
          phone?: string | null
          price_per_night: number
          rating?: number | null
          response_time?: string | null
          review_count?: number | null
          services?: string[] | null
          specialties?: string[] | null
          type: string
          updated_at?: string | null
        }
        Update: {
          accepted_pets?: string[] | null
          availability?: boolean | null
          certifications?: string[] | null
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          images?: string[] | null
          location?: string
          name?: string
          owner_id?: string | null
          phone?: string | null
          price_per_night?: number
          rating?: number | null
          response_time?: string | null
          review_count?: number | null
          services?: string[] | null
          specialties?: string[] | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hosts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lost_pets: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          last_seen_date: string
          last_seen_latitude: number | null
          last_seen_location: string
          last_seen_longitude: number | null
          owner_id: string
          pet_id: string
          reward_amount: number | null
          status: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_seen_date: string
          last_seen_latitude?: number | null
          last_seen_location: string
          last_seen_longitude?: number | null
          owner_id: string
          pet_id: string
          reward_amount?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_seen_date?: string
          last_seen_latitude?: number | null
          last_seen_location?: string
          last_seen_longitude?: number | null
          owner_id?: string
          pet_id?: string
          reward_amount?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lost_pets_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_locations: {
        Row: {
          accuracy: number | null
          battery_level: number | null
          created_at: string
          device_id: string | null
          id: string
          latitude: number
          longitude: number
          pet_id: string
          timestamp: string
        }
        Insert: {
          accuracy?: number | null
          battery_level?: number | null
          created_at?: string
          device_id?: string | null
          id?: string
          latitude: number
          longitude: number
          pet_id: string
          timestamp?: string
        }
        Update: {
          accuracy?: number | null
          battery_level?: number | null
          created_at?: string
          device_id?: string | null
          id?: string
          latitude?: number
          longitude?: number
          pet_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_locations_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          adoption_fee: number | null
          age: string
          breed: string
          characteristics: string[] | null
          created_at: string | null
          description: string | null
          gender: string
          id: string
          image: string | null
          is_lost: boolean | null
          location: string
          name: string
          owner_id: string | null
          pet_category: string
          shelter_contact: string | null
          shelter_name: string | null
          size: string
          sterilized: boolean | null
          type: string
          updated_at: string | null
          urgent: boolean | null
          vaccinated: boolean | null
        }
        Insert: {
          adoption_fee?: number | null
          age: string
          breed: string
          characteristics?: string[] | null
          created_at?: string | null
          description?: string | null
          gender: string
          id?: string
          image?: string | null
          is_lost?: boolean | null
          location: string
          name: string
          owner_id?: string | null
          pet_category?: string
          shelter_contact?: string | null
          shelter_name?: string | null
          size: string
          sterilized?: boolean | null
          type: string
          updated_at?: string | null
          urgent?: boolean | null
          vaccinated?: boolean | null
        }
        Update: {
          adoption_fee?: number | null
          age?: string
          breed?: string
          characteristics?: string[] | null
          created_at?: string | null
          description?: string | null
          gender?: string
          id?: string
          image?: string | null
          is_lost?: boolean | null
          location?: string
          name?: string
          owner_id?: string | null
          pet_category?: string
          shelter_contact?: string | null
          shelter_name?: string | null
          size?: string
          sterilized?: boolean | null
          type?: string
          updated_at?: string | null
          urgent?: boolean | null
          vaccinated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "pets_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          host_id: string
          id: string
          rating: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          host_id: string
          id?: string
          rating: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          host_id?: string
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
