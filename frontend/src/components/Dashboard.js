// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { signOut } from 'firebase/auth';  // Import signOut from firebase/auth
import { auth } from '../services/firebase';  // Import the auth instance from firebase.js

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call signOut from Firebase Authentication
    signOut(auth)
      .then(() => {
        navigate('/login');  // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome to the Dashboard!</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
