import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../services/firebase'; // Firestore import
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

const Navbar = () => {
  const [user] = useAuthState(auth); // Gets the current authenticated user
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // Loading state for search

  // Logout function
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };

  // Function to search users in Firestore based on search query (username or email)
  const searchUsers = async (queryText) => {
    if (queryText === '') {
      setSearchResults([]); // If query is empty, reset the search results
      return;
    }

    setLoading(true);
    const usersRef = collection(firestore, 'users'); // Reference to the "users" collection in Firestore

    // Query to search both username and email (case-insensitive search)
    const q = query(
      usersRef,
      where('username', '>=', queryText), 
      where('username', '<=', queryText + '\uf8ff') // Case-insensitive range query
    );

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data());
      setSearchResults(results); // Update the search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    searchUsers(e.target.value); // Call the search function on input change
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home link */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
          Messaging App
        </Link>

        {/* Search User */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search user by username or email"
            className="px-4 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Show search results */}
          {searchQuery && (
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-10">
              {loading ? (
                <p className="px-4 py-2 text-gray-500">Loading...</p>
              ) : (
                searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((user, index) => (
                      <li key={index} className="px-4 py-2 border-b">
                        <Link to={`/profile/${user.username}`} className="text-blue-500 hover:text-blue-700">
                          {user.username} ({user.email})
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-gray-500">No results found</p>
                )
              )}
            </div>
          )}
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
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md">
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
