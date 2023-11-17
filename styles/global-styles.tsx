import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  text_title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Philosopher-Regular",
    color: "#2D3748",
  },
  text_highlight_candidate: {
    fontSize: 30,
    color: "#009EF8",
    fontFamily: "Philosopher-Regular",
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
  text_error: {
    fontSize: 10,
    fontFamily: "Outfit-Regular",
    color: "#ED8B84",
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
  button_secondary: {
    backgroundColor: "#F4E8C9", // Set the background color
    padding: 10,
    borderRadius: 5,
  },
  button_secondary_text: {
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    color: "#A15CAC",
  },
  button_outlined: {
    borderColor: "#A15CAC",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
});

export default globalStyles;
