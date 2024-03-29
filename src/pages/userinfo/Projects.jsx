import React from "react";

const Projects = ({
  projects,
  handleProjectChange,
  addProject,
  removeProject,
}) => {
  const labelStyle = "flex flex-col gap-4";
  const inputStyle = "h-10 rounded-lg p-1";

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="mb-4 grid grid-cols-2 gap-4">
          <label className={labelStyle}>
            <span className="my-1">Project Name:</span>
            <input
              className={inputStyle}
              type="text"
              value={project.name}
              onChange={(e) =>
                handleProjectChange(index, "name", e.target.value)
              }
            />
          </label>
          <label className={`${labelStyle} col-span-2`}>
            <span className="my-1">Description:</span>
            <textarea
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, "description", e.target.value)
              }
              className="min-h-36 rounded-lg"
            />
          </label>

          <label className={`${labelStyle} col-span-2`}>
            <span className="my-1">Stack:</span>
            <input
              className={inputStyle}
              type="text"
              value={project.stack}
              onChange={(e) =>
                handleProjectChange(index, "stack", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className="my-1">Start Date:</span>
            <input
              className={inputStyle}
              type="date"
              value={project.startDate}
              onChange={(e) =>
                handleProjectChange(index, "startDate", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className="my-1">End Date:</span>
            <input
              className={inputStyle}
              type="date"
              value={project.endDate}
              onChange={(e) =>
                handleProjectChange(index, "endDate", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className="my-1">Project URL:</span>
            <input
              className={inputStyle}
              type="text"
              value={project.projectUrl}
              onChange={(e) =>
                handleProjectChange(index, "projectUrl", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className="my-1">Repository URL:</span>
            <input
              className={inputStyle}
              type="text"
              value={project.repositoryUrl}
              onChange={(e) =>
                handleProjectChange(index, "repositoryUrl", e.target.value)
              }
            />
          </label>
          <div className="col-span-2 flex items-center justify-center">
            <button
              className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
              type="button"
              onClick={() => removeProject(index)}
            >
              Remove Project
            </button>
          </div>
        </div>
      ))}
      <button
        className="rounded-lg bg-button p-2 px-4 font-semibold text-white"
        type="button"
        onClick={() => addProject()}
      >
        Add Project
      </button>
    </div>
  );
};

export default Projects;
