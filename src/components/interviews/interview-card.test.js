import { render } from "@testing-library/react-native";
import InterviewCard from "./interview-card";

describe("InterviewCard", () => {
  const mockInterview = {
    subject: "Entrevista mock",
    client_name: "Empresa mock",
    realization_date: "2099-01-11T05:00:00"
    ,
  };

  it("renders the position information correctly", () => {
    const { getByText } = render(<InterviewCard interview={mockInterview} />);

    expect(getByText(mockInterview.client_name)).toBeTruthy();
  });
});
