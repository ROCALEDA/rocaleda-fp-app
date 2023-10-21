import * as React from "react";
import { screen, render } from "@testing-library/react-native";
import RootNavigator from "../src/navigation/RootNavigation";

test("shows login screen as first screen", () => {
  render(<RootNavigator />);

  expect(
    screen.getByText("Estamos felices de verte de nuevo")
  ).toBeOnTheScreen();
});
