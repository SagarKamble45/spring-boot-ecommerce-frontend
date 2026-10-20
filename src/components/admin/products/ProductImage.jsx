import { useState } from "react";
import { Package } from "lucide-react";

export default function ProductImage({
  src,
  alt = "",
  className = "h-10 w-10",
  iconClassName = "h-5 w-5",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 ${className}`}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <Package className={`text-slate-400 ${iconClassName}`} />
      )}
    </div>
  );
}