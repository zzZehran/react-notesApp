const express = require("express");
const cors = require("cors");
const session = require("express-session");

const db = require("./utils/db");
const bcrypt = require("bcrypt");
const Note = require("./schema/Notes");
const User = require("./schema/User");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const sessionOptions = {
  secret: "watashinosoulsociety",
  resave: "false",
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};
app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("Welcome to express!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    // console.log(user);
    req.session.user = user;
    res.send({ message: "Welcome!", user: req.session.user });
  } else {
    res.send({ message: "Invalid password or username!" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    password: hash,
  });
  await newUser.save();
  console.log(newUser);
  res.send({ message: "Successfully created user!" });
});

app.post("/createNote", async (req, res) => {
  const { title, body, user = "680e5fecd64ace2f00e311a6" } = req.body;
  const newNote = new Note({
    title,
    body,
    user,
  });
  await newNote.save();
  console.log(newNote);
  res.send(newNote);
});

app.get("/fetchNotes", async (req, res) => {
  if (req.session.user) {
    const notes = await Note.find({ user: req.session.user._id });
    res.status(200).send({ notes, message: "Successfully fetched notes" });
  } else {
    res.status(403).send({ message: "Login or sign up first!" });
  }
});

app.post("/checkSession", (req, res) => {
  if (req.session.user) {
    console.log("User is there", req.session.user);
    res.status(200).send({ user: req.session.user });
  } else {
    console.log("User is not there", req.session.user);
    res.status(403).send({ message: "Please login or sign up!" });
  }
});

const port = 1000;
app.listen(port, () => {
  console.log(`On port ${port}`);
});
