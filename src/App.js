
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from "./components/Navbar"; // Import Navbar
import Getproducts from './components/Getproducts';
import  'bootstrap/dist/css/bootstrap.min.css';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
import Cart from './components/Cart';
import"bootstrap/dist/js/bootstrap.min.js";

import Footer from './components/footer';
import Aboutus from './components/Aboutus';




function App() {
  return (
   <Router>
     <div className="App">
      <header className="App-header">
      <h1 className='heading'>Welcome Woolsmart Fashion</h1>


      </header>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Getproducts/>}/>
        <Route path='/addproducts'element={<Addproducts/>}/>
          <Route path='/signin'element={<Signin/>}/>
          <Route path='/signup'element={<Signup/>}/>
          <Route path='/Mpesapayment' element={<Mpesapayment/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/Aboutus' element={<Aboutus/>}/>
          
      </Routes>
    
      <Footer/>
      
    </div>
   </Router>
   
  );
  
}

export default App;
