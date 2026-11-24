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
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      beans: {
        Row: {
          created_at: string
          id: string
          name: string
          origin_type: Database["public"]["Enums"]["bean_origin_type"]
          roast_profile: Database["public"]["Enums"]["roast_profile"]
          roaster: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          origin_type: Database["public"]["Enums"]["bean_origin_type"]
          roast_profile: Database["public"]["Enums"]["roast_profile"]
          roaster: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          origin_type?: Database["public"]["Enums"]["bean_origin_type"]
          roast_profile?: Database["public"]["Enums"]["roast_profile"]
          roaster?: string
        }
        Relationships: []
      }
      coffee_log_tags: {
        Row: {
          coffee_log_id: string
          tag_id: string
        }
        Insert: {
          coffee_log_id: string
          tag_id: string
        }
        Update: {
          coffee_log_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coffee_log_tags_coffee_log_id_fkey"
            columns: ["coffee_log_id"]
            isOneToOne: false
            referencedRelation: "coffee_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coffee_log_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      coffee_logs: {
        Row: {
          acidity: number
          aftertaste: number
          aroma: number
          bean_id: string
          body: number
          brew_method: Database["public"]["Enums"]["brew_method"]
          brew_time_seconds: number | null
          brewed_at: string
          created_at: string
          dose_g: number
          fragrance: number
          id: string
          output_g: number
          overall: number
          ratio: number | null
          sweetness: number
        }
        Insert: {
          acidity: number
          aftertaste: number
          aroma: number
          bean_id: string
          body: number
          brew_method: Database["public"]["Enums"]["brew_method"]
          brew_time_seconds?: number | null
          brewed_at?: string
          created_at?: string
          dose_g: number
          fragrance: number
          id?: string
          output_g: number
          overall: number
          ratio?: number | null
          sweetness: number
        }
        Update: {
          acidity?: number
          aftertaste?: number
          aroma?: number
          bean_id?: string
          body?: number
          brew_method?: Database["public"]["Enums"]["brew_method"]
          brew_time_seconds?: number | null
          brewed_at?: string
          created_at?: string
          dose_g?: number
          fragrance?: number
          id?: string
          output_g?: number
          overall?: number
          ratio?: number | null
          sweetness?: number
        }
        Relationships: [
          {
            foreignKeyName: "coffee_logs_bean_id_fkey"
            columns: ["bean_id"]
            isOneToOne: false
            referencedRelation: "beans"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      bean_aggregates: {
        Row: {
          acidity: number | null
          aftertaste: number | null
          aroma: number | null
          bean_id: string | null
          body: number | null
          brew_count: number | null
          fragrance: number | null
          overall: number | null
          sweetness: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coffee_logs_bean_id_fkey"
            columns: ["bean_id"]
            isOneToOne: false
            referencedRelation: "beans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bean_origin_type: "single-origin" | "blend"
      brew_method:
        | "espresso"
        | "pourover"
        | "aeropress"
        | "french-press"
        | "cold-brew"
        | "moka-pot"
      roast_profile: "light" | "medium" | "medium-dark" | "dark"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      bean_origin_type: ["single-origin", "blend"],
      brew_method: [
        "espresso",
        "pourover",
        "aeropress",
        "french-press",
        "cold-brew",
        "moka-pot",
      ],
      roast_profile: ["light", "medium", "medium-dark", "dark"],
    },
  },
} as const
