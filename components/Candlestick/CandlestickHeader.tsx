import { FormattedCandle } from "@/api/candle/types";
import { formatNumber } from "@/utils";
import Text from "../Common/Text";
import { StyleSheet, View } from "react-native";
import spacing from "@/styles/spacing";

type CandlestickHeaderProps = {
  data: FormattedCandle | null;
};

const CandlestickHeader = ({ data }: CandlestickHeaderProps) => {
  const price = data?.close
    ? formatNumber({ number: data.close, currency: "USD" })
    : "-";
  return (
    <View style={styles.container}>
      <Text variant="subtitle">Bitcoin Price</Text>
      <Text variant="title">{price}</Text>
    </View>
  );
};

export default CandlestickHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
});
