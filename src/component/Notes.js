import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,
    etag:currentNote.tag})
   
    
  };
  const handleClick = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              //Modal body
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description"  className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Add Note
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
        {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
