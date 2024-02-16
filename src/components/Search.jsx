import React, { useState, useEffect } from "react";
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
      // Email search: Exact match, case-insensitive
      searchQuery = query(
        collection(firebaseDB, "searchableUsers"),
        where("email", "==", searchTerm.toLowerCase())
      );
    } else {
      // Name search: Partial match, full-text search
      searchQuery = query(
        collection(firebaseDB, "searchableUsers"),
        where("name", "==", searchTerm.toLowerCase())
      );
    }

    try {
      console.log("Generated query:", searchQuery);
      const querySnapshot = await getDocs(searchQuery, { limit: 10 }); // Limit results to 10
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      console.log("Retrieved results:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching for users:", error);
      // Handle errors appropriately
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
          className="py-3 px-6 w-96 rounded-full ring-2 focus:outline-none ring-stroke focus:ring-stroke ring-inset"
        />
        <button
          className="bg-stroke text-highlight font-semibold rounded-full p-3 text-2xl"
          type="submit"
        >
          <IoSearch />
        </button>
        <div className="absolute top-full w-96 mt-2 rounded-full">
          {searchResults.length > 0 && (
            <ul className="rounded-full">
              {searchResults.map((user) => (
                <a className="" href={user.uniqueUrl} onClick={()=>{setSearchResults([])}}>
                  <li
                    className="rounded-full py-5 font-semibold px-6 w-96 text-highlight hover:bg-stroke bg-stroke/80"
                    key={user.id}
                  >
                    {user.name}
                  </li>
                </a>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
