import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDB } from './config/database.js';
import districtRoutes from './routes/districts.js';
import dataRoutes from './routes/data.js';
import geolocationRoutes from './routes/geolocation.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));     

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  // Import mongoose locally to avoid circular dependency
  import('./config/database.js').then(({ default: mongoose }) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  }).catch(() => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'unknown'
    });
  });
});

// API routes with debug logging
app.use('/api/districts', districtRoutes);
console.log('✅ Districts routes registered');

app.use('/api/data', dataRoutes);
console.log('✅ Data routes registered');

app.use('/api/geolocation', geolocationRoutes);
console.log('✅ Geolocation routes registered');

// Debug all registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route: ${middleware.route.path} - ${Object.keys(middleware.route.methods)}`);
  } else if (middleware.name === 'router') {
    console.log(`Router: ${middleware.regexp}`);
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`  -> ${handler.route.path} - ${Object.keys(handler.route.methods)}`);
      }
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;