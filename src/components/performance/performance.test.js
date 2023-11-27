import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Performance from "./performance"; // adjust the import path as needed

jest.mock("@react-native-picker/picker", () => {
  const RealComponent = jest.requireActual("@react-native-picker/picker");
  RealComponent.Picker.Item = ({ children }) => children;
  return RealComponent;
});

jest.mock("../../../utils/storage", () => ({
  getUser: jest.fn(() => Promise.resolve({ token: "fake-token", role: "1" })),
}));

// Mocking the module that contains API_URL
jest.mock("../../../api/config", () => ({
  __esModule: true,
  default: "http://mock-api-url.com",
}));

const mockProjectsData = [
  {
    id: 1,
    name: "Project Alpha",
  },
  {
    id: 2,
    name: "Project Beta",
  },
];

const mockProfilesData = [
  {
    candidate_id: 1,
    candidate_name: "John Doe",
    position_name: "Developer",
  },
  {
    candidate_id: 2,
    candidate_name: "Jane Smith",
    position_name: "Designer",
  },
];

global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => {
      if (url.endsWith("/customer/projects")) {
        return Promise.resolve(mockProjectsData);
      } else if (url.includes("/positions/closed/")) {
        return Promise.resolve(mockProfilesData);
      } else if (url.endsWith("/another/endpoint")) {
        return Promise.resolve(mockAnotherEndpointData);
      }
      // Fallback for unexpected URLs
      return Promise.resolve({});
    },
  })
);

describe("Performance Component", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  });

  it('should display the text "Crear evaluación de desempeño"', async () => {
    const screen = render(<Performance navigation={mockNavigation} />);

    await waitFor(() => {
      expect(screen.getByText("Crear evaluación de desempeño")).toBeTruthy();
    });
  });

  it('should display the text "Crear evaluación de desempeño"', async () => {
    const screen = render(<Performance navigation={mockNavigation} />);

    // Use waitFor to ensure all state updates and effects are processed
    await waitFor(() => {
      expect(screen.getByText("Crear evaluación de desempeño")).toBeTruthy();
    });
    const projectPicker = screen.getByTestId("project-picker");

    fireEvent(projectPicker, "onValueChange", 1);

    await waitFor(() => {
      expect(screen.getByText("Selecciona un colaborador")).toBeTruthy(); // Example assertion
    });
  });

  it('should display the text "Crear evaluación de desempeño"', async () => {
    const screen = render(<Performance navigation={mockNavigation} />);

    await waitFor(() => {
      expect(screen.getByText("Crear evaluación de desempeño")).toBeTruthy();
    });
    const projectPicker = screen.getByTestId("project-picker");

    fireEvent(projectPicker, "onValueChange", 1);

    await waitFor(() => {
      expect(screen.getByText("Selecciona un colaborador")).toBeTruthy(); // Example assertion
    });
    const candidatePicker = screen.getByTestId("candidate-picker");

    fireEvent(candidatePicker, "onValueChange", 1);
  });
});
