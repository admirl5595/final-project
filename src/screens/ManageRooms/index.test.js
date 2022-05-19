import React from "react";
import renderer from "react-test-renderer";

// functions for simulating user interaction
import { render, fireEvent } from "@testing-library/react-native";

// import component to be tested
import ManageRooms from "./index";
import PrimaryButton from "src/components/common/PrimaryButton";

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
  it("has add room button", () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <ManageRooms />
    );

    const addRoomBtn = getByText("Add room");

    expect(addRoomBtn).toBeTruthy();
  });

  describe("check room attributes", () => {
    it("shows room number attribute", () => {
      const { getByText } = render(<ManageRooms />);

      const attribute = getByText("Room number");

      expect(attribute).toBeTruthy();
    });
    it("shows patient name attribute", () => {
      const { getByText } = render(<ManageRooms />);

      const attribute = getByText("Patient name");

      expect(attribute).toBeTruthy();
    });
  });
});
