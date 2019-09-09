import React from "react";
import * as notesService from "../services/notes";

import Nav from "../components/Nav";
import List from "../components/List/List";
import NoteModal from "../components/NoteModal";

const Notes = () => {
  const [notes, setNotes] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [note, setNote] = React.useState({});

  React.useEffect(() => {
    const notes = notesService.get();
    setNotes(notes);
  }, []);

  const saveNote = () => {
    if (note.id) {
      notesService.edit(note);
    } else {
      notesService.create(note);
    }
    setNotes(notesService.get());
  };

  const deleteNote = id => {
    notesService.remove(id);
    setNotes(notesService.get());
  };

  return (
    <React.Fragment>
      <Nav
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setNote={setNote}
      />
      <List
        notes={notes}
        setNote={setNote}
        deleteNote={deleteNote}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <NoteModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
        saveNote={saveNote}
        note={note}
        setNote={setNote}
      />
    </React.Fragment>
  );
};

export default Notes;
