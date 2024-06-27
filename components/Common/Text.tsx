import { colors } from "@/styles/colors";
import { fontSizes, fontWeights } from "@/styles/fonts";
import { ReactNode } from "react";
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from "react-native";

type TextProps = {
  children: ReactNode | undefined;
  variant?: "title" | "subtitle";
  style?: StyleProp<TextStyle>;
};

const Text = ({ variant = "subtitle", children, style }: TextProps) => {
  return <RNText style={[styles[variant], style]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSizes.regular,
    fontWeight: fontWeights.normal,
    color: colors.grey80,
  },
});
