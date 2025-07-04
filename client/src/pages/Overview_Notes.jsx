import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function OverviewNotes() {
  const { user, setUser, loading } = useAuth();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isNotes, setIsNotes] = React.useState([]);

  React.useEffect(() => {
    console.log(loading, user);
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  React.useEffect(() => {
    async function fetchNotes() {
      const response = await fetch("http://localhost:1000/fetchNotes", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setIsNotes(data.notes);
    }
    fetchNotes();
  }, [isLoading]);

  async function deleteNote(id) {
    setIsLoading(true);
    const response = await fetch("http://localhost:1000/deleteNote", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    setIsLoading(false);
  }

  async function logout() {
    const response = await fetch("http://localhost:1000/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser(undefined);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-end">
          <span className="absolute top-10 right-10 block text-center px-5 py-1.5 bg-green-600 text-white font-bold rounded">
            LOADING...
          </span>
        </div>
      )}
      <div className="fixed bottom-10 right-10">
        <span className="rounded-xl bg-black py-4 px-5 text-white font-bold text-xl hover:shadow-xl">
          <a href="/new">+</a>
        </span>
      </div>
      <div className="container mx-auto pt-10 h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl mb-10 border-b-2 w-1/8">
            ALL NOTES...
          </h1>
          {/* <form action={logout}> */}
          <a
            className="bg-black text-white text-xl py-2 px-3 rounded font-bold cursor-pointer"
            onClick={logout}
          >
            Logout
          </a>
          {/* </form> */}
        </div>

        <div className="flex flex-wrap gap-10">
          {isNotes &&
            isNotes.map((el, index) => {
              return (
                <div
                  key={el._id}
                  className="bg-white border-2 border-solid rounded-md px-5 py-3 hover:shadow-xl"
                >
                  <div className="flex justify-center mb-3 gap-3">
                    <a
                      href={`/notes/${el._id}`}
                      className="bg-black text-white py-1 px-2 rounded font-bold cursor-pointer"
                    >
                      View
                    </a>
                    <a
                      href={`/update/${el._id}`}
                      className="bg-black text-white py-1 px-2 rounded font-bold cursor-pointer"
                    >
                      Update
                    </a>
                    <button
                      onClick={() => deleteNote(el._id)}
                      className="bg-black text-white py-1 px-2 rounded font-bold cursor-pointer"
                    >
                      Del
                    </button>
                  </div>
                  <h2 className="font-semibold text-xl">{el.title}</h2>
                  <p className="text-gray-600">{el.body.split(0.5) + "..."}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
