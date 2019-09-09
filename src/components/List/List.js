import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Note from "./Note";
export default props => {
  const { notes, deleteNote, setModalVisible, setNote } = props;
  const noNotesStyle = {
    marginTop: "calc(50vh - 80px)",
    textAlign: "center",
    padding: "20px"
  };
  const listStyle = {
    marginTop: "80px"
  };
  const colStyle = {
    padding: "15px"
  };
  return (
    <Container style={listStyle}>
      <Row>
        {notes.length ? (
          notes.map(note => (
            <Col xs={12} sm={6} lg={4} style={colStyle} key={note.id}>
              <Note
                note={note}
                deleteNote={deleteNote}
                setModalVisible={setModalVisible}
                setNote={setNote}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="info" style={noNotesStyle}>
              <h4>No notes found.</h4>
              <p>Start creating one by clicking the upper right button</p>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};
