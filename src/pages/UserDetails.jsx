import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserDetails = () => {
  const { user } = UserAuth();
  const [userDetails, setUserDetails] = useState(null);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    if (user) {
      const docRef = doc(firebaseDB, "users", user.uid);

      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserDetails(docSnapshot.data());
          }
        })
        .catch((error) => {
          console.error("Error fetching personal details:", error);
        });
    }
  }, [user]);

  const headingStyle = `font-bold text-2xl`;

  return (
    <div className="p-6">
      {userDetails ? (
        <motion.div className="flex flex-col gap-4">
          {/* Personal Details */}
          <div className="bg-main p-4 rounded-lg flex flex-col justify-center gap-4">
            <p className="text-5xl">
              {userDetails.firstName} {userDetails.lastName}
            </p>
            <p className="text-4xl">{userDetails.professionalTitle}</p>

            <p>{userDetails.summary}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3 bg-main p-4 rounded-lg flex flex-col gap-4">
              <div>
                {userDetails.contacts.email && (
                  <p>{userDetails.contacts.email}</p>
                )}
                {userDetails.contacts.phoneNumber && (
                  <p>{userDetails.contacts.phoneNumber}</p>
                )}
                {userDetails.location && <p>{userDetails.location}</p>}

                {userDetails.contacts.linkedIn && (
                  <a href={userDetails.contacts.linkedIn}>LinkedIn</a>
                )}

                {userDetails.contacts.gitHub && (
                  <a href={userDetails.contacts.gitHub}>GitHub</a>
                )}
                {userDetails.contacts.stackoverflow && (
                  <a href={userDetails.contacts.stackoverflow}>
                    Stack Overflow
                  </a>
                )}
              </div>

              <div>
                {userDetails.skills && (
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Skills:</h5>
                    <div className="">
                      {userDetails.skills.map((skill) => (
                        <div key={skill} className="mb-2">
                          <p>{skill.name}</p>

                          <div className="h-2 w-48 bg-gray-200 rounded">
                            <div
                              className={`h-full rounded bg-stroke`}
                              style={{
                                width:
                                  skill.proficiency === "beginner"
                                    ? "25%"
                                    : skill.proficiency === "intermediate"
                                    ? "50%"
                                    : skill.proficiency === "advanced"
                                    ? "75%"
                                    : "100%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {userDetails.hobbies && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Hobbies:
                    </h5>
                    <p className="list-disc pl-3 text-gray-700">
                      {userDetails.hobbies.map((hobby) => (
                        <p key={hobby}>{hobby}</p>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/3 bg-main p-4 rounded-lg flex flex-col gap-4">
              <div>
                {userDetails.experience && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Experience:
                    </h5>
                    <div className="list-disc pl-3 text-gray-700">
                      {userDetails.experience.map((exp) => (
                        <p key={exp.id || exp.companyName}>
                          <h1 className="font-bold text-2xl">{exp.position}</h1>
                          <h1 className="font-bold text-xl">
                            {exp.companyName}
                          </h1>
                          <div className="flex justify-between">
                            <p>
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate) || "Present"}
                            </p>
                            <p> {exp.location}</p>
                          </div>
                          {exp.responsibilities && (
                            <p>{exp.responsibilities}</p>
                          )}
                          {exp.skills && <p>{exp.skills}</p>}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {userDetails.education && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Education:
                    </h5>
                    <ul className="list-disc pl-3 text-gray-700">
                      {userDetails.education.map((edu) => (
                        <li key={edu.id || edu.institution}>
                          <h1 className="font-bold text-2xl">{edu.degree}</h1>
                          <h1 className="font-bold text-xl">
                            {edu.institution}
                          </h1>
                          <p>{edu.fieldOfStufy}</p>
                          <p>
                            {edu.startDate} - {edu.endDate || "Present"}
                          </p>
                          <p>{edu.gpa}</p>
                          {edu.description && <p>{edu.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                {userDetails.projects && (
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Projects:</h5>
                    <div className="flex flex-col gap-6">
                      {userDetails.projects.map((project) => (
                        <div
                          key={project.id}
                          className="border-4 border-highlight rounded-lg p-3"
                        >
                          <p className="font-bold text-2xl">{project.name}</p>
                          <p className="my-2">{project.description}</p>
                          {project.features && (
                            <div>
                              <p>Features:</p>
                              <p>{project.features}</p>
                            </div>
                          )}
                          <p>{project.stack}</p>
                          <p>{project.startDate}</p>
                          <p>{project.endDate}</p>
                          <div className="flex justify-around">
                            <a href={project.projectUrl}>View Project</a>
                            <a href={project.repositoryUrl}>View Code</a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {userDetails.certifications && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Certifications:
                    </h5>
                    <div>
                      {userDetails.certifications.map((certification) => (
                        <p key={certification.name}>
                          <p>{certification.name}</p>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-main p-4 rounded-lg flex flex-col gap-4">
            <h1>Other Information</h1>
            <div>
              {userDetails.contacts.whatsApp && (
                <a href={`https://wa.me/${userDetails.contacts.whatsApp}`}>
                  WhatsApp
                </a>
              )}
              {userDetails.contacts.twitter && (
                <a href={userDetails.contacts.twitter}>Twitter</a>
              )}
              {userDetails.contacts.facebook && (
                <a href={userDetails.contacts.facebook}>Facebook</a>
              )}
              {userDetails.contacts.instagram && (
                <a href={userDetails.contacts.instagram}>Instagram</a>
              )}
              {userDetails.testimonials && (
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">
                    Testimonials:
                  </h5>
                  <p className="list-disc pl-3 text-gray-700">
                    {userDetails.testimonials.map((testimonial) => (
                      <p key={testimonial.author}>
                        {testimonial.review} by {testimonial.author}
                      </p>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
