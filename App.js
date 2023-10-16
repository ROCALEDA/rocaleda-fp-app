import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/login/login";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Outfit-Regular": require("./assets/fonts/Outfit/Outfit-Regular.ttf"),
    "Philosopher-Regular": require("./assets/fonts/Philosopher/Philosopher-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Outfit-Regular",
  },
});
