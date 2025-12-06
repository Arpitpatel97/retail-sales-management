import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data arrays
const customerRegions = ['North', 'South', 'East', 'West', 'Central'];
const genders = ['Male', 'Female', 'Other'];
const productCategories = ['Clothing', 'Electronics', 'Food', 'Books', 'Home & Living', 'Sports', 'Beauty'];
const brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'];
const tags = ['Premium', 'Sale', 'New', 'Popular', 'Limited Edition', 'Eco-Friendly'];
const paymentMethods = ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking', 'Wallet'];
const orderStatuses = ['Completed', 'Pending', 'Cancelled', 'Refunded'];
const deliveryTypes = ['Standard', 'Express', 'Same Day', 'Pickup'];
const storeLocations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

// Generate random data
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const generateCustomerName = () => {
  const firstNames = ['Raj', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohit', 'Kavya', 'Arjun', 'Meera'];
  const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Yadav', 'Verma', 'Reddy', 'Joshi', 'Agarwal'];
  return `${randomElement(firstNames)} ${randomElement(lastNames)}`;
};

const generatePhoneNumber = () => {
  return `+91 ${randomInt(9000000000, 9999999999)}`;
};

const generateDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateProductName = (category) => {
  const products = {
    'Clothing': ['T-Shirt', 'Jeans', 'Dress', 'Shirt', 'Jacket'],
    'Electronics': ['Smartphone', 'Laptop', 'Headphones', 'Tablet', 'Smartwatch'],
    'Food': ['Snacks', 'Beverages', 'Groceries', 'Frozen Food', 'Dairy'],
    'Books': ['Novel', 'Textbook', 'Comic', 'Biography', 'Cookbook'],
    'Home & Living': ['Furniture', 'Decor', 'Kitchenware', 'Bedding', 'Lighting'],
    'Sports': ['Cricket Bat', 'Football', 'Tennis Racket', 'Gym Equipment', 'Yoga Mat'],
    'Beauty': ['Skincare', 'Makeup', 'Haircare', 'Perfume', 'Cosmetics']
  };
  return `${randomElement(products[category] || products['Clothing'])} ${randomInt(100, 9999)}`;
};

// Generate CSV data
const generateCSV = (numRecords = 1000) => {
  const headers = [
    'Transaction ID',
    'Date',
    'Customer ID',
    'Customer Name',
    'Phone Number',
    'Gender',
    'Age',
    'Customer Region',
    'Customer Type',
    'Product ID',
    'Product Name',
    'Brand',
    'Product Category',
    'Tags',
    'Quantity',
    'Price per Unit',
    'Discount Percentage',
    'Total Amount',
    'Final Amount',
    'Payment Method',
    'Order Status',
    'Delivery Type',
    'Store ID',
    'Store Location',
    'Salesperson ID',
    'Employee Name'
  ];

  const rows = [headers.join(',')];

  for (let i = 1; i <= numRecords; i++) {
    const transactionId = `TXN${String(i).padStart(7, '0')}`;
    const date = generateDate();
    const customerId = `CUST${String(i).padStart(5, '0')}`;
    const customerName = generateCustomerName();
    const phoneNumber = generatePhoneNumber();
    const gender = randomElement(genders);
    const age = randomInt(18, 70);
    const customerRegion = randomElement(customerRegions);
    const customerType = randomElement(['Regular', 'Premium', 'VIP']);
    const productId = `PROD${String(randomInt(1, 500)).padStart(4, '0')}`;
    const productCategory = randomElement(productCategories);
    const productName = generateProductName(productCategory);
    const brand = randomElement(brands);
    const tagsList = [randomElement(tags), randomElement(tags)].join(',');
    const quantity = randomInt(1, 10);
    const pricePerUnit = parseFloat(randomFloat(100, 50000));
    const discountPercentage = randomInt(0, 30);
    const totalAmount = quantity * pricePerUnit;
    const finalAmount = totalAmount * (1 - discountPercentage / 100);
    const paymentMethod = randomElement(paymentMethods);
    const orderStatus = randomElement(orderStatuses);
    const deliveryType = randomElement(deliveryTypes);
    const storeId = `STORE${String(randomInt(1, 20)).padStart(3, '0')}`;
    const storeLocation = randomElement(storeLocations);
    const salespersonId = `EMP${String(randomInt(1, 50)).padStart(4, '0')}`;
    const employeeName = generateCustomerName();

    const row = [
      transactionId,
      date,
      customerId,
      customerName,
      phoneNumber,
      gender,
      age,
      customerRegion,
      customerType,
      productId,
      productName,
      brand,
      productCategory,
      tagsList,
      quantity,
      `₹${pricePerUnit.toFixed(2)}`,
      discountPercentage,
      `₹${totalAmount.toFixed(2)}`,
      `₹${finalAmount.toFixed(2)}`,
      paymentMethod,
      orderStatus,
      deliveryType,
      storeId,
      storeLocation,
      salespersonId,
      employeeName
    ].join(',');

    rows.push(row);
  }

  return rows.join('\n');
};

// Write CSV file
const outputPath = path.join(__dirname, '../data/sales_data.csv');
const csvContent = generateCSV(2000); // Generate 2000 records

fs.writeFileSync(outputPath, csvContent, 'utf-8');
console.log(`Generated ${2000} records in ${outputPath}`);

