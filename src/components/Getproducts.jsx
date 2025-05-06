// GetProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageCarousel from './Carousel';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const img_url = "https://stevek3008.pythonanywhere.com/static/images/";

  // Helper function to retrieve the user from local storage
  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://stevek3008.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("There was an error encountered.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add a product to the cart
  const addToCart = async (product) => {
    const user = getUser();
    if (!user?.user_id) {
      alert("Please login to add items to the cart!");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        product_id: product.product_id,
        product_photo: product.product_photo,
        product_name: product.product_name,
        product_cost: product.product_cost,
        user_id: user.user_id,
      };

      const response = await axios.post("https://stevek3008.pythonanywhere.com/api/cart", payload);
      console.log("Product added to cart:", response.data);
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      alert("Error adding item to cart.");
    }
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(search.toLowerCase()) ||
    product.product_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <ImageCarousel />
      <h3 className="text-info mt-4">Available Products</h3>
      {/* Search Input */}
      <div className="row justify-content-center mt-3 mb-4">
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && (
        <div className="text-center text-primary">Loading products, please wait...</div>
      )}
      {error && (
        <div className="text-center text-danger">{error}</div>
      )}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.product_id}
              className="col-md-3 mb-4 d-flex"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="card shadow w-100 d-flex flex-column">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="productimage mt-4 mx-auto"
                  style={{ height: '200px', objectFit: 'cover', width: '90%' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="text-dark">{product.product_name}</h5>
                    <p className="text-muted small">
                      {product.product_description.slice(0, 50)}...
                    </p>
                  </div>
                  <div>
                    <b className="text-warning">
                      Kes {parseFloat(product.product_cost).toFixed(2)}
                    </b>
                    <br />
                    <button
                      className="btn btn-outline-danger mt-2 w-100 fw-semibold"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          !loading && <p className="text-danger text-center">No products found!</p>
        )}
      </div>
    </div>
  );
};

export default GetProducts;
