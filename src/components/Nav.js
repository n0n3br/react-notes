import React from "react";
import { Navbar, Form, Button } from "react-bootstrap";

export default props => {
  const { setModalVisible, setNote } = props;
  const handleModalOpen = () => {
    setNote({});
    setModalVisible(true);
  };
  return (
    <Navbar fixed="top" variant="dark" bg="info">
      <Navbar.Brand className="mr-auto">React Notes</Navbar.Brand>
      <Form>
        <Button variant="outline-light" onClick={handleModalOpen}>
          Create new note
        </Button>
      </Form>
    </Navbar>
  );
};
