import React, { useEffect, useState } from "react";
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
    const fetchedTemplates = [
      { id: "monochromatic", name: "Monochromatic", category: "monochrome" },
      { id: "arctic-breeze", name: "Arctic Breeze", category: "fresher" },
      { id: "spring-meadow", name: "Spring Meadow", category: "fresher" },
    ];
    setTemplates(fetchedTemplates);
    setFilteredTemplates(fetchedTemplates);
  }, []);

  const handleTemplateClick = (template) => {
    setTemplateId(template.id);
    console.log(template.id);

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
        (template) => template.category === selectedCategory,
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
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => handleCategoryChange("frontend")}
            className="rounded-lg bg-main px-4 py-2 font-semibold text-heading"
          >
            Frontend
          </button>
          <button
            onClick={() => handleCategoryChange("backend")}
            className="rounded-lg bg-main px-4 py-2 font-semibold text-heading"
          >
            Backend
          </button>
          <button
            onClick={() => handleCategoryChange("fresher")}
            className="rounded-lg bg-main px-4 py-2 font-semibold text-heading"
          >
            Fresher
          </button>
          <button
            onClick={() => handleCategoryChange("monochrome")}
            className="rounded-lg bg-main px-4 py-2 font-semibold text-heading"
          >
            Monochrome
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded-lg border border-main bg-main px-4 py-2 font-semibold text-heading focus:outline-none focus:ring-2 focus:ring-stroke"
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="monochrome">Monochrome</option>
            <option value="fresher">Fresher</option>
          </select>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="flex h-96 items-center justify-center text-center text-2xl font-semibold">
            No results found
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex flex-col items-center justify-between gap-8 rounded-lg bg-main p-5 px-6"
              >
                <div className="text-3xl font-semibold">{template.name}</div>
                <div
                  onClick={() => handleTemplateClick(template)}
                  className="cursor-pointer rounded-lg bg-button px-4 py-2 font-semibold text-white"
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
