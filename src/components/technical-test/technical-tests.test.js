import { render, waitFor } from "@testing-library/react-native";
import TechnicalTests from "./technical-tests";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

describe("<Positions />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
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
