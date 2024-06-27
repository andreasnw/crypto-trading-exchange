import React from "react";
import BaseContainer from "../Common/containers/BaseContainer";
import { FlatList, StyleSheet, View } from "react-native";
import spacing from "@/styles/spacing";
import { colors } from "@/styles/colors";
import { FormattedBook, LineItem } from "@/api/book/types";
import Loading from "../Common/Loading";
import OrderBookItem from "./OrderBookItem";
import OrderBookHeader from "./OrderBookHeader";

const ITEM_HEIGHT = 32;
const TOTAL_NUMBER_OF_ITEMS = 6;
const PADDING = spacing.md;
const CONTAINER_HEIGHT = ITEM_HEIGHT * TOTAL_NUMBER_OF_ITEMS + PADDING;

type OrderBookChartProps = {
  isLoading: boolean;
  orderBook: FormattedBook | null;
};

type RenderItemProps = {
  item: LineItem;
};

const OrderBookChart = ({ isLoading, orderBook }: OrderBookChartProps) => {
  if (isLoading) {
    return <Loading />;
  }

  const keyExtractor = (item: { price: string; volume: string }) =>
    item.price + item.volume;

  const listBidHeaderComponent = () => (
    <OrderBookHeader texts={["Volume", "Bid"]} />
  );

  const listAskHeaderComponent = () => (
    <OrderBookHeader texts={["Sell", "Volume"]} />
  );

  const renderBidItem = (props: RenderItemProps) => (
    <OrderBookItem
      item={props.item}
      alignStyle={styles.rightAlign}
      priceColor={colors.success}
      barStyle={styles.bid}
      volumeMargin={styles.marginLeft}
      priceMargin={styles.marginRight}
    />
  );

  const renderAskItem = (props: RenderItemProps) => (
    <OrderBookItem
      item={props.item}
      alignStyle={styles.leftAlign}
      priceColor={colors.dangerMedium}
      barStyle={styles.ask}
      reverse
      volumeMargin={styles.marginRight}
      priceMargin={styles.marginLeft}
    />
  );

  const getItemLayout = (
    _: ArrayLike<LineItem> | null | undefined,
    index: number
  ) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <BaseContainer style={styles.container}>
      <FlatList
        data={orderBook?.bids ?? []}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        renderItem={renderBidItem}
        getItemLayout={getItemLayout}
        style={styles.list}
        ListHeaderComponent={listBidHeaderComponent}
      />
      <FlatList
        data={orderBook?.asks ?? []}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        renderItem={renderAskItem}
        getItemLayout={getItemLayout}
        style={styles.list}
        ListHeaderComponent={listAskHeaderComponent}
      />
    </BaseContainer>
  );
};

export default OrderBookChart;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    height: CONTAINER_HEIGHT,
    padding: spacing.sm,
  },
  list: {
    width: "50%",
  },
  bid: {
    backgroundColor: colors.successLight,
    right: 0,
  },
  ask: {
    left: 0,
  },
  leftAlign: { textAlign: "left" },
  rightAlign: { textAlign: "right" },
  marginLeft: { marginLeft: spacing.sm },
  marginRight: { marginRight: spacing.sm },
});
