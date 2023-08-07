export const formatMoney = (money: number) => {
  return money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
