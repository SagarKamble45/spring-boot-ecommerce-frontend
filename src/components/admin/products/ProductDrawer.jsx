import { DetailList } from "../../shared/Detailsdrawer";
import ProductImage from "./ProductImage";
import { StockBadge } from "./StockBadge";
import { formatAmount } from "./ProductFormat";

/**
 * Body of the product details drawer. `product` is a table record
 * (see tableRecords in ProductsTable).
 */
export default function ProductDrawer({ product }) {
  const discount = Number(product.discount ?? 0);

  return (
    <>
      <div className="flex items-center gap-4">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-24 w-24"
          iconClassName="h-10 w-10"
        />

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900">
            {product.name}
          </h3>
          <div className="mt-1.5">
            <StockBadge status={product.status} />
          </div>
        </div>
      </div>

      <DetailList
        items={[
          ["Product ID", `#${product.id}`],
          ["Category", product.category || "—"],
          ["Price", formatAmount(product.price)],
          [
            "Special price",
            product.specialPrice ? formatAmount(product.specialPrice) : "—",
          ],
          ["Discount", discount > 0 ? `${discount}%` : "—"],
          ["Stock", product.quantity],
        ]}
      />

      {product.description && (
        <div>
          <h4 className="text-sm font-medium text-slate-500">Description</h4>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {product.description}
          </p>
        </div>
      )}
    </>
  );
}