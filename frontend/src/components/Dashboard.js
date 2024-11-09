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
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
