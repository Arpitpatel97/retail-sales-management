import React from 'react';
import '../styles/SortingDropdown.css';

const SortingDropdown = ({ sortBy, sortOrder, onChange }) => {
  const handleSortChange = (e) => {
    const value = e.target.value;
    let newSortBy, newSortOrder;

    switch (value) {
      case 'date-desc':
        newSortBy = 'date';
        newSortOrder = 'desc';
        break;
      case 'date-asc':
        newSortBy = 'date';
        newSortOrder = 'asc';
        break;
      case 'quantity-desc':
        newSortBy = 'quantity';
        newSortOrder = 'desc';
        break;
      case 'quantity-asc':
        newSortBy = 'quantity';
        newSortOrder = 'asc';
        break;
      case 'customerName-asc':
        newSortBy = 'customerName';
        newSortOrder = 'asc';
        break;
      case 'customerName-desc':
        newSortBy = 'customerName';
        newSortOrder = 'desc';
        break;
      default:
        newSortBy = 'date';
        newSortOrder = 'desc';
    }

    onChange(newSortBy, newSortOrder);
  };

  const getCurrentValue = () => {
    return `${sortBy}-${sortOrder}`;
  };

  return (
    <div className="sorting-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={getCurrentValue()}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="date-desc">Date (Newest First)</option>
        <option value="date-asc">Date (Oldest First)</option>
        <option value="quantity-desc">Quantity (High to Low)</option>
        <option value="quantity-asc">Quantity (Low to High)</option>
        <option value="customerName-asc">Customer Name (A-Z)</option>
        <option value="customerName-desc">Customer Name (Z-A)</option>
      </select>
    </div>
  );
};

export default SortingDropdown;

