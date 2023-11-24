// src/pages/LoginPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";
import E3logo from "../assets/images/E3logo.png"

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)


  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    post('/auth/login', requestBody)
      .then((response) => {

        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="LoginPage">
        
        <img src={E3logo} />
        <h1>Please Login</h1>


    </div>
  )
}

export default LoginPage;