// Comprehensive mock data for Uttar Pradesh districts
export const generateMockMGNREGAData = (districtId, months = 12) => {
  const baseValues = {
    1: { base: 5200, variation: 800 },  // Lucknow
    2: { base: 4800, variation: 700 },  // Varanasi
    3: { base: 6100, variation: 900 },  // Gorakhpur
    4: { base: 4300, variation: 600 },  // Kanpur
    5: { base: 3900, variation: 500 },  // Agra
    6: { base: 5500, variation: 800 },  // Allahabad
    7: { base: 4700, variation: 700 },  // Bareilly
    8: { base: 5200, variation: 800 },  // Meerut
    9: { base: 4500, variation: 600 },  // Saharanpur
    10: { base: 4100, variation: 500 }, // Aligarh
    11: { base: 4900, variation: 700 }, // Moradabad
    12: { base: 5300, variation: 800 }, // Ghaziabad
    13: { base: 3800, variation: 500 }, // Jhansi
    14: { base: 4400, variation: 600 }, // Sitapur
    15: { base: 4600, variation: 600 }  // Azamgarh
  };

  const districtBase = baseValues[districtId] || { base: 5000, variation: 700 };
  
  const data = [];
  const currentDate = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const monthVariation = Math.sin(i * 0.5) * districtBase.variation * 0.3;
    const randomVariation = (Math.random() - 0.5) * districtBase.variation;
    
    const peopleBenefited = Math.max(1000, Math.floor(
      districtBase.base + monthVariation + randomVariation
    ));
    
    const personDays = Math.floor(peopleBenefited * (2 + Math.random()));
    const avgDays = parseFloat((2 + Math.random()).toFixed(2));
    const wageRate = parseFloat((220 + Math.random() * 60).toFixed(2));
    
    data.push({
      districtId,
      financialYear: getFinancialYear(date),
      month: date.toLocaleString('en', { month: 'short' }),
      year: date.getFullYear(),
      monthNumber: date.getMonth() + 1,
      peopleBenefited,
      personDays,
      avgDaysPerPerson: avgDays,
      wageRate,
      totalWorks: Math.floor(peopleBenefited / 100) + Math.floor(Math.random() * 50),
      completedWorks: Math.floor(peopleBenefited / 120) + Math.floor(Math.random() * 30),
      differentlyAbledWorked: Math.floor(peopleBenefited * 0.02) + Math.floor(Math.random() * 20),
      materialCost: parseFloat((peopleBenefited * 50 * Math.random()).toFixed(2)),
      lastUpdated: new Date()
    });
  }
  
  return data;
};

const getFinancialYear = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
};

// Realistic district coordinates for Uttar Pradesh
export const districtCoordinates = {
  1: { lat: 26.8467, lng: 80.9462, name: 'Lucknow', hiName: 'लखनऊ' },
  2: { lat: 25.3176, lng: 82.9739, name: 'Varanasi', hiName: 'वाराणसी' },
  3: { lat: 26.7606, lng: 83.3732, name: 'Gorakhpur', hiName: 'गोरखपुर' },
  4: { lat: 26.4499, lng: 80.3319, name: 'Kanpur', hiName: 'कानपुर' },
  5: { lat: 27.1767, lng: 78.0081, name: 'Agra', hiName: 'आगरा' },
  6: { lat: 25.4358, lng: 81.8463, name: 'Allahabad', hiName: 'इलाहाबाद' },
  7: { lat: 28.3670, lng: 79.4304, name: 'Bareilly', hiName: 'बरेली' },
  8: { lat: 28.9845, lng: 77.7064, name: 'Meerut', hiName: 'मेरठ' },
  9: { lat: 29.9673, lng: 77.5460, name: 'Saharanpur', hiName: 'सहारनपुर' },
  10: { lat: 27.8974, lng: 78.0635, name: 'Aligarh', hiName: 'अलीगढ़' },
  11: { lat: 28.8386, lng: 78.7667, name: 'Moradabad', hiName: 'मुरादाबाद' },
  12: { lat: 28.6692, lng: 77.4190, name: 'Ghaziabad', hiName: 'गाजियाबाद' },
  13: { lat: 25.4484, lng: 78.5676, name: 'Jhansi', hiName: 'झाँसी' },
  14: { lat: 27.5667, lng: 80.6833, name: 'Sitapur', hiName: 'सीतापुर' },
  15: { lat: 26.0676, lng: 83.1859, name: 'Azamgarh', hiName: 'आजमगढ़' }
};