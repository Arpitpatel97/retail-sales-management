import React, { useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortingDropdown from '../components/SortingDropdown';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import SummaryCards from '../components/SummaryCards';
import { useSalesData } from '../hooks/useSalesData';
import { useFilterOptions } from '../hooks/useFilterOptions';
import '../styles/SalesDashboard.css';

const SalesDashboard = () => {
  const {
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
    updateSorting
  } = useSalesData();

  const { options: filterOptions, loading: filtersLoading } = useFilterOptions();

  const handleSearchChange = (query) => {
    updateSearch(query);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (field, order) => {
    updateSorting(field, order);
  };

  const handlePageChange = (page) => {
    updatePage(page);
  };

  return (
    <div className="sales-dashboard">
      <header className="dashboard-header">
        <h1>Sales Management System</h1>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <FilterPanel
            filterOptions={filterOptions}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-controls">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SortingDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={handleSortChange}
            />
          </div>

          <SummaryCards summary={summary} />

          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}

          <TransactionTable data={data} loading={loading} />

          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
};

export default SalesDashboard;

