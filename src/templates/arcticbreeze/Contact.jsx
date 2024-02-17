import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  AiFillMail,
  AiFillPhone,
  AiOutlineWhatsApp,
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { ImStackoverflow } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";

const Contact = ({ client, photo }) => {
  const testimonials = client?.testimonials || [];
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="h-1/2 flex flex-col justify-end items-center">
        <div className="text-4xl text-center text-abreeze-stroke font-bold">
          {client.callToActionText}
        </div>
        <div>
          {client.contacts && (
            <div className="flex flex-col font-semibold gap-3 justify-center items-center mt-12">
              {client.contacts.email && (
                <a
                  href={`mailto:${client.contacts.email}`}
                  className="flex gap-3 items-center w-64 bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg"
                >
                  <p className="w-1/6 text-xl">
                    <AiFillMail />
                  </p>
                  <p className="w-5/6">Email Me</p>
                </a>
              )}
              {client.contacts.phoneNumber && (
                <p>
                  <a
                    href={`tel:${client.contacts.phoneNumber}`}
                    className="flex gap-3 items-center w-64 bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg"
                  >
                    <p className="w-1/6 text-xl">
                      <AiFillPhone />
                    </p>
                    <p className="w-5/6">Call Me</p>
                  </a>
                </p>
              )}
              {client.contacts.whatsApp && (
                <p>
                  <a
                    href={`https://wa.me/${client.contacts.whatsApp}`}
                    className="flex gap-3 items-center w-64 bg-abreeze-button text-abreeze-buttonText py-2 px-4 rounded-lg"
                  >
                    <p className="w-1/6 text-xl">
                      <AiOutlineWhatsApp />
                    </p>
                    <p className="w-5/6">WhatsApp Me</p>
                  </a>
                </p>
              )}
            </div>
          )}
          {client.contacts && (
            <div className="flex gap-8 text-3xl justify-center mt-12">
              {client.contacts.linkedIn && (
                <a href={client.contacts.linkedIn}>
                  <AiFillLinkedin />
                </a>
              )}
              {client.contacts.twitter && (
                <a href={client.contacts.twitter}>
                  <BsTwitterX />
                </a>
              )}
              {client.contacts.gitHub && (
                <a href={client.contacts.gitHub}>
                  <AiFillGithub />
                </a>
              )}
              {client.contacts.facebook && (
                <a href={client.contacts.facebook}>
                  <AiFillFacebook />
                </a>
              )}
              {client.contacts.instagram && (
                <a href={client.contacts.instagram}>
                  <AiFillInstagram />
                </a>
              )}
              {client.contacts.stackoverflow && (
                <a href={client.contacts.stackoverflow}>
                  <ImStackoverflow />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-1/2 flex flex-col pb-4 justify-end">
        <p>ElevateX © {currentYear}, All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Contact;
