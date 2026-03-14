import { DataGrid } from '@mui/x-data-grid';
import { useTrackingDataContext } from "./HubConnection";
import { blue } from '@mui/material/colors';
import clsx from 'clsx';

export const TrackingDataPositions = () => 
{
    const {tradingData, setTradingData} = useTrackingDataContext();
    const columns = [
      {
        field: "Ticker",
        valueGetter: (dt) => dt.row.Security?.Ticker ?? "",
        headerName: "Security",
        flex: 1,
      },
      {
        field: "Position",
        valueGetter: (dt) => dt.row.Position?.Total ?? "",
        headerName: "Position",
        flex: 1
      },
      {
        field: "Price",
        valueGetter: (dt) => dt.row.Position?.AvgPrice ?? "",
        headerName: "Price",
        flex: 1
      },
      {
        field: "PLCur",
        valueGetter: (dt) => dt.row.VarMarginInCash ?? "",
        headerName: "P/L (₽)",
        flex: 1,
        cellClassName: (params) => {
          if (!params.value) {
            return '';
          }
          let val = parseFloat(params.value);
          return clsx('Trades-PLCur', {
            negative: val < 0,
            positive: val > 0,
          });
        },
        sortComparator: currencyComparator
      },
      {
        field: "PLPer",
        valueGetter: (dt) => dt.row.VarMarginInPercent ?? "",
        headerName: "P/L (%)",
        flex: 1,
        cellClassName: (params) => {
          if (!params.value) {
            return '';
          }
          let val = parseFloat(params.value);
          return clsx('Trades-PLCur', {
            negative: val < 0,
            positive: val > 0,
          });
        },
        sortComparator: currencyComparator
      },
    ];

      return (
        <DataGrid
          rows={
            checkTradingData(tradingData)
              ? tradingData.Accounts[0].Securities
              : []
          }
          columns={columns}
          hideFooter
          autoHeight
          getRowId={(row) => row.Security?.Ticker ?? ""}
          loading={!checkTradingData(tradingData)}
          disableColumnResize
          sx={{
            fontFamily: "var(--bs-font-sans-serif)",
            border: 1,
            borderColor: "var(--bs-border-color)",
            "& .MuiDataGrid-columnHeader": {
              borderColor: "lightgray",
              bgcolor: blue[50],
            },
            "& .Trades-PLCur.negative": {
              color: "red",
              fontWeight: "500"
            },
            "& .Trades-PLCur.positive": {
              color: "seagreen",
              fontWeight: "500"
            },

            "& .Trades-PLPer.negative": {
              color: "red",
              fontWeight: "500"
            },
            "& .Trades-PLPer.positive": {
              color: "seagreen",
              fontWeight: "500"
            }
          }}
        />);
}

function checkTradingData(tradingData)
{
    return tradingData && Array.isArray(tradingData.Accounts) &&
           tradingData.Accounts.length;
}

const currencyComparator = (v1, v2) => 
{
  let val1 = parseFloat(v1);
  let val2 = parseFloat(v2);
  return val1 - val2;
};