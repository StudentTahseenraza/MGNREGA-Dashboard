// Simple in-memory cache (no MongoDB dependency)
const memoryCache = new Map();

export const cacheMiddleware = (ttl = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = generateCacheKey(req);
    
    try {
      // Check memory cache
      const cached = memoryCache.get(key);
      
      if (cached && cached.expiresAt > Date.now()) {
        console.log(`Cache hit for: ${key}`);
        return res.json(cached.data);
      }

      // Clear expired cache
      if (cached && cached.expiresAt <= Date.now()) {
        memoryCache.delete(key);
      }

      const originalJson = res.json;
      res.json = function(data) {
        if (res.statusCode === 200) {
          const expiresAt = Date.now() + (ttl * 1000);
          memoryCache.set(key, {
            data,
            expiresAt
          });
        }
        
        originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

export const clearCache = (key) => {
  memoryCache.delete(key);
};

const generateCacheKey = (req) => {
  return `${req.originalUrl}:${JSON.stringify(req.query)}:${JSON.stringify(req.params)}`;
};