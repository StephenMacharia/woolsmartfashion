import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Signin = () => {
  // create different hooks to help in managing the different states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // create hooks for different scenarios/states
  const [loading,setLoading]=useState("");
  const [error,setError]=useState("");
  // After successful loginand verification of detaols we are to redirect to a certain page
  // below is a hook on the same 
  const navigate =useNavigate()
  //function to help submit the details to the backend api
  const submit =async (e) => {
    //below line of code makes sure our app does not reload when a user clicks the signup function
    e.preventDefault();
    //update the loading hook with some information
    setLoading("Please wait as we log you in...")
    //create a try and catch block that will add the details to the api
    try {
      //create an object that will be used to hold our data
      const data=new FormData();

      //add the two details gotten from the input
      data.append("email", email) 
      data.append("password", password)
      //use the axios library to establish a communication
      // / access the post method from the axios library
      const response = await axios.post(" https://stevek3008.pythonanywhere.com/api/signin", data)
      //set the loading hook to empty
      setLoading("")
      if (response.data.user){
        //save the details of the user into the local storage
        localStorage.setItem("user",JSON.stringify(response.data.user));
        //then redirect the person to another page
        //use the navigate hook to do this
        navigate("/")

      }
      else{
        //if the user is not found
      
        setError(response.data.Message)
        // setError("This user is not found")
        
      }


      
    } 
    catch (error) {
      //set loading back to empty
      setLoading("");
      setError(error.response.data.Message)
      
    }


    
  }

  return (
     <div className='row justify-content-center mt-5'>
      <div className="card shadow col-md-6 p-4">
      <h2>Sign In</h2>
      {loading}
      {error}
      <form onSubmit={submit} >
        
      <input 
        type="email"
        placeholder="Enter your email address here"
        className="form-control" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required/>
        <br />
        {/* {email} */}
        <input 
        type="password"
        placeholder="Enter the password"
        className="form-control" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required/> <br /> <br />
        {/* {password} */}
        <button type="submit" className="btn btn-success">Sign In</button>

      </form>

          


      </div>
      

    </div>
  )
}

export default Signin
