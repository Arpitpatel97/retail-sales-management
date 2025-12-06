import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filterOptions, activeFilters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleMultiSelect = (filterKey, value) => {
    const currentValues = activeFilters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({
      ...activeFilters,
      [filterKey]: newValues
    });
  };

  const handleAgeRange = (type, value) => {
    const currentRange = activeFilters.ageRange || {};
    onFilterChange({
      ...activeFilters,
      ageRange: {
        ...currentRange,
        [type]: value ? parseInt(value) : undefined
      }
    });
  };

  const handleDateRange = (type, value) => {
    const currentRange = activeFilters.dateRange || {};
    onFilterChange({
      ...activeFilters,
      dateRange: {
        ...currentRange,
        [type]: value || undefined
      }
    });
  };

  const clearFilter = (filterKey) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
          {isOpen ? '−' : '+'}
        </button>
      </div>
      
      {isOpen && (
        <div className="filter-panel-content">
          {/* Customer Region */}
          <div className="filter-group">
            <label>Customer Region</label>
            <div className="checkbox-group">
              {filterOptions.customerRegions.map(region => (
                <label key={region} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.customerRegion || []).includes(region)}
                    onChange={() => handleMultiSelect('customerRegion', region)}
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
            {(activeFilters.customerRegion || []).length > 0 && (
              <button className="clear-filter-btn" onClick={() => clearFilter('customerRegion')}>
                Clear
              </button>
            )}
          </div>

          {/* Gender */}
          <div className="filter-group">
            <label>Gender</label>
            <div className="checkbox-group">
              {filterOptions.genders.map(gender => (
                <label key={gender} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.gender || []).includes(gender)}
                    onChange={() => handleMultiSelect('gender', gender)}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
            {(activeFilters.gender || []).length > 0 && (
              <button className="clear-filter-btn" onClick={() => clearFilter('gender')}>
                Clear
              </button>
            )}
          </div>

          {/* Age Range */}
          <div className="filter-group">
            <label>Age Range</label>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
                value={activeFilters.ageRange?.min || ''}
                onChange={(e) => handleAgeRange('min', e.target.value)}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
                value={activeFilters.ageRange?.max || ''}
                onChange={(e) => handleAgeRange('max', e.target.value)}
              />
            </div>
            {activeFilters.ageRange && (
              <button className="clear-filter-btn" onClick={() => clearFilter('ageRange')}>
                Clear
              </button>
            )}
          </div>

          {/* Product Category */}
          <div className="filter-group">
            <label>Product Category</label>
            <div className="checkbox-group">
              {filterOptions.productCategories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.productCategory || []).includes(category)}
                    onChange={() => handleMultiSelect('productCategory', category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
            {(activeFilters.productCategory || []).length > 0 && (
              <button className="clear-filter-btn" onClick={() => clearFilter('productCategory')}>
                Clear
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="filter-group">
            <label>Tags</label>
            <div className="checkbox-group">
              {filterOptions.tags.map(tag => (
                <label key={tag} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.tags || []).includes(tag)}
                    onChange={() => handleMultiSelect('tags', tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
            {(activeFilters.tags || []).length > 0 && (
              <button className="clear-filter-btn" onClick={() => clearFilter('tags')}>
                Clear
              </button>
            )}
          </div>

          {/* Payment Method */}
          <div className="filter-group">
            <label>Payment Method</label>
            <div className="checkbox-group">
              {filterOptions.paymentMethods.map(method => (
                <label key={method} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(activeFilters.paymentMethod || []).includes(method)}
                    onChange={() => handleMultiSelect('paymentMethod', method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
            {(activeFilters.paymentMethod || []).length > 0 && (
              <button className="clear-filter-btn" onClick={() => clearFilter('paymentMethod')}>
                Clear
              </button>
            )}
          </div>

          {/* Date Range */}
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-inputs">
              <input
                type="date"
                min={filterOptions.dateRange.min}
                max={filterOptions.dateRange.max}
                value={activeFilters.dateRange?.start || ''}
                onChange={(e) => handleDateRange('start', e.target.value)}
              />
              <span>to</span>
              <input
                type="date"
                min={filterOptions.dateRange.min}
                max={filterOptions.dateRange.max}
                value={activeFilters.dateRange?.end || ''}
                onChange={(e) => handleDateRange('end', e.target.value)}
              />
            </div>
            {activeFilters.dateRange && (
              <button className="clear-filter-btn" onClick={() => clearFilter('dateRange')}>
                Clear
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button className="clear-all-btn" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

