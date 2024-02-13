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
      { id: "vibrant", name: "Vibrant" }, // Example of a new template
    ]);
  }, []);

  const handleTemplateClick = (template) => {
    setTemplateId(template.id);

    const userDocRef = doc(firebaseDB, "users", user?.uid);
    updateDoc(userDocRef, {
      templateId: template.id,
      templateName: template.name, // Include templateName in the update
    });
  };

  return (
    <div>
      <h1>All Templates</h1>
      <div>
        <h1>Free</h1>
        <div className="grid grid-cols-4 gap-5">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col gap-3 items-center">
              {/* ... */}
              <div
                onClick={() => handleTemplateClick(template)}
                // Pass the entire template object to the handler
                className="cursor-pointer bg-red-500 rounded-lg py-2 px-4 text-white font-semibold"
              >
                Select
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTemplates;
