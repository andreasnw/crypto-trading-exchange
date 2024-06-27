import { throttle } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";

type WebSocketProps = {
  message: string;
  onMessageCallback: (response: MessageEvent) => void;
  throttleTime?: number;
  conf?: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string;

const useWebSocket = ({
  message,
  onMessageCallback,
  throttleTime,
  conf,
}: WebSocketProps) => {
  const connection = useRef<WebSocket | null>();

  const stopConnection = useCallback(() => {
    connection.current?.close();
  }, []);

  const addListener = useCallback(() => {
    if (!connection?.current) {
      stopConnection();
      return;
    }

    connection.current.onmessage = throttle(
      (response) => onMessageCallback(response),
      throttleTime
    );
  }, [stopConnection]);

  const showErrorMessage = useCallback(() => {
    Alert.alert("Error", "An error has ocurred!");
  }, []);

  const handleErrorConnection = useCallback(() => {
    if (!connection?.current) {
      return;
    }

    connection.current.onerror = () => {
      showErrorMessage();
    };
  }, [showErrorMessage]);

  const startConnection = useCallback(() => {
    const ws = new WebSocket(BASE_URL);
    connection.current = ws;

    ws.onopen = () => {
      ws.send(message);
      if (conf) ws.send(conf);

      try {
        addListener();
        handleErrorConnection();
      } catch (error) {
        showErrorMessage();
      }
    };
  }, []);

  useEffect(() => {
    startConnection();
    return () => stopConnection();
  }, []);

  return {
    connection: connection.current,
  };
};

export default useWebSocket;
