import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ client }) => {
  return (
    <div className="fixed top-0 right-0 rounded-bl-full h-16 px-6 pl-10 py-2 bg-abreeze-background text-stroke font-semibold flex items-center justify-between w-full">
      <div>{client.brandName || client.firstName}</div>
      <nav className="flex gap-4">
        <a href="#about">About Me</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact Me</a>
      </nav>
    </div>
  );
};

export default Navbar;
