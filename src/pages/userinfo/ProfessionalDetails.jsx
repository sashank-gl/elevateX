// ProfessionalDetails.js

import React from "react";

const ProfessionalDetails = ({
  formData,
  handleChange,
  addKeyword,
  removeKeyword,
  updateKeyword,
}) => {
  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";

  return (
    <div>
      <label className={labelStyle}>
        <span className={labelTextStyle}>Title:</span>
        <input
          className={inputStyle}
          type="text"
          name="professionalTitle"
          value={formData?.professionalTitle}
          onChange={handleChange}
        />
      </label>
      <label className={labelStyle}>
        <span className={labelTextStyle}>Brand Name:</span>
        <input
          className={inputStyle}
          type="text"
          name="brandName"
          value={formData?.brandName}
          onChange={handleChange}
        />
      </label>

      <label className={labelStyle}>
        <span className={labelTextStyle}>Tagline:</span>
        <input
          className={inputStyle}
          type="text"
          name="tagline"
          value={formData?.tagline}
          onChange={handleChange}
        />
      </label>

      <label className={labelStyle}>
        <span className={labelTextStyle}>Call to Action Text:</span>
        <input
          className={inputStyle}
          type="text"
          name="callToActionText"
          value={formData?.callToActionText}
          onChange={handleChange}
        />
      </label>

      <label className={labelStyle}>
        <span className={labelTextStyle}>Portfolio Goal:</span>
        <select
          className={inputStyle}
          name="portfolioGoal"
          value={formData?.portfolioGoal}
          onChange={handleChange}
        >
          <option value="attract-jobs">Attracting Job Offers</option>
          <option value="showcase-skills">Showcasing Skills</option>
          <option value="freelance-presence">
            Establishing Freelance Presence
          </option>
        </select>
      </label>

      <label className={`${labelStyle} flex-col`}>
        <span className={`my-1`}>Objective / Summary:</span>
        <textarea
          name="summary"
          value={formData?.summary}
          onChange={handleChange}
          className="rounded-lg min-h-36"
        />
      </label>

      <div>
        <h1 className="text-2xl">Keywords:</h1>
        {formData?.keywords?.map((keyword, index) => (
          <div key={index} className="mb-4">
            <input
              className={inputStyle}
              type="text"
              value={keyword}
              onChange={(e) => updateKeyword(index, e.target.value)}
            />
            <button
              className="bg-button text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => removeKeyword(index)}
            >
              Remove Keyword
            </button>
          </div>
        ))}
        <button
          className="bg-button text-white font-semibold p-2 rounded-lg px-4"
          type="button"
          onClick={addKeyword}
        >
          Add Keyword
        </button>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
