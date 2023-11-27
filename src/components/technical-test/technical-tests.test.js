import { render, waitFor, fireEvent } from "@testing-library/react-native";
import TechnicalTests from "./technical-tests";
import { useFocusEffect } from "@react-navigation/native";
import { mockTechnicalTests } from "../../../__mocks__/technical-tests";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useFocusEffect: jest.fn(),
  };
});

describe("<TechnicalTests />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
    useFocusEffect.mockImplementation((callback) => callback());
  });

  it("renders the component", async () => {
    const { getByText } = render(
      <TechnicalTests navigation={mockNavigation} />
    );
    await waitFor(() => {
      expect(getByText("Pruebas técnicas")).toBeTruthy();
    });
  });

  it("fetching candidates", async () => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => {
          if (url.endsWith("/technical_tests")) {
            return Promise.resolve(mockTechnicalTests);
          }
          return Promise.resolve({});
        },
      })
    );

    const { getByTestId, debug } = render(
      <TechnicalTests navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByTestId("technical-test-list")).toBeTruthy();
    });
  });

  it("navigates to the TechnicalTest screen when the add button is pressed", () => {
    const { getByTestId } = render(
      <TechnicalTests navigation={mockNavigation} />
    );

    // Simulate pressing the add button
    const addButton = getByTestId("add-technical-test");
    fireEvent.press(addButton);

    // Check if navigation.navigate was called with the correct screen name
    expect(mockNavigation.navigate).toHaveBeenCalledWith("TechnicalTest");
  });
});
