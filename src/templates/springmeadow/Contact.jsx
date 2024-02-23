import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="mb-4 text-center text-4xl font-bold text-springm-stroke">
        {client.callToActionText}
      </div>
      <div className="flex items-center gap-16 rounded-xl bg-springm-secondary px-12 py-10 text-springm-background">
        <div>
          {client && (
            <div className="space-y-2">
              <div className="text-2xl font-semibold">{client.firstName}</div>
              <div className="italic">{client.professionalTitle}</div>
              <div className="italic">{client.location}</div>
            </div>
          )}

          {client.contacts && (
            <div className="mt-2 space-y-2">
              {client.contacts.email && (
                <a href={`mailto:${client.contacts.email}`} className="italic">
                  {client.contacts.email}
                </a>
              )}
              {client.contacts.phoneNumber && (
                <p>
                  <a
                    href={`tel:${client.contacts.phoneNumber}`}
                    className="italic"
                  >
                    {client.contacts.phoneNumber}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          {photo && (
            <div className="h-48 w-48 rounded-full">
              <motion.img
                src={photo}
                alt="Profile"
                className="h-full w-full rounded-full object-cover "
              />
            </div>
          )}
        </div>
      </div>
      <p className="absolute bottom-0">
        ElevateX © {currentYear}, All Rights Reserved
      </p>
    </div>
  );
};

export default Contact;
