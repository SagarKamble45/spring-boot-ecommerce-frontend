import React from "react";

function Spinner({
  size = "h-5 w-5",
  color = "border-white",
}) {
  return (
    <div
      className={`
        ${size}
        rounded-full
        border-2
        ${color}
        border-t-transparent
        animate-spin
      `}
    />
  );
}

export default Spinner;
