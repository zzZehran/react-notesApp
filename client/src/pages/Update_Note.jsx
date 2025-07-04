import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";

export default function UpdateNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser, loading } = useAuth();
  const [data, setData] = useState();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  React.useEffect(() => {
    async function fetchNote() {
      const response = await fetch(`http://localhost:1000/fetchNotes/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("response", response);
      console.log("data", data.message);
      setData(data.note);
    }
    fetchNote();
  }, []);

  async function submitNote(title, body) {
    const response = await fetch(`http://localhost:1000/updateNote/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, user: user._id }),
    });
    const data = await response.json();
    if (data.message === "Success") {
      navigate(`/notes/${id}`);
    }
  }

  function handleForm(formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    submitNote(title, body);
  }

  return (
    <div className="container flex flex-col justify-center items-center mx-auto mt-10 space-y-10">
      <a
        href="/notes"
        className="bg-black text-white py-1 px-2 rounded font-bold cursor-pointer w-fit"
      >
        Go back
      </a>
      {data && (
        <form action={handleForm} className="flex flex-col w-1/2 space-y-5">
          <input
            type="text"
            className="px-3 py-1 bg-white border-2 border-solid rounded"
            placeholder="Title"
            name="title"
            defaultValue={data.title}
          />
          <textarea
            className="px-3 py-1 bg-white border-2 border-solid rounded resize-y h-100"
            placeholder="Enter your notes here..."
            name="body"
            defaultValue={data.body}
          ></textarea>
          <button className="py-2 bg-black text-white font-bold rounded text-xl">
            Add
          </button>
        </form>
      )}
    </div>
  );
}
