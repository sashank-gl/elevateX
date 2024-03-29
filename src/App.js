import React, { useState, useEffect } from "react";
import GoogleSignIn from "./authPages/GoogleSignIn";
import { AuthContextProvider, UserAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useFetcher } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Portfolio from "./pages/Portfolio";
import { firebaseDB } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import UserDetails from "./pages/UserDetails";
import ProtectedLayout from "./utils/ProtectedLayout";
import UserInfo from "./pages/UserInfo";
import AllTemplates from "./pages/AllTemplates";
import Review from "./pages/Review";
import Donate from "./pages/Donate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<GoogleSignIn />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/profile" element={<UserDetails />} />
          <Route path="/edit-profile" element={<UserInfo />} />
          <Route path="/templates" element={<AllTemplates />} />
          <Route path="/review" element={<Review />} />
          <Route path="/donate" element={<Donate />} />
        </Route>

        <Route path="/:userId" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
