import { appConfig } from "../../Config";
import { React, useEffect, useState, useCallback, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";
import { IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import ClearIcon from "@mui/icons-material/Clear";

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

  const updateDateFrom = useCallback((e) => {
    tradesFilters.dateFrom = e;
    getTrades();
    getTradesCount();
  });

  const updateDateTo = useCallback((e) => {
    tradesFilters.dateTo = e;
    getTrades();
    getTradesCount();
  });

  const updateSecurity = useCallback((e, v) => {
    tradesFilters.securityId = v ? v.id : null;
    getTrades();
    getTradesCount();
  });

  const updateSystem = useCallback((e, v) => {
    tradesFilters.systemId = v ? v : null;
    getTrades();
    getTradesCount();
  });

  const setPaginationModel = useCallback((pg) => {
    pageIndexRef.current = pg.page;
    pageSizeRef.current = pg.pageSize;
    getTrades();
  }, []);

  const getTradesCount = useCallback(async () => {
    try {
      const response = await fetch(
        `${appConfig.TradingDataApiHost}/TradingData/TradesCount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SystemId: tradesFilters.systemId,
            SecurityId: tradesFilters.securityId,
            DateFrom: tradesFilters.dateFrom,
            DateTo: tradesFilters.dateTo,
            PageIndex: pageIndexRef.current,
            PageSize: pageSizeRef.current,
          }),
        }
      );
      const count = await response.json();
      setTradesCount(count);
    } catch {
      setTradesCount(0);
    }
  }, []);

  const getTrades = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${appConfig.TradingDataApiHost}/TradingData/Trades`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            SystemId: tradesFilters.systemId,
            SecurityId: tradesFilters.securityId,
            DateFrom: tradesFilters.dateFrom,
            DateTo: tradesFilters.dateTo,
            PageIndex: pageIndexRef.current,
            PageSize: pageSizeRef.current,
          }),
        }
      );
      const newData = await response.json();
      setTradesData(newData);
    } catch (err) {
      setTradesData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSecurities = useCallback(async () => {
    const response = await fetch(
      `${appConfig.TradingDataApiHost}/TradingData/Securities`,
      {
        method: "GET",
      }
    );
    const secs = await response.json();
    setSecurities(
      Array.from(
        secs
          .filter((x) => x.exchange === "MOEX" || x.exchange === "SPBEX")
          .map(({ id, ticker }) => {
            return { id: id, label: ticker };
          })
      )
    );
  }, []);

  const getSystems = useCallback(async () => {
    const response = await fetch(
      `${appConfig.TradingDataApiHost}/TradingData/Trades/SystemIds`,
      {
        method: "GET",
      }
    );
    const secs = await response.json();
    setSystems(Array.isArray(secs) ? secs : []);
  }, []);

  useEffect(() => {
    getTradesCount();
    getTrades();
  }, []);
  useEffect(() => {
    getSecurities();
  }, []);
  useEffect(() => {
    getSystems();
  }, []);

  const dateComparator = (v1, v2) => {
    let val1 = dayjs(v1, "DD.MM.YYYY");
    let val2 = dayjs(v2, "DD.MM.YYYY");
    return val1 - val2;
  };

  const currencyComparator = (v1, v2) => {
    let val1 = parseFloat(v1.replace(",", "."));
    let val2 = parseFloat(v2.replace(",", "."));
    return val1 - val2;
  };

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
