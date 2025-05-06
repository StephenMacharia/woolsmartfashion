import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    console.log('Feedback sent:', { email, message });
    alert('Thanks for your feedback. We value your input!');
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-2">
      <div className="container">
        <motion.div
          className="row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* About Us */}
          <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.02 }}>
            <h5 className="text-info mb-3">About Us</h5>
            <p>
              <strong>Wools Mart</strong> is your online fashion destination,
              offering a curated collection of stylish and comfortable wool
              apparel and accessories.
            </p>
            <p>
              We're dedicated to high-quality, on-trend pieces that celebrate
              the natural beauty and versatility of wool.
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.02 }}>
            <h5 className="text-info mb-3">Reach Us Out</h5>
            <form onSubmit={submit} className="text-start">
              <div className="mb-3">
                <label className="form-label">
                  <Mail size={16} className="me-2" />
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <MessageCircle size={16} className="me-2" />
                  Feedback
                </label>
                <textarea
                  className="form-control"
                  placeholder="Leave your comment"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <motion.input
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                value="Submit Feedback"
                className="btn btn-outline-info w-100 fw-bold"
              />
            </form>
          </motion.div>

          {/* Socials */}
          <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.02 }}>
            <h5 className="text-info mb-3 text-center">Connect With Us</h5>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook size={28} className="text-light hover-scale" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram size={28} className="text-light hover-scale" />
              </a>
            </div>
            <p className="text-center">
              Explore modern wool fashion—where comfort meets sustainability.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-3 border-top pt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h6>
            Developed by <strong>Stephen Macharia</strong> &copy; 2025. All
            rights reserved.
          </h6>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
