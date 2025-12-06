import { useState, useEffect, useCallback } from 'react';
import { salesAPI } from '../services/api';

export const useSalesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [summary, setSummary] = useState({
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0
  });
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        sortBy,
        sortOrder,
        ...(searchQuery && { search: searchQuery }),
        ...(filters.customerRegion?.length > 0 && { customerRegion: filters.customerRegion }),
        ...(filters.gender?.length > 0 && { gender: filters.gender }),
        ...(filters.ageRange && {
          ageMin: filters.ageRange.min,
          ageMax: filters.ageRange.max
        }),
        ...(filters.productCategory?.length > 0 && { productCategory: filters.productCategory }),
        ...(filters.tags?.length > 0 && { tags: filters.tags }),
        ...(filters.paymentMethod?.length > 0 && { paymentMethod: filters.paymentMethod }),
        ...(filters.dateRange && {
          dateStart: filters.dateRange.start,
          dateEnd: filters.dateRange.end
        })
      };

      const response = await salesAPI.getSales(params);
      
      if (response.data.success) {
        setData(response.data.data);
        setPagination(response.data.pagination);
        setSummary(response.data.summary);
      } else {
        setError('Failed to fetch sales data');
      }
    } catch (err) {
      setError(err.message || 'Error fetching sales data');
      console.error('Error fetching sales:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize, sortBy, sortOrder, searchQuery, filters]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const updatePage = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const updateSearch = (query) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const updateSorting = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return {
    data,
    loading,
    error,
    pagination,
    summary,
    filters,
    searchQuery,
    sortBy,
    sortOrder,
    updatePage,
    updateFilters,
    updateSearch,
    updateSorting,
    refetch: fetchSales
  };
};

