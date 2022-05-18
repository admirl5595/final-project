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

it("input field exists", () => {
  const { getByPlaceholderText } = render(<InsertObservationScreen />);

  const input = getByPlaceholderText("Description");

  expect(input).toBeTruthy();
});

it("header exists", () => {
  const { getByText } = render(<InsertObservationScreen />);

  // make regular expression
  const exp = /Insert observation/;

  // check for substring in header
  const header = getByText(exp);

  // check if header with given text exists
  expect(header).toBeTruthy();
});

it("submit button exists", () => {
  const { getByText } = render(<InsertObservationScreen />);

  const button = getByText("submit");

  expect(button.props.children).toBe("submit");
});

it("input field changes", () => {
  const { getByPlaceholderText, getByText, getAllByText } = render(
    <InsertObservationScreen />
  );

  const input = getByPlaceholderText("Description");

  fireEvent.changeText(input, "John Doe\nreport: he is terribly ill");

  expect(input.props.value).toBe("John Doe\nreport: he is terribly ill");
});
