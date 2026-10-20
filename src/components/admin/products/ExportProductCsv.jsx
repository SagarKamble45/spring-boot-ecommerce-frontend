export function ExportProductsCsv(rows) {
  const header = [
    "Product ID",
    "Name",
    "Category",
    "Price (INR)",
    "Special Price (INR)",
    "Discount (%)",
    "Stock",
    "Status",
  ];

  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  const lines = [
    header,
    ...rows.map((r) => [
      r.id,
      r.name,
      r.category,
      Number(r.price || 0).toFixed(2),
      r.specialPrice ? Number(r.specialPrice).toFixed(2) : "",
      r.discount ?? 0,
      r.quantity,
      r.status,
    ]),
  ].map((line) => line.map(esc).join(","));

  const blob = new Blob(["﻿" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `products-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}