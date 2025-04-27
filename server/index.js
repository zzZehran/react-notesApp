const express = require("express");
const cors = require("cors");

const db = require("./utils/db");
const bcrypt = require("bcrypt");
const Note = require("./schema/Notes");
const User = require("./schema/User");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to express!");
});
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    password: hash,
  });
  // await newUser.save();
  console.log(newUser);
  res.send({ message: "Successfully created user!" });
});

app.post("/createNote", async (req, res) => {
  const { title, body, user = "6808b207a8680086684f279d" } = req.body;
  const newNote = new Note({
    title,
    body,
    user,
  });
  await newNote.save();
  console.log(newNote);
});

const port = 1000;
app.listen(port, () => {
  console.log(`On port ${port}`);
});
