import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          photo: string | null;
          cnpj: string | null;
          address: string;
          service_categories: string[];
          service_description: string;
          base_price: number;
          rating: number;
          review_count: number;
          verified: boolean;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['professionals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['professionals']['Insert']>;
      };
      clients: {
        Row: {
          id: string;
          name: string;
          email: string;
          cpf: string;
          address: string;
          phone: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['clients']['Insert']>;
      };
      app_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: string;
          description: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['app_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['app_settings']['Insert']>;
      };
      promotions: {
        Row: {
          id: string;
          title: string;
          description: string;
          discount_percentage: number;
          discount_amount: number | null;
          start_date: string;
          end_date: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['promotions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['promotions']['Insert']>;
      };
    };
  };
}
