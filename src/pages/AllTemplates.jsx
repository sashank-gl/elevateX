import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";

const AllTemplates = () => {
  const { user } = UserAuth();
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("monochromatic");

  useEffect(() => {
    // Fetch templates from Firebase or a local data source
    // Assuming a local array of templates for now
    setTemplates([
      { id: "monochromatic", name: "Monochromatic" },
      { id: "minimalist", name: "Minimalist" },
      { id: "vibrant", name: "Vibrant" },
      { id: "vibrant", name: "Vibrant" },
    ]);
  }, []);

  const handleTemplateClick = (template) => {
    setTemplateId(template.id);

    const userDocRef = doc(firebaseDB, "users", user?.uid);
    updateDoc(userDocRef, {
      templateId: template.id,
      templateName: template.name,
    });
  };

  return (
    <div>
      <div>
        <div className="flex py-3 gap-6 font-semibold">
          <div>Free</div>
          <div>Paid</div>
          <div>Purchased</div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col gap-3 items-center justify-between shadow-lg w-96 h-64"
            >
              <div className="mt-20 text-3xl font-semibold text-blue-500">{template.name}</div>
              <div className="flex gap-4 pb-4">
                <div
                  onClick={() => handleTemplateClick(template)}
                  className="cursor-pointer bg-button rounded-lg py-2 px-4 text-white font-semibold"
                >
                  Preview
                </div>
                <div
                  onClick={() => handleTemplateClick(template)}
                  className="cursor-pointer bg-button rounded-lg py-2 px-4 text-white font-semibold"
                >
                  Select
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTemplates;
