/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// Quantity at or below this (but above 0) is shown as "Low Stock".
export const LOW_STOCK_THRESHOLD = 5;

export const STOCK_STATUS = {
  IN_STOCK: "In Stock",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export const STOCK_STATUS_STYLES = {
  [STOCK_STATUS.IN_STOCK]: "bg-emerald-50 text-emerald-700",
  [STOCK_STATUS.LOW_STOCK]: "bg-amber-50 text-amber-700",
  [STOCK_STATUS.OUT_OF_STOCK]: "bg-rose-50 text-rose-700",
};

// Dropdown order for the status filter.
export const KNOWN_STOCK_STATUSES = Object.values(STOCK_STATUS);

// Value sent to the backend as ?stockStatus=... (label -> API code).
// The backend must use the SAME thresholds as LOW_STOCK_THRESHOLD above.
export const STOCK_STATUS_PARAM = {
  [STOCK_STATUS.IN_STOCK]: "IN_STOCK",
  [STOCK_STATUS.LOW_STOCK]: "LOW_STOCK",
  [STOCK_STATUS.OUT_OF_STOCK]: "OUT_OF_STOCK",
};