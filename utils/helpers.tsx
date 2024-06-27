type FormatNumberPayload = {
  number: number;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export const formatNumber = ({
  number,
  currency,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
}: FormatNumberPayload) => {
  const formatter = new Intl.NumberFormat("en-EN", {
    style: currency ? "currency" : "decimal",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(number);
};
