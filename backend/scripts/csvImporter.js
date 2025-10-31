import fs from 'fs';
import csv from 'csv-parser';
import '../src/config/database.js';
import MGNREGAData from '../src/models/MGNREGAData.js';

export const importFromCSV = async (filePath) => {
  const results = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(transformCSVRow(data)))
      .on('end', async () => {
        try {
          await MGNREGAData.insertMany(results);
          console.log(`Imported ${results.length} records from CSV`);
          resolve(results);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};

const transformCSVRow = (row) => {
  // Transform CSV data to match our schema
  return {
    districtId: parseInt(row.district_code) || 0,
    financialYear: row.fin_year || '2024-2025',
    month: row.month || 'Dec',
    year: parseInt(row.year) || 2024,
    monthNumber: getMonthNumber(row.month),
    peopleBenefited: parseInt(row.people_benefited) || 0,
    personDays: parseInt(row.person_days) || 0,
    avgDaysPerPerson: parseFloat(row.avg_days) || 0,
    wageRate: parseFloat(row.wage_rate) || 0,
    totalWorks: parseInt(row.total_works) || 0,
    completedWorks: parseInt(row.completed_works) || 0,
    differentlyAbledWorked: parseInt(row.differently_abled_worked) || 0,
    materialCost: parseFloat(row.material_cost) || 0
  };
};