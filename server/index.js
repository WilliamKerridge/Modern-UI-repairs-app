import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectToDatabase, closeConnection, testDatabaseConnection, saveRMAData, saveServiceOrderData } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/database/connect', async (req, res) => {
  try {
    const result = await connectToDatabase(req.body);
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to database' 
    });
  }
});

app.post('/api/database/test', async (req, res) => {
  try {
    const result = await testDatabaseConnection(req.body);
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to test database connection' 
    });
  }
});

app.post('/api/rma/save', async (req, res) => {
  try {
    await saveRMAData(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save RMA data' 
    });
  }
});

app.post('/api/service-orders/save', async (req, res) => {
  try {
    await saveServiceOrderData(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save service order data' 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Handle client-side routing for all other routes
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(join(__dirname, '../dist/index.html'));
  } else {
    res.redirect('http://localhost:5173');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
});