const formatMoney = (amount = 0) => {
  const option = {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  };
  const formatter = Intl.NumberFormat("en-IN", option);
  return formatter.format(amount / 10);
};

export default formatMoney;
