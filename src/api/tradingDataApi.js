import { appConfig } from '../Config';
import { ApiPaths } from '../constants/api';

const baseUrl = () => appConfig.TradingDataApiHost;

async function request(path, options = {}) {
  const url = `${baseUrl()}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getTrades(filters) {
  try {
    return await request(ApiPaths.Trades, {
      method: 'POST',
      body: JSON.stringify({
        SystemId: filters.systemId,
        SecurityId: filters.securityId,
        DateFrom: filters.dateFrom,
        DateTo: filters.dateTo,
        PageIndex: filters.pageIndex,
        PageSize: filters.pageSize,
      }),
    });
  } catch (err) {
    console.error('getTrades failed:', err);
    return [];
  }
}

export async function getTradesCount(filters) {
  try {
    return await request(ApiPaths.TradesCount, {
      method: 'POST',
      body: JSON.stringify({
        SystemId: filters.systemId,
        SecurityId: filters.securityId,
        DateFrom: filters.dateFrom,
        DateTo: filters.dateTo,
        PageIndex: filters.pageIndex,
        PageSize: filters.pageSize,
      }),
    });
  } catch (err) {
    console.error('getTradesCount failed:', err);
    return 0;
  }
}

export async function getSecurities() {
  try {
    const data = await request(ApiPaths.Securities, { method: 'GET' });
    return Array.from(
      (data || [])
        .filter((x) => x.exchange === 'MOEX' || x.exchange === 'SPBEX')
        .map(({ id, ticker }) => ({ id, label: ticker }))
    );
  } catch (err) {
    console.error('getSecurities failed:', err);
    return [];
  }
}

export async function getSystemIds() {
  try {
    const data = await request(ApiPaths.SystemIds, { method: 'GET' });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('getSystemIds failed:', err);
    return [];
  }
}

export async function getLogRecords(filters) {
  try {
    return await request(ApiPaths.LogRecords, {
      method: 'POST',
      body: JSON.stringify({
        SystemId: filters.systemId,
        Date: filters.dateValue,
      }),
    });
  } catch (err) {
    console.error('getLogRecords failed:', err);
    return [];
  }
}

export function getSignalRHubUrl() {
  return `${baseUrl()}${ApiPaths.TradingDataMonitoring}`;
}
