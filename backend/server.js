const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Verify required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/holidays', require('./routes/holidayRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  
  // Connect to database first
  connectDB()
    .then(() => {
      console.log('Database connected successfully');
      
      // Start server only after database connection is established
      const server = app.listen(PORT, '127.0.0.1', (err) => {
        if (err) {
          console.error('Error starting server:', err);
          return;
        }
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
        console.log(`Health check: http://127.0.0.1:${PORT}/health`);
        console.log(`API endpoints:`);
        console.log(`- Auth: http://127.0.0.1:${PORT}/api/auth`);
        console.log(`- Holidays: http://127.0.0.1:${PORT}/api/holidays`);
        console.log(`- Trips: http://127.0.0.1:${PORT}/api/trips`);
      });

      // Handle server errors
      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
          const newPort = PORT + 1;
          server.listen(newPort, '127.0.0.1', () => {
            console.log(`Server is running on http://127.0.0.1:${newPort}`);
            console.log(`Health check: http://127.0.0.1:${newPort}/health`);
          });
        } else {
          console.error('Server error:', error);
          process.exit(1);
        }
      });
    })
    .catch(err => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
}

module.exports = app;
