import React from "react";
import renderer from "react-test-renderer";

import Home from "./index";

// mock usage of navigation prop (from useNavigation hook)
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe("<Home />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
