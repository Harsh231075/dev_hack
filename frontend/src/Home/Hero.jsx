// src/home/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Real-time Event <br />
              <span className="text-blue-600">Feedback Platform</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Create events, share feedback forms, and analyze responses in real-time.
              Perfect for event organizers and businesses.
            </p>
            <motion.div
              className="mt-8 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 inline-block">
                Get Started
              </a>
              <a href="/about" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all inline-block">
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <img src="/hero-image.svg" alt="Feedback Platform" className="w-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;