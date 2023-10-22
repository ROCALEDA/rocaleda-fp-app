import { render, fireEvent } from "@testing-library/react-native";
import { login } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";
import SignUp from "./signup";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/token");

describe("<Signup />", () => {
  const mockNavigation = jest.fn();
  it("renders the component", () => {
    const { getByText } = render(<SignUp navigation={mockNavigation} />);
    expect(getByText("Registrarme como")).toBeTruthy();
  });

  it("updates the name state when text is entered", () => {
    const { getByPlaceholderText } = render(<SignUp />);

    const nameInput = getByPlaceholderText("Nombre");
    fireEvent.changeText(nameInput, "John Doe");

    expect(nameInput.props.value).toBe("John Doe");
  });
});
