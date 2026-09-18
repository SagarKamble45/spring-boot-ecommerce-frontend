import React from "react";

import ProductCard from "./ProductItems";
import FinalPrice from "./FinalPrice";

function OrderSummary({ cart }) {

  
  return (
    <div className="space-y-4">
      {/* Item cards — each ProductCard already has its own border/styling */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {cart.map((item, i) => (
          <ProductCard key={i} {...item} />
        ))}
      </div>

      {/* FinalPrice owns the "Order Summary" card + heading + price math */}
      <FinalPrice newCart={cart} />
    </div>
  );
}

export default OrderSummary;