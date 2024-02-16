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
  const [showTemplates, setShowTemplates] = useState(false);

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
  }, []);

  return (
    <div className="h-screen p-4 flex flex-col justify-between">
      <div>
        <motion.h1 className="text-3xl font-extrabold ">
          Elevate<span className="text-tertiary">X</span>
        </motion.h1>
        <div className="flex flex-col justify-center items-center p-4 gap-6">
          {photo && (
            <div className="rounded-full h-48 w-48 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
                src={photo}
                alt="Profile"
                className="rounded-full object-cover h-full w-full"
              />
            </div>
          )}
          <Link
            className="text-xl  font-bold hover:underline"
            to={`/${user.uid}`}
          >
            View My Portfolio
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3  font-semibold">
        <Link
          to="/"
          className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white"
        >
          My Profile
        </Link>
        <Link
          to="/edit-profile"
          className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white"
        >
          Edit Profile
        </Link>
       
        <Link
          to="/templates"
          className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white"
        >
          Templates
        </Link>
        <Link className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white">
          Settings
        </Link>
        <button
          onClick={handleSignOutWithGoogle}
          className="hover:bg-gradient-to-l from-stroke from-50% rounded-r-full py-2 px-6 text-center hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
