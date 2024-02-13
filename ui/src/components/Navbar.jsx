import React, { useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import Search from "./Search";
import { Link } from "react-router-dom";
import AllTemplates from "../pages/AllTemplates";

const Navbar = () => {
  const { user, signOutWithGoogle } = UserAuth();
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSignOutWithGoogle = async () => {
    try {
      await signOutWithGoogle();
      console.log("Signed Out working");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-200 h-16 px-4 flex items-center justify-between">
      <div className="text-3xl font-bold">{user?.displayName}</div>
      <div className="flex gap-4 items-center">
        <Link className="text-xl font-bold hover:underline" to={`/${user.uid}`}>
          View My Portfolio
        </Link>
        <Search />
        <button
          onClick={() => {
            setShowTemplates(true);
          }}
          className="bg-emerald-600 text-white font-semibold p-2 rounded-lg px-4"
        >
          Select Template
        </button>
        <button
          onClick={handleSignOutWithGoogle}
          className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
        >
          Sign Out
        </button>
      </div>
      {showTemplates && (
        <div className="fixed inset-0 m-5 p-5 rounded-lg bg-white">
          <button
            onClick={() => {
              setShowTemplates(false);
            }}
            className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
          >
            Close
          </button>
          <AllTemplates />
        </div>
      )}
    </div>
  );
};

export default Navbar;
