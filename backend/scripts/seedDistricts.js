import '../src/config/database.js';
import District from '../src/models/District.js';

// Uttar Pradesh districts data
const upDistricts = [
  { districtId: 1, name: 'Lucknow', hiName: 'लखनऊ', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [80.9462, 26.8467] } },
  { districtId: 2, name: 'Varanasi', hiName: 'वाराणसी', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [82.9739, 25.3176] } },
  { districtId: 3, name: 'Gorakhpur', hiName: 'गोरखपुर', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [83.3732, 26.7606] } },
  { districtId: 4, name: 'Kanpur', hiName: 'कानपुर', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [80.3319, 26.4499] } },
  { districtId: 5, name: 'Agra', hiName: 'आगरा', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [78.0081, 27.1767] } },
  { districtId: 6, name: 'Allahabad', hiName: 'इलाहाबाद', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [81.8463, 25.4358] } },
  { districtId: 7, name: 'Bareilly', hiName: 'बरेली', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [79.4304, 28.3670] } },
  { districtId: 8, name: 'Meerut', hiName: 'मेरठ', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [77.7064, 28.9845] } },
  { districtId: 9, name: 'Saharanpur', hiName: 'सहारनपुर', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [77.5460, 29.9673] } },
  { districtId: 10, name: 'Aligarh', hiName: 'अलीगढ़', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [78.0635, 27.8974] } },
  { districtId: 11, name: 'Moradabad', hiName: 'मुरादाबाद', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [78.7667, 28.8386] } },
  { districtId: 12, name: 'Ghaziabad', hiName: 'गाजियाबाद', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [77.4190, 28.6692] } },
  { districtId: 13, name: 'Jhansi', hiName: 'झाँसी', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [78.5676, 25.4484] } },
  { districtId: 14, name: 'Sitapur', hiName: 'सीतापुर', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [80.6833, 27.5667] } },
  { districtId: 15, name: 'Azamgarh', hiName: 'आजमगढ़', state: 'Uttar Pradesh', stateCode: 'UP', geometry: { type: 'Point', coordinates: [83.1859, 26.0676] } }
];

const seedDistricts = async () => {
  try {
    console.log('Seeding districts data...');

    // Clear existing data
    await District.deleteMany({});

    // Insert new data
    await District.insertMany(upDistricts);

    console.log('Districts data seeded successfully');
    console.log(`Inserted ${upDistricts.length} districts`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding districts:', error);
    process.exit(1);
  }
};

seedDistricts();