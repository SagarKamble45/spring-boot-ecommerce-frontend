import { LOW_STOCK_THRESHOLD, STOCK_STATUS } from "./ProductConstatnts";

export const getStockStatus = (quantity) => {
  const qty = Number(quantity ?? 0);

  if (qty <= 0) return STOCK_STATUS.OUT_OF_STOCK;
  if (qty <= LOW_STOCK_THRESHOLD) return STOCK_STATUS.LOW_STOCK;

  return STOCK_STATUS.IN_STOCK;
};

// Backend may send category as an object, a string, or a flat categoryName.
export const getCategoryName = (product) =>
  product?.category?.categoryName ??
  product?.categoryName ??
  (typeof product?.category === "string" ? product.category : "") ??
  "";

export const formatAmount = (amount) =>
  "₹" +
  Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });