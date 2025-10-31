import express from 'express';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Complete mock districts data matching the data routes
const mockDistricts = [
  { districtId: 1, name: 'Lucknow', hiName: 'लखनऊ', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 2, name: 'Varanasi', hiName: 'वाराणसी', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 3, name: 'Gorakhpur', hiName: 'गोरखपुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 4, name: 'Kanpur', hiName: 'कानपुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 5, name: 'Agra', hiName: 'आगरा', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 6, name: 'Allahabad', hiName: 'इलाहाबाद', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 7, name: 'Bareilly', hiName: 'बरेली', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 8, name: 'Meerut', hiName: 'मेरठ', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 9, name: 'Saharanpur', hiName: 'सहारनपुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 10, name: 'Aligarh', hiName: 'अलीगढ़', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 11, name: 'Moradabad', hiName: 'मुरादाबाद', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 12, name: 'Ghaziabad', hiName: 'गाजियाबाद', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 13, name: 'Jhansi', hiName: 'झाँसी', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 14, name: 'Sitapur', hiName: 'सीतापुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 15, name: 'Azamgarh', hiName: 'आजमगढ़', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 16, name: 'Mathura', hiName: 'मथुरा', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 17, name: 'Faizabad', hiName: 'फैजाबाद', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 18, name: 'Rampur', hiName: 'रामपुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 19, name: 'Shahjahanpur', hiName: 'शाहजहाँपुर', state: 'Uttar Pradesh', stateCode: 'UP' },
  { districtId: 20, name: 'Etawah', hiName: 'इटावा', state: 'Uttar Pradesh', stateCode: 'UP' }
];

// Get all districts
router.get('/', cacheMiddleware(300), async (req, res, next) => {
  try {
    console.log('Returning all districts data');
    
    res.json({
      success: true,
      data: mockDistricts,
      count: mockDistricts.length,
      source: 'mock'
    });
  } catch (error) {
    console.error('Error in districts route:', error);
    next(error);
  }
});

// Get district by ID - FIXED to handle all IDs
router.get('/:id', cacheMiddleware(300), async (req, res, next) => {
  try {
    const districtId = parseInt(req.params.id);
    console.log(`Fetching district with ID: ${districtId}`);
    
    const district = mockDistricts.find(d => d.districtId === districtId);
    
    if (!district) {
      // Return a generic district if not found
      const genericDistrict = {
        districtId: districtId,
        name: `District ${districtId}`,
        hiName: `जिला ${districtId}`,
        state: 'Uttar Pradesh',
        stateCode: 'UP'
      };
      
      return res.json({
        success: true,
        data: genericDistrict,
        source: 'mock_generic'
      });
    }

    res.json({
      success: true,
      data: district,
      source: 'mock'
    });
  } catch (error) {
    console.error('Error fetching district:', error);
    next(error);
  }
});

// Search districts
router.get('/search/:query', cacheMiddleware(300), async (req, res, next) => {
  try {
    const query = req.params.query.toLowerCase();
    console.log(`Searching districts for: ${query}`);
    
    const districts = mockDistricts.filter(district => 
      district.name.toLowerCase().includes(query) ||
      district.hiName.toLowerCase().includes(query) ||
      district.state.toLowerCase().includes(query)
    ).slice(0, 20);

    res.json({
      success: true,
      data: districts,
      source: 'mock'
    });
  } catch (error) {
    console.error('Error searching districts:', error);
    next(error);
  }
});

export default router;