import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("http://localhost:1000/checkSession", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
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
