import React from "react";
import PhonePe from "../assets/phonepe.png";
import ThankYou from "../assets/thank-you.png";
const Donate = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-36 py-12 text-center">
      <div className="text-4xl font-bold">Elevate Your Career & ElevateX!</div>
      <div className="text-2xl font-semibold">
        Love ElevateX's simplicity and impact?
      </div>
      <div className="text-2xl font-semibold">
        Your support fuels more templates, expands to other professions, and
        builds a vibrant community.
      </div>
      <div className="text-2xl font-semibold">
        Every donation empowers you and countless others to showcase your skills
        and land dream jobs!
      </div>
      <div className="text-2xl font-semibold">
        Together, we build a platform that elevates everyone!
      </div>
      <a
        href="https://www.buymeacoffee.com/sashankgl"
        className="mt-4 rounded-lg bg-button px-4 py-2 text-xl font-semibold text-highlight"
      >
        Donate Now
      </a>
      <div className="mt-16 flex items-center justify-center gap-8">
        <a href="https://www.buymeacoffee.com/sashankgl">
          <img
            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sashankgl&button_colour=001858&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00"
            alt="Buy Me A Coffee"
          />
        </a>
        <p className="text-2xl font-bold">or</p>
        <div>
          <img src={PhonePe} className="w-96" alt="PhonePe QR Code" />
        </div>
      </div>
      <div>
        <img src={ThankYou} className="w-96" alt="Thank You" />
      </div>
    </div>
  );
};

export default Donate;
