import {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination,
  getFilterOptions,
  getSummaryStats
} from '../services/salesService.js';
import { getSalesData } from '../services/dataService.js';

/**
 * Get paginated sales data with search, filters, and sorting
 */
export const getSales = (req, res) => {
  try {
    let data = getSalesData();

    // Apply search
    const searchQuery = req.query.search || '';
    data = applySearch(data, searchQuery);

    // Apply filters
    const filters = {};
    if (req.query.customerRegion) {
      filters.customerRegion = Array.isArray(req.query.customerRegion)
        ? req.query.customerRegion
        : [req.query.customerRegion];
    }
    if (req.query.gender) {
      filters.gender = Array.isArray(req.query.gender)
        ? req.query.gender
        : [req.query.gender];
    }
    if (req.query.ageMin || req.query.ageMax) {
      filters.ageRange = {
        min: req.query.ageMin ? parseInt(req.query.ageMin) : undefined,
        max: req.query.ageMax ? parseInt(req.query.ageMax) : undefined
      };
    }
    if (req.query.productCategory) {
      filters.productCategory = Array.isArray(req.query.productCategory)
        ? req.query.productCategory
        : [req.query.productCategory];
    }
    if (req.query.tags) {
      filters.tags = Array.isArray(req.query.tags)
        ? req.query.tags
        : [req.query.tags];
    }
    if (req.query.paymentMethod) {
      filters.paymentMethod = Array.isArray(req.query.paymentMethod)
        ? req.query.paymentMethod
        : [req.query.paymentMethod];
    }
    if (req.query.dateStart || req.query.dateEnd) {
      filters.dateRange = {
        start: req.query.dateStart || undefined,
        end: req.query.dateEnd || undefined
      };
    }

    data = applyFilters(data, filters);

    // Apply sorting
    const sortBy = req.query.sortBy || 'date';
    const sortOrder = req.query.sortOrder || 'desc';
    data = applySorting(data, sortBy, sortOrder);

    // Get summary stats before pagination
    const summary = getSummaryStats(data);

    // Apply pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = applyPagination(data, page, pageSize);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      summary
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
};

/**
 * Get filter options
 */
export const getFilters = (req, res) => {
  try {
    const options = getFilterOptions();
    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

