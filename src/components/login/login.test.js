import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "./login";
import { login } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";

jest.mock("../../../api/apiService");
jest.mock("../../../utils/token");

describe("<Login />", () => {
  const mockNavigation = jest.fn();
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
});
