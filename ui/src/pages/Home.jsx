import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import UserInfo from "./UserInfo";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <UserInfo />
    </div>
  );
};

export default Home;
