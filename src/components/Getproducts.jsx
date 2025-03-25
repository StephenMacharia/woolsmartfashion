import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";

import ImageCarousel from './Carousel';

const Getproducts = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); //  Fixed casing
  
  const navigate = useNavigate();
  const img_url = "https://stevek3008.pythonanywhere.com/static/images/";
  //// Filtered products based on search
  // const [search, setSearch] = useState("");
  // const filtered_products = products.filter((item) =>
  //   item.product_name.toLowerCase().includes(search.toLowerCase())||
  //   item.product_description.toLowerCase().includes(search.toLowerCase()));


  //  Apply search filter function
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(search.toLowerCase())||
      product.product_description.toLowerCase().includes(search.toLowerCase())
  
  
  );//this function loops through the list of product to find the best match
  //the lowercase code avoids case sensitivity
  //includes checks if input exists
  

  const getproducts = async () => {
    setLoading("Please wait as we retrieve the products...");

    try {
      const response = await axios.get("https://stevek3008.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("There was an error encountered");
    }
  };

  useEffect(() => {
    getproducts();
  }, []); //  Fixed dependency

  const AddToCart = async (product) => {
    try {
      const payload = {
        product_id: product.product_id,
        product_photo: product.product_photo, 
        product_name: product.product_name, 
        product_cost: product.product_cost, 
        user_id: 1 // Change this to a dynamic user ID if necessary
      };

      console.log("Adding to cart:", payload);
      const response = await axios.post("https://stevek3008.pythonanywhere.com/api/cart", payload);
      console.log("Add to Cart Response:", response.data);

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="row">
      <ImageCarousel />
      <h3 className="text-info mt-3">Available Products</h3>

      {/*  Search Bar input*/}
      <div className="row justify-content-center mt-3 mb-3">
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    </div>
      {loading}
      {error}

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 justify-content-center mb-4">
            <div className="card shadow">
              <img src={img_url + product.product_photo} className="productimage mt-4 content-center" alt="" />

              <div className="card-body">
                <h5 className='mt-2'>{product.product_name}</h5>
                <p className='text-muted'>{product.product_description.slice(0, 50)}.......</p>
                <b className='text-warning'>Kes {product.product_cost}</b><br />
                <button 
                  className="btn btn-danger" 
                  onClick={() => AddToCart(product)}
                >Add product to cart</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-danger">No products found!</p>
      )}
    </div>
  );
}

export default Getproducts;
