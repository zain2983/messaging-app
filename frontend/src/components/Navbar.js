// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const Navbar = () => {
  const [user] = useAuthState(auth); // Gets the current authenticated user
  const navigate = useNavigate();

//   user.displayName

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home link */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
          Messaging App
        </Link>

        {/* Search User */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search user..."
            className="px-4 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="ml-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md">
            Search
          </button>
        </div>

        {/* User Auth Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-200">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
