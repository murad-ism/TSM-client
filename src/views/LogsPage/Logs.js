import { React, useEffect, useState, useCallback, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import { getLogRecords, getSystemIds } from "../../api/tradingDataApi";
import { getLogLevelColor } from "../../utils/logLevelColors";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";

export const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClearDate, setShowClearDate] = useState(false);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const getLocalDate = useCallback((date) => {
    const d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const logsFiltersRef = useRef({
    systemId: null,
    date: currentDate,
    dateValue: getLocalDate(currentDate),
  });
  
  const logsFilters = logsFiltersRef.current;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const data = await getLogRecords({
      systemId: logsFiltersRef.current.systemId,
      dateValue: logsFiltersRef.current.dateValue,
    });
    setLogs(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  const updateDate = useCallback((e) => {
    logsFiltersRef.current.date = e;
    if (e) {
      const date = logsFiltersRef.current.date.toDate?.();
      logsFiltersRef.current.dateValue = getLocalDate(date || logsFiltersRef.current.date);
    } else {
      logsFiltersRef.current.dateValue = null;
    }
    fetchLogs();
  }, [fetchLogs]);

  const updateSystem = useCallback((e, v) => {
    logsFiltersRef.current.systemId = v ?? null;
    fetchLogs();
  }, [fetchLogs]);

  function clearDate(e) {
    e.stopPropagation();
    updateDate(null);
  }

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    getSystemIds().then(setSystems);
  }, []);

  return (
    <div className="h-100" style={{ display: "flex", flexDirection: "column" }}>
      <div className="my-3 mx-2">
        <div className="mt-1">
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
            Date
          </div>
          <div className="d-inline-block align-middle" style={{ width: 300 }}>
            <DatePicker
              closeOnSelect
              disableFuture
              reduceAnimations
              value={logsFilters.date}
              onChange={updateDate}
              renderInput={(params) => (
                <div
                  style={{ position: "relative" }}
                  fontSize="small"
                  onMouseLeave={() => {
                    setShowClearDate(false);
                  }}
                  onMouseEnter={() => {
                    if (logsFilters.date) setShowClearDate(true);
                  }}
                >
                  <TextField
                    style={{ width: "100%" }}
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                      style: { fontSize: "0.9rem" },
                      placeholder: "Введите дату",
                    }}
                    size="small"
                  />
                  {showClearDate && (
                    <IconButton
                      style={{
                        position: "absolute",
                        right: "2rem",
                      }}
                      onClick={(e) => clearDate(e)}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      <div className="my-1 h-100" style={{ overflow: "auto" }}>
        {loading ? (
          <div className="w-100 h-100">
            <CircularProgress
              style={{ position: "relative", left: "50%", top: "50%" }}
            />
          </div>
        ) : checkLogsData(logs) ? (
          <List style={{ padding: "0px 3px" }}>
            {logs.map((item) => {
              const levelId = `list-${item.id}-lvl`;
              const dateId = `list-${item.id}-date`;
              const msgId = `list-${item.id}-msg`;

              return (
                <div className="border rounded my-1 p-2">
                  <ListItemIcon id={levelId}>
                    {
                      <div
                        style={{
                          background: getLogLevelColor(item.level),
                          padding: "0.25rem",
                          border: "1px solid",
                          borderRadius: "0.25rem",
                          textTransform: "uppercase",
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {item.level}
                      </div>
                    }
                  </ListItemIcon>
                  <ListItemText
                    id={dateId}
                    primary={
                      <b>
                        {item.date} | {item.tradingSystem}
                      </b>
                    }
                    disableTypography
                  />
                  <ListItemText
                    id={msgId}
                    primary={item.message}
                    disableTypography
                  />
                </div>
              );
            })}
          </List>
        ) : (
          <div
            className="w-100 h-100 m-0 d-flex"
            role="alert"
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "gray",
            }}
          >
            <h5>Нет записей в логе за выбранный день.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

function checkLogsData(logs) {
  return logs && logs.length;
}
