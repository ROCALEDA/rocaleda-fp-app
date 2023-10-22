import React from "react";
import { render, fireEvent, waitFor  } from "@testing-library/react-native";
import Login from "./login";
import { login } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/token");

describe("<Login />", () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = { navigate: jest.fn() };
  })
  it("renders the component", () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);
    expect(getByText("Estamos felices de verte de nuevo")).toBeTruthy();
  });

  it("updates email and password state on input change", () => {
    const { getByPlaceholderText } = render(
      <Login navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText("correo@quire.com");
    const passwordInput = getByPlaceholderText("******");

    fireEvent.changeText(emailInput, "test@email.com");
    fireEvent.changeText(passwordInput, "testPassword");

    expect(emailInput.props.value).toBe("test@email.com");
    expect(passwordInput.props.value).toBe("testPassword");
  });

  it('handles login success and navigates to Home', async () => {
    (login).mockResolvedValueOnce({
      data: { token: 'mockedToken' },
      status: 200,
    });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText("correo@quire.com"), "test@quire.com");
    fireEvent.changeText(getByPlaceholderText("******"), "password123");
    fireEvent.press(getByText("INGRESAR"));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("test@quire.com", "password123");
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
    });
  });
});
