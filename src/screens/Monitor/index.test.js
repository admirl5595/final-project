import React from "react";
import renderer from "react-test-renderer";

import Chart from "./component";
import HeaderAndIcon from "../../components/common/HeaderAndIcon";
import * as hooks from "src/hooks/useOrientation";

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

// mock Chart component
jest.mock("./component", () => "component");

jest.mock("src/hooks/useOrientation", () => ({
  useOrientation: () => "LANDSCAPE",
}));

describe("check contents", () => {
  it("has chart component", () => {
    const tree = renderer.create(<Chart />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("has icon in portrait mode", () => {
    // mock orientation hook

    const tree = renderer.create(<HeaderAndIcon />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
