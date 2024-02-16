import { motion } from "framer-motion";
import React from "react";

const MyWork = ({ client }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white/5 pt-16">
      <p className="text-4xl text-center font-bold">My Recent Work</p>
      <div className="min-h-2/3 flex flex-col justify-center items-center p-12 px-24 gap-12">
        {client.projects &&
          client.projects.map((project, index) => (
            <div key={index} className="flex  justify-center w-full gap-12">
              <div className="w-1/3">
                <div className="flex flex-col justify-center gap-5 bg-white text-black h-80 w-80 px-8 hover:shadow-md overflow-hidden">
                  <motion.p
                    className={`font-bold text-center ${
                      project.name.length < 5
                        ? "text-7xl"
                        : project.name.length < 10
                        ? "text-5xl"
                        : "text-3xl"
                    }`}
                  >
                    {project.name}
                  </motion.p>
                </div>
              </div>
              <div className="w-2/3 flex flex-col justify-center pr-36 text-xl">
                <div className="flex flex-col gap-4">
                  <p className="italic">{project.description}</p>
                  {project.startDate && project.endDate && (
                    <p className="text-sm text-white/75 italic">
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate)}
                    </p>
                  )}
                  <div>
                    <p className="font-semibold italic mt-2">{project.stack}</p>
                  </div>
                  <div className="flex gap-20 pt-8">
                    <a
                      href={project.projectUrl}
                      className="bg-white text-black py-2 px-4 rounded-lg"
                    >
                      View Project
                    </a>
                    <a
                      href={project.repositoryUrl}
                      className="bg-white text-black py-2 px-4 rounded-lg"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyWork;
