import React from "react";

const EducationDetails = ({
  education,
  addEducation,
  removeEducation,
  handleChange,
}) => {
  const labelStyle = `flex gap-4 my-1`;
  const labelTextStyle = `my-1 w-40`;
  const inputStyle = `h-10 rounded-lg p-1`;

  return (
    <div>
      {education.map((edu, index) => (
        <div key={index} className="grid grid-cols-2 mb-4 gap-4">
          <label className={labelStyle}>
            <span className={labelTextStyle}>Institution:</span>
            <input
              className={inputStyle}
              type="text"
              name={`education[${index}].institution`}
              value={edu.institution}
              onChange={(e) =>
                handleChange(index, "institution", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Degree:</span>
            <input
              className={inputStyle}
              type="text"
              name={`education[${index}].degree`}
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Field of Study:</span>
            <input
              className={inputStyle}
              type="text"
              name={`education[${index}].fieldOfStudy`}
              value={edu.fieldOfStudy}
              onChange={(e) =>
                handleChange(index, "fieldOfStudy", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Start Date:</span>
            <input
              className={inputStyle}
              type="date"
              name={`education[${index}].startDate`}
              value={edu.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>End Date:</span>
            <input
              className={inputStyle}
              type="date"
              name={`education[${index}].endDate`}
              value={edu.endDate}
              onChange={(e) => handleChange(index, "endDate", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>GPA:</span>
            <input
              className={inputStyle}
              type="text"
              name={`education[${index}].gpa`}
              value={edu.gpa}
              onChange={(e) => handleChange(index, "gpa", e.target.value)}
            />
          </label>
          <label className={`${labelStyle} col-span-2 flex-col`}>
            <span className={`my-1`}>Description:</span>
            <textarea
              name={`education[${index}].description`}
              value={edu.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="rounded-lg min-h-36"
            />
          </label>
          {/* Similar input fields for other education details */}
          <div className="col-span-2 flex justify-center items-center">
            <button
              className="bg-button text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => removeEducation(index)}
            >
              Remove Education
            </button>
          </div>
        </div>
      ))}
      <button
        className="bg-button text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addEducation}
      >
        Add Education
      </button>
    </div>
  );
};

export default EducationDetails;
