import { render, waitFor } from "@testing-library/react-native";
import InterviewDetail from "./interview-detail";

const mockPendingInterview = {
  subject: "Entrevista mock",
  client_name: "Empresa mock",
  realization_date: "2099-01-11T05:00:00",
  score: null,
};

const mockCompletedInterview = {
  subject: "Entrevista mock",
  client_name: "Empresa mock",
  realization_date: "2099-01-11T05:00:00",
  score: 100,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCandidates),
  })
);

const mockNavigation = { navigate: jest.fn() };

describe("<PositionDetail />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it("renders the component", async () => {
    const { queryByText } = render(
      <InterviewDetail
        navigation={mockNavigation}
        route={{ params: { interview: mockCompletedInterview } }}
      />
    );
    await waitFor(() => {
      expect(queryByText("Detalles de entrevista")).toBeTruthy();
    });
  });

  it("renders the pending interview details correctly", async () => {
    const { getByText } = render(
      <InterviewDetail
        navigation={mockNavigation}
        route={{ params: { interview: mockPendingInterview } }}
      />
    );
    await waitFor(() => {
      expect(getByText(mockPendingInterview.client_name)).toBeTruthy();
      expect(
        getByText("Aun no hay resultados de esta entrevista")
      ).toBeTruthy();
    });
  });

  it("renders the completed interview details correctly", async () => {
    const { getByText } = render(
      <InterviewDetail
        navigation={mockNavigation}
        route={{ params: { interview: mockCompletedInterview } }}
      />
    );
    await waitFor(() => {
      expect(getByText(mockCompletedInterview.client_name)).toBeTruthy();
      expect(getByText("Resultado")).toBeTruthy();
      expect(getByText(mockCompletedInterview.score + "/100")).toBeTruthy();
    });
  });
});
