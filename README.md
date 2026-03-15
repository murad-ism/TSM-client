# Trading Systems Monitor (TSM) — Client

A React SPA for monitoring trading systems: real-time summary over SignalR, trades and logs via REST API.

## Stack

- **React 18** + **React Router 6**
- **MUI 5** (DataGrid, DatePicker, Autocomplete) + **Bootstrap 5** (layout, nav)
- **SignalR** for live summary updates
- **dayjs** for dates (ru locale)

## Getting started

```bash
npm install
cp .env.example .env
# Edit .env and set REACT_APP_TRADING_API_URL to your TSM API base URL (no trailing slash)
npm run debug
```

- **Debug:** `npm run debug` — dev server (default port 3000)
- **Build:** `npm run build`
- **Test:** `npm test`

## Environment

| Variable | Description |
|----------|-------------|
| `REACT_APP_TRADING_API_URL` | TSM API base URL, e.g. `http://localhost:5001/api` |

## Project structure

```
src/
├── api/           # REST client (trades, logs, securities, system IDs)
├── constants/     # Routes and API paths
├── utils/        # Trading hours, formatters, comparators, log level colors
├── views/
│   ├── SummaryPage/   # SignalR summary + positions grid
│   ├── TradesPage/    # Trades table with filters and server-side pagination
│   └── LogsPage/      # Log list with system and date filters
├── App.js
└── Config.js     # Reads REACT_APP_TRADING_API_URL
```

## Features

- **Summary:** Live account metrics and positions via SignalR; content hidden outside MOEX trading hours.
- **Trades:** Filter by system, security, date range; server-side pagination.
- **Logs:** Filter by system and date; level-based badge colors.
