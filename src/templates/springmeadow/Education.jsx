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
      <p className="ml-20 text-4xl font-bold text-springm-stroke">Education</p>
      <div className="min-h-2/3 flex items-center justify-center gap-12 p-12 px-24">
        <div className="flex flex-col">
          {client.education &&
            client.education.map((edu, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center gap-6 border-stroke`}
              >
                <div className="flex items-center justify-between gap-5 overflow-hidden bg-springm-secondary px-8 py-3 text-springm-background hover:bg-springm-tertiary hover:text-springm-buttonText hover:shadow-md">
                  <motion.p className={`text-4xl font-bold`}>
                    {edu.degree}
                  </motion.p>
                </div>
                <div className="ml-4 flex flex-col justify-center text-xl">
                  <div className="flex flex-col gap-4">
                    <p className="italic">{selectedEducation.institution}</p>
                    <p className="italic">{selectedEducation.fieldOfStudy}</p>
                    {selectedEducation.startDate &&
                      selectedEducation.endDate && (
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
