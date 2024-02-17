import { IoMdShare } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import UserInfo from "./UserInfo";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Share from "../components/Share";

const Home = () => {
  const { user } = UserAuth();
  const [publicUsers, setPublicUsers] = useState([]);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {
    const publicUsersRef = query(
      collection(firebaseDB, "searchableUsers"),
      where("isPublic", "==", true)
    );

    onSnapshot(publicUsersRef, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setPublicUsers(users);
    });
  }, []);

  const handleShareDialog = () => {
    setIsShareDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <Search />
        <div className="flex gap-3">
          <div
            onClick={() => setIsShareDialogOpen(!isShareDialogOpen)}
            className="bg-button rounded-full h-10 w-10 flex justify-center items-center text-2xl text-highlight cursor-pointer"
          >
            <IoMdShare />
          </div>
        </div>
      </div>
      {isShareDialogOpen && <Share handleShareDialog={handleShareDialog} />}
      <div>
        <div className="font-bold text-4xl">
          Elevate Your Career. Build Your Developer Portfolio in Minutes.
        </div>
        <div className="text-xl my-8 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <IoMdArrowDropright fontSize={36} />
            <p>
              Ditch the coding and design struggles. Create a professional
              developer portfolio instantly with ElevateX.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <IoMdArrowDropright fontSize={36} />
            <p>
              Choose from stunning templates, personalize with ease, and impress
              potential employers.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <IoMdArrowDropright fontSize={36} />
            <p>
              Join a thriving community of developers showcasing their skills
              and landing dream jobs.
            </p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center w-3/4"
        >
          <Link
            to="/edit-profile"
            className="bg-button text-2xl text-highlight font-bold py-2 px-4 rounded-lg"
          >
            Create Your Portfolio Now
          </Link>
        </motion.div>
      </div>

      <div className="p-6">
        {/* All Users */}
        <div className="grid grid-cols-4 gap-12">
          {publicUsers?.map((user) => (
            // Each User
            <motion.div
              whileHover={{ y: -20 }}
              transition={{ ease: easeInOut }}
              className="bg-main h-[26rem] flex flex-col rounded-lg"
            >
              <div className="relative h-3/6">
                <img
                  src={user.photo}
                  className="h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <p className="text-3xl font-semibold text-center">
                  {user.name}
                </p>
                <p className="font-semibold text-lg text-center uppercase">
                  {user.title}
                </p>
                <div className="flex justify-evenly">
                  <a
                    href={user.uniqueUrl}
                    className="bg-button text-highlight py-2 px-4 rounded-lg"
                  >
                    Know More
                  </a>
                  <a
                    href={user.uniqueUrl}
                    className="bg-button text-highlight py-2 px-4 rounded-lg"
                  >
                    <IoMdMail fontSize={22} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
