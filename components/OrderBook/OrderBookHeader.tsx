import { colors } from "@/styles/colors";
import { fontWeights } from "@/styles/fonts";
import spacing from "@/styles/spacing";
import BaseContainer from "../Common/containers/BaseContainer";
import Text from "../Common/Text";
import { StyleSheet } from "react-native";

type OrderBookHeaderProps = {
  texts: string[];
};

const OrderBookHeader = ({ texts }: OrderBookHeaderProps) => {
  return (
    <BaseContainer style={styles.header}>
      {texts.map((text, index) => (
        <Text key={index} style={styles.title}>
          {text}
        </Text>
      ))}
    </BaseContainer>
  );
};

export default OrderBookHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: spacing.sm,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  title: {
    color: colors.black,
    fontWeight: fontWeights.bold,
  },
});
