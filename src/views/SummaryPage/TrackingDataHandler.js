import { useTrackingDataContext } from "./HubConnection";
import { TrackingDataPositions } from "./TrackingDataPositionsGrid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { isWithinTradingHours } from "../../utils/tradingHours";
import { hasValidTrackingData, getTradingDataItem } from "../../utils/trackingData";
import { formatCurrency, formatPercent } from "../../utils/formatters";

export const TrackingDataHandler = () => {
    const { tradingData } = useTrackingDataContext();
    return isWithinTradingHours() ? (
      <div className="h-100 d-flex flex-column">
        <div className="mt-4 mb-0">
          <h3>Summary</h3>
        </div>
        {tradingData?.Accounts?.map((tradingAccItem, i) => (
          <div key={tradingAccItem?.AccountId ?? i} className="row mx-0 py-2">
            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  color="text.secondary"
                  className="col"
                  fontFamily="inherit"
                  fontSize="1rem"
                  fontWeight="600"
                >
                  System
                </Typography>
                <Typography
                  className="col text-end"
                  fontFamily="inherit"
                  fontSize="1rem"
                  fontWeight="600"
                >
                  {getTradingDataItem(tradingData, tradingData.SystemId)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Account
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  component="div"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {tradingAccItem.AccountId ?? ""}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Current limit (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  component="div"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.CurrentLimit)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Free margin (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  component="div"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.FreeMargin)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Used margin (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.UsedMargin)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Comission (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.TotalCommission)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Var margin (%)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatPercent(tradingAccItem.TotalVarMarginInPercent)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Var margin (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.TotalVarMarginInCash)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Acc margin (%)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatPercent(tradingAccItem.TotalAccruedMarginInPercent)}
                </Typography>
              </CardContent>
            </Card>

            <Card
              className="col TradingMetric"
              sx={{ height: 40, boxShadow: "none" }}
            >
              <CardContent className="row p-2">
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  color="text.secondary"
                  gutterBottom
                  className="col"
                  fontFamily="inherit"
                >
                  Acc margin (₽)
                </Typography>
                <Typography
                  fontSize="1rem"
                  fontWeight="600"
                  className="col text-end"
                  fontFamily="inherit"
                >
                  {formatCurrency(tradingAccItem.TotalAccruedMarginInCash)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="mt-4">
          <h3>Positions</h3>
        </div>
        <div style={{ width: "100%" }} className="h-100 my-3">
          <TrackingDataPositions />
        </div>
        <div style={{ minHeight: 1 }}/>
      </div>
    ) : (
      <div
        className="w-100 h-100 m-0 d-flex flex-column"
        role="alert"
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "gray",
        }}
      >
        <div>
          <h5>В данный момент биржа MOEX закрыта.</h5>
        </div>
        <div>
          <h5>График работы биржи: пн-пт, 10:00 - 23:50.</h5>
        </div>
      </div>
    );
}