import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ViewNote() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  if (!user) {
    navigate("/login");
  }

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
      {note && (
        <>
          <h1 className="text-4xl font-bold">Title</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque,
            dolorem quam recusandae enim, maiores deserunt maxime, ut sit harum
            nam aspernatur dolorum id laboriosam. Soluta, sequi? Quo atque
            maxime unde.
          </p>
        </>
      )}
    </div>
  );
}
