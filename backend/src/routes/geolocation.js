import express from 'express';

const router = express.Router();

// Mock districts data
const mockDistricts = [
  { districtId: 1, name: 'Lucknow', hiName: 'लखनऊ', state: 'Uttar Pradesh' },
  { districtId: 2, name: 'Varanasi', hiName: 'वाराणसी', state: 'Uttar Pradesh' },
  { districtId: 3, name: 'Gorakhpur', hiName: 'गोरखपुर', state: 'Uttar Pradesh' },
  { districtId: 4, name: 'Kanpur', hiName: 'कानपुर', state: 'Uttar Pradesh' },
  { districtId: 5, name: 'Agra', hiName: 'आगरा', state: 'Uttar Pradesh' }
];

// Detect district by coordinates
router.post('/detect-district', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      });
    }

    // For now, always return Lucknow as default
    const detectedDistrict = mockDistricts[0]; // Lucknow

    res.json({
      success: true,
      data: {
        districtId: detectedDistrict.districtId,
        name: detectedDistrict.name,
        hiName: detectedDistrict.hiName,
        state: detectedDistrict.state,
        confidence: 'high',
        source: 'mock'
      }
    });
  } catch (error) {
    next(error);
  }
});

// Detect district by IP (fallback method)
router.get('/detect-by-ip', async (req, res, next) => {
  try {
    // Always return Lucknow for now
    const district = mockDistricts[0]; // Lucknow

    res.json({
      success: true,
      data: {
        districtId: district.districtId,
        name: district.name,
        hiName: district.hiName,
        state: district.state,
        confidence: 'medium',
        source: 'mock_ip'
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;