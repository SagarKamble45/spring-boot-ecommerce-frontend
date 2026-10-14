export function exportCsv(rows) {
  const header = ["Order ID", "Customer", "Email", "Date", "Amount (INR)", "Payment", "Status"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    header,
    ...rows.map((r) => [
      r.id,
      r.UserName,
      r.email,
      formatDate(r.orderDate),
      Number(r.totalAmount || 0).toFixed(2),
      r.PgName,
      r.status,
    ]),
  ].map((line) => line.map(esc).join(","));

  const blob = new Blob(["\uFEFF" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}