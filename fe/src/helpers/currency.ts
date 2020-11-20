const format = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(number);
};

const currencyHelper = { format };
export default currencyHelper;
