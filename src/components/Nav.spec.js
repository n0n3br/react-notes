import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Nav from "./Nav";

describe("Nav", () => {
  afterEach(cleanup);

  it("should render the title and the new note button", () => {
    const { getByText } = render(<Nav />);
    expect(getByText("React Notes")).toBeTruthy();
    expect(getByText(/Create new note/)).toBeTruthy();
  });

  it("should show the new note modal", () => {
    const setModalVisible = jest.fn();
    const setNote = jest.fn();
    const { getByText } = render(
      <Nav setModalVisible={setModalVisible} setNote={setNote} />
    );
    fireEvent.click(getByText(/Create new note/));
    expect(setModalVisible.mock.calls.length).toBe(1);
    expect(setNote.mock.calls.length).toBe(1);
    expect(setModalVisible).toBeCalledWith(true);
    expect(setNote).toBeCalledWith({});
  });
});
