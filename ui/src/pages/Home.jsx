import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import UserInfo from "./UserInfo";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Search />
        <div className="flex gap-3">
          <div className="bg-red-500 rounded-full h-10 w-10" />
          <div className="bg-red-500 rounded-full h-10 w-10" />
          <div className="bg-red-500 rounded-full h-10 w-10" />
        </div>
      </div>
      <div className="h-96 bg-blue-300 rounded-lg"></div>
    </div>
  );
};

export default Home;
