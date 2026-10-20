import ProductImage from "./ProductImage";
import { StockBadge } from "./StockBadge";
import { formatAmount, getStockStatus } from "./ProductFormat";

/**
 * Props:
 *  - products: Array<{ productId, productName, image, price, specialPrice, quantity }>
 *  - onViewAll: () => void
 */
export default function RecentProductsWidget({
  products = [],
  onViewAll = () => {},
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Recent Products
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All →
        </button>
      </div>

      <ul className="mt-3 divide-y divide-slate-100">
        {products.map((product) => {
          const price = product.specialPrice || product.price;

          return (
            <li
              key={product.productId}
              className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <ProductImage src={product.image} alt={product.productName} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700">
                  {product.productName}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {formatAmount(price)}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <StockBadge status={getStockStatus(product.quantity)} />

                <span className="text-[11px] text-slate-400">
                  Stock: {Number(product.quantity ?? 0)}
                </span>
              </div>
            </li>
          );
        })}

        {products.length === 0 && (
          <li className="py-6 text-center text-sm text-slate-400">
            No recent products.
          </li>
        )}
      </ul>
    </div>
  );
}