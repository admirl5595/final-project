import React from "react";
import renderer from "react-test-renderer";

// import component to be tested
import Monitor from "./index";
import Chart from "./component";

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

// mock Chart component
jest.mock("./component", () => "component");

describe("check contents", () => {
  it("has chart component", () => {
    const tree = renderer.create(<Chart />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
