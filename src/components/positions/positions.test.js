import { render } from "@testing-library/react-native";
import Positions from "./positions";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

describe("<Positions />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it("renders the component", () => {
    const { getByText } = render(<Positions navigation={mockNavigation} />);
    expect(getByText("Posiciones")).toBeTruthy();
  });
});
