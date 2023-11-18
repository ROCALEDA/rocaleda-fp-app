import { render, fireEvent, waitFor } from "@testing-library/react-native";
import TechnicalTest from "./technical-test"; // adjust the import path as needed

jest.mock("@react-native-picker/picker", () => {
  const RealComponent = jest.requireActual("@react-native-picker/picker");
  RealComponent.Picker.Item = ({ children }) => children;
  return RealComponent;
});

jest.mock("../../../api/config", () => ({
  __esModule: true,
  default: "http://mock-api-url.com",
}));

jest.mock("../../../utils/storage", () => ({
  getUser: jest.fn(() => Promise.resolve({ token: "fake-token", role: "1" })),
  removeUser: jest.fn(),
}));

jest.mock("../../../api/config", () => ({
  __esModule: true,
  default: "http://mock-api-url.com",
}));

const mockNavigation = { navigate: jest.fn() };

const mockProjectsData = [
  {
    id: 1,
    name: "Project Alpha",
    postions: [
      {
        name: "Position Alpha 1",
        id: 1,
      },
      {
        name: "Position Alpha 2",
        id: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Project Beta",
    postions: [
      {
        name: "Position Beta 3",
        id: 3,
      },
      {
        name: "Position Beta 4",
        id: 4,
      },
    ],
  },
];

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

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.endsWith("/customer/projects")) {
        return Promise.resolve(mockProjectsData);
      } else if (url.endsWith("/candidates")) {
        return Promise.resolve(mockCandidates);
      } else if (url.endsWith("/tests")) {
        return Promise.resolve(mockAnotherEndpointData);
      }
      // Fallback for unexpected URLs
      return Promise.resolve({});
    },
  })
);

describe("Performance Component", () => {
  it('should display the text "Resultado de prueba técnica"', async () => {
    const screen = render(<TechnicalTest navigation={mockNavigation} />);

    await waitFor(() => {
      expect(screen.getByText("Resultado de prueba técnica")).toBeTruthy();
    });
    console.log(screen.debug());
  });

  it("Fill out form", async () => {
    const screen = render(<TechnicalTest navigation={mockNavigation} />);

    await waitFor(() => {
      expect(screen.getByText("Resultado de prueba técnica")).toBeTruthy();
    });

    const projectPicker = screen.getByTestId("project-picker");

    fireEvent(projectPicker, "onValueChange", 1);

    await waitFor(() => {
      expect(screen.getByText("Posición")).toBeTruthy();
    });
    const positionPicker = screen.getByTestId("position-picker");

    fireEvent(positionPicker, "onValueChange", 1);

    await waitFor(() => {
      expect(screen.getByText("Candidato")).toBeTruthy();
    });
    const candidatePicker = screen.getByTestId("candidate-picker");

    fireEvent(candidatePicker, "onValueChange", 1);

    const descriptionInput = screen.getByPlaceholderText("Observación");
    fireEvent.changeText(descriptionInput, "New observation");

    await waitFor(() => {
      expect(screen.getByText("Description")).toBeTruthy();
      expect(screen.getByText("Score (0-100)")).toBeTruthy();
    });

    fireEvent.press(screen.getByText("SUBMIT"));
  });
});
