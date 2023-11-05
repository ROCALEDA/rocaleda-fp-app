import * as Font from "expo-font";
import { StyleSheet, View } from "react-native";
import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RootNavigation from "./src/navigation/RootNavigation";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Outfit-Regular": require("./assets/fonts/Outfit/Outfit-Regular.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit/Outfit-Bold.ttf"),
    "Outfit-SemiBold": require("./assets/fonts/Outfit/Outfit-SemiBold.ttf"),
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
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Outfit-Regular",
  },
});
