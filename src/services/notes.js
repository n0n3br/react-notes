import * as ls from "../helpers/localstorage";
import id from "../helpers/id";

export const get = () => ls.get("notes") || [];
export const create = note => {
  const { title, body } = note;
  if (!title || !body) return false;
  const notes = get();
  const newNote = { id: id(), title, body, created: new Date(), updated: null };
  ls.set("notes", [...notes, newNote]);
  return get();
};
export const edit = note => {
  const { id, title, body } = note;
  if (!id || !title || !body) return false;
  const notes = get();
  ls.set(
    "notes",
    notes.map(note => {
      if (note.id === id) {
        return { id, title, body, updated: new Date() };
      } else return note;
    })
  );
  return get();
};
export const remove = id => {
  if (!id) return false;
  const notes = get();
  ls.set("notes", notes.filter(note => note.id !== id));
  return get();
};
