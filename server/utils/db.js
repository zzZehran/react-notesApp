const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/notesApp")
  .then(() => console.log("Connected to notesApp DB"))
  .catch((err) => console.log("Some error has occured! || ", err.message));
