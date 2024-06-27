import React, { useEffect, useRef, useState } from "react";
import { CandlestickChart as WAGMICandlestickChart } from "react-native-wagmi-charts";
import CandlestickHeader from "./CandlestickHeader";
import {
  Candle,
  FormattedCandle,
  InitialData,
  UpdateData,
} from "@/api/candle/types";
import useWebSocket from "@/api/useWebSocket";
import CandlestickChart from "./CandlestickChart";
import BaseContainer from "../Common/containers/BaseContainer";
import { StyleSheet } from "react-native";
import spacing from "@/styles/spacing";
import CandlestickFooter from "./CandlestickFooter";
import {
  EventInfo,
  EventSubscribe,
  HeartBeat,
  ResponseDataType,
} from "@/api/types";
import { CANDLESTICK_MESSAGE } from "@/api/candle";
import { dateIsAfter, dateSubDays } from "@/utils";

const Candlestick = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [candlestickData, setCandlestickData] = useState<
    FormattedCandle[] | null
  >(null);
  const candlestickDataRef = useRef<FormattedCandle[] | null>(candlestickData);

  useEffect(() => {
    candlestickDataRef.current = candlestickData;
  }, [candlestickData]);

  const getCandleDataType = (
    response: InitialData | UpdateData | HeartBeat | EventInfo | EventSubscribe
  ) => {
    if (!Array.isArray(response)) return ResponseDataType.EVENT_INFO;
    if (response[1] === "hb") return ResponseDataType.HEARTBEAT;
    if (Array.isArray(response[1]) && response[1].length === 6)
      return ResponseDataType.UPDATE;

    return ResponseDataType.INITIAL;
  };

  const generateFormattedCandle = (candle: Candle) => {
    return {
      timestamp: candle[0],
      open: candle[1],
      close: candle[2],
      high: candle[3],
      low: candle[4],
      volume: candle[5],
    };
  };

  const formatInitialCandlestickData = (rawData: InitialData) => {
    const formattedData = rawData[1].flatMap((candle) => {
      if (dateIsAfter(candle[0], dateSubDays(new Date(), 1))) {
        return generateFormattedCandle(candle);
      } else return [];
    });

    return formattedData.reverse();
  };

  const onMessageCallback = (response: MessageEvent) => {
    const rawData: HeartBeat | InitialData | UpdateData = JSON.parse(
      response.data
    );

    const dataType = getCandleDataType(rawData);

    if (dataType === ResponseDataType.EVENT_INFO) return;
    if (dataType === ResponseDataType.HEARTBEAT) return;
    if (dataType === ResponseDataType.INITIAL) {
      const formattedInitialData = formatInitialCandlestickData(
        rawData as InitialData
      );
      setIsLoading(false);
      return setCandlestickData(formattedInitialData);
    }

    const formattedUpdateData = generateFormattedCandle(rawData[1] as Candle);
    const index = candlestickDataRef.current?.findIndex(
      (candle) => candle.timestamp === formattedUpdateData.timestamp
    );

    if (index !== -1) {
      return setCandlestickData((prevData) => {
        if (!prevData) return [];
        return prevData.flatMap((candle, i) =>
          i === index ? formattedUpdateData : candle
        );
      });
    }

    setCandlestickData((prevData) => [
      ...(prevData ?? []),
      formattedUpdateData,
    ]);
  };

  useWebSocket({
    message: CANDLESTICK_MESSAGE,
    onMessageCallback,
  });

  return (
    <BaseContainer style={styles.container}>
      <WAGMICandlestickChart.Provider data={candlestickData ?? []}>
        <CandlestickHeader
          data={candlestickData && candlestickData[candlestickData.length - 1]}
        />
        <CandlestickChart isLoading={isLoading} />
        <CandlestickFooter />
      </WAGMICandlestickChart.Provider>
    </BaseContainer>
  );
};

export default Candlestick;

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    justifyContent: "center",
  },
});
