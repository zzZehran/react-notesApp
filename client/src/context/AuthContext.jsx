import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("http://localhost:1000/checkSession", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      console.log("AuthContext Data Response: ", data);
      setUser(data.user);
    }
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
