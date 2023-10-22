import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { login, signup } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";
import SignUp from "./signup";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/token");

describe("<Signup />", () => {
  let mockNavigation;
  let signupMock;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  })

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

  it("updates the email state when text is entered", () => {
    const { getByPlaceholderText } = render(<SignUp />);
    
    const emailInput = getByPlaceholderText("correo@quire.com");
    fireEvent.changeText(emailInput, "test@email.com");
    
    expect(emailInput.props.value).toBe("test@email.com");
  });
  
  it("updates the phone state when text is entered", () => {
    const { getByPlaceholderText } = render(<SignUp />);
    
    const phoneInput = getByPlaceholderText("Teléfono");
    fireEvent.changeText(phoneInput, "1234567890");
    
    expect(phoneInput.props.value).toBe("1234567890");
  });

  it("handles successful registration", async () => {
    (signup).mockResolvedValueOnce({
      data: { token: 'mockedToken' },
      status: 200,
    });

    signupMock = signup
  
    const { getByPlaceholderText, getByText, getByTestId } = render(<SignUp navigation={mockNavigation} />);
  
    fireEvent.changeText(getByPlaceholderText("correo@quire.com"), "test@quire.com");
    fireEvent.changeText(getByTestId("password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Nombre"), "John Doe");
    fireEvent.press(getByText("REGISTRARME"));
  
    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith({
        email: "test@quire.com",
        password: "password123",
        fullname: "John Doe",
        phone: "", // as we didn't set a phone number in this test
        soft_skills: [],
        tech_skills: [],
      });
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
      expect(storeToken).toHaveBeenCalledWith('mockedToken');
    });
  });

});
