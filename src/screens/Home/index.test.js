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
  it("dummy test", () => {
    expect(true).toBeTruthy();
  });
});
