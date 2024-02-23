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
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {testimonials.length > 0 && (
        <div className="flex h-1/2 flex-col items-center justify-center">
          <div>
            <h1 className="text-center text-4xl font-bold">Testimonials</h1>
            <motion.div
              className="flex h-48 items-center justify-center text-center"
              key={currentTestimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="mx-56 flex flex-col items-center justify-center text-center text-lg italic">
                <p className="mb-4 font-semibold">
                  "{testimonials[currentTestimonialIndex].review}"
                </p>
                <div className="flex gap-1">
                  <p>{testimonials[currentTestimonialIndex].author},</p>
                  <p>{testimonials[currentTestimonialIndex].company}</p>
                </div>
              </blockquote>
            </motion.div>
          </div>
        </div>
      )}
      <div className="flex h-1/2 flex-col items-center justify-between pb-4">
        <div>
          <div className="flex items-center justify-center gap-4">
            <div>
              {photo && (
                <div className="h-40 w-40 overflow-hidden rounded-full">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    src={photo}
                    alt="Profile"
                    className="h-full w-full object-cover contrast-100 grayscale"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-4xl">
                {client.firstName} {client.lastName}
              </div>
              <div className="text-2xl">{client.professionalTitle}</div>
            </div>
          </div>
          <div>
            {client.contacts && (
              <div className="mt-12 flex justify-center gap-8 text-3xl">
                {client.contacts.email && (
                  <a href={`mailto:${client.contacts.email}`}>
                    <AiFillMail />
                  </a>
                )}
                {client.contacts.phoneNumber && (
                  <p>
                    <a href={`tel:${client.contacts.phoneNumber}`}>
                      <AiFillPhone />
                    </a>
                  </p>
                )}
                {client.contacts.whatsApp && (
                  <p>
                    <a href={`https://wa.me/${client.contacts.whatsApp}`}>
                      <AiOutlineWhatsApp />
                    </a>
                  </p>
                )}
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
        <div>
          <p>ElevateX © {currentYear}, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
