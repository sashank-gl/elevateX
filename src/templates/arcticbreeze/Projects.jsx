import { motion } from "framer-motion";
import React, { useState } from "react";

const Projects = ({ client }) => {
  const [selectedProject, setSelectedProject] = useState(
    client.projects && client.projects.length > 0 ? client.projects[0] : null,
  );

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
    <div className="flex h-screen flex-col pt-16">
      <div className="h-1/2">
        <p className="ml-20 text-4xl font-bold text-abreeze-stroke">Projects</p>
        <div className="flex items-center justify-center gap-12 p-12 px-24">
          <div className="flex flex-col">
            {client.projects &&
              client.projects.map((project, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer justify-center border-stroke ${
                    selectedProject === project ? "border-l-4" : "border-l-2"
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex min-w-40 flex-col justify-center overflow-hidden px-4 py-2 hover:bg-abreeze-secondary">
                    <motion.p className={`text-center font-bold`}>
                      {project.name}
                    </motion.p>
                  </div>
                </div>
              ))}
          </div>
          {selectedProject && (
            <div className="flex flex-col justify-center pr-24 text-xl">
              <div className="flex flex-col gap-4">
                <p className="italic">{selectedProject.description}</p>
                {selectedProject.startDate && selectedProject.endDate && (
                  <p className="text-sm italic text-white/75">
                    {formatDate(selectedProject.startDate)} -{" "}
                    {formatDate(selectedProject.endDate)}
                  </p>
                )}
                <div>
                  <p className="font-semibold italic">
                    {selectedProject.stack}
                  </p>
                </div>
                <div className="flex gap-20">
                  <a
                    href={selectedProject.projectUrl}
                    className="rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText"
                  >
                    View Project
                  </a>
                  <a
                    href={selectedProject.repositoryUrl}
                    className="rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-1/2">
        <p className="ml-20 text-4xl font-bold text-abreeze-stroke">Skills</p>
        <div className="flex items-center justify-center gap-12 p-12 px-24">
          {client.skills && (
            <div className="grid grid-cols-4 gap-4">
              {client.skills.map((skill) => (
                <div key={skill} className="mb-2">
                  <p>{skill.name}</p>

                  <div className="mt-2 h-2 w-48 rounded bg-gray-200">
                    <div
                      className={`h-full rounded bg-abreeze-stroke`}
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
