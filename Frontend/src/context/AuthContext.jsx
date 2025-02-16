import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API from '../Utils/Axios.jsx'
import { Link, useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // 🔹 Check authentication when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/v1/auth/me", {
          withCredentials: true,
        });
        console.log(res)
        setUser(res.data.data.loggedInUser);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        console.log(error);
        setIsAuthenticated(false);
        navigate('/')
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
        "/api/v1/users/login",
        credentials,
        {
          withCredentials: true, // Ensures cookie storage
        }
      );
      setUser(res.data.data.loggedInUser);
      setIsAuthenticated(true);
      toast.success("Logged in successfully!");
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
    window.open("/api/v1/auth/login-with-google", "_self"); // Redirect to backend Google login
    
  };

  // 🔹 Logout function
  const logout = async () => {
    try {
      await axios.post(
        "/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
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
