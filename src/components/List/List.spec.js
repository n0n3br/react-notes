import React from "react";
import { render, cleanup } from "@testing-library/react";
import List from "./List";

describe("List", () => {
  afterEach(cleanup);

  it("should render the list", () => {
    const notes = [
      { id: 1, title: "title", body: "body", created: new Date() },
      { id: 2, title: "title2", body: "body2", created: new Date() }
    ];
    const { container } = render(<List notes={notes} />);
    expect(container.getElementsByClassName("note").length).toBe(2);
  });

  it("should render empy list message", () => {
    const notes = [];
    const { container, getByText } = render(<List notes={notes} />);
    expect(container.getElementsByClassName("note").length).toBe(0);
    expect(getByText(/No notes found./)).toBeTruthy();
  });
});
