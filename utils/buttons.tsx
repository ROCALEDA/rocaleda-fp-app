import { Text } from "react-native";
import globalStyles from "../styles/global-styles";

export const renderPrimaryButtonText = (text: string) => (
  <Text style={globalStyles.button_primary_text}>{text}</Text>
);

export const renderSecondaryButtonText = (text: string) => (
  <Text style={globalStyles.button_secondary_text}>{text}</Text>
);
