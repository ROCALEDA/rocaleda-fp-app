import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../components/home/home";
import Login from "../components/login/login";
import { TInterview } from "../../types/interview";
import SignUp from "../components/signup/signup";
import Positions from "../components/positions/positions";
import Performance from "../components/performance/performance";
import PositionDetail from "../components/positions/position-detail";
import TechnicalTest from "../components/technical-test/technical-test";
import Interviews from "../components/interviews/interviews";
import InterviewDetail from "../components/interviews/interview-detail";
import TechnicalTests from "../components/technical-test/technical-tests";
import PerformanceReviewList from "../components/performance/performance-review-list";

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Positions: undefined;
  SignUp: undefined;
  Performance: undefined;
  TechnicalTest: undefined;
  Interviews: undefined;
  TechnicalTests: undefined;
  PerformanceReviewList: undefined;
  PositionDetail: {
    candidateId: string;
    positionId: string;
    positionName: string;
    description: string;
    isOpen: boolean;
    projectName: string;
    projectDescription: string;
    softSkills: number[];
    techSkills: number[];
  };
  InterviewDetail: {
    interview: TInterview;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="TechnicalTests"
          component={TechnicalTests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PerformanceReviewList"
          component={PerformanceReviewList}
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
        <Stack.Screen
          name="InterviewDetail"
          component={InterviewDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
