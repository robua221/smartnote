const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");

//Route1:get all the notes using: GET"api/auth/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("internal server occured");
    console.log(error);
  }
});

//Route2:Add a new note using: POST"api/auth/addnewnote
router.post(
  "/addnote",
  [
    body("title").isLength({ min: 3 }),
    body(
      "description",
      "description lendth must be atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      res.status(500).send("internal server occured");
      console.log(error);
    }
  }
);
//Route 3:update note using: PUT"api/auth/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //create a newnote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("internal server occured");
    console.log(error);
  }
});
//Route 4:delete note using: DELETE"api/auth/deletenote/id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Find the note to delete and delete it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //allow deleteion only if the user owns it
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Succes: "NOTE DELETED", note: note });
  } catch (error) {
    res.status(500).send("internal server occured");
    console.log(error);
  }
});
module.exports = router;
