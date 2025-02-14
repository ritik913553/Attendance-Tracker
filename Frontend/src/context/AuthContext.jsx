import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Check authentication when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/auth/me", {
          withCredentials: true,
        });
        console.log("Loggedin User:", res);

        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 🔹 Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        credentials,
        {
          withCredentials: true, // Ensures cookie storage
        }
      );
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      if (error.status == 405) {
        toast.error("Please Verify your email!");
      }
      console.error("Login failed", error);
      return false;
    }
  };

  // 🔹 Google Login
  const googleLogin = () => {
    window.open("http://localhost:8000/api/v1/auth/login-with-google", "_self"); // Redirect to backend Google login
    console.log("Loogdoin successfully")
  };

  // 🔹 Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading,googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth state
export const useAuth = () => useContext(AuthContext);
