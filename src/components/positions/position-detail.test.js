import { render, waitFor, act } from "@testing-library/react-native";
import PositionDetail from "./position-detail";

jest.mock("../../../api/config", () => ({
  __esModule: true,
  default: "http://mock-api-url.com",
}));

jest.mock("../../../utils/storage", () => ({
  getUser: jest.fn(() => Promise.resolve({ token: "fake-token", role: "1" })),
  removeUser: jest.fn(),
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

describe("Renders the candidates", () => {
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: () => {
        if (url.endsWith("/candidates")) {
          return Promise.resolve(mockCandidates);
        }
        return Promise.resolve({});
      },
    })
  );

  it("fetching candidates", async () => {
    const { getByTestId, debug } = render(
      <PositionDetail navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByTestId("candidate-list")).toBeTruthy();
    });
    console.log(debug());
  });
});
