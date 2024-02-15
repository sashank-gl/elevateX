import React, { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BASE_URL } from "../utils/config";
import PersonalDetails from "./userinfo/PersonalDetails";
import EducationDetails from "./userinfo/EducationDetails";
import ExperienceDetails from "./userinfo/ExperienceDetails";
import ProfessionalDetails from "./userinfo/ProfessionalDetails";
import Skills from "./userinfo/Skills";
import Projects from "./userinfo/Projects";
import Certifications from "./userinfo/Certifications";
import Testimonials from "./userinfo/Testimonials";
import Hobbies from "./userinfo/Hobbies";
import UserDetails from "./UserDetails";

const UserInfo = () => {
  const { user } = UserAuth();

  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    contacts: {
      email: "",
      phoneNumber: "",
      whatsApp: "",
      linkedIn: "",
      twitter: "",
      gitHub: "",
      facebook: "",
      instagram: "",
      stackoverflow: "",
    },
    location: "",

    // Professional Details
    professionalTitle: "",
    tagline: "",
    callToActionText: "",
    portfolioGoal: "",
    summary: "",
    keywords: [],

    // Based on the goal, some parts of the portfolio might be highlighted (e.g., attracting job offers, showcasing skills, establishing freelance presence).
    experience: [
      {
        companyName: "",
        position: "",
        location: "",
        responsibilities: "",
        skills: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        proficiency: "",
        category: "",
        // Programming Languages, Frameworks, Tools, Soft Skills, etc.
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        description: "",
        stack: "",
        startDate: "",
        endDate: "",
        repositoryUrl: "",
        projectUrl: "",
      },
    ],
    certifications: [
      {
        name: "",
        issuedBy: "",
        certificationDate: "",
        certificateUrl: "",
        description: "",
        expiry: "",
      },
    ],
    hobbies: [],

    testimonials: [
      {
        review: "",
        author: "",
        company: "",
      },
    ],
    uniqueUrl: `${BASE_URL}/${user.uid}`,
    templateId: "monochromatic",
    templateName: "Monochromatic",
    isPublic: false,
  });
  const [isPublic, setIsPublic] = useState(formData.isPublic);
  const [photo, setPhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user) {
      const docRef = doc(firebaseDB, "users", user.uid);

      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserDetails(docSnapshot.data());
            setFormData(docSnapshot.data());
            fetchUserPhoto(user.uid);
          }
        })
        .catch((error) => {
          console.error("Error fetching personal details:", error);
        });
    }
  }, [user]);

  const fetchUserPhoto = async (userId) => {
    const storageRef = ref(storage, `users/${userId}/profile_photo`);
    try {
      const photoUrl = await getDownloadURL(storageRef);
      setPhoto(photoUrl);
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
  };

  const makeProfilePublic = async () => {
    try {
      await updateDoc(doc(firebaseDB, "users", user.uid), {
        isPublic: true,
      });

      // Update local state and UI
      setFormData((prevFormData) => ({ ...prevFormData, isPublic: true }));
      setIsPublic(true);
      console.log("Profile successfully made public.");
    } catch (error) {
      console.error("Error making profile public:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  const makeProfilePrivate = async () => {
    try {
      await updateDoc(doc(firebaseDB, "users", user.uid), {
        isPublic: false,
      });

      // Update local state and UI
      setFormData((prevFormData) => ({ ...prevFormData, isPublic: false }));
      setIsPublic(false);
      console.log("Profile successfully made private.");
    } catch (error) {
      console.error("Error making profile private:", error);
      // Handle errors appropriately
    }
  };

  const addHobby = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: [...prevFormData.hobbies, ""],
    }));
  };

  const removeHobby = (index) => {
    const updatedHobbies = formData.hobbies.filter(
      (_keyword, _index) => _index !== index
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: updatedHobbies,
    }));
  };

  // Update keyword
  const updateHobby = (index, value) => {
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: updatedHobbies,
    }));
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uniqueUrl: `${BASE_URL}/${user.uid}`,
    }));
  }, [BASE_URL, user.uid]);

  const [isOpen, setIsOpen] = useState(Array(10).fill(false));

  const toggleComponent = (index) => {
    setIsOpen((prevOpen) =>
      prevOpen.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...formData.testimonials];
    updatedTestimonials[index][field] = value;
    setFormData({ ...formData, testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    setFormData((prevState) => ({
      ...prevState,
      testimonials: [
        ...prevState.testimonials,
        {
          id: Math.random(),
          review: "",
          author: "",
          company: "",
        },
      ],
    }));
  };

  const removeTestimonial = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      testimonials: prevState.testimonials.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationsChange = (index, field, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][field] = value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          id: Math.random(),
          name: "",
          issuedBy: "",
          certificationDate: "",
          certificateUrl: "",
          description: "",
          expiry: "",
        },
      ],
    });
  };

  // Remove skill at index
  const removeCertification = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      certifications: prevState.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchableUserData = {
      userId: user.uid,
      email: formData.contacts.email,
      name: `${formData.firstName} ${formData.lastName}`,
      uniqueUrl: formData.uniqueUrl,
      isPublic: formData.isPublic,
    };

    const searchableUserRef = doc(firebaseDB, "searchableUsers", user.uid);
    try {
      await setDoc(searchableUserRef, searchableUserData);
      console.log("User added to searchableUsers collection successfully");
    } catch (error) {
      console.error("Error adding user to searchableUsers:", error);
      // Handle errors appropriately
    }

    // Check for changes and only update changed fields
    const updatedData = { ...formData, isPublic };
    for (const field of Object.keys(formData)) {
      if (formData[field] !== userDetails?.[field]) {
        updatedData[field] = formData[field];
      }
    }

    if (Object.keys(updatedData).length === 0) {
      console.log("No changes to update.");
      return;
    }

    try {
      const docRef = doc(firebaseDB, "users", user.uid);

      // Ensure data is fetched before checking existence
      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        // Create the document if it doesn't exist
        await setDoc(docRef, updatedData, { merge: true });
        console.log("User Info and URL updated successfully");
      } else {
        // Update the document using either uid or actual document ID
        await updateDoc(docRef, updatedData);
        console.log("Personal Details updated successfully");
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error updating details:", error);
      // Handle error and inform user appropriately
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [uploadStatus, setUploadStatus] = useState("Upload Photo"); // Initial button text

  const handlePhotoUpload = async () => {
    if (!selectedFile) return; // Handle no file selected

    const storageRef = ref(storage, `users/${user.uid}/profile_photo`);
    try {
      setUploadStatus("Uploading...");
      await uploadBytes(storageRef, selectedFile);
      const photoUrl = await getDownloadURL(storageRef);
      setPhoto(photoUrl);
      setUploadStatus("Uploaded!");
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus("Upload Photo");
      }, 2000);
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploadStatus("Error"); // Set button text to 'Error'
    }
  };

  // Handle change for Skills component

  // Add new skill
  const addSkill = () => {
    setFormData((prevState) => ({
      ...prevState,
      skills: [
        ...prevState.skills,
        { id: Math.random(), name: "", proficiency: "", category: "" },
      ],
    }));
  };

  // Remove skill at index
  const removeSkill = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: Math.random(),
          companyName: "",
          position: "",
          location: "",
          responsibilities: "",
          skills: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter(
      (_exp, _index) => _index !== index
    );
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          id: Math.random(),
          name: "",
          description: "",
          features: "",
          stack: "",
          startDate: "",
          endDate: "",
          repositoryUrl: "",
          projectUrl: "",
        },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter(
      (_project, _index) => _index !== index
    );
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const addEducation = () => {
    setFormData((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          id: Math.random(),
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      education: prevState.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  // Add keyword
  const addKeyword = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: [...prevFormData.keywords, ""],
    }));
  };

  // Remove keyword
  const removeKeyword = (index) => {
    const updatedKeywords = formData.keywords.filter(
      (_keyword, _index) => _index !== index
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: updatedKeywords,
    }));
  };

  // Update keyword
  const updateKeyword = (index, value) => {
    const updatedKeywords = [...formData.keywords];
    updatedKeywords[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: updatedKeywords,
    }));
  };
  const headingStyle = `text-4xl font-bold text-center py-3 italic rounded-full cursor-pointer hover:bg-blue-500 hover:text-white`;
  return (
    <div className="h-full overflow-y-auto flex flex-col text-xl">
      <motion.h1
        initial={{ y: 20, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-500 text-center py-12"
      >
        From Blank Canvas to Masterpiece
        <br />
        <span className="italic font-semibold text-red-500">Craft Your Portfolio</span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 bg-indigo-50 shadow-md rounded-lg m-12 p-8"
      >
        <div className="flex items-center justify-start gap-8">
          {photo && (
            <div>
              <img
                src={photo}
                alt="Profile"
                className="rounded-lg object-cover max-h-48 w-36 mx-auto"
              />
            </div>
          )}
          <label className="flex flex-col gap-4 italic text-slate-500">
            Click "Choose File" to add/update Profile Picture
            <input
              type="file"
              id="photoInput"
              name="photo"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <button
                className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
                onClick={handlePhotoUpload}
                disabled={
                  uploadStatus === "Uploading..." ||
                  uploadStatus === "Uploaded!"
                }
              >
                {uploadStatus}
              </button>
            )}
          </label>
          {formData.isPublic ? (
            <button
              className="bg-blue-500 p-2 px-4 text-white font-semibold rounded-lg"
              onClick={makeProfilePrivate}
            >
              Make Profile Private
            </button>
          ) : (
            <button
              className="bg-blue-500 p-2 px-4 text-white font-semibold rounded-lg"
              onClick={makeProfilePublic}
            >
              Make Profile Public
            </button>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-8 px-12 rounded-lg  min-w-96"
        >
          <h1 onClick={() => toggleComponent(0)} className={headingStyle}>
            Personal Details
          </h1>
          {isOpen[0] && (
            <PersonalDetails
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          )}

          <h1 onClick={() => toggleComponent(2)} className={headingStyle}>
            Experience Details
          </h1>
          {isOpen[2] && (
            <ExperienceDetails
              experience={formData.experience}
              addExperience={addExperience}
              removeExperience={removeExperience}
              handleChange={handleExperienceChange}
            />
          )}

          <h1 onClick={() => toggleComponent(3)} className={headingStyle}>
            Professional Details
          </h1>
          {isOpen[3] && (
            // Pass these functions as props to ProfessionalDetails component

            <ProfessionalDetails
              formData={formData}
              handleChange={handleChange}
              addKeyword={addKeyword}
              removeKeyword={removeKeyword}
              updateKeyword={updateKeyword}
            />
          )}

          <h1 onClick={() => toggleComponent(4)} className={headingStyle}>
            Skills
          </h1>
          {isOpen[4] && (
            <Skills
              skills={formData.skills}
              handleChange={handleSkillChange}
              addSkill={addSkill}
              removeSkill={removeSkill}
              professionalTitle={formData.professionalTitle}
            />
          )}

          <h1 onClick={() => toggleComponent(1)} className={headingStyle}>
            Education
          </h1>
          {isOpen[1] && (
            <EducationDetails
              education={formData.education}
              addEducation={addEducation}
              removeEducation={removeEducation}
              handleChange={handleEducationChange}
            />
          )}

          <h1 onClick={() => toggleComponent(5)} className={headingStyle}>
            Projects
          </h1>
          {isOpen[5] && (
            <Projects
              projects={formData.projects}
              handleProjectChange={handleProjectChange}
              addProject={addProject}
              removeProject={removeProject}
            />
          )}
          <h1 onClick={() => toggleComponent(6)} className={headingStyle}>
            Certifications
          </h1>
          {isOpen[6] && (
            <Certifications
              certifications={formData.certifications}
              handleChange={handleCertificationsChange}
              addCertification={addCertification}
              removeCertification={removeCertification}
            />
          )}
          <h1 onClick={() => toggleComponent(7)} className={headingStyle}>
            Testimonials
          </h1>
          {isOpen[7] && (
            <Testimonials
              testimonials={formData.testimonials}
              handleChange={handleTestimonialChange}
              addTestimonial={addTestimonial}
              removeTestimonial={removeTestimonial}
            />
          )}
          <h1 onClick={() => toggleComponent(8)} className={headingStyle}>
            Hobbies
          </h1>
          {isOpen[8] && (
            <Hobbies
              hobbies={formData.hobbies}
              addHobby={addHobby}
              removeHobby={removeHobby}
              updateHobby={updateHobby}
            />
          )}

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-500 p-2 px-4 text-white font-semibold rounded-lg"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-blue-500 p-2 px-4 text-white font-semibold rounded-lg"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserInfo;
