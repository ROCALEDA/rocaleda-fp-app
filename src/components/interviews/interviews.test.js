import { render, waitFor } from "@testing-library/react-native";
import Interviews from "./interviews";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

describe("<Interviews />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it("renders the component", async () => {
    const { getByText } = render(<Interviews navigation={mockNavigation} />);
    await waitFor(() => {
      expect(getByText("Mis entrevistas")).toBeTruthy();
    });
  });
});
