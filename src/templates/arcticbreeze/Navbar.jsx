import React from "react";

const Navbar = ({ client }) => {
  return (
    <div className="fixed right-0 top-0 flex h-16 w-full items-center justify-between rounded-bl-full bg-abreeze-background px-6 py-2 pl-10 font-semibold text-stroke">
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
