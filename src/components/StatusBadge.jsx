const STYLES = {
  APPROVED: "bg-emerald-50 text-emerald-800 border-emerald-200",
  ACTIVE: "bg-emerald-50 text-emerald-800 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-800 border-amber-200",
  REJECTED: "bg-rose-50 text-rose-800 border-rose-200",
  SUSPENDED: "bg-rose-50 text-rose-800 border-rose-200",
  INACTIVE: "bg-slate-100 text-slate-700 border-slate-200",
  RESOLVED: "bg-emerald-50 text-emerald-800 border-emerald-200",
  FAILED: "bg-rose-50 text-rose-800 border-rose-200",
};

export default function StatusBadge({ status }) {
  if (!status) return null;
  const normalized = String(status).toUpperCase();
  const style = STYLES[normalized] || "bg-slate-100 text-slate-700 border-slate-200";
  return <span className={`status-badge ${style}`}>{status}</span>;
}
