import React, { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BASE_URL } from "../utils/config";

const UserInfo = () => {
  const { user } = UserAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    professionalTitle: "",
    location: "",
    summary: "",
    experience: [],
    skills: [],
    education: [],
    projects: [],
    uniqueUrl: `${BASE_URL}/${user.uid}`,
    isPublic: false, // Initialize as private by default
  });
  const [isPublic, setIsPublic] = useState(formData.isPublic); // Initialize with initial value

  const [photo, setPhoto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uniqueUrl: `${BASE_URL}/${user.uid}`,
    }));
  }, [BASE_URL, user.uid]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchableUserData = {
      userId: user.uid,
      email: formData.email,
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

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          id: Math.random(),
          companyName: "",
          position: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: Math.random(),
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
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

  const labelStyle = `flex gap-4 my-1`;
  const labelTextStyle = `my-1 w-40`;
  const inputStyle = `h-10 rounded-lg p-1`;

  return (
    <div className="flex flex-col text-xl">
      <motion.h1
        initial={{ y: 20, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-500 text-center py-12"
      >
        From Blank Canvas to Masterpiece: Craft Your Portfolio
      </motion.h1>

      {editMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 bg-indigo-50 shadow-md rounded-lg m-12 p-8"
        >
          <div className="flex items-center justify-center gap-12 h-48">
            {photo && (
              <div className="mb-4">
                <img
                  src={photo}
                  alt="Profile"
                  className="rounded-full h-32 w-32 mx-auto"
                />
              </div>
            )}
            <label className="flex flex-col gap-4">
              Photo:
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
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-8 px-12 rounded-lg  min-w-96"
          >
            <div className="flex justify-between">
              <label className={labelStyle}>
                <span className={labelTextStyle}>First Name:</span>
                <input
                  className={inputStyle}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>
              <label className={labelStyle}>
                <span className={labelTextStyle}>Last Name:</span>

                <input
                  className={inputStyle}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <h1 className="text-2xl">Contact Details</h1>
              <div className="grid grid-cols-2 gap-4">
                <label className={labelStyle}>
                  <span className={labelTextStyle}>Email:</span>
                  <input
                    className={inputStyle}
                    type="mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                <label className={labelStyle}>
                  <span className={labelTextStyle}>Phone Number:</span>
                  <input
                    className={inputStyle}
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </label>

                <label className={labelStyle}>
                  <span className={labelTextStyle}>Location:</span>
                  <input
                    className={inputStyle}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <h1 className="text-2xl">Professional Details</h1>
              <label className={labelStyle}>
                <span className={labelTextStyle}>Title:</span>
                <input
                  className={inputStyle}
                  type="text"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleChange}
                />
              </label>

              <label className={`${labelStyle} flex-col`}>
                <span className={`my-1`}>Objective / Summary:</span>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="rounded-lg min-h-36"
                />
              </label>

              {/* Experience, Skills, and Education as dynamic sections */}
              <label className={labelStyle}>
                <span className={labelTextStyle}>Experience:</span>
              </label>
              {formData.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-2 mb-4 gap-4">
                  <label className={labelStyle}>
                    <span className={labelTextStyle}> Company Name:</span>

                    <input
                      className={inputStyle}
                      type="text"
                      name={`experience[${index}].companyName`}
                      value={exp.companyName}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].companyName = e.target.value;
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                    />
                  </label>
                  <label className={labelStyle}>
                    <span className={labelTextStyle}>Position:</span>

                    <input
                      className={inputStyle}
                      type="text"
                      name={`experience[${index}].position`}
                      value={exp.position}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].position = e.target.value;
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                    />
                  </label>
                  <label className={labelStyle}>
                    <span className={labelTextStyle}> Start Date:</span>

                    <input
                      className={inputStyle}
                      type="date"
                      name={`experience[${index}].startDate`}
                      value={exp.startDate}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].startDate = e.target.value;
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                    />
                  </label>
                  <label className={labelStyle}>
                    <span className={labelTextStyle}>
                      {" "}
                      End Date (optional):
                    </span>

                    <input
                      className={inputStyle}
                      type="date"
                      name={`experience[${index}].endDate`}
                      value={exp.endDate}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].endDate = e.target.value;
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                    />
                  </label>
                  <label className={`${labelStyle} flex-col col-span-2`}>
                    <span className={`my-1`}>Description:</span>

                    <textarea
                      name={`experience[${index}].description`}
                      value={exp.description}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                      className="rounded-lg min-h-36"
                    />
                  </label>
                  <div className="col-span-2 flex justify-center items-center">
                    <button
                      className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
                      type="button"
                      onClick={() => {
                        const updatedExperience = formData.experience.filter(
                          (_exp, _index) => _index !== index
                        );
                        setFormData({
                          ...formData,
                          experience: updatedExperience,
                        });
                      }}
                    >
                      Remove Experience
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
                type="button"
                onClick={() => addExperience()}
              >
                Add Experience
              </button>
            </div>
            <label className={labelStyle}>
              {" "}
              <span className={labelTextStyle}></span> Skills:
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <input
                  className={inputStyle}
                  type="text"
                  name={`skills[${index}]`}
                  value={skill}
                  onChange={(e) => {
                    const updatedSkills = [...formData.skills];
                    updatedSkills[index] = e.target.value;
                    setFormData({ ...formData, skills: updatedSkills });
                  }}
                />
                <button
                  className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
                  type="button"
                  onClick={() => {
                    const updatedSkills = formData.skills.filter(
                      (_skill, _index) => _index !== index
                    );
                    setFormData({ ...formData, skills: updatedSkills });
                  }}
                >
                  Remove Skill
                </button>
              </div>
            ))}
            <button
              className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => addSkill()}
            >
              Add Skill
            </button>

            <label className={labelStyle}>
              {" "}
              <span className={labelTextStyle}></span> Education:
            </label>
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-2 mb-4 gap-4">
                <label className={labelStyle}>
                  <span className={labelTextStyle}>Institution:</span>
                  <input
                    className={inputStyle}
                    type="text"
                    name={`education[${index}].institution`}
                    value={edu.institution}
                    onChange={(e) => {
                      const updatedEducation = [...formData.education];
                      updatedEducation[index].institution = e.target.value;
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                  />
                </label>
                <label className={labelStyle}>
                  <span className={labelTextStyle}>Degree:</span>
                  <input
                    className={inputStyle}
                    type="text"
                    name={`education[${index}].degree`}
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...formData.education];
                      updatedEducation[index].degree = e.target.value;
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                  />
                </label>
                <label className={labelStyle}>
                  <span className={labelTextStyle}>Start Date:</span>
                  <input
                    className={inputStyle}
                    type="date"
                    name={`education[${index}].startDate`}
                    value={edu.startDate}
                    onChange={(e) => {
                      const updatedEducation = [...formData.education];
                      updatedEducation[index].startDate = e.target.value;
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                  />
                </label>
                <label className={labelStyle}>
                  <span className={labelTextStyle}>End Date (optional):</span>
                  <input
                    className={inputStyle}
                    type="date"
                    name={`education[${index}].endDate`}
                    value={edu.endDate}
                    onChange={(e) => {
                      const updatedEducation = [...formData.education];
                      updatedEducation[index].endDate = e.target.value;
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                  />
                </label>
                <label className={`${labelStyle} flex-col col-span-2`}>
                  <span className={`my-1`}>Description:</span>
                  <textarea
                    name={`education[${index}].description`}
                    value={edu.description}
                    onChange={(e) => {
                      const updatedEducation = [...formData.education];
                      updatedEducation[index].description = e.target.value;
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                    className="rounded-lg min-h-36"
                  />
                </label>
                <div className="col-span-2 flex justify-center items-center">
                  <button
                    className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
                    type="button"
                    onClick={() => {
                      const updatedEducation = formData.education.filter(
                        (_edu, _index) => _index !== index
                      );
                      setFormData({ ...formData, education: updatedEducation });
                    }}
                  >
                    Remove Education
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-red-500 text-white font-semibold p-2 rounded-lg px-4"
              type="button"
              onClick={() => addEducation()}
            >
              Add Education
            </button>

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
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 bg-indigo-50 shadow-md rounded-lg m-12 p-8"
        >
          <div className="flex justify-end items-center gap-4">
            <button
              className="bg-blue-500 p-2 px-4 text-white font-semibold rounded-lg"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit
            </button>

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

          {userDetails ? (
            <motion.div className="gap-6">
              {/* Personal Details */}

              <div className="flex justify-center items-center">
                <div className="w-2/6">
                  {photo && (
                    <div className="p-10 rounded-lg">
                      <img
                        src={photo}
                        alt="Profile"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="w-4/6 flex flex-col gap-2">
                  <p className="text-5xl">
                    {userDetails.firstName} {userDetails.lastName}
                  </p>
                  <p className="text-4xl">{userDetails.professionalTitle}</p>
                  <p>{userDetails.summary}</p>
                  <p>Currently residing in {userDetails.location}</p>
                  <p>
                    Reach me on {userDetails.email} or {userDetails.phoneNumber}
                    .
                  </p>
                </div>
              </div>

              {/* Experience (if available) */}
              {userDetails.experience && (
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Experience:
                  </h5>
                  <ul className="list-disc pl-3 text-gray-700">
                    {userDetails.experience.map((exp) => (
                      <li key={exp.id || exp.companyName} className="list-none">
                        <p>
                          {exp.position} at {exp.companyName} from{" "}
                          {exp.startDate} to {exp.endDate || "Present"}
                        </p>
                        <p>
                          {/* {exp.description && <p>{exp.description}</p>} */}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {userDetails.skills && (
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Skills:</h5>
                  <ul className="list-disc pl-3 text-gray-700">
                    {userDetails.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-blue-500 hover:text-blue-600 transition duration-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education (if available) */}
              {userDetails.education && (
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Education:
                  </h5>
                  <ul className="list-disc pl-3 text-gray-700">
                    {userDetails.education.map((edu) => (
                      <li key={edu.id || edu.institution}>
                        <p>
                          {edu.degree} at {edu.institution}
                        </p>
                        <p>
                          {edu.startDate} - {edu.endDate || "Present"}
                        </p>
                        {edu.description && <p>{edu.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ) : (
            <p className="text-lg font-medium text-gray-700 text-center">
              Loading personal details...
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserInfo;
