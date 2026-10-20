export default function ProductSkeletonRows({ rows = 6, cols = 7 }) {
  const widths = ["w-4", "w-40", "w-24", "w-20", "w-10", "w-20", "w-16"];

  return Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: cols }).map((__, columnIndex) => (
        <td key={columnIndex} className="py-4 pr-4 first:pl-4">
          <div
            className={`h-3 animate-pulse rounded bg-slate-100 ${
              widths[columnIndex % widths.length]
            }`}
          />
        </td>
      ))}
    </tr>
  ));
}