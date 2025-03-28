// src/home/FeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Share2, ChartBar } from 'lucide-react';

const Feature = () => {
  const features = [
    {
      icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
      title: "Create Events",
      description: "Easily create and manage events with our intuitive dashboard."
    },
    {
      icon: <Share2 className="h-8 w-8 text-blue-600" />,
      title: "Share Feedback Forms",
      description: "Generate and share feedback forms with a single click."
    },
    {
      icon: <ChartBar className="h-8 w-8 text-blue-600" />,
      title: "Real-time Analytics",
      description: "Monitor and analyze feedback in real-time with detailed insights."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features for Event Feedback
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to collect and analyze event feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="p-4 bg-blue-50 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;