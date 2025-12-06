import React from 'react';
import '../styles/SummaryCards.css';

const SummaryCards = ({ summary }) => {
  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}K`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Units Sold</h3>
        <p className="summary-value">{summary.totalUnitsSold || 0}</p>
      </div>
      <div className="summary-card">
        <h3>Total Amount</h3>
        <p className="summary-value">
          {formatCurrency(summary.totalAmount)}
          <span className="summary-full"> ({formatCurrency(summary.totalAmount)})</span>
        </p>
      </div>
      <div className="summary-card">
        <h3>Total Discount</h3>
        <p className="summary-value">
          {formatCurrency(summary.totalDiscount)}
          <span className="summary-full"> ({formatCurrency(summary.totalDiscount)})</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;

