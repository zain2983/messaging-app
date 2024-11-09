// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';  // Firebase auth state listener
import { auth } from './services/firebase';  // Import Firebase auth
import Login from './components/Login';    // Import Login component
import Register from './components/Register'; // Import Register component
import Dashboard from './components/Dashboard'; // This is where the user will land after logging in

function App() {
  const [user, setUser] = useState(null);  // Manage the logged-in user

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Update user state if authenticated or null
    });

    return () => unsubscribe();  // Clean up listener on component unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;