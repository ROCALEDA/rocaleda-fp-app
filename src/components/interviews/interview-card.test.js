import { render } from "@testing-library/react-native";
import InterviewCard from "./interview-card";

describe("InterviewCard", () => {
  const mockPendingInterview = {
    subject: "Entrevista mock",
    client_name: "Empresa mock",
    realization_date: "2099-01-11T05:00:00",
    score: null
  };

  const mockCompletedInterview = {
    subject: "Entrevista mock",
    client_name: "Empresa mock",
    realization_date: "2099-01-11T05:00:00",
    score: 100
  };

  it("renders the pending interview correctly", () => {
    const { getByText } = render(<InterviewCard interview={mockPendingInterview} />);

    expect(getByText(mockPendingInterview.client_name)).toBeTruthy();
  });

  it("renders the completed interview correctly", () => {
    const { getByText } = render(<InterviewCard interview={mockCompletedInterview} />);

    expect(getByText(mockCompletedInterview.client_name)).toBeTruthy();
  });
});
