import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductPromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100/60 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-slate-50 p-5 shadow-sm">
      {/* soft decorative circles */}
      <div className="pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-blue-100/60" />
      <div className="pointer-events-none absolute -top-8 right-12 h-20 w-20 rounded-full bg-indigo-100/60" />

      <div className="relative z-10 max-w-[75%]">
        <h2 className="text-lg font-semibold leading-snug text-slate-900">
          Premium Quality
          <br />
          Home Essentials
        </h2>

        <p className="mt-1.5 text-sm text-slate-500">
          Stylish. Comfortable. Affordable.
        </p>

        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-slate-800"
        >
          Explore Products
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}