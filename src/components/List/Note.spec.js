import React from "react";
import {
  render,
  cleanup,
  queryByAttribute,
  fireEvent
} from "@testing-library/react";

import Note from "./Note";

describe("/List/Note", () => {
  const getById = queryByAttribute.bind(null, "id");

  afterEach(cleanup);

  it("should render the title, body and date", async () => {
    const note = { id: 1, title: "title", body: "body", created: new Date() };
    const dom = render(<Note note={note} />);
    const container = dom.container;
    const title = container.getElementsByClassName("note-title")[0];
    expect(title.innerHTML).toBe(note.title);
    const body = container.getElementsByClassName("note-body")[0];
    expect(body.innerHTML).toBe(note.body);
    const date = container.getElementsByClassName("note-date")[0];
    expect(date.innerHTML).toBe(note.created.toLocaleString());
  });

  it("should render the updated instead of created", async () => {
    const updated = new Date();
    updated.setHours(20);
    const note = {
      id: 1,
      title: "title",
      body: "body",
      created: new Date(),
      updated
    };
    const { container } = render(<Note note={note} />);
    const date = container.getElementsByClassName("note-date")[0];
    expect(date.innerHTML).toBe(note.updated.toLocaleString());
  });

  it("should delete the note ", () => {
    const note = { id: 10, title: "title", body: "body", created: new Date() };
    const deleteNote = jest.fn();
    const { getByText } = render(<Note note={note} deleteNote={deleteNote} />);
    fireEvent.click(getByText("Delete"));
    expect(deleteNote.mock.calls.length).toBe(1);
    expect(deleteNote).toBeCalledWith(10);
  });

  it("should edit the note ", () => {
    const note = { id: 1, title: "title", body: "body", created: new Date() };
    const setNote = jest.fn();
    const setModalVisible = jest.fn();
    const { getByText } = render(
      <Note note={note} setNote={setNote} setModalVisible={setModalVisible} />
    );
    fireEvent.click(getByText("Edit"));
    expect(setNote.mock.calls.length).toBe(1);
    expect(setNote).toBeCalledWith(note);
    expect(setModalVisible.mock.calls.length).toBe(1);
    expect(setModalVisible).toBeCalledWith(true);
  });
});
