import React from "react";

const Monochromatic = ({ photo, client }) => {
  const {
    firstName,
    lastName,
    profession,
    location,
    summary,
    email,
    phoneNumber,
    experience,
    education,
    skills,
    projects,
  } = client;

  return (
    <div className="container mx-auto px-4">
      {client && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center justify-center rounded-full overflow-hidden">
            {photo && (
              <img
                src={photo}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full md:w-64 md:h-64"
              />
            )}
          </div>
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
            <p className="text-lg">{profession}</p>
            <p className="text-md mb-4">{summary}</p>
            <div className="text-base">
              <p>Currently residing in {location}</p>
              <p>
                Reach me on:{" "}
                <a href={`mailto:${email}`} className="underline">
                  {email}
                </a>{" "}
                or {phoneNumber}
              </p>
            </div>
            <h3 className="text-lg font-bold mt-4 mb-2">Experience</h3>
            {experience.map((job) => (
              <div key={job.id} className="mb-4">
                <p className="text-md font-bold">
                  {job.position} at {job.companyName}
                </p>
                <p className="text-sm">{`${job.startDate} - ${job.endDate}`}</p>
                <p className="text-base">{job.description}</p>
              </div>
            ))}
            <h3 className="text-lg font-bold mt-4 mb-2">Education</h3>
            {education.map((degree) => (
              <div key={degree.id} className="mb-4">
                <p className="text-md font-bold">
                  {degree.degree} at {degree.institution}
                </p>
                <p className="text-sm">{`${degree.startDate} - ${degree.endDate}`}</p>
                <p className="text-base">{degree.description}</p>
              </div>
            ))}
            <h3 className="text-lg font-bold mt-4 mb-2">Projects</h3>
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <p className="text-md font-bold">{project.name}</p>
                <p className="text-md font-bold">{project.description}</p>
                <p className="text-sm">{`${project.startDate} - ${project.endDate}`}</p>
                <p className="text-base">{project.projectUrl}</p>
                <p className="text-base">{project.repositoryUrl}</p>
              </div>
            ))}
            <h3 className="text-lg font-bold mt-4 mb-2">Skills</h3>
            <ul className="list-disc text-base">
              {skills.map((skill) => (
                <li key={skill} className="mb-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monochromatic;
