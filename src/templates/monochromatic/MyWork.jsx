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
    <div className="flex min-h-screen flex-col bg-white/5 pt-16">
      <p className="text-center text-4xl font-bold">My Recent Work</p>
      <div className="min-h-2/3 flex flex-col items-center justify-center gap-12 p-12 px-24">
        {client.projects &&
          client.projects.map((project, index) => (
            <div key={index} className="flex  w-full justify-center gap-12">
              <div className="w-1/3">
                <div className="flex h-80 w-80 flex-col justify-center gap-5 overflow-hidden bg-white px-8 text-black hover:shadow-md">
                  <motion.p
                    className={`text-center font-bold ${
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
              <div className="flex w-2/3 flex-col justify-center pr-36 text-xl">
                <div className="flex flex-col gap-4">
                  <p className="italic">{project.description}</p>
                  {project.startDate && project.endDate && (
                    <p className="text-sm italic text-white/75">
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate)}
                    </p>
                  )}
                  <div>
                    <p className="mt-2 font-semibold italic">{project.stack}</p>
                  </div>
                  <div className="flex gap-20 pt-8">
                    <a
                      href={project.projectUrl}
                      className="rounded-lg bg-white px-4 py-2 text-black"
                    >
                      View Project
                    </a>
                    <a
                      href={project.repositoryUrl}
                      className="rounded-lg bg-white px-4 py-2 text-black"
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
