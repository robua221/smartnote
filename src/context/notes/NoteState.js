import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //Get all note

  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWE0MTAyMzNjNGQ1OTlkYzUxOTA4In0sImlhdCI6MTY0MjU3ODUxMH0.nCoaj_WFO49S8k-o2lHdjDRq8gCPiYvj_ZDUA8Rz1iI",
      },
    });
    const json = await response.json();
   

    setNotes(json);
  };

  // Add note 

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWE0MTAyMzNjNGQ1OTlkYzUxOTA4In0sImlhdCI6MTY0MjU3ODUxMH0.nCoaj_WFO49S8k-o2lHdjDRq8gCPiYvj_ZDUA8Rz1iI",
      },
      body: JSON.stringify({title, description, tag }),
    }
  );
  const note = await response.json()
  setNotes(notes.concat(note));

 
  }

  //Delete note

  const deleteNote = async(id) => {
    //API CALL
       //API CALL
       const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWE0MTAyMzNjNGQ1OTlkYzUxOTA4In0sImlhdCI6MTY0MjU3ODUxMH0.nCoaj_WFO49S8k-o2lHdjDRq8gCPiYvj_ZDUA8Rz1iI",
        },
       
      });
  const json = response.json();
 
  //CODE
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit note
  const editNote = async (id, title, description, tag) => {
   
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWE0MTAyMzNjNGQ1OTlkYzUxOTA4In0sImlhdCI6MTY0MjU3ODUxMH0.nCoaj_WFO49S8k-o2lHdjDRq8gCPiYvj_ZDUA8Rz1iI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
const json = response.json();
 

    // logic
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //   }
    // }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
