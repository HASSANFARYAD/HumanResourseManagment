import * as signalR from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { notificationURL } from "../utils/_envConfig";
import { useSelector } from "react-redux";

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [hubConnection, setHubConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);
  const { userAuth } = useSelector((state) => state?.authentication);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${notificationURL}notificationHub`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();

        connection.on("RecieveMessage", (notification, userId) => {
          const id = JSON.parse(userId);
          if (userAuth.id === id) {
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              notification,
            ]);
            setUnReadCount((prevCount) => prevCount + 1);
          }
        });
      } catch (err) {
        //console.error("SignalR Connection Error: ", err);
      }
    };
    startConnection();
    setHubConnection(connection);

    return () => {
      connection.off("RecieveMessage");
      connection
        .stop()
        .catch((err) => console.error("Error stopping connection: ", err));
    };
  }, [userAuth.id]);

  return (
    <SignalRContext.Provider
      value={{
        hubConnection,
        notifications,
        unReadCount,
        setNotifications,
        setUnReadCount,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
