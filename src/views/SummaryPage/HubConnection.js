import { useState, createContext, useContext, useRef, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { getSignalRHubUrl } from "../../api/tradingDataApi";

const TrackingDataContext = createContext([]);

export const TrackingDataProvider = ({ children }) => {
  const [tradingData, setTradingData] = useState();
  const hubConnection = useRef(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(getSignalRHubUrl())
      .build();

    connection.on("NewTrackingData", function (data) {
      setTradingData(JSON.parse(data));
    });

    connection.start().then(() => {
      connection
        .invoke("SubscribeOnData")
        .catch(function (err) {
          return console.error(err.toString());
        });
    });

    hubConnection.current = connection;

    return () => {
      connection.stop().catch(() => {});
      hubConnection.current = null;
    };
  }, []);

  return (
    <TrackingDataContext.Provider value={{ tradingData, setTradingData }}>
      {children}
    </TrackingDataContext.Provider>
  );
};

export function useTrackingDataContext() {
  return useContext(TrackingDataContext);
}