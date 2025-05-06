import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Mpesapayment = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((sum, item) => {
      const cost = parseFloat(item.product_cost || 0);
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);
    setTotalAmount(calculatedTotal);
  }, [cart]);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('Processing payment...');

    const formData = new FormData();
    formData.append('phone', phone.trim());
    formData.append('amount', totalAmount.toFixed(2));

    try {
      const response = await axios.post(
        'https://stevek3008.pythonanywhere.com/api/mpesa_payment',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        'Payment failed! ' +
          (error.response?.data?.error || 'Check your details and try again.')
      );
    }
  };

  return (
    <motion.div
      className="row justify-content-center mt-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-warning text-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Lipa na Mpesa
      </motion.h1>

      <motion.div
        className="col-md-6 card shadow p-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {cart.length === 0 ? (
          <motion.h3
            className="text-danger text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your cart is empty. Add items before checkout.
          </motion.h3>
        ) : (
          <>
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <h4>
              Total Price:{' '}
              <span className="text-primary">KES {totalAmount.toFixed(2)}</span>
            </h4>

            <ul className="mb-3">
              {cart.map((item) => (
                <li key={item.product_id}>
                  {item.product_name} - KES{' '}
                  {parseFloat(item.product_cost || 0).toFixed(2)}
                </li>
              ))}
            </ul>

            <form onSubmit={submit}>
              <label className="form-label">Mpesa Phone Number</label>
              <input
                type="number"
                placeholder="07XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control mb-3"
                required
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-success w-100 py-2 fw-bold shadow-sm"
              >
                 Make Payment
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Mpesapayment;
