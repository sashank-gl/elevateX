import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { getDownloadURL, ref } from "firebase/storage";

const Portfolio = () => {
  const { user } = UserAuth();
  const { userId } = useParams();
  const [client, setClient] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch the portfolio data for the specified user
      const userDocRef = doc(firebaseDB, "users", userId);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setClient(docSnapshot.data());
          } else {
            console.log("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error fetching user document:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const storageRef = ref(storage, `users/${userId}/profile_photo`);
      getDownloadURL(storageRef)
        .then((url) => {
          setPhoto(url);
        })
        .catch((error) => {
          console.error("Error fetching user photo:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
      {client && (
        <motion.div className="gap-6">
          <div className="flex justify-center items-center">
            <div className="w-2/6">
              {/* Display photo if available */}
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
              {/* Display user details */}
              <p className="text-5xl">
                {client.firstName} {client.lastName}
              </p>
              <p className="text-4xl">{client.profession}</p>
              <p>{client.objective}</p>
              <p>Currently residing in {client.location}</p>
              <p>
                Reach me on {client.email} or {client.phoneNumber}.
              </p>
            </div>
          </div>

          {/* Additional fields based on privacy */}
          {user.uid === userId || client.isPublic ? (
            <>
              {/* Display all fields if public */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">
                  Experience:
                </h5>
                {/* Assuming client.experience is an array */}
                <ul className="list-disc pl-3 text-gray-700">
                  {client.experience.map((exp) => (
                    <li key={exp.id || exp.companyName} className="list-none">
                      <p>
                        {exp.position} at {exp.companyName} from {exp.startDate}{" "}
                        to {exp.endDate || "Present"}
                      </p>
                      {/* Uncomment if descriptions are available */}
                      {/* <p>{exp.description}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Add other sections like skills and education similarly */}
            </>
          ) : (
            // If private, show only first and last name
            <>
              <div className="mb-4">
                <p className="font-semibold text-gray-700 mb-2">
                  Private Profile
                </p>
                <p>
                  Due to privacy settings, certain details are not available.
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
