import React from "react";

import { Card } from "react-bootstrap";

export default props => {
  const { note, deleteNote, setModalVisible, setNote } = props;

  const handleDelete = () => {
    deleteNote(note.id);
  };

  const handleEdit = () => {
    setNote(note);
    setModalVisible(true);
  };
  const titleStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  return (
    <Card className="note">
      <Card.Body>
        <Card.Title style={titleStyle} className="note-title">
          {note.title}
        </Card.Title>

        <Card.Text as="div">
          <p className="note-body">{note.body}</p>
          <p>
            <small className="note-date">
              {new Date(note.updated || note.created).toLocaleString()}
            </small>
          </p>
        </Card.Text>
        <Card.Link href="#" onClick={handleEdit}>
          Edit
        </Card.Link>
        <Card.Link href="#" onClick={handleDelete}>
          Delete
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
