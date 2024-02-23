import React from "react";
import { motion } from "framer-motion";
const About = ({ client, photo }) => {
  const { firstName, professionalTitle, summary } = client;
  return (
    <div className="flex h-screen items-center px-12">
      {client && (
        <div className="flex items-center gap-12">
          <div className="flex w-2/3 flex-col justify-center gap-5">
            <h2 className="text-2xl font-bold">Hey, I am {`${firstName}`}</h2>
            <p className="text-7xl font-bold text-abreeze-stroke">
              {professionalTitle}
            </p>
            <p className="text-md mb-4">{summary}</p>

            <a href="#projects">
              <button className="rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText">
                Browse Projects
              </button>
            </a>
          </div>
          <div className="flex w-1/3 justify-center">
            {photo && (
              <div className="h-80 w-80 overflow-hidden rounded-full">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={photo}
                  alt="Profile"
                  className="h-full w-full object-cover "
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
