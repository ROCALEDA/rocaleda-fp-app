import { render, waitFor } from "@testing-library/react-native";
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
});
