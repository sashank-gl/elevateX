import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { firebaseDB, storage } from "../../firebaseConfig";
import { UserAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { AiOutlineLock } from "react-icons/ai";
import { getDownloadURL, ref } from "firebase/storage";
import PrivateUser from "../../components/PrivateUser";

const BlackWhite = () => {
  const { user } = UserAuth();
  const { userId } = useParams();
  const [client, setClient] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    // Fetch template styles from Firestore
    const fetchStyles = async () => {
      const templateDocRef = doc(firebaseDB, "templates", "grayscale"); // Your template ID
      const docSnapshot = await getDoc(templateDocRef);
      if (docSnapshot.exists()) {
        setStyles(docSnapshot.data().styles); // Update styles state
      } else {
        console.error("Template styles not found in Firestore");
      }
    };

    fetchStyles();
  }, []);

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
  console.log(styles);
  return (
    <>
      {client && (
        <div className="{styles.container}">
          <div className={styles.flexContainer}>
            <div className={styles.imageContainer}>
              {photo && (
                <img
                  src={photo}
                  alt="Profile"
                  className="rounded-lg object-cover"
                />
              )}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.heading1}>
                {client.firstName} {client.lastName}
              </p>
              <p className={styles.heading2}>{client.profession}</p>
              <p className={styles.paragraph}>{client.objective}</p>
              <p className={styles.paragraph}>
                Currently residing in {client.location}
              </p>
              <p className={styles.paragraph}>
                Reach me on {client.email} or {client.phoneNumber}.
              </p>
            </div>
          </div>
          {client.isPublic && (
            <div className={styles.experienceList}>
              <h5 className="font-semibold text-gray-700 mb-2">Experience:</h5>
              <ul>
                {client.experience.map((exp) => (
                  <li
                    key={exp.id || exp.companyName}
                    className={styles.experienceListItem}
                  >
                    <p className={styles.experienceItemContent}>
                      {exp.position} at {exp.companyName} from {exp.startDate}{" "}
                      to {exp.endDate || "Present"}
                    </p>
                    {/* Uncomment if descriptions are available */}
                    {/* <p>{exp.description}</p> */}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Add other sections like skills and education with fetched styles */}
        </div>
      )}
    </>
  );
};

export default BlackWhite;
