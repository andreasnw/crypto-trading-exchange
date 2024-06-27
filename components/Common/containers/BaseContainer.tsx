import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type BaseContainerProps = {
  children: ReactNode;
  style?: object;
};

const BaseContainer = ({ children, style }: BaseContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
});

export default BaseContainer;
