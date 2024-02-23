import { IoMdShare } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../contexts/AuthContext";
import Search from "../components/Search";
import { easeInOut, motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firebaseDB } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Share from "../components/Share";

const Home = () => {
  const [publicUsers, setPublicUsers] = useState([]);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {
    const publicUsersRef = query(
      collection(firebaseDB, "publicUsers"),
      where("isPublic", "==", true),
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-button text-2xl text-highlight"
          >
            <IoMdShare />
          </div>
        </div>
      </div>
      {isShareDialogOpen && <Share handleShareDialog={handleShareDialog} />}
      <div>
        <div className="text-4xl font-bold">
          Elevate Your Career. Build Your Developer Portfolio in Minutes.
        </div>
        <div className="my-8 flex flex-col gap-3 text-xl">
          <div className="flex items-center gap-2">
            <IoMdArrowDropright fontSize={36} />
            <p>
              Ditch the coding and design struggles. Create a professional
              developer portfolio instantly with ElevateX.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoMdArrowDropright fontSize={36} />
            <p>
              Choose from stunning templates, personalize with ease, and impress
              potential employers.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
          className="flex w-3/4 justify-center"
        >
          <Link
            to="/edit-profile"
            className="rounded-lg bg-button px-4 py-2 text-2xl font-bold text-highlight"
          >
            Create Your Portfolio Now
          </Link>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-4 gap-12">
          {publicUsers?.map((user) => (
            <motion.div
              whileHover={{ y: -20 }}
              transition={{ ease: easeInOut }}
              className="flex h-[26rem] flex-col rounded-lg bg-main"
            >
              <div key={user.uniqueUrl} className="relative h-3/6">
                <img
                  src={user.photo}
                  className="h-full w-full rounded-t-lg object-cover"
                />
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <p className="text-center text-3xl font-semibold">
                  {user.name}
                </p>
                <p className="text-center text-lg font-semibold uppercase">
                  {user.title}
                </p>
                <div className="flex justify-evenly">
                  <a
                    href={user.uniqueUrl}
                    className="rounded-lg bg-button px-4 py-2 text-highlight hover:bg-stroke"
                  >
                    Know More
                  </a>
                  <motion.a
                    href={`mailto:${user.email}`}
                    className="rounded-lg bg-button px-4 py-2 text-highlight hover:bg-stroke"
                  >
                    <IoMdMail fontSize={22} />
                  </motion.a>
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
