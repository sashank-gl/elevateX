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

  return (
    <div>
      {userDetails ? (
        <motion.div className="gap-6">
          {/* Personal Details */}
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-2">
              <p className="text-5xl">
                {userDetails.firstName} {userDetails.lastName}
              </p>
              <p className="text-4xl">{userDetails.professionalTitle}</p>
              <p>{userDetails.summary}</p>
              <p>Currently residing in {userDetails.location}</p>

              <p>
                Reach me at:
                {userDetails.contacts.email && (
                  <p>Email: {userDetails.contacts.email}</p>
                )}
                {userDetails.contacts.phoneNumber && (
                  <p>Phone: {userDetails.contacts.phoneNumber}</p>
                )}
                {userDetails.contacts.whatsApp && (
                  <p>WhatsApp: {userDetails.contacts.whatsApp}</p>
                )}
                {userDetails.contacts.linkedIn && (
                  <p>LinkedIn: {userDetails.contacts.linkedIn}</p>
                )}
                {userDetails.contacts.twitter && (
                  <p>Twitter: {userDetails.contacts.twitter}</p>
                )}
                {userDetails.contacts.gitHub && (
                  <p>GitHub: {userDetails.contacts.gitHub}</p>
                )}
                {userDetails.contacts.facebook && (
                  <p>Facebook: {userDetails.contacts.facebook}</p>
                )}
                {userDetails.contacts.instagram && (
                  <p>Instagram: {userDetails.contacts.instagram}</p>
                )}
                {userDetails.contacts.stackoverflow && (
                  <p>Stack Overflow: {userDetails.contacts.stackoverflow}</p>
                )}
              </p>
            </div>
          </div>

          {/* Professional Details */}
          <div className="mb-4">
            <p>
              <strong>Title:</strong> {userDetails.professionalTitle}
            </p>
            <p>
              <strong>Tagline:</strong> {userDetails.tagline}
            </p>
            <p>
              <strong>Call to Action:</strong> {userDetails.callToActionText}
            </p>
            <p>
              <strong>Portfolio Goal:</strong> {userDetails.portfolioGoal}
            </p>

            {userDetails.keywords && userDetails.keywords.length > 0 && (
              <p>
                <strong>Keywords:</strong> {userDetails.keywords.join(", ")}
              </p>
            )}
          </div>
          {/* Experience (if available) */}
          {userDetails.experience && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Experience:</h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.experience.map((exp) => (
                  <li key={exp.id || exp.companyName} className="list-none">
                    <p>
                      {exp.position} at {exp.companyName} from {exp.startDate}{" "}
                      to {exp.endDate || "Present"}
                    </p>
                    {/* {exp.description && <p>{exp.description}</p>} */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills (if available) */}
          {userDetails.skills && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Skills:</h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-blue-500 hover:text-blue-600 transition duration-300"
                  >
                    {skill.name}
                    {skill.proficiency}
                    {skill.category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education (if available) */}
          {userDetails.education && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Education:</h5>
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

          {/* Projects (if available) */}
          {userDetails.projects && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Projects:</h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.projects.map((project) => (
                  <li key={project.name}>
                    <p>{project.name}</p>
                    {/* Add other project details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications (if available) */}
          {userDetails.certifications && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">
                Certifications:
              </h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.certifications.map((certification) => (
                  <li key={certification.name}>
                    <p>{certification.name}</p>
                    {/* Add other certification details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Hobbies (if available) */}
          {userDetails.hobbies && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">Hobbies:</h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.hobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonials (if available) */}
          {userDetails.testimonials && (
            <div className="mb-4">
              <h5 className="font-semibold text-gray-700 mb-2">
                Testimonials:
              </h5>
              <ul className="list-disc pl-3 text-gray-700">
                {userDetails.testimonials.map((testimonial) => (
                  <li key={testimonial.author}>
                    {testimonial.review} by {testimonial.author}
                    {/* Add other testimonial details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add other sections here as needed */}
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
