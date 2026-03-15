/**
 * Helpers for tracking/summary data shape.
 */
export function hasValidTrackingData(tradingData) {
  return (
    tradingData &&
    Array.isArray(tradingData.Accounts) &&
    tradingData.Accounts.length > 0
  );
}

export function getTradingDataItem(tradingData, item, nullValue = '') {
  return hasValidTrackingData(tradingData) ? item : nullValue;
}
