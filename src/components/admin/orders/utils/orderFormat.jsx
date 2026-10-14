import { KNOWN_STATUSES } from "./orderConstants";

export const normalizeStatus = (status) => {
  const cleaned = (status ?? "")
    .replace(/\s*!+\s*$/, "")
    .replace(/_/g, " ")
    .trim();

  const known = KNOWN_STATUSES.find(
    (item) => item.toLowerCase() === cleaned.toLowerCase()
  );

  return known ?? cleaned;
};

export const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatAmount = (amount) =>
  "₹" +
  Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });