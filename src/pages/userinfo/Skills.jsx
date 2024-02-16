import React from "react";

const Skills = ({ skills, handleChange, addSkill, removeSkill }) => {
  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";

  return (
    <div>
      {skills.map((skill, index) => (
        <div key={index} className="mb-4">
          <label className={labelStyle}>
            <span className={labelTextStyle}>Name:</span>
            <input
              className={inputStyle}
              type="text"
              name={`skills[${index}].name`}
              value={skill?.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Proficiency:</span>
            <select
              className={inputStyle}
              name={`skills[${index}].proficiency`}
              value={skill?.proficiency}
              onChange={(e) =>
                handleChange(index, "proficiency", e.target.value)
              }
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </label>

          <label className={labelStyle}>
            <span className={labelTextStyle}>Category:</span>
            <input
              className={inputStyle}
              type="text"
              name={`skills[${index}].category`}
              value={skill?.category}
              onChange={(e) => handleChange(index, "category", e.target.value)}
            />
          </label>
          <button
            className="bg-button text-white font-semibold p-2 rounded-lg px-4"
            type="button"
            onClick={() => removeSkill(index)}
          >
            Remove Skill
          </button>
        </div>
      ))}
      <button
        className="bg-button text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addSkill}
      >
        Add Skill
      </button>
    </div>
  );
};

export default Skills;
