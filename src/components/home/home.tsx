// Login.js
import { Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly

const Home = ({}) => {
  const renderTextBtn = () => (
    <Text style={globalStyles.button_primary_text}>INGRESAR</Text>
  );

  return (
    <ImageBackground
      source={require("../../../assets/red-background.jpeg")} // Adjust the path accordingly
      style={styles.backgroundImage}
      testID="background-image"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.text_title}>Home</Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
});

export default Home;
