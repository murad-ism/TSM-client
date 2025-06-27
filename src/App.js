import "./css/App.css";
import "./css/Small.css";
import "./css/Medium.css";
import "./css/Large.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm';
import 'dayjs/locale/ru';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { React } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TradesPage } from "./views/TradesPage/Trades";
import { LogsPage } from "./views/LogsPage/Logs";
import { TrackingDataProvider } from "./views/SummaryPage/HubConnection";
import { TrackingDataHandler } from "./views/SummaryPage/TrackingDataHandler";
import { ruRU } from '@mui/x-date-pickers/locales';

function App() {
  return (
    <BrowserRouter>
      <div class="App-header">
        <nav class="navbar navbar-expand-md navbar-dark">
          <div class="container">
            <a class="navbar-brand text-light pt-0" href="/">
              Trading systems monitor
            </a>
            <button
              class="navbar-toggler ml-auto custom-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mx-3">
                <li class="nav-item active">
                  <Link
                    class="nav-link active text-light"
                    aria-current="page"
                    to="/"
                  >
                    Summary
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-light" to="/Trades">
                    Trades
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-light" to="/Logs">
                    Logs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="App container body-content" style={{ minHeight: "0" }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ru"
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                <TrackingDataProvider>
                  <TrackingDataHandler />
                </TrackingDataProvider>
              }
            />
            <Route path="/Trades" element={<TradesPage />} />
            <Route path="/Logs" element={<LogsPage />} />
          </Routes>
        </LocalizationProvider>
      </div>
    </BrowserRouter>
  );
}

export default App