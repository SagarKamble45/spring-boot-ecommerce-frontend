import { ArrowRight, Layers3, Plus } from "lucide-react";

function CategoryPromoCard({ onAddCategory }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-5 shadow-sm">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-blue-100/60" />
      <div className="pointer-events-none absolute -bottom-10 -left-5 h-24 w-24 rounded-full bg-violet-100/60" />

      <div className="relative">
        {/* Icon */}
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
          <Layers3 size={22} />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-slate-900">
          Grow Your Store
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Organize your products into meaningful categories and help
          customers discover exactly what they need.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={onAddCategory}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={16} />
          Add Category
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

export default CategoryPromoCard;