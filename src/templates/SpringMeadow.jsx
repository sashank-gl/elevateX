import React from "react";
import About from "./springmeadow/About";
import Projects from "./springmeadow/Projects";
import Contact from "./springmeadow/Contact";
import Education from "./springmeadow/Education";
import { motion } from "framer-motion";

const SpringMeadow = ({ photo, client }) => {
  return (
    <div className="bg-springm-background text-springm-paragraph">
      <div className="h-full w-1/2 overflow-y-auto">
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
      <div className="fixed right-0 top-0 flex h-screen w-1/2 justify-center">
        {photo && (
          <div className="relative h-full w-full object-cover">
            <motion.img
              src={photo}
              alt="Profile"
              className="h-full w-full object-cover "
            />
            <div className="absolute right-0 top-0 h-full w-full bg-springm-secondary/40 transition-colors duration-700 hover:bg-springm-tertiary/40" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpringMeadow;
