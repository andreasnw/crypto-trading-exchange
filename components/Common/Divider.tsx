import { colors } from "@/styles/colors";
import { StyleSheet, View, ViewStyle } from "react-native";

type DividerProps = {
  style?: ViewStyle;
};

const Divider = ({ style }: DividerProps) => {
  return <View style={[styles.divider, style]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "96%",
    height: 1,
    backgroundColor: colors.border,
    alignSelf: "center",
    borderRadius: 50
  },
});
