import React, { useState } from "react";

const Navbar = ({ client }) => {
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className="fixed left-0 top-0 flex w-1/2 justify-between gap-2 bg-springm-background p-4 text-2xl">
      <a
        onClick={() => setShowNav(false)}
        className="hover:bg-springm-highlight hover:text-springm-secondary"
        href="#about"
      >
        About Me
      </a>
      <a
        onClick={() => setShowNav(false)}
        className="hover:bg-springm-highlight hover:text-springm-secondary"
        href="#projects"
      >
        Projects
      </a>
      <a
        onClick={() => setShowNav(false)}
        className="hover:bg-springm-highlight hover:text-springm-secondary"
        href="#education"
      >
        Education
      </a>
      <a
        onClick={() => setShowNav(false)}
        className="hover:bg-springm-highlight hover:text-springm-secondary"
        href="#contact"
      >
        Contact Me
      </a>
    </nav>
  );
};

export default Navbar;
