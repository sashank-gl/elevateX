import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const GoogleSignIn = () => {
  const { signInWithGoogle, user } = UserAuth();
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      console.log("Sign in working");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    } else {
      // Handle initial loading or potential errors
      console.log("User data not yet available");
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex"
      transition={{ duration: 0.5 }}
    >
      {/* Left Section - Benefits and Features */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="w-1/2 flex flex-col justify-center items-center bg-blue-500 text-white p-10"
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Why ElevateX?</h2>
        <p className="text-lg mb-4">
          Tired of spending hours building and maintaining your portfolio
          website? ElevateX takes the struggle out of portfolio creation,
          allowing you to showcase your skills and projects in minutes. Simply
          sign in, enter your details, choose a template, and your professional
          portfolio is ready to impress!
        </p>
        <h1 className="text-2xl mb-4 font-bold">ElevateX offers:</h1>
        <ul className="text-lg list-disc pl-5 mb-4">
          <li>
            Quick and easy website creation: No coding or design experience
            needed.
          </li>
          <li>
            Professional templates: Choose from a variety of modern and stylish
            designs.
          </li>
          <li>Effortless customization: Add your personal touch with ease.</li>
          <li>
            Free with your chosen subdomain: Showcase your talent with a branded
            URL.
          </li>
        </ul>
        <p className="text-lg">
          Sign in today and join the growing community of developers using
          ElevateX to level up their online presence.
        </p>
      </motion.div>

      {/* Right Section - Sign-in Form */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="w-1/2 flex flex-col justify-center items-center bg-white p-10"
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-8">
          Effortless Portfolio Creation Starts Here
        </h1>
        <h2 className="text-2xl mb-12">Join ElevateX Now</h2>
        <button
          onClick={handleSignInWithGoogle}
          className="w-80 h-16 bg-red-500 text-white text-xl font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sign In With Google
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GoogleSignIn;
