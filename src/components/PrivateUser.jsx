import { motion } from "framer-motion";
import { AiOutlineLock } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";

const PrivateUser = () => {
  const [client, setClient] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
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

  return (
    <div>
      {client && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 rounded-lg bg-yellow-200 p-4"
        >
          <p className="text-5xl">
            {client.firstName} {client.lastName}
          </p>
          <div className="flex items-center">
            <span className="mr-2 text-2xl text-yellow-600">
              <AiOutlineLock />
            </span>
            <div>
              <p className="mb-2 font-semibold text-gray-700">
                Private Profile
              </p>
              <p className="text-gray-800">
                Due to privacy settings, certain details are not available.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PrivateUser;
