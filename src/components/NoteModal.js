import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default props => {
  const { note, setNote, visible, setModalVisible, saveNote } = props;
  const handleClose = () => setModalVisible(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const saveDisabled = !note.title || !note.body;

  const handleSave = () => {
    saveNote();
    handleClose();
  };

  const titleRef = React.useRef();

  React.useEffect(() => {
    if (visible) {
      titleRef.current.focus();
    }
  }, [visible]);

  return (
    <Modal show={visible} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {(note.id ? "Edit " : "Create new ") + " note"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={handleChange}
              name="title"
              ref={titleRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              value={note.body}
              onChange={handleChange}
              name="body"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          disabled={saveDisabled}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button variant="outline-danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
