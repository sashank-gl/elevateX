import React, { useState, useEffect } from "react";
import GoogleSignIn from "./authPages/GoogleSignIn";
import { AuthContextProvider, UserAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useFetcher } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Portfolio from "./pages/Portfolio";
import { firebaseDB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const { user } = UserAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<GoogleSignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* {user && <Route path={`/${user.uid}`} element={<Portfolio />} />} */}
        <Route path="/:userId" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
