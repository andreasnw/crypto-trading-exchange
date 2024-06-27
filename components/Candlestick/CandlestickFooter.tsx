import { colors } from "@/styles/colors";
import { fontSizes, fontWeights } from "@/styles/fonts";
import spacing from "@/styles/spacing";
import { StyleSheet, View } from "react-native";

import { CandlestickChart as WAGMICandlestickChart } from "react-native-wagmi-charts";

const DATE_TIME_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const CandlestickFooter = () => {
  return (
    <View style={styles.container}>
      <WAGMICandlestickChart.DatetimeText
        options={DATE_TIME_OPTIONS}
        style={[styles.text, styles.date]}
      />
      <View style={styles.row}>
        <View>
          <WAGMICandlestickChart.PriceText
            type="low"
            format={(d) => {
              "worklet";
              return `Low: $${d.formatted}`;
            }}
            precision={0}
            style={styles.text}
          />
          <WAGMICandlestickChart.PriceText
            type="high"
            format={(d) => {
              "worklet";
              return `High: $${d.formatted}`;
            }}
            precision={0}
            style={styles.text}
          />
        </View>
        <View>
          <WAGMICandlestickChart.PriceText
            type="open"
            precision={0}
            format={(d) => {
              "worklet";
              return `Open: $${d.formatted}`;
            }}
            style={styles.text}
          />
          <WAGMICandlestickChart.PriceText
            type="close"
            precision={0}
            format={(d) => {
              "worklet";
              return `Close: $${d.formatted}`;
            }}
            style={styles.text}
          />
        </View>
      </View>
    </View>
  );
};

export default CandlestickFooter;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  text: {
    color: colors.subtitle,
    fontSize: fontSizes.medium,
  },
  date: {
    marginBottom: spacing.sm,
    fontWeight: fontWeights.bold,
    backgroundColor: colors.background
  },
  placeholder: {
    zIndex: 1,
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
  }
});
