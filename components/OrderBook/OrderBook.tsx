import { StyleSheet } from "react-native";
import BaseContainer from "../Common/containers/BaseContainer";
import Text from "../Common/Text";
import spacing from "@/styles/spacing";
import useWebSocket from "@/api/useWebSocket";
import { useState } from "react";
import { formatNumber } from "@/utils/helpers";
import {
  EventInfo,
  EventSubscribe,
  HeartBeat,
  ResponseDataType,
} from "@/api/types";
import { FormattedBook, InitialData, LineItem } from "@/api/book/types";
import { ORDERBOOK_CONF, ORDERBOOK_MESSAGE } from "@/api/book";
import OrderBookChart from "./OrderBookChart";
import { UpdateData } from "@/api/candle/types";

const OrderBook = () => {
  const [orderBook, setOrderBook] = useState<FormattedBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBookDataType = (
    response: InitialData | UpdateData | HeartBeat | EventInfo | EventSubscribe
  ) => {
    if (!Array.isArray(response)) return ResponseDataType.EVENT_INFO;
    if (response[1] === "hb") return ResponseDataType.HEARTBEAT;
    if (Array.isArray(response[1]) && response[1].length === 3)
      return ResponseDataType.UPDATE;

    return ResponseDataType.INITIAL;
  };

  const calculateCumulativeAmount = (
    entries: number[][],
    condition: (amount: number) => boolean
  ) => {
    return entries.reduce((totalAmount, [price, , amount]) => {
      return condition(amount) ? totalAmount + price * amount : totalAmount;
    }, 0);
  };

  type ProcessOrdersPayload = {
    orders: number[][];
    isBid: boolean;
    cumulativeAmount: number;
  };

  const processOrders = ({
    orders,
    isBid,
    cumulativeAmount,
  }: ProcessOrdersPayload) => {
    let cumulative = 0;
    const result: LineItem[] = [];

    orders.forEach(([price, count, amount]) => {
      cumulative += price * amount;
      result.push({
        price: formatNumber({ number: price }),
        order: count,
        volume: formatNumber({
          number: isBid ? amount : -amount,
          maximumFractionDigits: 4,
        }),
        percent: `${(cumulative / cumulativeAmount) * 100}%`,
      });
    });

    return result;
  };

  const transformToFeedsResponse = (response: InitialData) => {
    const topBids = response[1]
      .filter(([, count, amount]) => count > 0 && amount > 0)
      .slice(0, 5);
    const topAsks = response[1]
      .filter(([, count, amount]) => count > 0 && amount < 0)
      .slice(0, 5);

    const cumulativeAmountBid = calculateCumulativeAmount(
      topBids,
      (amount) => amount > 0
    );
    const cumulativeAmountAsk = calculateCumulativeAmount(
      topAsks,
      (amount) => amount < 0
    );

    const bids = processOrders({
      orders: topBids,
      isBid: true,
      cumulativeAmount: cumulativeAmountBid,
    });
    const asks = processOrders({
      orders: topAsks,
      isBid: false,
      cumulativeAmount: cumulativeAmountAsk,
    });

    return { bids, asks };
  };

  const onMessageCallback = (response: MessageEvent) => {
    const rawData = JSON.parse(response.data);
    const dataType = getBookDataType(rawData);

    if (
      dataType === ResponseDataType.EVENT_INFO ||
      dataType === ResponseDataType.HEARTBEAT
    )
      return;

    const formattedData = transformToFeedsResponse(rawData as InitialData);
    setOrderBook(formattedData);
    setIsLoading(false);
  };

  useWebSocket({
    message: ORDERBOOK_MESSAGE,
    onMessageCallback,
    conf: ORDERBOOK_CONF,
  });

  return (
    <BaseContainer style={styles.container}>
      <Text variant="title">Order Book</Text>
      <OrderBookChart orderBook={orderBook} isLoading={isLoading} />
    </BaseContainer>
  );
};

export default OrderBook;

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
  },
});
