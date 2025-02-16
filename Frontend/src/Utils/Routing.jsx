import { Route, Routes } from "react-router-dom";
import Login from "../Components/Authentication/Login/Login";
import Account_Deatils from "../Components/Authentication/Login/Account_Deatils";
import { useAuth } from "../context/AuthContext.jsx";
import Dashboard from "../Components/Dashboard/Dashboard.jsx";
import LandingPage from "../Components/LandingPage/LandingPage.jsx";
function Routing() {
  const {isAuthenticated}= useAuth();
  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? < Dashboard/> : <LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Account_Deatils />} />
    </Routes>
  );
}
export default Routing;
