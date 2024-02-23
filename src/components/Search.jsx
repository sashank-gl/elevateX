import React, { useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";

import { firebaseDB } from "../firebaseConfig";
import { IoSearch } from "react-icons/io5";
import { UserAuth } from "../contexts/AuthContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    let searchQuery;

    if (searchTerm.includes("@")) {
      searchQuery = query(
        collection(firebaseDB, "publicUsers"),
        where("email", "==", searchTerm.toLowerCase()),
      );
    } else {
      searchQuery = query(
        collection(firebaseDB, "publicUsers"),
        where("name", "==", searchTerm.toLowerCase()),
      );
    }

    try {
      console.log("Generated query:", searchQuery);
      const querySnapshot = await getDocs(searchQuery, { limit: 10 });
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      console.log("Retrieved results:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSearch} className="relative flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by Email"
          className="w-[30rem] rounded-full px-6 py-3 ring-2 ring-inset ring-stroke focus:outline-none focus:ring-stroke"
        />
        <button
          className="rounded-full bg-stroke p-3 text-2xl font-semibold text-highlight"
          type="submit"
        >
          <IoSearch />
        </button>
        <div className="absolute top-full mt-2 rounded-full">
          {searchResults.length > 0 && (
            <ul className="rounded-full">
              {searchResults.map((user) => (
                <div
                  className="backdrop-blur-xl"
                  onClick={() => {
                    setSearchResults([]);
                  }}
                >
                  <li
                    className="w-[30rem] rounded-lg px-6 py-5 font-semibold"
                    key={user.id}
                  >
                    <a href={user.uniqueUrl} className="">
                      <div className="flex items-center gap-2 p-2 hover:bg-background">
                        <div>
                          <img
                            src={user.photo}
                            className="h-20 w-20 object-cover"
                          />
                        </div>
                        <div className="flex-col">
                          <h1 className="text-xl">{user.name}</h1>
                          <h1>{user.title}</h1>
                        </div>
                      </div>
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
