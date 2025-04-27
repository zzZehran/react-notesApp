const mongoose = require("mongoose");
const User = require("./User");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);

// const demoData = {
//   title: "First note",
//   body: "Hello from first note",
// };
// async function addData() {
//   const deleteNote = await Note.deleteMany({});
//   const newNote = new Note(demoData);
//   await newNote.save();
//   console.log(newNote);
// }
// addData();

// async function findData() {
//   const note = await Note.find({ title: "First note" });
//   console.log(note.createdAt);
// }
// findData();

module.exports = Note;
