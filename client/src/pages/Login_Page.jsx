import React from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isData, setIsData] = React.useState();

  async function registerUser(username, password) {
    setIsLoading(true);
    const response = await fetch("http://localhost:1000/login", {
      method: "POST",
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
      <h1 className="text-center text-3xl font-bold text-black">LOGIN</h1>
      <form action="" className="flex flex-col space-y-4">
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
        <button className="py-1.5 bg-black text-white font-bold rounded">
          LOGIN
        </button>
      </form>
    </div>
  );
}
