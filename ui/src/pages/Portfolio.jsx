import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { AiOutlineLock } from "react-icons/ai";
import { getDownloadURL, ref } from "firebase/storage";
import PrivateUser from "../components/PrivateUser";

const Portfolio = () => {
  const { user } = UserAuth();
  const { userId } = useParams();
  const [client, setClient] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [templateName, setTemplateName] = useState(null); // Added state for templateName

  useEffect(() => {
    if (userId) {
      const userDocRef = doc(firebaseDB, "users", userId);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const clientData = docSnapshot.data();
            setClient(clientData);
            setTemplateId(clientData?.templateId);
            setTemplateName(clientData?.templateName); // Set templateName
          } else {
            console.log("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error fetching user document:", error);
        });

      // Optional: Fetch user photo (implement as needed)
      // ... // Use useEffect and getDownloadURL as before
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


  console.log('Client',client)
  console.log('User',user)
  console.log('Photo',photo)

  const renderTemplate = () => {
    if (!templateId) {
      return null; // Early return if no templateId
    }

    const TemplateComponent = React.lazy(() =>
      import(`../templates/free/${templateName}`)
    );

    return (
      <Suspense fallback={<div>Loading template...</div>}>
        <TemplateComponent client={client} photo={photo} />
      </Suspense>
    );
  };

  return (
    <div>
      <motion.div className="gap-6">
        {user && client && (user.uid === userId || client.isPublic) ? (
          <>
            {templateName && <h2>{templateName}</h2>}
            {renderTemplate()}
          </>
        ) : (
          <PrivateUser />
        )}
      </motion.div>
    </div>
  );
};

export default Portfolio;
