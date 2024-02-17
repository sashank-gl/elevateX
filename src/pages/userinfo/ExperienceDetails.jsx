import React, { useState } from "react";

const ExperienceDetails = ({
  experience,
  addExperience,
  removeExperience,
  handleChange,
  addResponsibility,
  removeResponsibility,
  handleResponsibilityChange,
}) => {
  const [isPresentCompany, setIsPresentCompany] = useState(false);

  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";

  const togglePresentCompany = (index) => {
    const updatedExperience = [...experience];
    updatedExperience[index].isPresentCompany =
      !updatedExperience[index].isPresentCompany;
  };

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
              onChange={(e) =>
                handleChange(index, "companyName", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Position:</span>
            <input
              className={inputStyle}
              type="text"
              name={`experience[${index}].position`}
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Start Date:</span>
            <input
              className={inputStyle}
              type="date"
              name={`experience[${index}].startDate`}
              value={exp.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
            />
          </label>
          <div className="flex items-center my-4">
            <input
              type="checkbox"
              checked={exp.isPresentCompany}
              onChange={() => togglePresentCompany(index)}
              className="mr-2 w-6 h-6 cursor-pointer"
            />
            <span>Present Company</span>
          </div>
          {!isPresentCompany && (
            <label className={labelStyle}>
              <span className={labelTextStyle}>End Date (optional):</span>
              <input
                className={inputStyle}
                type="date"
                name={`experience[${index}].endDate`}
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </label>
          )}
          <div className={`${labelStyle} flex-col col-span-2`}>
            <span className={`my-1`}>Responsibilities:</span>
            {exp.responsibilities.map((responsibility, respIndex) => (
              <div key={respIndex} className="flex">
                <input
                  name={`experience[${index}].responsibilities[${respIndex}]`}
                  value={responsibility}
                  onChange={(e) =>
                    handleResponsibilityChange(index, respIndex, e.target.value)
                  }
                  className="rounded-lg"
                />
                <button
                  className="bg-red-500 text-white font-semibold p-2 rounded-lg ml-2"
                  type="button"
                  onClick={() => removeResponsibility(index, respIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-green-500 text-white font-semibold p-2 rounded-lg mt-2"
              type="button"
              onClick={() => addResponsibility(index)}
            >
              Add Responsibility
            </button>
          </div>

          <label className={`${labelStyle} flex-col col-span-2`}>
            <span className={`my-1`}>Skills:</span>
            <input
              name={`experience[${index}].skills`}
              value={exp.skills}
              onChange={(e) => handleChange(index, "skills", e.target.value)}
              className="rounded-lg"
            />
          </label>
          <div className="col-span-2 flex justify-center items-center">
            <button
              className="bg-button text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => removeExperience(index)}
            >
              Remove Experience
            </button>
          </div>
        </div>
      ))}
      <button
        className="bg-button text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addExperience}
      >
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceDetails;
