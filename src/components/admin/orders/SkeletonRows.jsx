export default function SkeletonRows({ rows = 8, cols = 8 }) {
  const widths = [
    "w-4",
    "w-12",
    "w-32",
    "w-20",
    "w-16",
    "w-20",
    "w-20",
    "w-4",
  ];

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