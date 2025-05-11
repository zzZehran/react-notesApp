import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);
      const response = await fetch("http://localhost:1000/checkSession", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);
    }
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
