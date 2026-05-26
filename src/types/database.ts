export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type StudioProductType =
  | 'template'
  | 'tool'
  | 'course'
  | 'ebook'
  | 'prompt'
  | 'automation';
export type StudioPurchaseStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type StudioSubscriberStatus = 'active' | 'unsubscribed' | 'bounced';
export type StudioContactStatus = 'new' | 'replied' | 'archived' | 'spam';

export interface Database {
  public: {
    Tables: {
      studio_products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          price_cents: number;
          currency: string;
          product_type: StudioProductType;
          image_url: string | null;
          download_url: string | null;
          stripe_price_id: string | null;
          active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          price_cents: number;
          currency?: string;
          product_type: StudioProductType;
          image_url?: string | null;
          download_url?: string | null;
          stripe_price_id?: string | null;
          active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['studio_products']['Insert']>;
        Relationships: [];
      };
      studio_purchases: {
        Row: {
          id: string;
          product_id: string;
          buyer_email: string;
          buyer_name: string | null;
          amount_cents: number;
          currency: string;
          stripe_session_id: string | null;
          stripe_payment_intent: string | null;
          status: StudioPurchaseStatus;
          metadata: Json;
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          buyer_email: string;
          buyer_name?: string | null;
          amount_cents: number;
          currency?: string;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          status?: StudioPurchaseStatus;
          metadata?: Json;
          created_at?: string;
          paid_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['studio_purchases']['Insert']>;
        Relationships: [
          {
            foreignKeyName: 'studio_purchases_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'studio_products';
            referencedColumns: ['id'];
          },
        ];
      };
      studio_blog_views: {
        Row: {
          slug: string;
          view_count: number;
          last_viewed_at: string;
          created_at: string;
        };
        Insert: {
          slug: string;
          view_count?: number;
          last_viewed_at?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['studio_blog_views']['Insert']>;
        Relationships: [];
      };
      studio_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          source: string | null;
          status: StudioSubscriberStatus;
          subscribed_at: string;
          unsubscribed_at: string | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          source?: string | null;
          status?: StudioSubscriberStatus;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          metadata?: Json;
        };
        Update: Partial<Database['public']['Tables']['studio_subscribers']['Insert']>;
        Relationships: [];
      };
      studio_contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          source: string | null;
          status: StudioContactStatus;
          metadata: Json;
          created_at: string;
          replied_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          source?: string | null;
          status?: StudioContactStatus;
          metadata?: Json;
          created_at?: string;
          replied_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['studio_contacts']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      studio_increment_blog_view: {
        Args: { p_slug: string };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
