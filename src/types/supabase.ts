export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          company_name: string;
          primary_email: string | null;
          secondary_emails: string[] | null;
          phone_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          primary_email?: string | null;
          secondary_emails?: string[] | null;
          phone_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          primary_email?: string | null;
          secondary_emails?: string[] | null;
          phone_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      rmas: {
        Row: {
          rma_number: string;
          customer_name: string;
          customer_email: string | null;
          contact_name: string | null;
          contact_email: string | null;
          date_submitted: string;
          status: string;
          created_at: string;
          company_id: string | null;
        };
        Insert: {
          rma_number: string;
          customer_name: string;
          customer_email?: string | null;
          contact_name?: string | null;
          contact_email?: string | null;
          date_submitted?: string;
          status: string;
          created_at?: string;
          company_id?: string | null;
        };
        Update: {
          rma_number?: string;
          customer_name?: string;
          customer_email?: string | null;
          contact_name?: string | null;
          contact_email?: string | null;
          date_submitted?: string;
          status?: string;
          created_at?: string;
          company_id?: string | null;
        };
      };
      service_orders: {
        Row: {
          service_order: string;
          sales_order: string | null;
          product_status: string;
          order_status: string;
          material: string | null;
          material_description: string | null;
          serial: string | null;
          order_created_date: string;
          customer_required_date: string | null;
          estimated_completion_date: string | null;
          rma_number: string | null;
          created_at: string;
        };
        Insert: {
          service_order: string;
          sales_order?: string | null;
          product_status: string;
          order_status: string;
          material?: string | null;
          material_description?: string | null;
          serial?: string | null;
          order_created_date?: string;
          customer_required_date?: string | null;
          estimated_completion_date?: string | null;
          rma_number?: string | null;
          created_at?: string;
        };
        Update: {
          service_order?: string;
          sales_order?: string | null;
          product_status?: string;
          order_status?: string;
          material?: string | null;
          material_description?: string | null;
          serial?: string | null;
          order_created_date?: string;
          customer_required_date?: string | null;
          estimated_completion_date?: string | null;
          rma_number?: string | null;
          created_at?: string;
        };
      };
    };
  };
}