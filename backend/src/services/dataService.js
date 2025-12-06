import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];

// Load data from CSV file
export const loadData = () => {
  try {
    const dataPath = path.join(__dirname, '../../data/sales_data.csv');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    salesData = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(v => v.trim());
        const record = {};
        headers.forEach((header, index) => {
          record[header] = values[index] || '';
        });
        return record;
      });
    
    console.log(`Loaded ${salesData.length} sales records`);
    return salesData;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

// Initialize data on module load
loadData();

export const getSalesData = () => salesData;

export const reloadData = () => {
  salesData = loadData();
  return salesData;
};

