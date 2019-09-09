import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { toBeDisabled, toBeEnabled } from "@testing-library/jest-dom";
import NoteModal from "./NoteModal";

expect.extend({ toBeDisabled, toBeEnabled });

describe("NoteModal", () => {
  afterEach(cleanup);

  it("should not be visible when not needed", () => {
    const { queryByText } = render(<NoteModal visible={false} note={{}} />);
    expect(queryByText(/Save/)).toBeNull();
  });

  it("should be visible when needed", () => {
    const { queryByText } = render(<NoteModal visible={true} note={{}} />);
    expect(queryByText(/Save/)).toBeTruthy();
  });

  it("should close the modal when Cancel button clicked", () => {
    const setModalVisible = jest.fn();
    const { getByText } = render(
      <NoteModal visible={true} note={{}} setModalVisible={setModalVisible} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setModalVisible.mock.calls.length).toBe(1);
    expect(setModalVisible).toBeCalledWith(false);
  });

  it("should disable the save button when title is empty", () => {
    const { getByText } = render(
      <NoteModal visible={true} note={{ body: "a" }} />
    );
    expect(getByText(/Save/)).toBeDisabled();
  });

  it("should disable the save button when body is empty", () => {
    const { getByText } = render(
      <NoteModal visible={true} note={{ title: "a" }} />
    );
    expect(getByText(/Save/)).toBeDisabled();
  });

  it("should enable the save button when body and title are note empty", () => {
    const { getByText } = render(
      <NoteModal visible={true} note={{ title: "a", body: "a" }} />
    );
    expect(getByText(/Save/)).toBeEnabled();
  });

  it("should have title create new note when no data passed", () => {
    const { getByText } = render(<NoteModal visible={true} note={{}} />);
    expect(getByText(/Create new note/)).toBeTruthy();
  });

  it("should have title edit note when data passed", () => {
    const { getByText } = render(
      <NoteModal visible={true} note={{ id: 1, title: "a", body: "d" }} />
    );
    expect(getByText(/Edit note/)).toBeTruthy();
  });

  it("should load note data into form", () => {
    const { queryByPlaceholderText } = render(
      <NoteModal visible={true} note={{ id: 1, title: "a", body: "d" }} />
    );
    expect(queryByPlaceholderText(/Title/).value).toBe("a");
    expect(queryByPlaceholderText(/Description/).value).toBe("d");
  });

  it("should save note changes", () => {
    const saveNote = jest.fn();
    const setNote = jest.fn();
    const { queryByPlaceholderText, queryByText } = render(
      <NoteModal
        visible={true}
        note={{ id: 1, title: "a", body: "a" }}
        saveNote={saveNote}
        setNote={setNote}
      />
    );
    // queryByPlaceholderText(/Title/).value = "b";
    fireEvent.change(queryByPlaceholderText(/Title/), {
      target: { value: "b" }
    });
    expect(setNote.mock.calls.length).toBe(1);
    expect(setNote).toBeCalledWith({ id: 1, title: "b", body: "a" });
    jest.resetAllMocks();
    fireEvent.change(queryByPlaceholderText(/Description/), {
      target: { value: "d" }
    });
    expect(setNote.mock.calls.length).toBe(1);
    expect(setNote).toBeCalledWith({ id: 1, title: "a", body: "d" });
    fireEvent.click(queryByText("Save"));
    expect(saveNote.mock.calls.length).toBe(1);
  });
});
