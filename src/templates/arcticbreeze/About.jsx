import React from "react";
import { motion } from "framer-motion";
const About = ({ client, photo }) => {
  const { firstName, lastName, professionalTitle, tagline, summary } = client;
  return (
    <div className="h-screen px-12 flex items-center">
      {client && (
        <div className="flex gap-12 items-center">
          <div className="w-2/3 flex flex-col gap-5 justify-center">
            <h2 className="text-2xl font-bold">Hey, I am {`${firstName}`}</h2>
            <p className="text-7xl font-bold text-abreeze-stroke">
              {professionalTitle}
            </p>
            <p className="text-md mb-4">{summary}</p>

            <a href="#projects">
              <button className="bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg">
                Browse Projects
              </button>
            </a>
          </div>
          <div className="w-1/3 flex justify-center">
            {/* <div className="border-2 p-6 rounded-full"> */}
            {photo && (
              <div className="h-80 w-80 rounded-full overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={photo}
                  alt="Profile"
                  className="h-full w-full object-cover "
                />
              </div>
            )}
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
