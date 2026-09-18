import React from "react";
import formatPrice from "../../utils/priceFormat";
import SetQuantity from ".././cart/SetQuantity";

function ProductItems({
  name,
  title,
  image,
  images,
  quantity,
  specialPrice,
  price,
}) {


  const productName = title || name;
  const productImage = image || images?.[0];

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Price + Quantity */}
      <div className="flex-1">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-800">
            {formatPrice(specialPrice || price)}
          </span>

          {price !== specialPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(price)}
            </span>
          )}

          <span className="text-sm text-gray-500 mt-2">
            Quantity:
            <span className="font-medium text-slate-700 ml-1">{quantity}</span>
          </span>
        </div>
      </div>

      {/* Item Total */}
      <div className="text-right flex flex-col items-end">
        <span className="text-xs text-gray-500">Total</span>

        <span className="font-bold text-slate-900 text-xl mt-1">
          {formatPrice(Number(specialPrice) * Number(quantity))}
        </span>
      </div>
    </div>
  );
}

export default ProductItems;
