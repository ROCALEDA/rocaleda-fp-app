import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/login/login";
import Home from "../components/home/home";
import SignUp from "../components/signup/signup";
import Positions from "../components/positions/positions";
import Performance from "../components/performance/performance";
import PositionDetail from "../components/positions/position-detail";
import TechnicalTest from "../components/technical-test/technical-test";
import Interviews from "../components/interviews/interviews";


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Positions"
          component={Positions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PositionDetail"
          component={PositionDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Performance"
          component={Performance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TechnicalTest"
          component={TechnicalTest}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Interviews"
          component={Interviews}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
