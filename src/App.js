
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar"; // Import Navbar
import Getproducts from './components/Getproducts';
import  'bootstrap/dist/css/bootstrap.min.css';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
import Cart from './components/Cart';
import"bootstrap/dist/js/bootstrap.min.js";
import ChatBot from './components/ChatBot';


import Footer from './components/footer';
import Aboutus from './components/Aboutus';
import Profile from './components/Profile';






function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const user_Id = JSON.parse(localStorage.getItem('user') || '{}')?.user_id;

  useEffect(() => {
    const fetchCart = async () => {
      if (!user_Id) return;
      try {
        const response = await axios.get(`https://stevek3008.pythonanywhere.com/api/cart/${user_Id}`);
        const items = response.data.items || response.data;
        setCartItems(items);
      } catch (error) {
        console.error('Cart fetch error:', error);
      }
    };
    fetchCart();
  }, [user_Id]);

  
  return (
   <Router>
     <div className="App">
      <header className="App-header">
      <h1 className='heading'>Welcome Woolsmart Fashion</h1>


      </header>
      <Navbar cartItemCount={cartItems.length}  /> 
      <Routes>
        <Route path='/' element={<Getproducts/>}/>
        <Route path='/addproducts'element={<Addproducts/>}/>
          <Route path='/signin'element={<Signin/>}/>
          <Route path='/signup'element={<Signup/>}/>
          <Route path='/Mpesapayment' element={<Mpesapayment/>}/>
          <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}  setCartItemCount={setCartItemCount}/>} />
          <Route path='/Aboutus' element={<Aboutus/>}/>
          <Route path="/profile" element={<Profile />} />
          
      </Routes>
    
      <Footer/>
      <ChatBot/>
      
    </div>
   </Router>
   
  );
  
}

export default App;
