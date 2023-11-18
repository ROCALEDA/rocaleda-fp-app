import { render, waitFor, act } from "@testing-library/react-native";
import PositionDetail from "./position-detail";
import fetchMock from "jest-fetch-mock";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/storage");
jest.mock("../../../api/config", () => ({
  __esModule: true,
  default: "http://mock-api-url.com",
}));

const mockCandidates = [
  {
    fullname: "Candidate one",
    soft_skills: [{ description: "Soft one desc", id: 1, name: "Soft one" }],
    tech_skills: [{ description: "Tech one desc", id: 1, name: "Tech one" }],
    user_id: 1,
  },
  {
    fullname: "Candidate two",
    soft_skills: [{ description: "Soft two desc", id: 2, name: "Soft one" }],
    tech_skills: [{ description: "Tech two desc", id: 2, name: "Tech one" }],
    user_id: 2,
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCandidates),
  })
);

const mockNavigation = { navigate: jest.fn() };

const mockRoute = {
  params: { positionId: "1", positionName: "Position Name" },
};

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

  it("shows loading indicators while fetching candidates", () => {
    const { getAllByTestId } = render(
      <PositionDetail navigation={mockNavigation} route={mockRoute} />
    );

    expect(getAllByTestId("animatedSkeleton")).toHaveLength(3); // Assuming 'skeleton-element' is the testID for your skeletons
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCandidates), // Replace mockData with your test data
  })
);

describe("Renders the candidates", () => {
  let mockNavigation;
  fetchMock.enableMocks();
  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
    fetch.mockClear();
  });

  it("fetching candidates", async () => {
    const { getByTestId } = render(
      <PositionDetail navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    expect(getByTestId("candidate-list")).toBeTruthy();
  });
});
