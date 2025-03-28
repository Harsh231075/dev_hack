import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io(`http://localhost:8081`); // Replace with your backend URL

const LiveFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // useEffect(() => {
  //   socket.on("new_feedback", (feedback) => {
  //     setFeedbackList((prev) => [feedback, ...prev]); // Add new feedback at the top
  //   });

  //   return () => socket.off("new_feedback");
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Live Feedback</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {feedbackList.length === 0 ? (
          <p className="text-center text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-3">
            {feedbackList.map((feedback, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-md shadow-sm border">
                <p className="text-lg font-semibold">{feedback.text}</p>
                <p className="text-sm text-gray-600">{new Date(feedback.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LiveFeedback;