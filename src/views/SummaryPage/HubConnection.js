import { useState, createContext, useContext, useRef, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { appConfig } from "../../Config";

const TrackingDataContext = createContext([]);

export const TrackingDataProvider = ({ children }) => {
  const [tradingData, setTradingData] = useState();
  const tradingDataRef = useRef(tradingData);
  const hubConnection = useRef(null);

  useEffect(() => {
    return () => {
      if (!tradingDataRef.current) {
        hubConnection.current = null;
      }
    };
  }, []);

  if (!hubConnection.current) {
    hubConnection.current = new HubConnectionBuilder()
      .withUrl(`${appConfig.TradingDataApiHost}/tradingDataMonitoring`)
      .build();

    hubConnection.current.on("NewTrackingData", function (data) {
      setTradingData(JSON.parse(data));
    });

    hubConnection.current.start().then(() => {
      hubConnection.current
        .invoke("SubscribeOnData")
        .catch(function (err) {
          return console.error(err.toString());
        });
    });
  }

  return (
    <TrackingDataContext.Provider value={{ tradingData, setTradingData }}>
      {children}
    </TrackingDataContext.Provider>
  );
};

export function useTrackingDataContext() {
  return useContext(TrackingDataContext);
}