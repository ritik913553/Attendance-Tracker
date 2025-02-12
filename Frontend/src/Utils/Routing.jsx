import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Authentication/Login/Login";
import Account_Deatils from "../Components/Authentication/Login/Account_Deatils";
function Routing (){
    return (
        <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/newuser" element={<Account_Deatils />} />
      </Routes> 
    )
}
export default Routing ;