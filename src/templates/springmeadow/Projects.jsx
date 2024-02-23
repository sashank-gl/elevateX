import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";

const Projects = ({ client }) => {
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
    <div className="flex min-h-screen flex-col pt-16">
      <div className="">
        <p className="ml-20 text-4xl font-bold text-springm-stroke">Projects</p>
        <div className="flex items-center justify-center gap-12 p-12 px-24">
          <div className="flex flex-col">
            {client.projects &&
              client.projects.map((project, index) => (
                <div key={index} className="mb-6 flex w-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-5 overflow-hidden bg-springm-secondary px-8 py-3 text-springm-background hover:bg-springm-tertiary hover:text-springm-buttonText hover:shadow-md">
                    <motion.p className={`text-center text-4xl font-bold`}>
                      {project.name}
                    </motion.p>
                    <div className="flex justify-center gap-3 text-2xl">
                      <a
                        href={project.projectUrl}
                        className="rounded-lg p-2  text-springm-background hover:bg-springm-background hover:text-springm-secondary"
                      >
                        <FaEye />
                      </a>
                      <a
                        href={project.repositoryUrl}
                        className="rounded-lg p-2  text-springm-background hover:bg-springm-background hover:text-springm-secondary"
                      >
                        <FaCode />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-xl">
                    <div className="ml-4 flex flex-col gap-4">
                      <p className="italic">{project.description}</p>
                      {project.startDate && project.endDate && (
                        <p className="text-sm italic">
                          {formatDate(project.startDate)} -{" "}
                          {formatDate(project.endDate)}
                        </p>
                      )}
                      <div>
                        <p className="mt-2 font-semibold italic">
                          {project.stack}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="">
        <p className="ml-20 text-4xl font-bold text-springm-stroke">Skills</p>
        <div className="flex items-center justify-center gap-12 p-12 px-24">
          {client.skills && (
            <div className="flex w-full flex-col gap-4">
              {client.skills.map((skill) => (
                <div key={skill} className="mb-2">
                  <p>{skill.name}</p>

                  <div className="mt-2 h-2 rounded bg-gray-200">
                    <div
                      className={`h-full rounded bg-springm-secondary hover:bg-springm-tertiary`}
                      style={{
                        width:
                          skill.proficiency === "beginner"
                            ? "25%"
                            : skill.proficiency === "intermediate"
                              ? "50%"
                              : skill.proficiency === "advanced"
                                ? "75%"
                                : "100%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
