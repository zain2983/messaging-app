// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';       // Updated to use the new pages
import RegisterPage from './pages/RegisterPage'; // Updated to use the new pages
import DashboardPage from './pages/DashboardPage'; // Updated to use the new pages

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      {/* Render Navbar only if not on Login or Register page */}
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <DashboardPage /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
