import Candidates from "./candidates";
import { getUser } from "../../../utils/storage.ts";

import { render } from "@testing-library/react-native";

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
