import React, { useState } from "react";
import "./Login.css";

import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/api/v1/admin/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.status === 200) {
        // Successful login
        dispatch(login(response.data));
        // alert("Login Success");
      } else {
        // Handle non-200 response
        alert(`Login Error: ${response.status} - ${response.data.message}`);
      }
    }).catch((error) => {
      // Handle other errors
      alert(`Login Error: ${error.message}`);
    });
    





    setEmail("");
    setPassword("");

    // redirect to the logout page
    // window.location = "/logout";
  };

  return (
    <div className="login" style={{marginLeft:'75px',marginTop:'10px'}}>

      <form className="login__form" onSubmit={(e) => handleSubmit(e)}
      style={{marginLeft:'600px',  borderRadius: '10px',maxWidth: '400px',
      boxShadow: '5px 5px 10px #A6ABBD',  
      padding: '30px 10px 30px 10px'}}>
        <h1>Login as admin</h1>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '200px', 
            height: '30px', 
            
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '200px', 
            height: '30px', 
            
          }}
        />
        <button 
        
        type="submit" className="submit__btn"
        style={{
          alignItems: 'center',   
          width: '300px', 
          height: '40px',
         
        }}>
          Submit
        </button>
        <br></br>
        <button 
        style={{
          alignItems: 'center',   
          width: '300px', 
          height: '30px',
          alignItems: 'center',
          border: 'none', 
          background: 'none', 
          
         
        }}
        onClick={()=>{
          window.location.href = "/"
        }}>
        Login as user

        </button>
      </form>
    </div>
  );
};

export default Admin;
