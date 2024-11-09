// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore } from '../services/firebase'; // Correct import for Firestore
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('query'); // Get query parameter from URL

  useEffect(() => {
    if (queryParam) {
      setLoading(true);
      setError(null);

      // Query Firestore for users matching the query
      const usersRef = collection(firestore, 'users');
      const userQuery = query(
        usersRef,
        where('username', '>=', queryParam),
        where('username', '<=', queryParam + '\uf8ff') // Fuzzy search for usernames starting with query
      );

      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        const fetchedResults = snapshot.docs.map((doc) => doc.data());
        setResults(fetchedResults);
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup the listener on unmount
    }
  }, [queryParam]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{queryParam}"</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((user, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md">
              <p className="font-semibold">{user.username}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found matching your query.</p>
      )}
    </div>
  );
};

export default SearchResults;
