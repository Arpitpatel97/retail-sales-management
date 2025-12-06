# Retail Sales Management System

## Overview

A full-stack Retail Sales Management System built for TruEstate SDE Intern Assignment. The system provides comprehensive search, filtering, sorting, and pagination capabilities for managing retail sales transactions. The application demonstrates clean architecture, modular code structure, and professional software engineering practices.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JavaScript (ES6+)** - Programming language

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

## Search Implementation Summary

The search functionality implements full-text, case-insensitive search across Customer Name and Phone Number fields. The implementation:

- Performs case-insensitive matching using JavaScript's `toLowerCase()` method
- Searches both Customer Name and Phone Number fields simultaneously
- Returns results where either field contains the search query
- Works seamlessly with filters, sorting, and pagination
- Handles empty search queries by returning all records

**Location**: `backend/src/services/salesService.js` - `applySearch()` function

## Filter Implementation Summary

Multi-select and range-based filtering is implemented for the following fields:

- **Customer Region**: Multi-select checkbox filter
- **Gender**: Multi-select checkbox filter
- **Age Range**: Numeric range filter (min/max inputs)
- **Product Category**: Multi-select checkbox filter
- **Tags**: Multi-select checkbox filter (handles comma-separated tags)
- **Payment Method**: Multi-select checkbox filter
- **Date Range**: Date range filter (start/end date inputs)

Filters work independently and can be combined. All active filters are applied using AND logic. Filter state is maintained alongside search and sorting. The implementation handles edge cases such as missing optional fields, invalid ranges, and conflicting filter combinations.

**Location**: `backend/src/services/salesService.js` - `applyFilters()` function

## Sorting Implementation Summary

Sorting is implemented for three fields:

- **Date**: Sorts by transaction date (Newest First / Oldest First)
- **Quantity**: Sorts by product quantity (High to Low / Low to High)
- **Customer Name**: Alphabetical sorting (A-Z / Z-A)

Sorting preserves active search and filter states. The default sort is by Date (Newest First). The implementation handles missing or invalid values gracefully by providing fallback values.

**Location**: `backend/src/services/salesService.js` - `applySorting()` function

## Pagination Implementation Summary

Pagination is implemented with the following features:

- **Page Size**: 10 items per page (configurable)
- **Navigation**: Previous/Next buttons and page number buttons
- **State Preservation**: Active search, filter, and sort states are retained across page navigation
- **Metadata**: Returns total items, total pages, current page, and navigation flags
- **Edge Cases**: Handles empty results, single page scenarios, and invalid page numbers

The pagination is server-side, reducing data transfer and improving performance. Page numbers are calculated based on filtered/sorted results.

**Location**: `backend/src/services/salesService.js` - `applyPagination()` function

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies for both backend and frontend**:
   ```bash
   npm run install:all
   ```
   
   Or install separately:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Generate sample data** (if not already present):
   ```bash
   cd backend
   node scripts/generateSampleData.js
   ```
   
   This will create `backend/data/sales_data.csv` with 2000 sample records.

### Running the Application

1. **Start the backend server**:
   ```bash
   npm run dev:backend
   ```
   
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server** (in a new terminal):
   ```bash
   npm run dev:frontend
   ```
   
   The frontend will run on `http://localhost:3000`

3. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

### Production Build

To build the frontend for production:
```bash
npm run build:frontend
```

The built files will be in `frontend/dist/` directory.

### Using Your Own Dataset

To use your own dataset:

1. Place your CSV file at `backend/data/sales_data.csv`
2. Ensure the CSV has the following headers (in any order):
   - Transaction ID, Date, Customer ID, Customer Name, Phone Number
   - Gender, Age, Customer Region, Customer Type
   - Product ID, Product Name, Brand, Product Category, Tags
   - Quantity, Price per Unit, Discount Percentage, Total Amount, Final Amount
   - Payment Method, Order Status, Delivery Type
   - Store ID, Store Location, Salesperson ID, Employee Name

3. Restart the backend server to load the new data

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── index.js
│   ├── data/
│   │   └── sales_data.csv
│   ├── scripts/
│   │   └── generateSampleData.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── architecture.md
├── package.json
└── README.md
```

## API Endpoints

### GET /api/health
Health check endpoint.

### GET /api/sales
Get paginated sales data with search, filters, and sorting.

**Query Parameters**:
- `search` (string, optional): Search query
- `page` (number, default: 1): Page number
- `pageSize` (number, default: 10): Items per page
- `sortBy` (string, default: 'date'): Sort field (date, quantity, customerName)
- `sortOrder` (string, default: 'desc'): Sort direction (asc, desc)
- `customerRegion` (array, optional): Filter by regions
- `gender` (array, optional): Filter by gender
- `ageMin` (number, optional): Minimum age
- `ageMax` (number, optional): Maximum age
- `productCategory` (array, optional): Filter by categories
- `tags` (array, optional): Filter by tags
- `paymentMethod` (array, optional): Filter by payment methods
- `dateStart` (string, optional): Start date (YYYY-MM-DD)
- `dateEnd` (string, optional): End date (YYYY-MM-DD)

### GET /api/sales/filters
Get available filter options extracted from the dataset.

## Notes

- The application uses in-memory data processing for the assignment. In production, a database would be recommended.
- All filtering, sorting, and pagination is performed server-side for consistency and performance.
- The UI is responsive and works on desktop and tablet devices.
- Edge cases such as empty results, missing fields, and invalid inputs are handled gracefully.

