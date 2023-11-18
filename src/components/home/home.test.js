import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

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

jest.mock("../../../utils/storage", () => ({
  getUser: jest.fn(),
  removeUser: jest.fn(),
}));

describe("Home with Role", () => {
  let mockNavigation;
  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  test("renders Interviews button for role id 1", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "1",
    });

    const { findByText } = render(
      <Home navigation={{ navigate: jest.fn() }} />
    );
    const interviewsButton = await findByText("POSICIONES");

    expect(interviewsButton).toBeTruthy();
  });

  test("renders Interviews button for role id 3", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "3",
    });

    const { findByText } = render(
      <Home navigation={{ navigate: jest.fn() }} />
    );
    const interviewsButton = await findByText("ENTREVISTAS");

    expect(interviewsButton).toBeTruthy();
  });

  test("renders Interviews button for role id 2", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "2",
    });

    const { findByText } = render(
      <Home navigation={{ navigate: jest.fn() }} />
    );
    const interviewsButton = await findByText("POSICIONES");
    const performanceButton = await findByText("EVALUAR DESEMPEÑO");
    const technicalTestButton = await findByText("REGISTRAR PRUEBA TÉCNICA");

    expect(interviewsButton).toBeTruthy();
    expect(performanceButton).toBeTruthy();
    expect(technicalTestButton).toBeTruthy();
  });
});

describe("Test navigation", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  test("renders Navigation for positions", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "1",
    });

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText("POSICIONES"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Positions"); // Ensure this matches the component's navigate parameter
    });
  });

  test("renders Navigation for interviews", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "3",
    });

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText("ENTREVISTAS"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Interviews");
    });
  });

  test("renders Navigation for positions", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "1",
    });

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText("POSICIONES"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Positions"); // Ensure this matches the component's navigate parameter
    });
  });

  test("renders Navigation for performance", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "2",
    });

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText("EVALUAR DESEMPEÑO"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Performance"); // Ensure this matches the component's navigate parameter
    });
  });

  test("renders Navigation for performance", async () => {
    require("../../../utils/storage").getUser.mockResolvedValue({
      token: "fake-token",
      role: "2",
    });

    const { getByText } = render(<Home navigation={mockNavigation} />);

    await waitFor(() => {
      fireEvent.press(getByText("REGISTRAR PRUEBA TÉCNICA"));
      expect(mockNavigation.navigate).toHaveBeenCalledWith("TechnicalTest"); // Ensure this matches the component's navigate parameter
    });
  });
});
