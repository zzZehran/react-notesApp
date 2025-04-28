import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function CreateNote() {
  let navigate = useNavigate();

  const { user, setUser } = useAuth();

  async function submitNote(title, body) {
    const response = await fetch("http://localhost:1000/newNote", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, user: user._id }),
    });
    const data = await response.json();
    if (data.message === "Success") {
      navigate("/notes");
    }
  }

  function handleForm(formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    submitNote(title, body);
  }

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-10 space-y-10">
      <h2 className="text-3xl font-bold">New Note</h2>
      <form action={handleForm} className="flex flex-col w-1/2 space-y-5">
        <input
          type="text"
          className="px-3 py-1 bg-white border-2 border-solid rounded"
          placeholder="Title"
          name="title"
        />
        <textarea
          className="px-3 py-1 bg-white border-2 border-solid rounded resize-y h-100"
          placeholder="Enter your notes here..."
          name="body"
        ></textarea>
        <button className="py-2 bg-black text-white font-bold rounded text-xl">
          Add
        </button>
      </form>
    </div>
  );
}
