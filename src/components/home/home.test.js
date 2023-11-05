// Login.test.js
import React from "react";
import { render } from "@testing-library/react-native";

import Home from "./home";

describe("Home Component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(<Home />);
  });

  it("renders the background image", () => {
    const { getByTestId } = render(<Home />);

    const backgroundImage = getByTestId("background-image");
    expect(backgroundImage).toBeTruthy();
  });
});
