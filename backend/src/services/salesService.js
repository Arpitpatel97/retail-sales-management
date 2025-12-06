import { getSalesData } from './dataService.js';
import { parseCurrency, parseIntSafe, parseFloatSafe } from '../utils/helpers.js';

/**
 * Apply search filter to sales data
 * @param {Array} data - Sales data array
 * @param {string} searchQuery - Search term
 * @returns {Array} Filtered data
 */
export const applySearch = (data, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return data;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return data.filter(record => {
    const customerName = (record['Customer Name'] || '').toLowerCase();
    const phoneNumber = (record['Phone Number'] || '').toLowerCase();
    
    return customerName.includes(query) || phoneNumber.includes(query);
  });
};

/**
 * Apply filters to sales data
 * @param {Array} data - Sales data array
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered data
 */
export const applyFilters = (data, filters) => {
  let filtered = [...data];

  // Customer Region filter
  if (filters.customerRegion && filters.customerRegion.length > 0) {
    filtered = filtered.filter(record => 
      filters.customerRegion.includes(record['Customer Region'] || '')
    );
  }

  // Gender filter
  if (filters.gender && filters.gender.length > 0) {
    filtered = filtered.filter(record => 
      filters.gender.includes(record['Gender'] || '')
    );
  }

  // Age Range filter
  if (filters.ageRange && (filters.ageRange.min !== undefined || filters.ageRange.max !== undefined)) {
    filtered = filtered.filter(record => {
      const age = parseIntSafe(record['Age']);
      const min = filters.ageRange.min !== undefined ? filters.ageRange.min : 0;
      const max = filters.ageRange.max !== undefined ? filters.ageRange.max : 999;
      return age >= min && age <= max;
    });
  }

  // Product Category filter
  if (filters.productCategory && filters.productCategory.length > 0) {
    filtered = filtered.filter(record => 
      filters.productCategory.includes(record['Product Category'] || '')
    );
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(record => {
      const recordTags = (record['Tags'] || '').split(',').map(t => t.trim());
      return filters.tags.some(tag => recordTags.includes(tag));
    });
  }

  // Payment Method filter
  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filtered = filtered.filter(record => 
      filters.paymentMethod.includes(record['Payment Method'] || '')
    );
  }

  // Date Range filter
  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) {
    filtered = filtered.filter(record => {
      const recordDate = new Date(record['Date'] || '');
      if (isNaN(recordDate.getTime())) return false;
      
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : new Date(0);
      const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date();
      
      return recordDate >= startDate && recordDate <= endDate;
    });
  }

  return filtered;
};

/**
 * Apply sorting to sales data
 * @param {Array} data - Sales data array
 * @param {string} sortBy - Sort field
 * @param {string} sortOrder - 'asc' or 'desc'
 * @returns {Array} Sorted data
 */
export const applySorting = (data, sortBy, sortOrder = 'asc') => {
  const sorted = [...data];
  
  sorted.sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'date':
        aVal = new Date(a['Date'] || 0);
        bVal = new Date(b['Date'] || 0);
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      
      case 'quantity':
        aVal = parseIntSafe(a['Quantity']);
        bVal = parseIntSafe(b['Quantity']);
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      
      case 'customerName':
        aVal = (a['Customer Name'] || '').toLowerCase();
        bVal = (b['Customer Name'] || '').toLowerCase();
        if (sortOrder === 'desc') {
          return bVal.localeCompare(aVal);
        }
        return aVal.localeCompare(bVal);
      
      default:
        return 0;
    }
  });

  return sorted;
};

/**
 * Apply pagination to sales data
 * @param {Array} data - Sales data array
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Object} Paginated result with data and metadata
 */
export const applyPagination = (data, page = 1, pageSize = 10) => {
  const pageNum = Math.max(1, parseInt(page));
  const size = Math.max(1, parseInt(pageSize));
  
  const startIndex = (pageNum - 1) * size;
  const endIndex = startIndex + size;
  
  const paginatedData = data.slice(startIndex, endIndex);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / size);

  return {
    data: paginatedData,
    pagination: {
      currentPage: pageNum,
      pageSize: size,
      totalItems,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1
    }
  };
};

/**
 * Get all unique values for filter options
 * @returns {Object} Filter options
 */
export const getFilterOptions = () => {
  const data = getSalesData();
  
  const customerRegions = [...new Set(data.map(r => r['Customer Region']).filter(Boolean))].sort();
  const genders = [...new Set(data.map(r => r['Gender']).filter(Boolean))].sort();
  const productCategories = [...new Set(data.map(r => r['Product Category']).filter(Boolean))].sort();
  const tags = [...new Set(data.flatMap(r => (r['Tags'] || '').split(',').map(t => t.trim())).filter(Boolean))].sort();
  const paymentMethods = [...new Set(data.map(r => r['Payment Method']).filter(Boolean))].sort();
  
  // Get age range
  const ages = data.map(r => parseIntSafe(r['Age'])).filter(a => a > 0);
  const minAge = ages.length > 0 ? Math.min(...ages) : 0;
  const maxAge = ages.length > 0 ? Math.max(...ages) : 100;
  
  // Get date range
  const dates = data.map(r => new Date(r['Date'] || '')).filter(d => !isNaN(d.getTime()));
  const minDate = dates.length > 0 ? new Date(Math.min(...dates)).toISOString().split('T')[0] : '';
  const maxDate = dates.length > 0 ? new Date(Math.max(...dates)).toISOString().split('T')[0] : '';

  return {
    customerRegions,
    genders,
    productCategories,
    tags,
    paymentMethods,
    ageRange: { min: minAge, max: maxAge },
    dateRange: { min: minDate, max: maxDate }
  };
};

/**
 * Get summary statistics
 * @param {Array} data - Sales data array
 * @returns {Object} Summary statistics
 */
//import { parseCurrency, parseIntSafe, parseFloatSafe } from '../utils/helpers.js';

export const getSummaryStats = (data) => {
  const totalUnits = data.reduce((sum, record) => sum + parseIntSafe(record['Quantity']), 0);
  const totalAmount = data.reduce((sum, record) => {
    return sum + parseCurrency(record['Total Amount']);
  }, 0);
  const totalDiscount = data.reduce((sum, record) => {
    const discount = parseFloatSafe(record['Discount Percentage']);
    const amount = parseCurrency(record['Total Amount']);
    return sum + (amount * discount / 100);
  }, 0);

  return {
    totalUnitsSold: totalUnits,
    totalAmount: totalAmount,
    totalDiscount: totalDiscount
  };
};

