import React from "react";
import { motion } from "framer-motion";
const About = ({ client, photo }) => {
  const { firstName, lastName, professionalTitle, tagline, summary } =
    client;
  return (
    <div className="h-screen px-12 flex items-center">
      {client && (
        <div className="flex gap-12 items-center">
          <div className="w-1/3 flex justify-center">
            {photo && (
              <div className="h-[27rem] w-[21rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  src={photo}
                  alt="Profile"
                  className="h-full w-full object-cover grayscale contrast-100"
                />
              </div>
            )}
          </div>
          <div className="w-2/3 flex flex-col gap-5 justify-center">
            <h2 className="text-2xl font-bold">
              Hello, I am {`${firstName} ${lastName}`}
            </h2>

            <p className="text-2xl font-bold">{professionalTitle}</p>
            <p className="text-7xl font-bold">{tagline}</p>
            <p className="text-md mb-4">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
