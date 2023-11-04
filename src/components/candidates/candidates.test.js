import { render } from "@testing-library/react-native";
import Candidates from "./candidates";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

describe("<Candidates />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it("renders the component", () => {
    const { getByText } = render(<Candidates navigation={mockNavigation} />);
    expect(getByText("Candidatos")).toBeTruthy();
  });
});
