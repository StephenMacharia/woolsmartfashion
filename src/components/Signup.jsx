import { Link } from "react-router-dom";
import React from 'react';
//import hooks library
import  { useState } from 'react';
//import axios library
import axios from "axios";

const Signup = () => {
  //initilize hooks
  const [username,setUsername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [phone,setphone]=useState("")
// create three hooks to capture  the state of our application hwen the sign up button is clicked
const[loading,setLoading]=useState("")
const[error,setError]=useState("")
const[success,setSuccess]=useState("")
  // We create a function below that will handle the data submitted on the form all the wat to the database
  const submit=async(e)=>{
    //loading
    // e-eventhandler
    // asynckeyword-procceses at the backend asynchronuous activity
    // Below we prevent our site from reloading after sign up
    e.preventDefault();
    //update the loading hook with a  message when sign up is clicked
    setLoading("Please wait as we update your details")
    try{
      // we create an object that will hold all  the vdata on the hook(username,email,password aqnd phone)
      const data =new FormData();
      //below we insert/append details on our object  field name,values as hook These are key value pairs
      data.append("username",username);
      data.append("email",email);
      data.append("password",password);
      data.append("phone",phone);
      //use the axios library to interact with the  http request
      //The particular method that we shall use is the post method
      const response=await axios.post(" https://stevek3008.pythonanywhere.com/api/signup",data);
      //After the information/data is inserted successfully,set the loading hook to empty
      setLoading("");
      // set the success hook with the message you get from a successful registration
      setSuccess(response.data.Message)
      //clear all the input fields on the html form
      setUsername("");
      setemail("");
      setpassword("");
      setphone("");



    }
    catch(error){
      //update the loading hook to empty
      // setLoading("Unfortunately something went wrong")
      //update the error hook with the error message
      setError(error.message)



    }

  }

 
  return (
    <div className="row justify-content-center mt-4" >
      <div className="col-md-6 card shadow p-4">
        <h2>Signup</h2>
        <form onSubmit={submit}>
          {loading}
          {success}
          {error}
          <input type="text" 
          placeholder="Enter the username" 
          className="form-control" 
          required
          value={username}
          onChange={(e)=>setUsername(e.target.value)}/><br/>      
          {/* {username} */}

          {/* On change is an event handler */}
          <input type="email" 
          placeholder="Enter email address" 
          className="form-control" 
          required
          value={email}
          onChange={(e)=>setemail(e.target.value)}/><br/>
          <br/>
          {/* {email} */}
          <input type="password" 
          placeholder="Enter the password" 
          className="form-control" 
          required
          value={password}
          onChange={(e)=>setpassword(e.target.value)}/><br/>
         {/* {password}  */}
          <input type="text" 
          placeholder="Enter the phone number" 
          className="form-control" 
          required
          value={phone}
          onChange={(e)=>setphone(e.target.value)}/><br/>
          {/* {phone} */}
          


          <button type="submit" className="btn btn-primary">Signup</button>


        </form>
        <p>Already have an account?  <Link to={`/signin`}>Sign in</Link></p> 
      </div>

    </div>
  )
}

export default Signup
// read on axios -It will help us to interact in transfering information on the internet through the http requests
// researcg on more js functions
