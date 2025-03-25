import React, { useState } from 'react'

const Footer = () => {
   // I need two hooks for the details
  
  
      const[email,setEmail]=useState("");
      const[message,setMessage]=useState("");
      //function to handle the submit button for the feedback
      const submit =(e)=>{
          //prevent reloading
          e.preventDefault();
          //print feedback
          console.log("Feedback sent:",{email,message});
          //the alert to show success
          alert("Thanks for your feedback.We value your feedback");
          setEmail("");
          setMessage("")
      }
  return (
  <div>
      <section className="row  mt-4 footer-background-color">
          <div className="col-md-4 text-left text-success">
              <h5 className="p-2 text-center text-info">About Us</h5>
              <p className='text-light'>Wools Mart is your online fashion destination, offering a curated collection of stylish and comfortable wool apparel and accessories. </p>
              <p className='text-light'> We're dedicated to bringing you high-quality, on-trend pieces that celebrate the natural beauty and versatility of wool."</p>
              <br/>
          </div>
          <div className="col-md-4 text-light">
              <h5 className="p-2 text-center text-light">Reach Us Out</h5>
              <form onSubmit={submit} className="text-start p-3 bg-dark text-light rounded">
                        <div className="mb-3">
                            {/* This is where we expect the email to be inserted */}
                            <input type="email"
                            placeholder='Please enter your email' 
                            className='form-control'
                            value={email}
                            onChange={(e)=>(e.target.value)}
                            required/>

                           
                        </div>
                        {/* below is where we put the comment */}
                        <div className="mb-3">
                            <input type="textarea"
                            className='form-control'
                            rows="100"
                            placeholder='Leave your comment'
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            required/>

                        </div>
                        <input type="submit"
                        value="Your feedback is valued"
                        className='btn btn-outline-danger w-100' />
                    </form>
          </div>
          <div className="col-md-4 ">
              <h4 className="text-center text-info">Connect With Us</h4>
              <br/>
              <a href="https://facebook.com">
              <img src="images/facebook.jpg" alt="" className="socialspictures"/>
              </a>
              <a href="https://instagram.com">
              <img src="images/instagram.jpg" alt="" className="socialspictures"/>
              </a>
              <p className="text-light"> Emphasizing modern and trendy: "Wools Mart is your go-to online boutique for modern wool fashion. We curate the latest trends, offering stylish and sustainable pieces that elevate your wardrobe."</p>
          </div>
      </section>
      <footer className="text-white text-center p-2 mt-2 bootom-footer">
              <h5>Developed by Stephen Macharia &copy; 2025.All rights reserved</h5>
      </footer>
  </div>
  );
  }
   
 
  export default Footer;