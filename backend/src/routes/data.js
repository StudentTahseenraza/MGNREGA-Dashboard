import express from 'express';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Complete mock districts data for all Uttar Pradesh districts
const mockDistricts = [
  { districtId: 1, name: 'Lucknow', hiName: 'लखनऊ', state: 'Uttar Pradesh' },
  { districtId: 2, name: 'Varanasi', hiName: 'वाराणसी', state: 'Uttar Pradesh' },
  { districtId: 3, name: 'Gorakhpur', hiName: 'गोरखपुर', state: 'Uttar Pradesh' },
  { districtId: 4, name: 'Kanpur', hiName: 'कानपुर', state: 'Uttar Pradesh' },
  { districtId: 5, name: 'Agra', hiName: 'आगरा', state: 'Uttar Pradesh' },
  { districtId: 6, name: 'Allahabad', hiName: 'इलाहाबाद', state: 'Uttar Pradesh' },
  { districtId: 7, name: 'Bareilly', hiName: 'बरेली', state: 'Uttar Pradesh' },
  { districtId: 8, name: 'Meerut', hiName: 'मेरठ', state: 'Uttar Pradesh' },
  { districtId: 9, name: 'Saharanpur', hiName: 'सहारनपुर', state: 'Uttar Pradesh' },
  { districtId: 10, name: 'Aligarh', hiName: 'अलीगढ़', state: 'Uttar Pradesh' },
  { districtId: 11, name: 'Moradabad', hiName: 'मुरादाबाद', state: 'Uttar Pradesh' },
  { districtId: 12, name: 'Ghaziabad', hiName: 'गाजियाबाद', state: 'Uttar Pradesh' },
  { districtId: 13, name: 'Jhansi', hiName: 'झाँसी', state: 'Uttar Pradesh' },
  { districtId: 14, name: 'Sitapur', hiName: 'सीतापुर', state: 'Uttar Pradesh' },
  { districtId: 15, name: 'Azamgarh', hiName: 'आजमगढ़', state: 'Uttar Pradesh' },
  { districtId: 16, name: 'Mathura', hiName: 'मथुरा', state: 'Uttar Pradesh' },
  { districtId: 17, name: 'Faizabad', hiName: 'फैजाबाद', state: 'Uttar Pradesh' },
  { districtId: 18, name: 'Rampur', hiName: 'रामपुर', state: 'Uttar Pradesh' },
  { districtId: 19, name: 'Shahjahanpur', hiName: 'शाहजहाँपुर', state: 'Uttar Pradesh' },
  { districtId: 20, name: 'Etawah', hiName: 'इटावा', state: 'Uttar Pradesh' }
];

