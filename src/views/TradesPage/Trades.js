import { React, useEffect, useState, useCallback, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";
import { IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";
import { getTrades, getTradesCount, getSecurities, getSystemIds } from "../../api/tradingDataApi";
import { currencyComparator, dateComparator } from "../../utils/comparators";

export const TradesPage = () => {
  const [tradesData, setTradesData] = useState([]);
  const [tradesCount, setTradesCount] = useState(0);
  const [securities, setSecurities] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClearDateFrom, setShowClearDateFrom] = useState(false);
  const [showClearDateTo, setShowClearDateTo] = useState(false);

  const tradesFiltersRef = useRef({
    systemId: null,
    securityId: null,
    dateFrom: null,
    dateTo: null,
  });
  const tradesFilters = tradesFiltersRef.current;
  const pageIndexRef = useRef(0);
  const pageSizeRef = useRef(20);

  const fetchTrades = useCallback(async () => {
    setLoading(true);
    const filters = {
      ...tradesFiltersRef.current,
      pageIndex: pageIndexRef.current,
      pageSize: pageSizeRef.current,
    };
    const [data, count] = await Promise.all([
      getTrades(filters),
      getTradesCount(filters),
    ]);
    setTradesData(Array.isArray(data) ? data : []);
    setTradesCount(typeof count === 'number' ? count : 0);
    setLoading(false);
  }, []);

  const updateDateFrom = useCallback((e) => {
    tradesFiltersRef.current.dateFrom = e;
    fetchTrades();
  }, [fetchTrades]);

  const updateDateTo = useCallback((e) => {
    tradesFiltersRef.current.dateTo = e;
    fetchTrades();
  }, [fetchTrades]);

  const updateSecurity = useCallback((e, v) => {
    tradesFiltersRef.current.securityId = v ? v.id : null;
    fetchTrades();
  }, [fetchTrades]);

  const updateSystem = useCallback((e, v) => {
    tradesFiltersRef.current.systemId = v ?? null;
    fetchTrades();
  }, [fetchTrades]);

  const setPaginationModel = useCallback((pg) => {
    pageIndexRef.current = pg.page;
    pageSizeRef.current = pg.pageSize;
    fetchTrades();
  }, [fetchTrades]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  useEffect(() => {
    getSecurities().then(setSecurities);
  }, []);

  useEffect(() => {
    getSystemIds().then(setSystems);
  }, []);

  const columns = [
    {
      field: "Security",
      valueGetter: (dt) => dt.row.security,
      headerName: "Security",
      flex: 1,
    },
    {
      field: "Date",
      valueGetter: (dt) => dt.row.closingDate,
      headerName: "Date",
      flex: 1,
      sortComparator: dateComparator,
    },
    {
      field: "Quantity",
      valueGetter: (dt) => dt.row.quantity,
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "Operation",
      valueGetter: (dt) => dt.row.operation,
      headerName: "Operation",
      flex: 1,
    },
    {
      field: "PLCur",
      valueGetter: (dt) => dt.row.resultInCash,
      headerName: "P/L (₽)",
      flex: 1,
      type: "number",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        let val = parseFloat(params.value.replace(",", "."));
        return clsx("Trades-PLCur", {
          negative: val < 0,
          positive: val > 0,
        });
      },
      sortComparator: currencyComparator,
    },
    {
      field: "PLPer",
      valueGetter: (dt) => dt.row.resultInPercent,
      headerName: "P/L (%)",
      flex: 1,
      type: "number",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        let val = parseFloat(params.value.replace(",", "."));
        return clsx("Trades-PLPer", {
          negative: val < 0,
          positive: val > 0,
        });
      },
      sortComparator: currencyComparator,
    },
  ];

  function clearDate(e, dateSetter) {
    e.stopPropagation();
    dateSetter(null);
  }

  const setupClearableDatePicker = useCallback(
    (date, dateSetter, clearDateState, clearDateStateSetter) => {
      return (params) => (
        <div
          style={{ position: "relative" }}
          fontSize="small"
          onMouseLeave={() => {
            clearDateStateSetter(false);
          }}
          onMouseEnter={() => {
            if (date) clearDateStateSetter(true);
          }}
        >
          <TextField
            style={{ width: "100%" }}
            {...params}
            inputProps={{
              ...params.inputProps,
              readOnly: true,
              style: { fontSize: "0.9rem" },
              placeholder: "",
            }}
            size="small"
          />
          {clearDateState && (
            <IconButton
              style={{
                position: "absolute",
                right: "2rem",
              }}
              onClick={(e) => clearDate(e, dateSetter)}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      );
    }
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="h-100 pt-2"
    >
      <div className="mt-2">
        <div className="d-inline-block align-middle" style={{ width: 100 }}>
          System
        </div>
        <div className="d-inline-block align-middle">
          <Autocomplete
            style={{ width: 300 }}
            disablePortal
            id="systemCombobox"
            size="small"
            options={systems}
            onChange={updateSystem}
            renderOption={(props, option) => (
              <Typography {...props} style={{ fontSize: "0.9rem" }}>
                {option}
              </Typography>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                  style: { fontSize: "0.9rem" },
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="d-inline-block align-middle" style={{ width: 100 }}>
          Security
        </div>
        <div className="d-inline-block align-middle">
          <Autocomplete
            style={{ width: 300 }}
            disablePortal
            id="securityCombobox"
            size="small"
            options={securities}
            onChange={updateSecurity}
            renderOption={(props, option) => (
              <Typography {...props} style={{ fontSize: "0.9rem" }}>
                {option.label}
              </Typography>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: "0.9rem" },
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="d-inline-block align-middle" style={{ width: 100 }}>
          Date from
        </div>
        <div className="d-inline-block align-middle" style={{ width: 300 }}>
          <DatePicker
            closeOnSelect
            disableFuture
            reduceAnimations
            value={tradesFilters.dateFrom}
            onChange={updateDateFrom}
            renderInput={setupClearableDatePicker(
              tradesFilters.dateFrom,
              updateDateFrom,
              showClearDateFrom,
              setShowClearDateFrom
            )}
          />
        </div>
      </div>

      <div className="mt-1">
        <div className="d-inline-block align-middle" style={{ width: 100 }}>
          Date to
        </div>
        <div className="d-inline-block align-middle" style={{ width: 300 }}>
          <DatePicker
            closeOnSelect
            disableFuture
            reduceAnimations
            value={tradesFilters.dateTo}
            onChange={updateDateTo}
            renderInput={setupClearableDatePicker(
              tradesFilters.dateTo,
              updateDateTo,
              showClearDateTo,
              setShowClearDateTo
            )}
          />
        </div>
      </div>

      <div className="my-3" style={{ height: "100%" }}>
        <DataGrid
          sx={{
            fontFamily: "var(--bs-font-sans-serif)",
            "& .MuiDataGrid-columnHeader": {
              borderRight: 1,
              borderColor: "lightgray",
              bgcolor: blue[50],
            },

            "& .Trades-PLCur.negative": {
              color: "red",
              fontWeight: "500",
            },
            "& .Trades-PLCur.positive": {
              color: "seagreen",
              fontWeight: "500",
            },

            "& .Trades-PLPer.negative": {
              color: "red",
              fontWeight: "500",
            },
            "& .Trades-PLPer.positive": {
              color: "seagreen",
              fontWeight: "500",
            },
          }}
          height="100%"
          rows={checkTradesData(tradesData) ? tradesData : []}
          columns={columns}
          paginationMode="server"
          rowCount={tradesCount}
          getRowId={(row) => row.id}
          loading={loading}
          disableColumnResize
          onPaginationModelChange={setPaginationModel}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSizeRef.current,
                page: pageIndexRef.current,
              },
            },
          }}
        />
      </div>
      <div style={{ minHeight: 1 }} />
    </div>
  );
};

function checkTradesData(tradesData) {
  return tradesData && tradesData.length;
}
