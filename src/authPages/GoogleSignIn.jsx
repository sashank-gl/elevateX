import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";

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

  const [publicUsers, setPublicUsers] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isTestimonialLoading, setIsTestimonialLoading] = useState(true);

  const filterByRating = (users) =>
    users.filter((user) => user.review && user.review.stars >= 4);

  const [filteredPublicUsers, setFilteredPublicUsers] = useState([]);


  useEffect(() => {
    const publicUsersRef = query(
      collection(firebaseDB, "searchableUsers"),
      where("isPublic", "==", true)
    );
    setIsTestimonialLoading(true);
    const unsubscribe = onSnapshot(publicUsersRef, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setPublicUsers(users);
      setFilteredPublicUsers(filterByRating(users));
      setIsTestimonialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (publicUsers.length > 0) {
      stopRotation();
      startRotation();
    }

    return stopRotation;
  }, [publicUsers]);

  const startRotation = () => {
    setTimer(setInterval(rotateTestimonials, 5000));
  };

  const stopRotation = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const rotateTestimonials = () => {
    const newIndex = (currentTestimonialIndex + 1) % filteredPublicUsers.length; // Use filteredPublicUsers.length instead of publicUsers.length
    setCurrentTestimonialIndex(newIndex);
    setActiveTestimonial(filteredPublicUsers[newIndex]); // Set activeTestimonial from filteredPublicUsers
  };

  const handleTestimonialChange = (direction) => {
    setCurrentTestimonialIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + filteredPublicUsers.length) %
        filteredPublicUsers.length;
      setActiveTestimonial(filteredPublicUsers[newIndex]);
      return newIndex;
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={parentVariants}
      className="h-screen flex text-paragraph"
    >
      {/* Left Section - Benefits and Features */}
      <motion.div className="w-1/2 flex flex-col text-center justify-center items-center bg-paragraph text-background gap-6 p-10">
        <motion.h2 variants={childVariants} className="text-4xl font-bold mb-6">
          What is ElevateX?
        </motion.h2>
        <motion.p variants={childVariants} className="text-xl mb-4">
          Tired of spending hours building and maintaining your portfolio?
          ElevateX takes the hassle out, letting you showcase your skills and
          projects in minutes.
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
        <motion.h2 variants={childVariants} className="text-4xl font-bold mb-6">
          Who is ElevateX for?
        </motion.h2>
        <motion.p variants={childVariants} className="text-xl">
          Developers, IT professionals, aspiring creatives. Build your online
          presence today!
        </motion.p>
      </motion.div>

      {/* Right Section - Sign-in Form */}
      <motion.div className="w-1/2 bg-background">
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="h-1/2 flex flex-col justify-end items-center p-10"
        >
          <h1 className="text-4xl font-bold mb-8">
            Effortless Portfolio Creation Starts Here
          </h1>
          <h2 className="text-2xl mb-12">Join ElevateX Now</h2>
          <button
            onClick={handleSignInWithGoogle}
            className="w-80 h-16 bg-button hover:bg-stroke text-background text-xl font-semibold rounded-lg transition duration-300"
          >
            Sign In With Google
          </button>
        </motion.div>

        <div className="h-1/2 flex flex-col justify-center">
          <h1 className="text-2xl text-center font-bold mt-12 mb-8">
            Fellow Developer Experiences
          </h1>
          {!isTestimonialLoading ? (
            <>
              <motion.div
                className="flex text-center justify-center items-center"
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
              >
                <blockquote className="w-[40rem] text-lg italic flex flex-col text-center items-center">
                  {filteredPublicUsers &&
                    filteredPublicUsers.length > 0 &&
                    activeTestimonial &&
                    activeTestimonial.review && (
                      <div className="flex items-center gap-6">
                        {activeTestimonial.photo && (
                          <img
                            src={activeTestimonial.photo}
                            className="w-20 h-20 object-cover rounded-full mb-2"
                            alt="User"
                          />
                        )}
                        <div className="flex flex-col gap-2 items-start">
                          <div className="flex gap-1">
                            {activeTestimonial.review.stars &&
                              Array.from({
                                length: activeTestimonial.review.stars,
                              }).map((_, index) => (
                                <FaStar
                                  key={index}
                                  className="text-yellow-500"
                                />
                              ))}
                          </div>
                          {activeTestimonial.review.text && (
                            <p className="">{activeTestimonial.review.text}</p>
                          )}
                          {activeTestimonial.name && (
                            <p className="font-semibold">
                              {activeTestimonial.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                </blockquote>
              </motion.div>

              <div className="flex justify-center mt-8 gap-12">
                <button
                  className="hover:bg-main p-2 rounded-full"
                  onClick={() => handleTestimonialChange(-1)}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="hover:bg-main p-2 rounded-full"
                  onClick={() => handleTestimonialChange(1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GoogleSignIn;
