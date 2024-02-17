import { motion } from "framer-motion";
import React, { useState } from "react";

const Education = ({ client }) => {
  const [selectedEducation, setSelectedEducation] = useState(
    client.education && client.education.length > 0 ? client.education[0] : null
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
    <div className="h-screen flex flex-col justify-center pt-16">
      <p className="text-4xl font-bold ml-20 text-abreeze-stroke">Education</p>
      <div className="min-h-2/3 flex justify-center items-center p-12 px-24 gap-12">
        <div className="flex flex-col">
          {client.education &&
            client.education.map((edu, index) => (
              <div
                key={index}
                className={`cursor-pointer flex justify-center border-stroke ${
                  selectedEducation === edu ? "border-l-4" : "border-l-2"
                }`}
                onClick={() => setSelectedEducation(edu)}
              >
                <div className="flex flex-col justify-center min-w-40 py-2 px-4 hover:bg-abreeze-secondary overflow-hidden">
                  <motion.p className={`font-bold text-center`}>
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
