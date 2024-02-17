import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";

const AllTemplates = () => {
  const { user } = UserAuth();
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("monochromatic");
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch templates from Firebase or a local data source
    // Assuming a local array of templates for now
    const fetchedTemplates = [
      { id: "monochromatic", name: "Monochromatic", category: "monochrome" },
      { id: "arctic-breeze", name: "Arctic Breeze", category: "fresher" },
    ];
    setTemplates(fetchedTemplates);
    setFilteredTemplates(fetchedTemplates);
  }, []);

  const handleTemplateClick = (template) => {
    setTemplateId(template.id);

    const userDocRef = doc(firebaseDB, "users", user?.uid);
    updateDoc(userDocRef, {
      templateId: template.id,
      templateName: template.name,
    });
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(
        (template) => template.category === selectedCategory
      );
      setFilteredTemplates(filtered);
    }
  }, [selectedCategory, templates]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-12">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => handleCategoryChange("frontend")}
            className="px-4 py-2 bg-main text-heading font-semibold rounded-lg"
          >
            Frontend
          </button>
          <button
            onClick={() => handleCategoryChange("backend")}
            className="px-4 py-2 bg-main text-heading font-semibold rounded-lg"
          >
            Backend
          </button>
          <button
            onClick={() => handleCategoryChange("fresher")}
            className="px-4 py-2 bg-main text-heading font-semibold rounded-lg"
          >
            Fresher
          </button>
          <button
            onClick={() => handleCategoryChange("monochrome")}
            className="px-4 py-2 bg-main text-heading font-semibold rounded-lg"
          >
            Monochrome
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-main text-heading font-semibold border-main focus:outline-none focus:ring-2 focus:ring-stroke"
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="monochrome">Monochrome</option>
            <option value="fresher">Fresher</option>
          </select>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="text-center h-96 text-2xl font-semibold flex items-center justify-center">No results found</div>
        ) : (
          <div className="grid gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex flex-col gap-8 items-center justify-between bg-main p-3 px-6 rounded-lg"
              >
                <div className="text-3xl font-semibold">{template.name}</div>
                <div
                  onClick={() => handleTemplateClick(template)}
                  className="cursor-pointer bg-button rounded-lg py-2 px-4 text-white font-semibold"
                >
                  Select
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTemplates;
