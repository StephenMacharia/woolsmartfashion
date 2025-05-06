import React, { useState } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';

const Addproducts = () => {
  // create hooks to store product data
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  
  // create hooks for different states
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // function to submit product details to the backend API
  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we upload your product details...");
    
    // Create FormData to send product details
    const data = new FormData();
    data.append("product_name", product_name);
    data.append("product_description", product_description);
    data.append("product_cost", product_cost);
    data.append("product_photo", product_photo);

    try {
      const response = await axios.post("https://stevek3008.pythonanywhere.com/api/addproducts", data);
      
      setLoading("");
      setMessage("Product added successfully.");
      
      setTimeout(() => {
        setMessage("");
      }, 8000);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
    } catch (error) {
      setLoading("");
      setError("Failed to add the product, please try again...");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <motion.div
        className="col-md-6 card shadow p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={submit}>
          <motion.h2
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Add Product
          </motion.h2>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {loading && <p className="text-info">{loading}</p>}
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
          </motion.div>

          <motion.input
            type="text"
            placeholder='Enter the product name'
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            className='form-control mb-3'
            required
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />

          <motion.textarea
            placeholder='Enter the description of the product'
            className='form-control mb-3'
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          ></motion.textarea>

          <motion.input
            type="number"
            placeholder='Enter the price'
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            className='form-control mb-3'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />

          <motion.label
            className="mb-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Product photo
          </motion.label>

          <motion.input
            type="file"
            className='form-control mb-3'
            accept='image/*'
            onChange={(e) => setProductPhoto(e.target.files[0])}
            required
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          <motion.button
            type="submit"
            className='btn btn-danger w-100'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Add Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Addproducts;
