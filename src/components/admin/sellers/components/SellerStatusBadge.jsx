
const STATUS_STYLES = {
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  INACTIVE: "bg-rose-50 text-rose-700 ring-rose-600/20",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const SellerStatusBadge = ({ status = "INACTIVE" }) => {
  const normalizedStatus = String(status).toUpperCase();

  const styles =
    STATUS_STYLES[normalizedStatus] ||
    "bg-slate-50 text-slate-600 ring-slate-500/20";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {normalizedStatus}
    </span>
  );
};

export default SellerStatusBadge;
