import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

function SetQuantity({quantity, cardCounter, handleQtyIncrease, handleQtyDecrease,}) {
//   const [quantity, setQuantity] = useState(1);

//   const increaseQty = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

 console.log(quantity);

  return (
    <div className="flex items-center justify-center gap-2">
      {cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <button
        disabled={quantity<=1}
        onClick={handleQtyDecrease}
        className="border rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
      >
        <MdRemove size={18} />
      </button>

      <input
        type="text"
        value={quantity}
        readOnly
        className="w-14 text-center border rounded-lg py-2"
      />

      <button
    //   disabled="true"
        onClick={handleQtyIncrease}
        className="border rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
      >
        <MdAdd size={18} />
      </button>
    </div>
  );
}

export default SetQuantity;