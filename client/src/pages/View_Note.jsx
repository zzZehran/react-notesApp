import React from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ViewNote() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  const { id } = useParams();
  const [note, setNote] = React.useState();

  React.useEffect(() => {
    async function fetchNote() {
      const response = await fetch(`http://localhost:1000/fetchNotes/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.note);
      setNote(data.note);
    }
    fetchNote();
  }, []);
  return (
    <div className="container mx-auto flex flex-col mt-10 gap-10">
      <a
        href="/notes"
        className="bg-black text-white py-1 px-2 rounded font-bold cursor-pointer w-fit"
      >
        Go back
      </a>
      {note && (
        <>
          <h1 className="text-4xl font-bold">{note.title}</h1>
          <p className="text-lg">{note.body}</p>
        </>
      )}
    </div>
  );
}
