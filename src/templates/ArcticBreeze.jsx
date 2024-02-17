import React from "react";
import Navbar from "./arcticbreeze/Navbar";
import About from "./arcticbreeze/About";
import Projects from "./arcticbreeze/Projects";
import Contact from "./arcticbreeze/Contact";
import Education from "./arcticbreeze/Education";

const ArcticBreeze = ({ photo, client }) => {
  return (
    <div className="bg-abreeze-background text-abreeze-paragraph">
      <Navbar client={client} />

      <div id="about">
        <About client={client} photo={photo} />
      </div>

      <div id="projects">
        <Projects client={client} />
      </div>

      <div id="education">
        <Education client={client} />
      </div>

      <div id="contact">
        <Contact client={client} photo={photo} />
      </div>
    </div>
  );
};

export default ArcticBreeze;
