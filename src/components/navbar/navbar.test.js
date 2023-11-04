import { render, fireEvent } from "@testing-library/react-native";
import NavBar from "./navbar";

// Mock the external storage utility functions
jest.mock("../../../utils/storage", () => ({
  getUser: jest.fn(() => Promise.resolve({ token: "fake-token", role: "1" })),
  removeUser: jest.fn(),
}));

// Mock the navigation prop
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const createTestProps = (props) => ({
  navigation: {
    navigate: mockNavigate,
    goBack: mockGoBack,
  },
  ...props,
});

describe("NavBar", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly and responds to button press", async () => {
    const props = createTestProps({});
    const { findByTestId, getByTestId } = render(<NavBar {...props} />);

    // Find the elements
    const backButton = await findByTestId("back-button");
    const logoutButton = await findByTestId("logout-button");

    // Simulate user interaction
    fireEvent.press(backButton);
    fireEvent.press(logoutButton);

    // Assert navigation function was called
    expect(mockGoBack).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("Login");

    // You may also want to check if the correct logo is displayed
    // based on the role ID that getUser would return
    const logo = getByTestId("logo-image");
    expect(logo.props.source).toBe(1);
  });

  // ... other tests like checking if Alert is called when there is no user, etc.
});
