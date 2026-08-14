const TOKEN_DECIMALS = 6;

export function formatTokenAmount(rawAmount: number): string {
  const amount = rawAmount / 10 ** TOKEN_DECIMALS;

  if (amount === 0) return "0";

  if (amount < 1) {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
