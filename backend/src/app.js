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

// ======================
// CRITICAL FIX: Trust proxy for Render
// ======================
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// ======================
// Security Middleware
// ======================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// ======================
// CORS Configuration (UPDATED for your frontend)
// ======================
const allowedOrigins = [
  'https://mgnrega-dashboard-eta.vercel.app', // Your production frontend
  'http://localhost:3000', // Local development
  'http://127.0.0.1:3000' // Local development alternative
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, server-to-server, or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked for origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    console.log('CORS allowed for origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Request-Id']
}));

// Handle preflight requests
app.options('*', cors());

// ======================
// Rate Limiting (FIXED for proxy)
// ======================
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  trustProxy: true // CRITICAL: Trust Render proxy
});

app.use('/api/', limiter);

// ======================
// Body Parsing Middleware
// ======================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ======================
// Request Logging
// ======================
app.use(requestLogger);

// ======================
// Health Check Endpoint
// ======================
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    service: 'MGNREGA Backend API',
    version: '1.0.0',
    frontendUrl: process.env.FRONTEND_URL || 'Not set'
  });
});

// ======================
// Root Endpoint
// ======================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 MGNREGA Backend API is running!',
    service: 'MGNREGA Dashboard Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      districts: '/api/districts',
      data: '/api/data/district/:id/summary',
      geolocation: '/api/geolocation/detect-district',
      documentation: 'See README for full API documentation'
    }
  });
});

// ======================
// API Routes
// ======================
app.use('/api/districts', districtRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/geolocation', geolocationRoutes);

// ======================
// 404 Handler
// ======================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /health',
      'GET /',
      'GET /api/districts',
      'GET /api/districts/:id',
      'GET /api/districts/search/:query',
      'GET /api/data/district/:id/summary',
      'GET /api/data/district/:id/history',
      'GET /api/data/compare?districts=1,2,3',
      'POST /api/geolocation/detect-district',
      'GET /api/geolocation/detect-by-ip'
    ],
    documentation: 'Check / endpoint for API information'
  });
});

// ======================
// Error Handling Middleware
// ======================
app.use(errorHandler);

// ======================
// Server Configuration
// ======================
const PORT = process.env.PORT || 3001;

export default app;