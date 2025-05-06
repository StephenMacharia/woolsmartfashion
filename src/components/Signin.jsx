// Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Helper function to store the user in local storage
  const setUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Please wait as we log you in...');
    setError('');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await axios.post('https://stevek3008.pythonanywhere.com/api/signin', data);
      setLoading('');

      if (response.data.user) {
        // Store the user (and its user_id) in local storage
        setUser(response.data.user);
        navigate('/');
      } else {
        setError(response.data.Message || 'User not found');
      }
    } catch (err) {
      setLoading('');
      setError(err.response?.data?.Message || 'An error occurred. Please try again.');
    }
  };

  return (
    <motion.div
      className="row justify-content-center mt-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="card shadow col-md-6 p-4">
        <h2>Sign In</h2>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-info">
            {loading}
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-danger">
            {error}
          </motion.div>
        )}
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Enter your email address here"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Enter the password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <motion.button
            type="submit"
            className="btn btn-success"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signin;
