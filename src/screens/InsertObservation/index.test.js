import React from "react";
import renderer from "react-test-renderer";
import InsertObservationScreen from "./index";
import { render, fireEvent } from "@testing-library/react-native";

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

describe("sumbits observation", () => {
  it("input field changes", () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <InsertObservationScreen />
    );

    const input = getByPlaceholderText("Description");

    fireEvent.changeText(input, "Hello");

    expect(input.value).toBe("Hello");
  });
});
