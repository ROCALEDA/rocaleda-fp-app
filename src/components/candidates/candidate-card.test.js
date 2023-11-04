import { render } from "@testing-library/react-native";
import CandidateCard from "./candidate-card";

describe("CandidateCard", () => {
  const mockCandidate = {
    fullname: "John Doe",
    soft_skills: [
      { id: 1, name: "Teamwork", description: "Works well with others" },
      { id: 2, name: "Adaptability", description: "Adapts to change quickly" },
    ],
    tech_skills: [
      { id: 3, name: "React", description: "React developer" },
      { id: 4, name: "Node.js", description: "Node.js developer" },
    ],
    user_id: "123",
  };

  it("renders the candidate information correctly", () => {
    const { getByText } = render(<CandidateCard user={mockCandidate} />);

    expect(getByText(mockCandidate.fullname)).toBeTruthy();

    mockCandidate.tech_skills.forEach((skill) => {
      expect(getByText(skill.name)).toBeTruthy();
    });

    mockCandidate.soft_skills.forEach((skill) => {
      expect(getByText(skill.name)).toBeTruthy();
    });
  });
});
