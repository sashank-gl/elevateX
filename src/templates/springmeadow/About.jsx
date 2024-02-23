import React from "react";
import { FaArrowDown } from "react-icons/fa";

const About = ({ client, photo }) => {
  const { firstName, professionalTitle, summary } = client;
  return (
    <div className="flex h-screen items-center px-12">
      {client && (
        <div className="flex items-center gap-12">
          <div className="flex flex-col justify-center gap-8 text-center">
            <div className="flex justify-center">
              <p className=" flex h-96 w-96 items-center justify-center rounded-full bg-springm-secondary text-center text-7xl font-bold text-springm-background">
                {firstName}
              </p>
            </div>
            <h2 className="text-2xl font-bold">{`${professionalTitle}`}</h2>
            <p className="text-md mb-4">{summary}</p>

            <a href="#projects">
              <button className="animate-bounce rounded-full bg-springm-tertiary p-4 text-springm-buttonText">
                <FaArrowDown />
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
