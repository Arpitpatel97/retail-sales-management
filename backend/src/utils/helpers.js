/**
 * Parse currency value from string
 * Handles formats like "₹1,000.50" or "1000.50"
 * @param {string} value - Currency string
 * @returns {number} Parsed numeric value
 */
export const parseCurrency = (value) => {
  if (!value) return 0;
  const str = String(value).replace(/[₹,]/g, '');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
};

/**
 * Parse integer from string
 * @param {string} value - String value
 * @returns {number} Parsed integer
 */
export const parseIntSafe = (value) => {
  if (!value) return 0;
  const num = parseInt(String(value));
  return isNaN(num) ? 0 : num;
};

/**
 * Parse float from string
 * @param {string} value - String value
 * @returns {number} Parsed float
 */
export const parseFloatSafe = (value) => {
  if (!value) return 0;
  const num = parseFloat(String(value));
  return isNaN(num) ? 0 : num;
};

