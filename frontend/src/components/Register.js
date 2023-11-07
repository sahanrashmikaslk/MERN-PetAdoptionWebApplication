import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/v1/users", {
      name: name,
      email: email,
      password: password
    }).then((response) => {
      console.log(response);
      window.location.href = "/";
    }).catch((error) => {
      console.log(error);
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login" style={{marginLeft:'75px',marginTop:'10px'}} >
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}
       style={{marginLeft:'600px',  borderRadius: '10px',maxWidth: '400px',
       boxShadow: '5px 5px 10px #A6ABBD',  
       padding: '30px 10px 30px 10px'}}>
        <h1>Sign up here as user</h1>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '200px', 
            height: '30px',
          }}
        />
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
        <button type="submit" className="submit__btn"
         style={{
          width: '300px', 
          height: '40px',
        }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;