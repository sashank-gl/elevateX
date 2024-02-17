import { motion } from "framer-motion";
import React, { useState } from "react";

const Projects = ({ client }) => {
  const [selectedProject, setSelectedProject] = useState(
    client.projects && client.projects.length > 0 ? client.projects[0] : null
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
    <div className="h-screen flex flex-col pt-16">
      <div className="h-1/2">
        <p className="text-4xl font-bold ml-20 text-abreeze-stroke">Projects</p>
        <div className="flex justify-center items-center p-12 px-24 gap-12">
          <div className="flex flex-col">
            {client.projects &&
              client.projects.map((project, index) => (
                <div
                  key={index}
                  className={`cursor-pointer flex justify-center border-stroke ${
                    selectedProject === project ? "border-l-4" : "border-l-2"
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex flex-col justify-center min-w-40 py-2 px-4 hover:bg-abreeze-secondary overflow-hidden">
                    <motion.p className={`font-bold text-center`}>
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
                  <p className="text-sm text-white/75 italic">
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
                    className="bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg"
                  >
                    View Project
                  </a>
                  <a
                    href={selectedProject.repositoryUrl}
                    className="bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg"
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
        <p className="text-4xl font-bold ml-20 text-abreeze-stroke">Skills</p>
        <div className="flex justify-center items-center p-12 px-24 gap-12">
          {client.skills && (
            <div className="grid grid-cols-4 gap-4">
              {client.skills.map((skill) => (
                <div key={skill} className="mb-2">
                  <p>{skill.name}</p>

                  <div className="mt-2 h-2 w-48 bg-gray-200 rounded">
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
