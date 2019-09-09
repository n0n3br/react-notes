import React from "react";
import { Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiReact } from "@mdi/js";

export default props => {
  const { setModalVisible, setNote } = props;
  const handleModalOpen = () => {
    setNote({});
    setModalVisible(true);
  };
  const iconStyle = {
    marginRight: "20px"
  };

  return (
    <Navbar fixed="top" variant="dark" bg="info">
      <Navbar.Brand className="mr-auto">
        <Icon
          style={iconStyle}
          path={mdiReact}
          color="white"
          size={"1em"}
          spin
        />
        React Notes
      </Navbar.Brand>
      <Form>
        <Button variant="outline-light" onClick={handleModalOpen}>
          Create new note
        </Button>
      </Form>
    </Navbar>
  );
};
