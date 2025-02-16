import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {

  const { user ,logout} = useAuth();
  console.log(user);
  return (
    <div className="text-white  p-10">
      <h1>Dashboard</h1>
      <div className="flex mt-10 justify-between items-center ">
        <p className="">Welcome {user?.fullName}</p>
        <button onClick={logout} className="px-3 py-1 border-1 cursor-pointer"> Logout </button>
      </div>
      <img className="h-32 w-32 bg-red-400" src={user?.profilePic} alt="" />
    </div>
  );
};
export default Dashboard;
