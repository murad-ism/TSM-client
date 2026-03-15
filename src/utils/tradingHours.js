/**
 * MOEX trading hours: Mon–Fri, 09:50–23:50 (Moscow).
 */
export function isWithinTradingHours() {
  const d = new Date();
  const day = d.getDay();
  const h = d.getHours();
  const m = d.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const afterStart = (h === 9 && m >= 50) || h > 9;
  const beforeEnd = h < 23 || (h === 23 && m <= 50);
  return isWeekday && afterStart && beforeEnd;
}
