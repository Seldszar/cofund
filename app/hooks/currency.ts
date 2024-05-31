
export function useCurrencyFormat(currency: string) {
  const numberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency,
  });

  return numberFormat;
}
