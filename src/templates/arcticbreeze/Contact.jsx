import React, { useState, useEffect } from "react";

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
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-1/2 flex-col items-center justify-end">
        <div className="text-center text-4xl font-bold text-abreeze-stroke">
          {client.callToActionText}
        </div>
        <div>
          {client.contacts && (
            <div className="mt-12 flex flex-col items-center justify-center gap-3 font-semibold">
              {client.contacts.email && (
                <a
                  href={`mailto:${client.contacts.email}`}
                  className="flex w-64 items-center gap-3 rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText"
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
                    className="flex w-64 items-center gap-3 rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText"
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
                    className="flex w-64 items-center gap-3 rounded-lg bg-abreeze-button px-4 py-2 text-abreeze-buttonText"
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
            <div className="mt-12 flex justify-center gap-8 text-3xl">
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
      <div className="flex h-1/2 flex-col justify-end pb-4">
        <p>ElevateX © {currentYear}, All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Contact;
