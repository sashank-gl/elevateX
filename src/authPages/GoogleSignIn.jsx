import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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
      collection(firebaseDB, "publicUsers"),
      where("isPublic", "==", true),
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
    const newIndex = (currentTestimonialIndex + 1) % filteredPublicUsers.length;
    setCurrentTestimonialIndex(newIndex);
    setActiveTestimonial(filteredPublicUsers[newIndex]);
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
      className="flex h-screen text-paragraph"
    >
      {/* Left Section - Benefits and Features */}

      <motion.div className="flex w-1/2 flex-col items-center justify-center gap-6 bg-paragraph p-10 text-center text-background">
        <motion.h2 variants={childVariants} className="mb-6 text-4xl font-bold">
          What is ElevateX?
        </motion.h2>
        <motion.p variants={childVariants} className="mb-4 text-xl">
          Tired of spending hours building and maintaining your portfolio?
          ElevateX takes the hassle out, letting you showcase your skills and
          projects in minutes.
        </motion.p>
        <motion.h1 variants={childVariants} className="mb-4 text-4xl font-bold">
          ElevateX offers:
        </motion.h1>
        <motion.div
          variants={childVariants}
          className="mb-4 list-none pl-5 text-xl"
        >
          <motion.div>
            <p className="my-2 italic">
              <span className="font-semibold">
                Quick and easy website creation:{" "}
              </span>
              No coding or design experience needed.
            </p>
          </motion.div>
          <motion.div>
            <p className="my-2 italic">
              <span className="font-semibold">Professional templates: </span>
              Choose from a variety of modern and stylish designs.
            </p>
          </motion.div>
          <motion.div>
            <p className="my-2 italic">
              <span className="font-semibold">Effortless customization: </span>
              Add your personal touch with ease.
            </p>
          </motion.div>
          <motion.div>
            <p className="my-2 italic">
              <span className="font-semibold">
                Free with your chosen subdomain:{" "}
              </span>
              Showcase your talent with a branded URL.
            </p>
          </motion.div>
        </motion.div>
        <motion.h2 variants={childVariants} className="mb-6 text-4xl font-bold">
          Who is ElevateX for?
        </motion.h2>
        <motion.p variants={childVariants} className="text-xl">
          Developers, IT professionals, aspiring creatives. Build your online
          presence today!
        </motion.p>
      </motion.div>

      {/* Right Section - Sign-in Form & Reviews*/}

      <motion.div className="w-1/2 bg-background">
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className={`flex h-1/2 flex-col items-center justify-end p-10`}
        >
          <h1 className="mb-8 text-4xl font-bold">
            Effortless Portfolio Creation Starts Here
          </h1>
          <h2 className="mb-12 text-2xl">Join ElevateX Now</h2>
          <button
            onClick={handleSignInWithGoogle}
            className="h-16 w-80 rounded-lg bg-button text-xl font-semibold text-background transition duration-300 hover:bg-stroke"
          >
            Sign In With Google
          </button>
        </motion.div>

        <div className="flex h-1/2 flex-col justify-center">
          <h1 className="mb-8 mt-12 text-center text-2xl font-bold">
            Fellow Developer Experiences
          </h1>
          {!isTestimonialLoading ? (
            <>
              <motion.div
                className="flex items-center justify-center text-center"
                key={currentTestimonialIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.8 }}
              >
                <blockquote className="flex w-[40rem] flex-col items-center justify-center text-center text-lg italic">
                  {filteredPublicUsers &&
                    filteredPublicUsers.length > 0 &&
                    activeTestimonial &&
                    activeTestimonial.review && (
                      <div className="flex items-center gap-6">
                        {activeTestimonial.photo && (
                          <img
                            src={activeTestimonial.photo}
                            className="mb-2 h-20 w-20 rounded-full object-cover"
                            alt="User"
                          />
                        )}
                        <div className="flex flex-col items-center gap-2">
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

              <div className="mt-8 flex justify-center gap-12">
                <button
                  className="rounded-full p-2 hover:bg-main"
                  onClick={() => handleTestimonialChange(-1)}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="rounded-full p-2 hover:bg-main"
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
