// CertificationsInput.js

import React from "react";

const Certifications = ({
  certifications,
  handleChange,
  addCertification,
  removeCertification,
}) => {
  const labelStyle = "flex gap-4 my-1";
  const labelTextStyle = "my-1 w-40";
  const inputStyle = "h-10 rounded-lg p-1";

  return (
    <div>
      {certifications?.map((certification, index) => (
        <div key={index} className="mb-4">
          <label className={labelStyle}>
            <span className={labelTextStyle}>Certification Name:</span>
            <input
              className={inputStyle}
              type="text"
              name={`certifications[${index}].name`}
              value={certification?.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Issued By:</span>
            <input
              className={inputStyle}
              type="text"
              name={`certifications[${index}].issuedBy`}
              value={certification?.issuedBy}
              onChange={(e) => handleChange(index, "issuedBy", e.target.value)}
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Certification Date:</span>
            <input
              className={inputStyle}
              type="date"
              name={`certifications[${index}].certificationDate`}
              value={certification?.certificationDate}
              onChange={(e) =>
                handleChange(index, "certificationDate", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Certificate URL:</span>
            <input
              className={inputStyle}
              type="text"
              name={`certifications[${index}].certificateUrl`}
              value={certification?.certificateUrl}
              onChange={(e) =>
                handleChange(index, "certificateUrl", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Description:</span>
            <textarea
              className="rounded-lg min-h-36"
              name={`certifications[${index}].description`}
              value={certification?.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
          </label>
          <label className={labelStyle}>
            <span className={labelTextStyle}>Expiry:</span>
            <input
              className={inputStyle}
              type="date"
              name={`certifications[${index}].expiry`}
              value={certification?.expiry}
              onChange={(e) => handleChange(index, "expiry", e.target.value)}
            />
          </label>
          <button
            className="bg-button text-white font-semibold p-2 rounded-lg px-4"
            type="button"
            onClick={() => removeCertification(index)}
          >
            Remove Certification
          </button>
        </div>
      ))}
      <button
        className="bg-button text-white font-semibold p-2 rounded-lg px-4"
        type="button"
        onClick={addCertification}
      >
        Add Certification
      </button>
    </div>
  );
};

export default Certifications;
