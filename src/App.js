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
      <div className="App-header">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container">
            <a className="navbar-brand text-light pt-0" href="/">
              Trading systems monitor
            </a>
            <button
              className="navbar-toggler ml-auto custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mx-3">
                <li className="nav-item active">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/"
                  >
                    Summary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/Trades">
                    Trades
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/Logs">
                    Logs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="App container body-content" style={{ minHeight: "0" }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ru"
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Routes>
            <Route
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

export default App;