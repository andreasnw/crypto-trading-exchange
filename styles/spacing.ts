import { Dimensions } from "react-native";

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export default spacing;

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");
