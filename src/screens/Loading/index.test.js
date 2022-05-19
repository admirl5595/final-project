import React from "react";
import renderer from "react-test-renderer";
import { ActivityIndicator } from "react-native";

// functions for simulating user interaction
import { render, fireEvent } from "@testing-library/react-native";

// import component to be tested
import Loading from "./index";

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
  it("contains loading text", () => {
    const { getByText } = render(<Loading />);

    const text = getByText("Loading");

    expect(text).toBeTruthy();
  });

  it("contains loading spinner", () => {
    const tree = renderer.create(<ActivityIndicator />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
