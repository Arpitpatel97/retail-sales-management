import { useState, useEffect } from 'react';
import { salesAPI } from '../services/api';

export const useFilterOptions = () => {
  const [options, setOptions] = useState({
    customerRegions: [],
    genders: [],
    productCategories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: 0, max: 100 },
    dateRange: { min: '', max: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await salesAPI.getFilters();
        if (response.data.success) {
          setOptions(response.data.data);
        } else {
          setError('Failed to fetch filter options');
        }
      } catch (err) {
        setError(err.message || 'Error fetching filter options');
        console.error('Error fetching filter options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return { options, loading, error };
};