// Get district summary - FIXED to handle all district IDs
router.get('/district/:id/summary', cacheMiddleware(600), async (req, res, next) => {
  try {
    const districtId = parseInt(req.params.id);
    console.log(`Fetching summary for district: ${districtId}`);
    
    // Find district info or create a generic one if not found
    let district = mockDistricts.find(d => d.districtId === districtId);
    
    if (!district) {
      // Create a generic district if ID not in our list
      district = {
        districtId: districtId,
        name: `District ${districtId}`,
        hiName: `जिला ${districtId}`,
        state: 'Uttar Pradesh'
      };
      console.log(`District ID ${districtId} not found, using generic data`);
    }

    // Generate realistic mock data based on district ID
    const baseValues = {
      1: { base: 5200, variation: 800, wageBase: 245 },  // Lucknow
      2: { base: 4800, variation: 700, wageBase: 240 },  // Varanasi
      3: { base: 6100, variation: 900, wageBase: 235 },  // Gorakhpur
      4: { base: 4300, variation: 600, wageBase: 250 },  // Kanpur
      5: { base: 3900, variation: 500, wageBase: 255 },  // Agra
      6: { base: 5500, variation: 800, wageBase: 242 },  // Allahabad
      7: { base: 4700, variation: 700, wageBase: 238 },  // Bareilly
      8: { base: 5200, variation: 800, wageBase: 248 },  // Meerut
      9: { base: 4500, variation: 600, wageBase: 236 },  // Saharanpur
      10: { base: 4100, variation: 500, wageBase: 252 }, // Aligarh
      11: { base: 4900, variation: 700, wageBase: 239 }, // Moradabad
      12: { base: 5300, variation: 800, wageBase: 258 }, // Ghaziabad
      13: { base: 3800, variation: 500, wageBase: 232 }, // Jhansi
      14: { base: 4400, variation: 600, wageBase: 234 }, // Sitapur
      15: { base: 4600, variation: 600, wageBase: 237 }, // Azamgarh
    };

    // Use specific base values if available, otherwise generate based on districtId
    const districtBase = baseValues[districtId] || { 
      base: 4500 + (districtId * 100) % 2000, 
      variation: 600 + (districtId * 50) % 400,
      wageBase: 230 + (districtId * 2) % 40
    };
    
    // Generate current month data
    const currentDate = new Date();
    const peopleBenefited = Math.max(1000, Math.floor(
      districtBase.base + (Math.random() - 0.5) * districtBase.variation
    ));
    
    const personDays = Math.floor(peopleBenefited * (1.8 + Math.random() * 0.8));
    const avgDays = parseFloat((1.5 + Math.random() * 1.5).toFixed(2));
    const wageRate = parseFloat((districtBase.wageBase + Math.random() * 20).toFixed(2));

    // Generate realistic sparkline data (last 12 months)
    const sparkline = Array(12).fill(0).map((_, i) => {
      const monthVariation = Math.sin(i * 0.5) * districtBase.variation * 0.3;
      const randomVariation = (Math.random() - 0.5) * districtBase.variation * 0.5;
      return Math.max(800, Math.floor(
        districtBase.base + monthVariation + randomVariation
      ));
    });

    // Calculate trend based on last 2 months of sparkline
    const lastMonthValue = sparkline[sparkline.length - 1];
    const prevMonthValue = sparkline[sparkline.length - 2];
    const trend = lastMonthValue > prevMonthValue ? 'up' : 
                 lastMonthValue < prevMonthValue ? 'down' : 'stable';

    const responseData = {
      districtId: district.districtId,
      name: district.name,
      hiName: district.hiName,
      state: district.state,
      lastMonth: {
        month: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`,
        peopleBenefited: peopleBenefited,
        personDays: personDays,
        avgDays: avgDays,
        wageRate: wageRate,
        trend: trend
      },
      sparkline: sparkline,
      lastUpdated: new Date().toISOString(),
      dataSource: 'mock'
    };

    console.log(`Successfully returned data for district ${districtId}: ${district.name}`);
    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error in district summary:', error);
    next(error);
  }
});

// Get district historical data - FIXED for all districts
router.get('/district/:id/history', cacheMiddleware(600), async (req, res, next) => {
  try {
    const districtId = parseInt(req.params.id);
    const months = parseInt(req.query.months) || 12;

    const baseValues = {
      1: { base: 5200, variation: 800, wageBase: 245 },
      2: { base: 4800, variation: 700, wageBase: 240 },
      3: { base: 6100, variation: 900, wageBase: 235 },
      4: { base: 4300, variation: 600, wageBase: 250 },
      5: { base: 3900, variation: 500, wageBase: 255 },
      6: { base: 5500, variation: 800, wageBase: 242 },
      7: { base: 4700, variation: 700, wageBase: 238 },
      8: { base: 5200, variation: 800, wageBase: 248 },
      9: { base: 4500, variation: 600, wageBase: 236 },
      10: { base: 4100, variation: 500, wageBase: 252 },
      11: { base: 4900, variation: 700, wageBase: 239 },
      12: { base: 5300, variation: 800, wageBase: 258 },
      13: { base: 3800, variation: 500, wageBase: 232 },
      14: { base: 4400, variation: 600, wageBase: 234 },
      15: { base: 4600, variation: 600, wageBase: 237 },
    };

    const districtBase = baseValues[districtId] || { 
      base: 4500 + (districtId * 100) % 2000, 
      variation: 600 + (districtId * 50) % 400,
      wageBase: 230 + (districtId * 2) % 40
    };
    
    const currentDate = new Date();
    const historicalData = [];
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - i);
      
      const monthVariation = Math.sin(i * 0.5) * districtBase.variation * 0.3;
      const randomVariation = (Math.random() - 0.5) * districtBase.variation * 0.5;
      
      const peopleBenefited = Math.max(800, Math.floor(
        districtBase.base + monthVariation + randomVariation
      ));
      
      historicalData.push({
        districtId,
        year: date.getFullYear(),
        month: date.toLocaleString('en', { month: 'short' }),
        monthNumber: date.getMonth() + 1,
        peopleBenefited: peopleBenefited,
        personDays: Math.floor(peopleBenefited * (1.8 + Math.random() * 0.8)),
        avgDaysPerPerson: parseFloat((1.5 + Math.random() * 1.5).toFixed(2)),
        wageRate: parseFloat((districtBase.wageBase + Math.random() * 20).toFixed(2))
      });
    }

    res.json({
      success: true,
      data: historicalData,
      source: 'mock'
    });
  } catch (error) {
    next(error);
  }
});

// Compare districts - FIXED for all districts
router.get('/compare', cacheMiddleware(300), async (req, res, next) => {
  try {
    const districtIds = req.query.districts?.split(',').map(id => parseInt(id));
    
    if (!districtIds || districtIds.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'At least two district IDs are required for comparison'
      });
    }

    const baseValues = {
      1: { base: 5200, variation: 800, wageBase: 245 },
      2: { base: 4800, variation: 700, wageBase: 240 },
      3: { base: 6100, variation: 900, wageBase: 235 },
      4: { base: 4300, variation: 600, wageBase: 250 },
      5: { base: 3900, variation: 500, wageBase: 255 },
      6: { base: 5500, variation: 800, wageBase: 242 },
      7: { base: 4700, variation: 700, wageBase: 238 },
      8: { base: 5200, variation: 800, wageBase: 248 },
      9: { base: 4500, variation: 600, wageBase: 236 },
      10: { base: 4100, variation: 500, wageBase: 252 },
      11: { base: 4900, variation: 700, wageBase: 239 },
      12: { base: 5300, variation: 800, wageBase: 258 },
      13: { base: 3800, variation: 500, wageBase: 232 },
      14: { base: 4400, variation: 600, wageBase: 234 },
      15: { base: 4600, variation: 600, wageBase: 237 },
    };

    const comparisonData = districtIds.map(districtId => {
      const districtBase = baseValues[districtId] || { 
        base: 4500 + (districtId * 100) % 2000, 
        variation: 600 + (districtId * 50) % 400,
        wageBase: 230 + (districtId * 2) % 40
      };
      
      const district = mockDistricts.find(d => d.districtId === districtId) || {
        districtId: districtId,
        name: `District ${districtId}`,
        hiName: `जिला ${districtId}`,
        state: 'Uttar Pradesh'
      };
      
      const peopleBenefited = Math.max(800, Math.floor(
        districtBase.base + (Math.random() - 0.5) * districtBase.variation
      ));
      
      return {
        districtId,
        name: district.name,
        hiName: district.hiName,
        data: {
          peopleBenefited: peopleBenefited,
          personDays: Math.floor(peopleBenefited * (1.8 + Math.random() * 0.8)),
          avgDays: parseFloat((1.5 + Math.random() * 1.5).toFixed(2)),
          wageRate: parseFloat((districtBase.wageBase + Math.random() * 20).toFixed(2))
        }
      };
    });

    res.json({
      success: true,
      data: comparisonData,
      source: 'mock'
    });
  } catch (error) {
    next(error);
  }
});

export default router;