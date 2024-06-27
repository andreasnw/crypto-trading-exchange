import { colors } from "@/styles/colors";
import { ActivityIndicator, StyleSheet } from "react-native";
import BaseContainer from "./containers/BaseContainer";
import { CHART_WIDTH, CHART_HEIGHT } from "@/constants";
import spacing from "@/styles/spacing";

const Loading = () => (
  <BaseContainer style={styles.loading}>
    <ActivityIndicator color={colors.primary} size={"large"} />
  </BaseContainer>
);

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 0,
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
  },
});
