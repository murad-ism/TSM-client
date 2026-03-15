import dayjs from 'dayjs';

/**
 * Numeric comparator for DataGrid (e.g. P/L columns).
 * Handles string numbers with comma decimal separator.
 */
export function currencyComparator(v1, v2) {
  const num1 = parseFloat(String(v1).replace(',', '.'));
  const num2 = parseFloat(String(v2).replace(',', '.'));
  return (num1 || 0) - (num2 || 0);
}

/**
 * Date comparator for DataGrid (DD.MM.YYYY format).
 */
export function dateComparator(v1, v2) {
  const d1 = dayjs(v1, 'DD.MM.YYYY');
  const d2 = dayjs(v2, 'DD.MM.YYYY');
  return d1 - d2;
}
