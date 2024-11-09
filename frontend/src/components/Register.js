// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Firebase registration function
import { auth } from '../services/firebase';  // Firebase initialization
import { useNavigate } from 'react-router-dom';  // To navigate after registration

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // To navigate after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before registration attempt

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // After successful registration, the user is logged in automatically
      navigate('/');  // Redirect to the dashboard after successful registration
    } catch (err) {
      setError(err.message);  // Capture and display any errors (e.g., weak password, invalid email)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
