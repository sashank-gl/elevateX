import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";
import { UserAuth } from "../contexts/AuthContext";

const Portfolio = () => {
  const { user } = UserAuth();
  const { userId } = useParams();
  const [client, setClient] = useState(null);

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
  

  return (
    <div>
      <h1>Portfolio</h1>
      {client && (
        <div>
          {client.isPublic ? (
            // If public, show all fields
            <>
              <p>{client.firstName}</p>
              <p>{client.lastName}</p>
              <p>{client.email}</p>
              <p>{client.objective}</p>
              <p>{client.phoneNumber}</p>
              <p>{client.profession}</p>
            </>
          ) : (
            // If private, show only first and last name
            <>
              <p>{client.firstName}</p>
              <p>{client.lastName}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
