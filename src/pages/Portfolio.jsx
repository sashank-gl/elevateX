import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { getDownloadURL, ref } from "firebase/storage";
import PrivateUser from "../components/PrivateUser";

const Portfolio = () => {
  const { user } = UserAuth();
  const { userId } = useParams();
  const [client, setClient] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [templateName, setTemplateName] = useState(null);

  useEffect(() => {
    if (userId) {
      const userDocRef = doc(firebaseDB, "userInfo", userId);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const clientData = docSnapshot.data();
            setClient(clientData);
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
      const templateDocRef = doc(firebaseDB, "users", userId);
      getDoc(templateDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setTemplateId(userData?.templateId);
            setTemplateName(userData?.templateName);
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

  const renderTemplate = () => {
    if (!templateId) {
      return null;
    }
    const formattedTemplateName = templateName.replace(/\s/g, "");
    const TemplateComponent = React.lazy(
      () => import(`../templates/${formattedTemplateName}`),
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
          <>{renderTemplate()}</>
        ) : (
          <PrivateUser />
        )}
      </motion.div>
    </div>
  );
};

export default Portfolio;
