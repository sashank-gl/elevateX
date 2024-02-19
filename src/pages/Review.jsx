import React, { useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB, storage } from "../firebaseConfig";

const Review = () => {
  const { user } = UserAuth();

  const [review, setReview] = useState({
    text: "",
    feedback: "",
    stars: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarClick = (stars) => {
    setReview((prevReview) => ({
      ...prevReview,
      stars,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchableUserData = {
      review: {
        text: review.text,
        feedback: review.feedback,
        stars: review.stars,
      },
    };

    const searchableUserRef = doc(firebaseDB, "publicUsers", user.uid);
    try {
      await updateDoc(searchableUserRef, searchableUserData);
      console.log("Review updated successfully");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  const labelStyle = "flex gap-4 my-1";
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="text-center flex flex-col gap-6 mb-12">
        <p className="text-5xl font-bold">Every piece of feedback counts!</p>
        <p className="text-3xl font-semibold">
          Share your honest thoughts, big or small, and help us make ElevateX
          the best portfolio builder it can be.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <form onSubmit={handleSubmit} className="w-[36rem] flex flex-col gap-3">
          <label className={`${labelStyle} items-center`}>
            <span className={`font-semibold`}>Rating:</span>
            <div className="">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-5xl ${
                    star <= review.stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </label>
          <label className={`${labelStyle} flex-col`}>
            <span className={`font-semibold`}>Review:</span>
            <textarea
              value={review.text}
              onChange={handleChange}
              className="rounded-lg min-h-24 p-3 focus:outline-none focus:ring-4 focus:ring-main"
              placeholder="Enter your review..."
              required
            />
          </label>
          <label className={`${labelStyle} flex-col`}>
            <span className={`font-semibold`}>Extended Feedback:</span>
            <textarea
              value={review.feedback}
              onChange={handleChange}
              className="rounded-lg min-h-48 p-3 focus:outline-none focus:ring-4 focus:ring-main"
              placeholder="Enter your extended feedback..."
            />
          </label>
          <button
            type="submit"
            className="w-full font-semibold text-xl py-2 px-4 rounded-lg bg-button text-highlight"
          >
            Submit Review
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Review;
