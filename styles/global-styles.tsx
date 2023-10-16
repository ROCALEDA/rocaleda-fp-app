import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  text_title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Philosopher-Regular",
    color: "#2D3748",
  },
  text_title_small: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Philosopher-Regular",
    color: "#2D3748",
  },
  text_label: {
    fontSize: 15,
    fontFamily: "Outfit-Regular",
    color: "#2D3748",
  },
  button_primary: {
    backgroundColor: "#A15CAC", // Set the background color
    padding: 10,
    borderRadius: 5,
  },
  button_primary_text: {
    color: "white", // Set the text color
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default globalStyles;
