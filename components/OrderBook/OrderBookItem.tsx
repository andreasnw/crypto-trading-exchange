import { colors } from "@/styles/colors";
import BaseContainer from "../Common/containers/BaseContainer";
import spacing from "@/styles/spacing";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Text from "../Common/Text";
import { LineItem } from "@/api/book/types";

type OrderBookItemProps = {
  item: LineItem;
  alignStyle: TextStyle;
  priceColor: string;
  volumeMargin: ViewStyle;
  priceMargin: ViewStyle;
  barStyle?: ViewStyle;
  reverse?: boolean;
};

const OrderBookItem = ({
  item,
  alignStyle,
  volumeMargin,
  priceMargin,
  priceColor,
  barStyle,
  reverse,
}: OrderBookItemProps) => (
  <BaseContainer
    style={[styles.section, reverse && styles.reverse]}
    key={item.price + item.volume}
  >
    <Text style={[alignStyle, volumeMargin]}>{item.volume}</Text>
    <Text style={[alignStyle, priceMargin, { color: priceColor }]}>
      {item.price}
    </Text>
    <View style={[styles.bar, barStyle, { width: item.percent }]} />
  </BaseContainer>
);

export default OrderBookItem;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    height: 32,
    alignItems: "center",
  },
  bar: {
    position: "absolute",
    backgroundColor: colors.dangerLight,
    height: "100%",
    zIndex: -1,
  },
  reverse: {
    flexDirection: "row-reverse",
  },
});
