import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve the stored user from local storage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const user_Id = user?.user_id; // Extract user_id from stored user

  // Alert and redirect if no user is present (i.e. not logged in)
  useEffect(() => {
    if (!user_Id) {
      alert("Please log in to view your cart.");
      navigate("/login");
    }
  }, [user_Id, navigate]);

  const API_BASE_URL = "https://stevek3008.pythonanywhere.com/api/cart";
  const IMG_URL = "https://stevek3008.pythonanywhere.com/static/images/";

  // Fetch cart data for the logged-in user
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${user_Id}`);
        console.log("Cart Data:", response.data);
        // Handle different response structures if needed:
        const items = response.data.items || response.data;
        setCart(items);
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    // Only attempt to fetch cart if we have a valid user_Id
    if (user_Id) {
      fetchCart();
    }
  }, [user_Id]);

  // Delete an item from the cart
  const deleteCartItem = async (item_id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${item_id}`);
      console.log("Item deleted:", response?.data?.message || "No message");
      setCart(prevCart => prevCart.filter(item => item.id !== item_id));
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-info">Your Cart</h3>
      {loading ? (
        <p>Loading your cart...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item, index) => (
            <motion.div
              key={item.product_id}
              className="col-md-3 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="card shadow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={IMG_URL + item.product_photo}
                  className="product_img mt-4"
                  alt={item.product_name}
                />
                <div className="card-body">
                  <h5>{item.product_name}</h5>
                  <p className="text-muted">{item.product_description}...</p>
                  <b className="text-warning">Kes {item.product_cost}</b>
                  <br />
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => deleteCartItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <motion.button
          className="btn btn-success mt-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/Mpesapayment", { state: { cart } })}
        >
          Checkout
        </motion.button>
      )}
    </motion.div>
  );
};

export default Cart;
