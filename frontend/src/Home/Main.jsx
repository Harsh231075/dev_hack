// src/home/Main.jsx
import React from 'react';
import Navbar from './Navbar';
import HeroSection from './Hero';
import FeaturesSection from './Feature';
import Footer from './Footer';

const Main = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Main;