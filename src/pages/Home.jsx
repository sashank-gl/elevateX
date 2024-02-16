import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import UserInfo from "./UserInfo";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Search />
        <div className="flex gap-3">
          <div className="bg-button rounded-full h-10 w-10" />
          <div className="bg-button rounded-full h-10 w-10" />
          <div className="bg-button rounded-full h-10 w-10" />
        </div>
      </div>
      <div>
        <motion.h1
          initial={{ y: 20, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-9xl font-bold text-center py-12"
        >
          From Blank Canvas to Masterpiece. Craft Your Portfolio
        </motion.h1>
      </div>
    </div>
  );
};

export default Home;
