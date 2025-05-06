import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we update your details");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("phone", phone);

      const response = await axios.post("https://stevek3008.pythonanywhere.com/api/signup", data);

      setLoading("");
      setSuccess(response.data.Message);
      setUsername("");
      setemail("");
      setpassword("");
      setphone("");
    } catch (error) {
      setLoading("");
      setError("Signup failed: " + error.message);
    }
  };

  return (
    <motion.div
      className="row justify-content-center mt-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="col-md-6 card shadow p-4">
        <h2>Signup</h2>

        {/* Animated feedback messages */}
        {loading && (
          <motion.div
            className="alert alert-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {loading}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="alert alert-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            className="alert alert-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Enter the username"
            className="form-control"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />

          <input
            type="email"
            placeholder="Enter email address"
            className="form-control"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          /><br />

          <input
            type="password"
            placeholder="Enter the password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          /><br />

          <input
            type="text"
            placeholder="Enter the phone number"
            className="form-control"
            required
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          /><br />

          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </form>

        <p className="mt-3">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
