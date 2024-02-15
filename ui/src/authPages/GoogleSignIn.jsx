import React, { useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const GoogleSignIn = () => {
  const { signInWithGoogle, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    } else {
      <Loader />;
    }
  }, [user]);

  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={parentVariants}
      className="h-screen flex"
    >
      {/* Left Section - Benefits and Features */}
      <motion.div className="w-1/2 flex flex-col text-center justify-center items-center bg-blue-500 text-white gap-6 p-10">
        <motion.h2 variants={childVariants} className="text-4xl font-bold mb-6">
          Why ElevateX?
        </motion.h2>
        <motion.p variants={childVariants} className="text-xl mb-4">
          Tired of spending hours building and maintaining your portfolio
          website? ElevateX takes the struggle out of portfolio creation,
          allowing you to showcase your skills and projects in minutes. Simply
          sign in, enter your details, choose a template, and your professional
          portfolio is ready to impress!
        </motion.p>
        <motion.h1 variants={childVariants} className="text-4xl mb-4 font-bold">
          ElevateX offers:
        </motion.h1>
        <motion.div
          variants={childVariants}
          className="text-xl list-none pl-5 mb-4"
        >
          <motion.div>
            <p className="italic my-2">
              <span className="font-semibold">
                Quick and easy website creation:{" "}
              </span>
              No coding or design experience needed.
            </p>
          </motion.div>
          <motion.div>
            <p className="italic my-2">
              <span className="font-semibold">Professional templates: </span>
              Choose from a variety of modern and stylish designs.
            </p>
          </motion.div>
          <motion.div>
            <p className="italic my-2">
              <span className="font-semibold">Effortless customization: </span>
              Add your personal touch with ease.
            </p>
          </motion.div>
          <motion.div>
            <p className="italic my-2">
              <span className="font-semibold">
                Free with your chosen subdomain:{" "}
              </span>
              Showcase your talent with a branded URL.
            </p>
          </motion.div>
        </motion.div>
        <motion.p variants={childVariants} className="text-xl">
          Sign in today and join the growing community of developers using
          ElevateX to level up your online presence.
        </motion.p>
      </motion.div>

      {/* Right Section - Sign-in Form */}
      <motion.div
        initial={{ y: -200 }}
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
