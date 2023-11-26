import { render, waitFor } from "@testing-library/react-native";
import TechnicalTests from "./technical-tests";
import { useFocusEffect } from "@react-navigation/native";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useFocusEffect: jest.fn(),
  };
});

describe("<Positions />", () => {
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
});
