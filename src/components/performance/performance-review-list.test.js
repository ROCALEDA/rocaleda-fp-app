import { render, waitFor, fireEvent } from "@testing-library/react-native";
import PerformanceReviewList from "./performance-review-list";
import { useFocusEffect } from "@react-navigation/native";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");
jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useFocusEffect: jest.fn(),
  };
});

describe("Render component", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
    useFocusEffect.mockImplementation((callback) => callback());
  });

  it("renders the component", async () => {
    const { getByText } = render(
      <PerformanceReviewList navigation={mockNavigation} />
    );
    await waitFor(() => {
      expect(getByText("Evaluaciones de desempeño")).toBeTruthy();
    });
  });

  it("navigates to the Performance creation screen when the add button is pressed", () => {
    const { getByTestId } = render(
      <PerformanceReviewList navigation={mockNavigation} />
    );

    const addButton = getByTestId("create-performance-review");
    fireEvent.press(addButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Performance");
  });
});
