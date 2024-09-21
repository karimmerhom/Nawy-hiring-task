export const formatPrice = (price: number, currency: string = "EGP") => {
    return new Intl.NumberFormat("en-US").format(price) + ` ${currency}`;
  };