
const STATUS_STYLES = {
  ACTIVE: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
    label: "Active",
  },
  INACTIVE: {
    badge: "bg-rose-50 text-rose-700 ring-rose-600/20",
    dot: "bg-rose-500",
    label: "Inactive",
  },
};

export const normalizeCategoryStatus = (status) => {
  return String(status ?? "ACTIVE").toUpperCase() === "INACTIVE"
    ? "INACTIVE"
    : "ACTIVE";
};

export const getCategoryStatusLabel = (status) => {
  const normalizedStatus = normalizeCategoryStatus(status);
  return STATUS_STYLES[normalizedStatus].label;
};

function CategoryStatusBadge({ status }) {
  const normalizedStatus = normalizeCategoryStatus(status);
  const styles = STATUS_STYLES[normalizedStatus];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles.badge}`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${styles.dot}`}
      />
      {styles.label}
    </span>
  );
}

export default CategoryStatusBadge;
