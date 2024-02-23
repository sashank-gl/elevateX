import { motion } from "framer-motion";
import React, { useState } from "react";

const Education = ({ client }) => {
  const [selectedEducation, setSelectedEducation] = useState(
    client.education && client.education.length > 0
      ? client.education[0]
      : null,
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
    <div className="flex h-screen flex-col justify-center pt-16">
      <p className="ml-20 text-4xl font-bold text-abreeze-stroke">Education</p>
      <div className="min-h-2/3 flex items-center justify-center gap-12 p-12 px-24">
        <div className="flex flex-col">
          {client.education &&
            client.education.map((edu, index) => (
              <div
                key={index}
                className={`flex cursor-pointer justify-center border-stroke ${
                  selectedEducation === edu ? "border-l-4" : "border-l-2"
                }`}
                onClick={() => setSelectedEducation(edu)}
              >
                <div className="flex min-w-40 flex-col justify-center overflow-hidden px-4 py-2 hover:bg-abreeze-secondary">
                  <motion.p className={`text-center font-bold`}>
                    {edu.degree}
                  </motion.p>
                </div>
              </div>
            ))}
        </div>
        {selectedEducation && (
          <div className="flex flex-col justify-center pr-24 text-xl">
            <div className="flex flex-col gap-4">
              <p className="italic">{selectedEducation.institution}</p>
              <p className="italic">{selectedEducation.fieldOfStudy}</p>
              {selectedEducation.startDate && selectedEducation.endDate && (
                <p className="text-sm italic">
                  {formatDate(selectedEducation.startDate)} -{" "}
                  {formatDate(selectedEducation.endDate)}
                </p>
              )}
              <p className="italic">{selectedEducation.description}</p>
              <div>
                <p className="font-semibold italic">
                  {selectedEducation.stack}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
