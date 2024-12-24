/*
  # Create repair management tables

  1. New Tables
    - `rmas`
      - `rma_number` (text, primary key) - RMA identifier
      - `customer_name` (text) - Customer company name
      - `customer_email` (text) - Primary customer email
      - `contact_name` (text) - Contact person name
      - `contact_email` (text) - Contact person email
      - `date_submitted` (timestamptz) - When RMA was submitted
      - `status` (text) - Current RMA status
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `service_orders`
      - `service_order` (text, primary key) - Service order identifier
      - `sales_order` (text) - Related sales order number
      - `product_status` (text) - Current product status
      - `order_status` (text) - Order processing status
      - `material` (text) - Material/part number
      - `material_description` (text) - Material description
      - `serial` (text) - Serial number
      - `order_created_date` (timestamptz) - Order creation date
      - `customer_required_date` (timestamptz) - Customer's required completion date
      - `estimated_completion_date` (timestamptz) - Estimated completion date
      - `rma_number` (text) - References rmas table
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read all records
    - Add policies for service users to insert/update records
*/

-- Create RMAs table
CREATE TABLE IF NOT EXISTS rmas (
  rma_number TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  contact_name TEXT,
  contact_email TEXT,
  date_submitted TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Service Orders table
CREATE TABLE IF NOT EXISTS service_orders (
  service_order TEXT PRIMARY KEY,
  sales_order TEXT,
  product_status TEXT NOT NULL,
  order_status TEXT NOT NULL,
  material TEXT,
  material_description TEXT,
  serial TEXT,
  order_created_date TIMESTAMPTZ DEFAULT now(),
  customer_required_date TIMESTAMPTZ,
  estimated_completion_date TIMESTAMPTZ,
  rma_number TEXT REFERENCES rmas(rma_number),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE rmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;

-- Policies for RMAs
CREATE POLICY "Allow all users to read RMAs"
  ON rmas
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service users to insert RMAs"
  ON rmas
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service users to update RMAs"
  ON rmas
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for Service Orders
CREATE POLICY "Allow all users to read Service Orders"
  ON service_orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service users to insert Service Orders"
  ON service_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service users to update Service Orders"
  ON service_orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);