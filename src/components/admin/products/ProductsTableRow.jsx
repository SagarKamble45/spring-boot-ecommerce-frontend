import { Eye, Pencil, Trash2 } from "lucide-react";

import ProductImage from "./ProductImage";
import { StockBadge } from "./StockBadge";
import { formatAmount } from "./ProductFormat";

export default function ProductsTableRow({
  product,
  isSelected,
  onToggleSelect,
  onOpen,
  onEdit,
  onDelete,
}) {
  const hasSpecialPrice =
    product.specialPrice && Number(product.specialPrice) < Number(product.price);

  // Stops row-click (open drawer) from firing when an action button is used.
  const act = (handler) => (event) => {
    event.stopPropagation();
    handler(product);
  };

  return (
    <tr
      tabIndex={0}
      onClick={() => onOpen(product)}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          onOpen(product);
        }
      }}
      className={`cursor-pointer transition-colors focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300 ${
        isSelected ? "bg-blue-50/50" : "hover:bg-slate-50"
      }`}
    >
      <td className="py-2.5 pl-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
          aria-label={`Select ${product.name}`}
          className="rounded border-slate-300"
        />
      </td>

      <td className="py-2.5 pr-4">
        <div className="flex items-center gap-3">
          <ProductImage src={product.image} alt={product.name} />

          <div className="min-w-0">
            <div className="truncate font-medium text-slate-800">
              {product.name}
            </div>
            <div className="text-xs text-slate-400">ID: {product.id}</div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 text-slate-500">
        {product.category || "—"}
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums">
        <div className="font-medium text-slate-800">
          {formatAmount(hasSpecialPrice ? product.specialPrice : product.price)}
        </div>
        {hasSpecialPrice && (
          <div className="text-xs text-slate-400 line-through">
            {formatAmount(product.price)}
          </div>
        )}
      </td>

      <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums text-slate-700">
        {product.quantity}
      </td>

      <td className="py-2.5 pr-4">
        <StockBadge status={product.status} />
      </td>

      <td className="py-2.5 pr-4">
        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            onClick={act(onOpen)}
            aria-label={`View ${product.name}`}
            className="rounded-md p-1.5 text-blue-600 hover:bg-blue-50"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={act(onEdit)}
            aria-label={`Edit ${product.name}`}
            className="rounded-md p-1.5 text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={act(onDelete)}
            aria-label={`Delete ${product.name}`}
            className="rounded-md p-1.5 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}