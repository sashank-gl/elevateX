// ExperienceDetails.js

import React from 'react';

const ExperienceDetails = ({ experience, addExperience, removeExperience, handleChange }) => {
  const labelStyle = 'flex gap-4 my-1';
  const labelTextStyle = 'my-1 w-40';
  const inputStyle = 'h-10 rounded-lg p-1';

  return (
    <div>
      {experience.map((exp, index) => (
        <div key={index} className="grid grid-cols-2 mb-4 gap-4">
          <label className={labelStyle}>
            <span className={labelTextStyle}>Company Name:</span>
            <input
              className={inputStyle}
              type="text"
              name={`experience[${index}].companyName`}
              value={exp.companyName}
              onChange={(e) => handleChange(index, 'companyName', e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Position:</span>
            <input
              className={inputStyle}
              type="text"
              name={`experience[${index}].position`}
              value={exp.position}
              onChange={(e) => handleChange(index, 'position', e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Start Date:</span>
            <input
              className={inputStyle}
              type="date"
              name={`experience[${index}].startDate`}
              value={exp.startDate}
              onChange={(e) => handleChange(index, 'startDate', e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>End Date (optional):</span>
            <input
              className={inputStyle}
              type="date"
              name={`experience[${index}].endDate`}
              value={exp.endDate}
              onChange={(e) => handleChange(index, 'endDate', e.target.value)}
            />
          </label>
          <label className={`${labelStyle} flex-col col-span-2`}>
            <span className={`my-1`}>Description:</span>
            <textarea
              name={`experience[${index}].description`}
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              className="rounded-lg min-h-36"
            />
          </label>
          <div className="col-span-2 flex justify-center items-center">
            <button
              className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => removeExperience(index)}
            >
              Remove Experience
            </button>
          </div>
        </div>
      ))}
      <button
        className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addExperience}
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceDetails;
