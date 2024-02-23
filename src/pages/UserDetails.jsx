import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";
import { TiTick } from "react-icons/ti";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
      const docRef = doc(firebaseDB, "userInfo", user.uid);

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

  const headingStyle = `font-bold text-2xl mb-4`;
  const titleStyle = `font-semibold text-xl`;

  return (
    <div className="p-6">
      {userDetails ? (
        <motion.div className="flex flex-col gap-4">
          {/* Personal Details */}
          <div className="flex flex-col justify-center gap-4 rounded-lg bg-main p-4">
            <p className="text-5xl">
              {userDetails.firstName} {userDetails.lastName}
            </p>
            <p className="text-4xl">{userDetails.professionalTitle}</p>

            <p>{userDetails.summary}</p>
          </div>

          <div className="flex gap-4">
            <div className="flex w-1/3 flex-col gap-8 rounded-lg bg-main p-4">
              <div>
                {userDetails.contacts.email && (
                  <p>{userDetails.contacts.email}</p>
                )}
                {userDetails.contacts.phoneNumber && (
                  <p>{userDetails.contacts.phoneNumber}</p>
                )}
                {userDetails.location && <p>{userDetails.location}</p>}
              </div>
              {/* Social Media */}
              <div className="grid grid-cols-4 gap-6 text-2xl">
                {userDetails.contacts.linkedIn && (
                  <a href={userDetails.contacts.linkedIn}>
                    <FaLinkedin />
                  </a>
                )}

                {userDetails.contacts.gitHub && (
                  <a href={userDetails.contacts.gitHub}>
                    <FaGithub />
                  </a>
                )}
                {userDetails.contacts.stackoverflow && (
                  <a href={userDetails.contacts.stackoverflow}>
                    <FaStackOverflow />
                  </a>
                )}
                {userDetails.contacts.whatsApp && (
                  <a href={`https://wa.me/${userDetails.contacts.whatsApp}`}>
                    <FaWhatsapp />
                  </a>
                )}
                {userDetails.contacts.twitter && (
                  <a href={userDetails.contacts.twitter}>
                    <FaXTwitter />
                  </a>
                )}
                {userDetails.contacts.facebook && (
                  <a href={userDetails.contacts.facebook}>
                    <FaFacebookF />
                  </a>
                )}
                {userDetails.contacts.instagram && (
                  <a href={userDetails.contacts.instagram}>
                    <FaInstagram />
                  </a>
                )}
              </div>

              {/* Skills */}
              <div>
                {userDetails.skills && (
                  <div className="mb-4">
                    <h5 className="mb-2 font-semibold">Skills:</h5>
                    <div className="">
                      {userDetails.skills.map((skill) => (
                        <div key={skill} className="mb-2">
                          <p>{skill.name}</p>

                          <div className="h-2 w-48 rounded bg-background">
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

              {/* Hobbies */}
              <div>
                {userDetails.hobbies && (
                  <div className="mb-4">
                    <h5 className="mb-2  font-semibold">Hobbies:</h5>
                    <p className="list-disc pl-3 ">
                      {userDetails.hobbies.map((hobby) => (
                        <p key={hobby}>{hobby}</p>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="flex w-2/3 flex-col gap-4 rounded-lg bg-main p-4">
              <div>
                {userDetails.experience && (
                  <div className="">
                    <h5 className={headingStyle}>Experience:</h5>
                    <div className="pl-3">
                      {userDetails.experience
                        .sort(
                          (a, b) =>
                            new Date(b.startDate) - new Date(a.startDate),
                        )
                        .map((exp, index, array) => (
                          <div
                            key={exp.id || exp.companyName}
                            className={`mb-3 ${
                              index !== array.length - 1
                                ? "border-b border-stroke/50 pb-3"
                                : ""
                            }`}
                          >
                            <h1 className={titleStyle}>
                              {exp.position}, {exp.companyName}
                            </h1>
                            <div className="flex justify-between">
                              <p className="italic">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.endDate === ""
                                  ? "Present"
                                  : formatDate(exp.endDate)}
                              </p>
                              <p> {exp.location}</p>
                            </div>
                            {exp.responsibilities &&
                              exp.responsibilities.map(
                                (responsibility, respIndex) => (
                                  <div
                                    key={respIndex}
                                    className="flex items-center gap-3"
                                  >
                                    <p className="text-xl">
                                      <TiTick />
                                    </p>
                                    <p>{responsibility}</p>
                                  </div>
                                ),
                              )}

                            {exp.skills && (
                              <p className="mt-1">
                                <span className="font-semibold">
                                  Skills in action:{" "}
                                </span>
                                {exp.skills}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {userDetails.education && (
                  <div className="mb-4">
                    <h5 className={headingStyle}>Education:</h5>
                    <div className="pl-3 ">
                      {userDetails.education
                        .sort(
                          (a, b) =>
                            new Date(b.startDate) - new Date(a.startDate),
                        )
                        .map((edu, index, array) => (
                          <div
                            key={edu.id || edu.institution}
                            className={`mb-3 ${
                              index !== array.length - 1
                                ? "border-b border-stroke/50 pb-3"
                                : ""
                            }`}
                          >
                            <h1 className={titleStyle}>{edu.degree}</h1>
                            <h1 className={titleStyle}>{edu.institution}</h1>
                            <p>{edu.fieldOfStufy}</p>
                            <p className="italic">
                              {formatDate(edu.startDate)} -{" "}
                              {edu.endDate === ""
                                ? "Present"
                                : formatDate(edu.endDate)}
                            </p>
                            <p>{edu.gpa}</p>
                            {edu.description && <p>{edu.description}</p>}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg bg-main p-4">
            <div>
              {userDetails.projects && (
                <div className="mb-4">
                  <h5 className={headingStyle}>Projects:</h5>
                  <div className="flex flex-col gap-6">
                    {userDetails.projects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-lg border-4 border-highlight p-3"
                      >
                        <div className="flex justify-between">
                          <p className={titleStyle}>{project.name}</p>
                          <div className="flex">
                            {project.startDate && project.endDate && (
                              <p className="italic">
                                {formatDate(project.startDate)} -{" "}
                                {formatDate(project.endDate)}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="my-2">{project.description}</p>
                        <p>{project.stack}</p>

                        <div className="mt-2 flex justify-around">
                          <a
                            href={project.projectUrl}
                            className="rounded-lg bg-stroke px-4 py-2 text-highlight"
                          >
                            View Project
                          </a>
                          <a
                            href={project.repositoryUrl}
                            className="rounded-lg bg-stroke px-4 py-2 text-highlight"
                          >
                            View Code
                          </a>
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
                  <h5 className={headingStyle}>Certifications:</h5>
                  <div>
                    {userDetails.certifications.map((certification) => (
                      <div
                        key={certification.name}
                        className="flex flex-col gap-1"
                      >
                        <p className={titleStyle}>{certification.name}</p>
                        <p className="italic">
                          issued by {certification.issuedBy} on{" "}
                          {formatDate(certification.certificationDate)}
                        </p>
                        <p>{certification.description}</p>
                        {certification.expiry && (
                          <p className="italic">
                            expires on {formatDate(certification.expiry)}
                          </p>
                        )}
                        <div className="mt-3">
                          <a
                            href={certification.certificateUrl}
                            className="rounded-lg bg-stroke px-4 py-2 text-highlight"
                          >
                            View Certificate
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              {userDetails.testimonials && (
                <div className="mb-4">
                  <h5 className={headingStyle}>Testimonials:</h5>
                  <p className="pl-3">
                    {userDetails.testimonials.map((testimonial) => (
                      <p
                        key={testimonial.id}
                        className="mb-2 rounded-lg bg-background p-3"
                      >
                        "{testimonial.review}" by {testimonial.author}
                      </p>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
