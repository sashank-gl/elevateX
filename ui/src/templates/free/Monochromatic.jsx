import React from "react";
import Navbar from "./monochromatic/Navbar";
import About from "./monochromatic/About";
import MyWork from "./monochromatic/MyWork";
import Contact from "./monochromatic/Contact";

const Monochromatic = ({ photo, client }) => {
  return (
    <div className="bg-black text-white">
      <Navbar />

      <div id="about">
        <About client={client} photo={photo} />
      </div>

      <div id="work">
        <MyWork client={client} />
      </div>

      <div id="contact">
        <Contact client={client} photo={photo} />
      </div>
    </div>
  );
};

export default Monochromatic;
