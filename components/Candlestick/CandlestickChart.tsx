import spacing, { screenHeight, screenWidth } from "@/styles/spacing";
import { StyleSheet } from "react-native";
import { CandlestickChart as WAGMICandlestickChart } from "react-native-wagmi-charts";
import Loading from "../Common/Loading";
import { colors } from "@/styles/colors";

const HORIZONTAL_PADDING = spacing.md * 2;
const CHART_WIDTH = screenWidth - HORIZONTAL_PADDING;
const CHART_HEIGHT = screenHeight / 4.5;

type CandlestickChartProps = {
  isLoading: boolean;
};

const CandlestickChart = ({ isLoading }: CandlestickChartProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <WAGMICandlestickChart
      width={CHART_WIDTH}
      height={CHART_HEIGHT}
      style={styles.container}
    >
      <WAGMICandlestickChart.Candles
        positiveColor={colors.success}
        negativeColor={colors.dangerMedium}
      />
      <WAGMICandlestickChart.Crosshair>
        <WAGMICandlestickChart.Tooltip />
      </WAGMICandlestickChart.Crosshair>
    </WAGMICandlestickChart>
  );
};

export default CandlestickChart;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
});
