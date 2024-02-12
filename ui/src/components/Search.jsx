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
import { firebaseDB } from "../firebaseConfig"; // Replace with your Firebase instance
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
    <div>
      <form onSubmit={handleSearch} className="relative border-2 p-2 flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by Email or Name"
        />
        <button
          className="bg-blue-500 text-white font-semibold p-2 rounded-lg px-4"
          type="submit"
        >
          Search
        </button>
        <div className="absolute -bottom-20">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((user) => (
                <li className="p-5 hover:bg-blue-500 bg-blue-300" key={user.id}>
                  <a className="" href={user.uniqueUrl}>
                    {user.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
