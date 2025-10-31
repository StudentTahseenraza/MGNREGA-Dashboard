import axios from 'axios';
import dotenv from 'dotenv';
import '../src/config/database.js';
import MGNREGAData from '../src/models/MGNREGAData.js';
import District from '../src/models/District.js';

dotenv.config();

class ETLWorker {
  constructor() {
    this.apiKey = process.env.DATA_GOV_API_KEY;
    this.baseURL = process.env.DATA_GOV_BASE_URL;
    this.isRunning = false;
  }

  async fetchDataFromGovAPI(offset = 0, limit = 1000) {
    try {
      // This is a mock implementation since the actual API structure may vary
      // You'll need to adjust based on the actual data.gov.in MGNREGA API
      const response = await axios.get(`${this.baseURL}/district-wise-mgnrega-data`, {
        params: {
          'api-key': this.apiKey,
          format: 'json',
          offset,
          limit,
          filters: JSON.stringify({
            state: 'Uttar Pradesh'
          })
        },
        timeout: 30000
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching data from data.gov.in:', error.message);
      throw error;
    }
  }

  async processAndStoreData(rawData) {
    try {
      // Transform and store data
      // This is a simplified transformation - adjust based on actual API response
      const records = rawData.records || [];
      
      for (const record of records) {
        await this.processSingleRecord(record);
      }

      console.log(`Processed ${records.length} records`);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  async processSingleRecord(record) {
    try {
      // Extract and transform data based on the sample structure
      const transformedData = {
        districtId: parseInt(record.district_code) || 0,
        financialYear: record.fin_year || '2024-2025',
        month: record.month || 'Dec',
        year: parseInt(record.year) || 2024,
        monthNumber: this.getMonthNumber(record.month),
        peopleBenefited: parseInt(record.people_benefited) || 0,
        personDays: parseInt(record.person_days) || 0,
        avgDaysPerPerson: parseFloat(record.avg_days) || 0,
        wageRate: parseFloat(record.wage_rate) || 0,
        totalWorks: parseInt(record.total_works) || 0,
        completedWorks: parseInt(record.completed_works) || 0,
        differentlyAbledWorked: parseInt(record.differently_abled_worked) || 0,
        materialCost: parseFloat(record.material_cost) || 0
      };

      // Upsert the record
      await MGNREGAData.findOneAndUpdate(
        {
          districtId: transformedData.districtId,
          financialYear: transformedData.financialYear,
          monthNumber: transformedData.monthNumber
        },
        transformedData,
        { upsert: true, new: true }
      );

    } catch (error) {
      console.error('Error processing single record:', error);
    }
  }

  getMonthNumber(monthName) {
    const months = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
    return months[monthName] || 1;
  }

  async run() {
    if (this.isRunning) {
      console.log('ETL job already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting ETL job...');

    try {
      let offset = 0;
      const limit = 1000;
      let hasMoreData = true;

      while (hasMoreData) {
        const data = await this.fetchDataFromGovAPI(offset, limit);
        
        if (!data.records || data.records.length === 0) {
          hasMoreData = false;
          break;
        }

        await this.processAndStoreData(data);
        offset += limit;

        // Small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log('ETL job completed successfully');
    } catch (error) {
      console.error('ETL job failed:', error);
    } finally {
      this.isRunning = false;
    }
  }
}

// Run ETL job if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const worker = new ETLWorker();
  worker.run().then(() => {
    console.log('ETL process finished');
    process.exit(0);
  }).catch(error => {
    console.error('ETL process failed:', error);
    process.exit(1);
  });
}

export default ETLWorker;