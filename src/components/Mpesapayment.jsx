import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Mpesapayment = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate and Update Amount
    useEffect(() => {
        console.log(" Cart Data Received:", cart);

        const calculatedTotal = cart.reduce((sum, item) => {
            const cost = parseFloat(item.product_cost || 0);
            console.log(`🔹 Item: ${item.product_name}, Cost: ${cost}`);
            return sum + (isNaN(cost) ? 0 : cost);
        }, 0);

        console.log(" Updated Total Amount:", calculatedTotal);
        setTotalAmount(calculatedTotal);
    }, [cart]);

    //  Handle Payment Submission
    const submit = async (e) => {
        e.preventDefault();
        setMessage("Processing payment...");

        console.log(" Sending Payment Request:");
        console.log(" Phone:", phone);
        console.log("Total Amount:", totalAmount);

        const formData = new FormData();
        formData.append("phone", phone.trim());
        formData.append("amount", totalAmount.toFixed(2));  // Ensure correct format

        try {
            const response = await axios.post(
                "https://stevek3008.pythonanywhere.com/api/mpesa_payment",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Response from API:", response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error(" Payment Error:", error);
            console.error("Server Response:", error.response?.data);
            setMessage("Payment failed! " + (error.response?.data?.error || "Check your details and try again."));
        }
    };

    return (
        <div className='row justify-content-center mt-3'>
            <h1 className='text-warning'>Lipa na Mpesa</h1>
            <div className="col-md-6 card shadow p-3">
                {cart.length === 0 ? (
                    <h3 className="text-danger text-center mt-5"> Your cart is empty. Add items before checkout.</h3>
                ) : (
                    <>
                        <b className='text-success'>{message}</b>
                        <h4>Total Price: <span className='text-primary'>KES {totalAmount.toFixed(2)}</span></h4>

                        <ul>
                            {cart.map((item) => (
                                <li key={item.product_id}>
                                    {item.product_name} - KES {parseFloat(item.product_cost || 0).toFixed(2)}
                                </li>
                            ))}
                        </ul>

                        <form onSubmit={submit}>
                            <input 
                                type="number"
                                placeholder='Enter your Mpesa number'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='form-control'
                                required
                            />
                            <br />
                            <button className='btn btn-success'>Make Payment</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Mpesapayment;
