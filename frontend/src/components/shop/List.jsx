import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaSun,
  FaMoon 
} from 'react-icons/fa';

import { 
  MdPayment, 
  MdComputer, 
  MdDesignServices, 
  MdHelpOutline, 
  MdAssignment, 
  MdSchool 
} from 'react-icons/md';

import { 
  HiOutlineDocumentText, 
  HiOutlineUserGroup 
} from 'react-icons/hi';

function List() {

  const phone = "0704345035";
  const email = "japhethanold2@gmail.com";
  const location = "Eldoret, Kenya";
  const whatsappLink = `https://wa.me/254704345035`;

  const services = [
    { icon: <MdPayment className="text-2xl" />, title: "Helb Application & Appeal" },
    { icon: <MdComputer className="text-2xl" />, title: "Microsoft Office Installation & Activation" },
    { icon: <HiOutlineDocumentText className="text-2xl" />, title: "E-portfolio Design & Online Resume" },
    { icon: <MdDesignServices className="text-2xl" />, title: "Poster Design" },
    { icon: <MdPayment className="text-2xl" />, title: "KRA Filling and Application" },
    { icon: <MdHelpOutline className="text-2xl" />, title: "Online Inquiries and Consultation" },
    { icon: <MdAssignment className="text-2xl" />, title: "Academic Assignments Assist" },
  ];

  const solutions = [
    { icon: <HiOutlineDocumentText className="text-2xl" />, title: "Business Plan Writing" },
    { icon: <MdDesignServices className="text-2xl" />, title: "Academic Papers Formatting" },
    { icon: <MdSchool className="text-2xl" />, title: "Essay / Thesis Writing" },
    { icon: <MdComputer className="text-2xl" />, title: "Software Update and Installation" },
    { icon: <HiOutlineUserGroup className="text-2xl" />, title: "Accounts Recovery" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
    }),
    hover: { 
      y: -6, 
      boxShadow: "0 20px 40px var(--accent-glow)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-base text-primary relative">
      
      {/* Hero - Super Compact */}
      <section className="pt-14 pb-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto px-5"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
            Jnolly Cyber Works
          </h1>
          <p className="text-accent text-base mb-1">Your Trusted Digital Partner</p>
          <p className="text-secondary text-sm">Fast & Reliable Services • Eldoret</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-8 bg-surface">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-6">
            <span className="section-label text-xs">SERVICES</span>
            <h2 className="text-2xl font-bold mt-1">What We Offer</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                variants={cardVariants}
                className="card p-5 group cursor-pointer"
              >
                <div className="text-accent mb-3 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-semibold leading-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-muted text-xs">Fast & accurate</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-8 bg-base">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-6">
            <span className="section-label text-xs">SOLUTIONS</span>
            <h2 className="text-2xl font-bold mt-1">Additional Support</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutions.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                variants={cardVariants}
                className="card p-5 group cursor-pointer"
              >
                <div className="text-accent mb-3 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[15px] font-semibold leading-tight">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-surface border-t border-default">
        <div className="max-w-md mx-auto px-5 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold mb-7"
          >
            Get In Touch
          </motion.h2>

          <div className="space-y-4">
            <motion.a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 text-sm font-medium"
            >
              <FaWhatsapp className="text-xl" />
              Chat on WhatsApp
            </motion.a>

            <div className="grid grid-cols-1 gap-3">
              <motion.a 
                href={`tel:${phone}`}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-card hover:bg-hover p-4 rounded-2xl border border-default transition-all hover:border-accent"
              >
                <FaPhone className="text-xl text-emerald" />
                <div className="text-left">
                  <div className="font-medium text-sm">{phone}</div>
                  <div className="text-muted text-xs">Call / SMS</div>
                </div>
              </motion.a>

              <motion.a 
                href={`mailto:${email}`}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-card hover:bg-hover p-4 rounded-2xl border border-default transition-all hover:border-accent"
              >
                <FaEnvelope className="text-xl text-accent" />
                <div className="text-left text-sm break-all text-primary font-medium">
                  {email}
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default List;