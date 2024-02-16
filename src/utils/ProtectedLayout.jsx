import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
  return (
    <div className="flex bg-background text-paragraph">
      <div className="w-1/6"><Sidebar /></div>
      <div className="w-5/6 h-screen overflow-y-auto p-4"><Outlet /></div>
    </div>
  );
};

export default ProtectedLayout;
