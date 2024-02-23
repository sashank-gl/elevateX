import React from "react";

const Navbar = () => {
  return (
    <div className="fixed right-0 top-0 flex h-16 items-center justify-end rounded-bl-full bg-black px-6 py-2 pl-10 font-semibold text-white">
      <nav className="flex gap-4">
        <a href="#about">About Me</a>
        <a href="#work">My Work</a>
        <a href="#contact">Contact Me</a>
      </nav>
    </div>
  );
};

export default Navbar;
