import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId') || 1; // Fetch dynamically
    const navigate = useNavigate();
    
    const API_BASE_URL = "https://stevek3008.pythonanywhere.com/api/cart";
    const IMG_URL = "https://stevek3008.pythonanywhere.com/static/images/";

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/${userId}`);
                console.log("Cart Data:", response.data);
                
                setCart(response.data.items || response.data);
            } catch (error) {
                console.error('Error fetching cart:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const deleteCartItem = async (id) => {
        if (!id) {
            console.error(" Error: Product ID is undefined", id);
            return;
        }
    
        console.log(" Deleting item with id:", id);
    
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            console.log("Item deleted:", response?.data?.message || "No message");
    
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error(" Error deleting item:", error.response?.data || error.message);
        }
    };
    
    
    return (
        <div className="container mt-4">
            <h3 className="text-info">Your Cart</h3>

            {loading ? (
                <p>Loading your cart...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    {cart.map(item => (
                        <div key={item.product_id} className="col-md-3 mb-4">
                            <div className="card shadow">
                                <img 
                                    src={IMG_URL + item.product_photo} 
                                    className="product_img mt-4" 
                                    alt={item.product_name} 
                                />
                                <div className="card-body">
                                    <h5>{item.product_name}</h5>
                                    <p className='text-muted'>
                                        {item.product_description}...
                                    </p>
                                    <b className='text-warning'>kes{item.product_cost}</b><br />
                                    <button 
                                        className="btn btn-danger mt-2" 
                                        onClick={() => deleteCartItem(item.id)}  //  Use `item.id` to unique identify products
                                    >
                                        Remove
                                    </button>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <button className="btn btn-success mt-3" onClick={()=>navigate("/Mpesapayment", {state:{cart}})}>Checkout</button>
            )}
        </div>
    );
}

export default Cart;
