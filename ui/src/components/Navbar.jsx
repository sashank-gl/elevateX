import React from "react";
import { UserAuth } from "../contexts/AuthContext";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, signOutWithGoogle } = UserAuth();

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
      <div className="flex gap-4 items-center"><Link className="text-xl font-bold hover:underline" to={`/${user.uid}`}>Visit Portfolio</Link>
      <Search />
      <button
        onClick={handleSignOutWithGoogle}
        className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
      >
        Sign Out
      </button></div>
    </div>
  );
};

export default Navbar;
