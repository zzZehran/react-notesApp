import React from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isData, setIsData] = React.useState();
  const { user, setUser, loading } = useAuth();

  async function registerUser(username, password) {
    setIsLoading(true);
    const response = await fetch("http://localhost:1000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
  }

  function handleForm(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    registerUser(username, password);
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-5">
      {isLoading && (
        <div>
          <span className="block text-center px-5 py-1.5 bg-green-600 text-white font-bold rounded">
            LOADING...
          </span>
        </div>
      )}
      {user && user.username && (
        <div>
          <span className="block text-center px-5 py-1.5 bg-green-600 text-white font-bold rounded">
            {user.username}
            <br />
            {user._id}
          </span>
        </div>
      )}
      <h1 className="text-center text-3xl font-bold text-black">REGISTER</h1>
      <form action={handleForm} className="flex flex-col space-y-4">
        <input
          type="text"
          className="px-3 py-1 bg-white border-2 border-solid rounded"
          placeholder="Username"
          name="username"
        />
        <input
          type="password"
          className="px-3 py-1 bg-white border-2 border-solid rounded"
          placeholder="Password"
          name="password"
        />
        <button className="py-1.5 mb-2 bg-black text-white font-bold rounded">
          REGISTER
        </button>
        <h6 className="text-sm">
          Already registered?
          <a href="/login">
            <span className="text-blue-600 ml-1">Login here!</span>
          </a>
        </h6>
      </form>
    </div>
  );
}
