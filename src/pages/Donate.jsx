import React from "react";
import BMC_QR from "../assets/bmc_qr.png";
import PhonePe from "../assets/phonepe.png";
import ThankYou from "../assets/thank-you.png";
const Donate = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center px-36 py-12">
      <div className="font-bold text-4xl">Elevate Your Career & ElevateX!</div>
      <div className="font-semibold text-2xl">
        Love ElevateX's simplicity and impact?
      </div>
      <div className="font-semibold text-2xl">
        Your support fuels more templates, expands to other professions, and
        builds a vibrant community.
      </div>
      <div className="font-semibold text-2xl">
        Every donation empowers you and countless others to showcase your skills
        and land dream jobs!
      </div>
      <div className="font-semibold text-2xl">
        Together, we build a platform that elevates everyone!
      </div>
      <a
        href="https://www.buymeacoffee.com/sashankgl"
        className="px-4 py-2 mt-4 rounded-lg bg-button text-highlight font-semibold text-xl"
      >
        Donate Now
      </a>
      <div className="flex justify-center items-center mt-16 gap-8">
        <a href="https://www.buymeacoffee.com/sashankgl">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sashankgl&button_colour=001858&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" />
        </a>
        <p className="font-bold text-2xl">or</p>
        <div>
          <img src={PhonePe} className="w-96" />
        </div>
      </div>
      <div>
        <img src={ThankYou} className="w-96" />
      </div>
    </div>
  );
};

export default Donate;
