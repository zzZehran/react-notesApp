import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function OverviewNotes() {
  const { user, setUser } = useAuth();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isNotes, setIsNotes] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  React.useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true);
      const response = await fetch("http://localhost:1000/fetchNotes", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setIsNotes(data.notes);
      setIsLoading(false);
    }
    fetchNotes();
  }, []);

  return (
    <>
      <div className="fixed bottom-10 right-10">
        <span className="rounded-xl bg-black py-4 px-5 text-white font-bold text-xl hover:shadow-xl">
          +
        </span>
      </div>
      <div className="container mx-auto pt-10 h-screen">
        <h1 className="font-bold text-3xl mb-10 border-b-2 w-1/8">
          ALL NOTES...
        </h1>
        <div className="flex flex-wrap gap-10">
          {isNotes.map((el, index) => {
            return (
              <div
                key={index}
                className="bg-white border-2 border-solid rounded-md px-5 py-3 hover:shadow-xl"
              >
                <h2 className="font-semibold text-xl">{el.title}</h2>
                <p className="text-gray-600">{el.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
