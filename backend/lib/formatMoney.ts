const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function formatMoney(cents: number) {
  return formatter.format(cents);
}
