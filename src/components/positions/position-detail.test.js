import { render } from "@testing-library/react-native";
import PositionDetail from "./position-detail";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");

describe("<PositionDetail />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it("renders the component", () => {
    const { queryByText } = render(
      <PositionDetail
        navigation={mockNavigation}
        route={{ params: { positionId: "1", positionName: "Position 1" } }}
      />
    );
    expect(queryByText("Candidatos de Position 1")).toBeTruthy();
  });
});
