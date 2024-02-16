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
      {testimonials.length > 0 && (
        <div className="h-1/2 flex flex-col items-center justify-center">
          <div>
            <h1 className="text-4xl text-center font-bold">Testimonials</h1>
            <motion.div
              className="h-48 flex text-center justify-center items-center"
              key={currentTestimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="text-lg italic flex flex-col text-center justify-center items-center mx-56">
                <p className="font-semibold mb-4">
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
      <div className="h-1/2 flex flex-col justify-between items-center pb-4">
        <div>
          <div className="flex items-center justify-center gap-4">
            <div>
              {photo && (
                <div className="h-40 w-40 rounded-full overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    src={photo}
                    alt="Profile"
                    className="h-full w-full object-cover grayscale contrast-100"
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
              <div className="flex gap-8 text-3xl justify-center mt-12">
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
