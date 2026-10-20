// Shared input styling for the product form (matches the admin toolbar inputs).
export const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
    hasError
      ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
  }`;

/**
 * Label + error/hint wrapper around any input.
 * Props: label, htmlFor, required, error (string), hint (string), className
 */
export default function ProductFormField({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>

      {children}

      {error ? (
        <p role="alert" className="mt-1 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}