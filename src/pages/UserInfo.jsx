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
import Loader from "../components/Loader";
import { FaCamera } from "react-icons/fa6";

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
    brandName: "",
    tagline: "",
    callToActionText: "",
    portfolioGoal: "",
    summary: "",
    keywords: [],
    experience: [
      {
        companyName: "",
        position: "",
        location: "",
        responsibilities: [""],
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
    uid: user.uid,
  });

  const [photo, setPhoto] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (user) {
      const docRef = doc(firebaseDB, "userInfo", user.uid);

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

  const [isVisibilityChanging, setIsVisibilityChanging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const makeProfilePublic = async () => {
    setIsVisibilityChanging(true);
    try {
      await updateDoc(doc(firebaseDB, "users", user.uid), {
        isPublic: true,
      });
      await updateDoc(doc(firebaseDB, "publicUsers", user.uid), {
        isPublic: true,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsVisibilityChanging(false);
      }, 1000);
    } catch (error) {
      console.error("Error making profile public:", error);
      setIsVisibilityChanging(false);
    }
  };

  const makeProfilePrivate = async () => {
    setIsVisibilityChanging(true);
    try {
      await updateDoc(doc(firebaseDB, "users", user.uid), {
        isPublic: false,
      });
      await updateDoc(doc(firebaseDB, "publicUsers", user.uid), {
        isPublic: false,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsVisibilityChanging(false);
      }, 1000);
    } catch (error) {
      console.error("Error making profile private:", error);
      setIsVisibilityChanging(false);
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
      (_keyword, _index) => _index !== index,
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: updatedHobbies,
    }));
  };

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
      prevOpen.map((isOpen, i) => (i === index ? !isOpen : false)),
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

  const removeCertification = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      certifications: prevState.certifications.filter((_, i) => i !== index),
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const searchableUserData = {
      userId: user.uid,
      email: formData.contacts.email,
      name: `${formData.firstName} ${formData.lastName}`,
      photo: photo,
      review: {
        text: "",
        feedback: "",
        stars: 0,
      },
      title: formData.professionalTitle,
      uniqueUrl: formData.uniqueUrl,
      isPublic: formData.isPublic,
    };

    const searchableUserRef = doc(firebaseDB, "publicUsers", user.uid);
    try {
      await setDoc(searchableUserRef, searchableUserData);
      console.log("User added to publicUsers collection successfully");
    } catch (error) {
      console.error("Error adding user to publicUsers:", error);
    }

    const updatedData = { ...formData };
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
      const docRef = doc(firebaseDB, "userInfo", user.uid);

      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(docRef, updatedData, { merge: true });
        console.log("User Info and URL updated successfully");
      } else {
        await updateDoc(docRef, updatedData);
        console.log("Personal Details updated successfully");
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating details:", error);
      setIsSubmitting(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [uploadStatus, setUploadStatus] = useState("Upload Photo");

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    const storageRef = ref(storage, `users/${user.uid}/profile_photo`);
    try {
      setUploadStatus("Uploading...");
      await uploadBytes(storageRef, selectedFile);
      const photoUrl = await getDownloadURL(storageRef);
      setPhoto(photoUrl);
      setUploadStatus("Uploaded!");
      setSelectedFile(null);
      setTimeout(() => {
        setUploadStatus("Upload Photo");
      }, 2000);
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploadStatus("Error");
    }
  };

  const addSkill = () => {
    setFormData((prevState) => ({
      ...prevState,
      skills: [
        ...prevState.skills,
        { id: Math.random(), name: "", proficiency: "", category: "" },
      ],
    }));
  };

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
          responsibilities: [""],
          skills: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter(
      (_exp, _index) => _index !== index,
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

  const addResponsibility = (expIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities.push("");
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities.splice(respIndex, 1);
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
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
      (_project, _index) => _index !== index,
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

  const addKeyword = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: [...prevFormData.keywords, ""],
    }));
  };

  const removeKeyword = (index) => {
    const updatedKeywords = formData.keywords.filter(
      (_keyword, _index) => _index !== index,
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: updatedKeywords,
    }));
  };

  const updateKeyword = (index, value) => {
    const updatedKeywords = [...formData.keywords];
    updatedKeywords[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: updatedKeywords,
    }));
  };

  const [hoverPhoto, setHoverPhoto] = useState(false);
  const headingStyle = `text-4xl font-bold text-center py-3 italic rounded-full cursor-pointer hover:bg-stroke hover:text-white`;
  return (
    <div className="custom-scrollbar flex h-full flex-col overflow-y-auto text-xl">
      {isSubmitting && (
        <div className="fixed inset-0 z-10 flex h-screen flex-col items-center justify-center gap-12 bg-background/50 backdrop-blur-md">
          <Loader />
          <p className="animate-pulse text-2xl font-semibold">Saving Changes</p>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-10 flex h-screen flex-col items-center justify-center gap-12 bg-background/50 backdrop-blur-md">
          {/* <Loader /> */}
          <p className="animate-pulse text-2xl font-semibold">Success!</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="m-12 flex flex-col gap-4 rounded-lg p-8"
      >
        <div className="flex items-center justify-start gap-8">
          <label className="flex flex-col gap-4">
            {photo ? (
              <div
                className="relative"
                onMouseEnter={() => setHoverPhoto(true)}
                onMouseLeave={() => setHoverPhoto(false)}
              >
                <img
                  src={photo}
                  alt="Profile"
                  className="mx-auto size-56 rounded-lg object-cover"
                />

                {hoverPhoto && (
                  <div className="absolute left-0 top-0 flex size-56 cursor-pointer items-center justify-center rounded-lg bg-black/40 text-center text-white">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <FaCamera fontSize={28} />
                      {photo ? "Update Picture" : "Upload Picture"}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Loader />
            )}
            <input
              type="file"
              id="photoInput"
              name="photo"
              className="hidden"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <>
                {selectedFile.name}
                <button
                  className="rounded-lg bg-button p-2 px-4 font-semibold text-highlight"
                  onClick={handlePhotoUpload}
                  disabled={
                    uploadStatus === "Uploading..." ||
                    uploadStatus === "Uploaded!"
                  }
                >
                  {uploadStatus}
                </button>
              </>
            )}
          </label>
          {user.isPublic ? (
            <button
              className="rounded-lg bg-button p-2 px-4 font-semibold text-highlight hover:bg-stroke"
              onClick={makeProfilePrivate}
              disabled={isVisibilityChanging}
            >
              {showSuccess
                ? "Success"
                : isVisibilityChanging
                  ? "Processing..."
                  : "Make Profile Private"}
            </button>
          ) : (
            <button
              className="rounded-lg bg-button p-2 px-4 font-semibold text-white hover:bg-stroke"
              onClick={makeProfilePublic}
              disabled={isVisibilityChanging}
            >
              {showSuccess
                ? "Success"
                : isVisibilityChanging
                  ? "Processing..."
                  : "Make Profile Public"}
            </button>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex min-w-96 flex-col gap-3 rounded-lg p-8  px-12"
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
              addResponsibility={addResponsibility}
              removeResponsibility={removeResponsibility}
              handleResponsibilityChange={handleResponsibilityChange}
            />
          )}

          <h1 onClick={() => toggleComponent(3)} className={headingStyle}>
            Professional Details
          </h1>
          {isOpen[3] && (
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

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-button p-2 px-4 font-semibold text-white hover:bg-stroke"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserInfo;
