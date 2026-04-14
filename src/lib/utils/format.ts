/**
 * Format a number as Indian Rupees.
 * e.g. 18500 → "₹18,500"
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Format a number in compact K notation.
 * e.g. 75200 → "₹75.2K"
 */
export function formatINRK(amount: number): string {
  return `₹${(amount / 1000).toFixed(1)}K`;
}
