import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Candlestick from "@/components/Candlestick";
import OrderBook from "@/components/OrderBook";
import Divider from "@/components/Common/Divider";
import { ScrollView, StyleSheet } from "react-native";
import spacing from "@/styles/spacing";
import { colors } from "@/styles/colors";

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Candlestick />
        <Divider style={styles.divider} />
        <OrderBook />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
  },
  divider: {
    marginHorizontal: spacing.md,
  },
});
