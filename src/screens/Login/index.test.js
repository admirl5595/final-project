import React from "react";
import renderer from "react-test-renderer";

// functions for simulating user interaction
import { render, fireEvent } from "@testing-library/react-native";

// import component to be tested
import LoginScreen from "./index";

// mock hooks from react native navigation
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      params: { patient: 1 },
    }),
  };
});

// mock hooks from react native navigation
jest.mock("../../../firebase-config", () => {
  const actualConfig = jest.requireActual("../../../firebase-config");
  return {
    ...actualConfig,
    auth: { currentUser: { displayName: "bob" } },
  };
});

describe("check contents", () => {
  it("has email input field", () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <LoginScreen />
    );

    const emailInput = getByPlaceholderText("Email");

    expect(emailInput).toBeTruthy();
  });

  it("has password input field", () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <LoginScreen />
    );

    const passwordInput = getByPlaceholderText("Password");

    expect(passwordInput).toBeTruthy();
  });
});
