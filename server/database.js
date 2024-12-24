import Database from 'better-sqlite3';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let db = null;

export const connectToDatabase = async (config) => {
  try {
    // Close existing connection if any
    if (db) {
      db.close();
    }

    // For SQLite, the config.filePath is the file path
    db = new Database(config.filePath, { 
      verbose: console.log,
      fileMustExist: true 
    });
    
    // Test the connection by running a simple query
    db.prepare('SELECT 1').get();
    
    await createTables();
    return { success: true };
  } catch (error) {
    console.error('Database connection error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to connect to database'
    };
  }
};

const createTables = async () => {
  if (!db) throw new Error('Database not connected');

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact_name TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS rma (
        rma_number TEXT PRIMARY KEY,
        customer_id TEXT,
        customer_name TEXT,
        customer_email TEXT,
        contact_name TEXT,
        contact_email TEXT,
        date_submitted DATE,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS service_orders (
        service_order TEXT PRIMARY KEY,
        sales_order TEXT,
        product_status TEXT,
        order_status TEXT,
        material TEXT,
        material_description TEXT,
        serial TEXT,
        order_created_date DATE,
        customer_required_date DATE,
        estimated_completion_date DATE,
        rma_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rma_number) REFERENCES rma(rma_number)
      )
    `);

    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

export const testDatabaseConnection = async (config) => {
  try {
    const testDb = new Database(config.filePath, { 
      readonly: true,
      fileMustExist: true 
    });
    
    // Test the connection by running a simple query
    testDb.prepare('SELECT 1').get();
    
    testDb.close();
    return { success: true };
  } catch (error) {
    console.error('Database test connection error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to connect to database'
    };
  }
};

export const saveRMAData = async (data) => {
  if (!db) throw new Error('Database not connected');

  const insertRMA = db.prepare(`
    INSERT OR REPLACE INTO rma (
      rma_number, customer_name, customer_email, 
      contact_name, contact_email, date_submitted, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((rmas) => {
    for (const rma of rmas) {
      insertRMA.run(
        rma.rmaNumber,
        rma.customerName,
        rma.customerEmail,
        rma.contactName,
        rma.contactEmail,
        rma.dateSubmitted,
        rma.status
      );
    }
  });

  try {
    transaction(data);
    return { success: true };
  } catch (error) {
    console.error('Error saving RMA data:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save RMA data'
    };
  }
};

export const saveServiceOrderData = async (data) => {
  if (!db) throw new Error('Database not connected');

  const insertServiceOrder = db.prepare(`
    INSERT OR REPLACE INTO service_orders (
      service_order, sales_order, product_status, 
      order_status, material, material_description,
      serial, order_created_date, customer_required_date,
      estimated_completion_date, rma_number
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((orders) => {
    for (const order of orders) {
      insertServiceOrder.run(
        order.serviceOrder,
        order.salesOrder,
        order.productStatus,
        order.orderStatus,
        order.material,
        order.materialDescription,
        order.serial,
        order.orderCreatedDate,
        order.customerRequiredDate,
        order.estimatedCompletionDate,
        order.rmaNumber
      );
    }
  });

  try {
    transaction(data);
    return { success: true };
  } catch (error) {
    console.error('Error saving service order data:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to save service order data'
    };
  }
};

export const closeConnection = async () => {
  if (db) {
    db.close();
    db = null;
  }
};