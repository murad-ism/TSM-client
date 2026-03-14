import { useTrackingDataContext } from "./HubConnection";
import { TrackingDataPositions } from "./TrackingDataPositionsGrid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const TrackingDataHandler = () => {
   
    const {tradingData, setTradingData} = useTrackingDataContext();
    return checkTradingHours() ? (
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
                  {checkTradingDataItem(tradingData, tradingData.SystemId)}
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
                  {(tradingAccItem.CurrentLimit ?? 0).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
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
                  {(tradingAccItem.FreeMargin ?? 0).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
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
                  {(tradingAccItem.UsedMargin ?? 0).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
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
                  {(tradingAccItem.TotalCommission ?? 0).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
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
                  {(tradingAccItem.TotalVarMarginInPercent ?? 0) + " %"}
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
                  {(tradingAccItem.TotalVarMarginInCash ?? 0).toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
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
                  {(tradingAccItem.TotalAccruedMarginInPercent ?? 0) + " %"}
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
                  {(tradingAccItem.TotalAccruedMarginInCash ?? 0).toLocaleString(
                    "ru-RU",
                    { style: "currency", currency: "RUB" }
                  )}
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

  function checkTradingData(tradingData)
  {
      return tradingData &&
             Array.isArray(tradingData.Accounts) &&
             tradingData.Accounts.length;
  }
  
  function checkTradingHours()
  {
    var d = new Date();
    var day = d.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
    var h = d.getHours();
    var m = d.getMinutes();
    var isWeekday = day >= 1 && day <= 5; // Mon-Fri
    var afterStart = (h === 9 && m >= 50) || h > 9;
    var beforeEnd = h < 23 || (h === 23 && m <= 50);
    return isWeekday && afterStart && beforeEnd;
  }
  
  function checkTradingDataItem(tradingData, item, nullValue = "")
  {
    if(checkTradingData(tradingData))
    {
      return item;
    }
    else
    {
      return nullValue;
    }
  }