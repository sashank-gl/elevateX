import { getDownloadURL, ref } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebaseConfig";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [photo, setPhoto] = useState(null);
  const { user, signOutWithGoogle } = UserAuth();

  const handleSignOutWithGoogle = async () => {
    try {
      await signOutWithGoogle();
      console.log("Signed Out working");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserPhoto = async () => {
      const storageRef = ref(storage, `users/${user.uid}/profile_photo`);
      try {
        const photoUrl = await getDownloadURL(storageRef);
        setPhoto(photoUrl);
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };
    fetchUserPhoto();
  }, [photo]);

  return (
    <div className="flex h-screen flex-col justify-between border-r border-tertiary p-4">
      <div>
        <motion.h1 className="text-3xl font-extrabold ">
          Elevate<span className="text-tertiary">X</span>
        </motion.h1>
        <div className="flex flex-col items-center justify-center gap-6 p-4">
          {photo && (
            <div className="h-48 w-48 overflow-hidden rounded-full">
              <motion.img
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
                src={photo}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3  font-semibold">
        <Link
          to="/"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          My Profile
        </Link>
        <Link
          to="/edit-profile"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Edit Profile
        </Link>
        <Link
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
          to={`/${user.uid}`}
        >
          My Portfolio
        </Link>

        <Link
          to="/templates"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Templates
        </Link>
        <Link
          to="/review"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Leave a Review
        </Link>
        <Link
          to="/donate"
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Buy Me a Coffee
        </Link>
        <button
          onClick={handleSignOutWithGoogle}
          className="rounded-r-full from-stroke from-50% px-6 py-2 text-center hover:bg-gradient-to-l hover:text-highlight"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
