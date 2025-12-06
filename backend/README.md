# Retail Sales Management System - Backend

Backend API for the Retail Sales Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Ensure the dataset file is placed at `data/sales_data.csv`

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/sales` - Get paginated sales data with search, filters, and sorting
- `GET /api/sales/filters` - Get available filter options

### Query Parameters for `/api/sales`:

- `search` - Search query (searches Customer Name and Phone Number)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)
- `sortBy` - Sort field: `date`, `quantity`, or `customerName` (default: `date`)
- `sortOrder` - Sort order: `asc` or `desc` (default: `desc`)
- `customerRegion` - Filter by customer region (can be array)
- `gender` - Filter by gender (can be array)
- `ageMin` - Minimum age filter
- `ageMax` - Maximum age filter
- `productCategory` - Filter by product category (can be array)
- `tags` - Filter by tags (can be array)
- `paymentMethod` - Filter by payment method (can be array)
- `dateStart` - Start date filter (YYYY-MM-DD)
- `dateEnd` - End date filter (YYYY-MM-DD)

