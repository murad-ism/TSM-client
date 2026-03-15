const RUB_LOCALE = 'ru-RU';

export function formatCurrency(value, currency = 'RUB') {
  return (value ?? 0).toLocaleString(RUB_LOCALE, {
    style: 'currency',
    currency,
  });
}

export function formatPercent(value) {
  return `${value ?? 0} %`;
}
