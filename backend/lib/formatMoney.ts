const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function formatMoney(cents: number) {
  const dollars = cents / 100;
  return formatter.format(dollars);
}
