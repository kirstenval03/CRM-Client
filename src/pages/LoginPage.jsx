// src/pages/LoginPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";

import E3Login from '../assets/images/E3Login.png'

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
    console.log('Attempting to log in with:', email, password); // Debugging log
    const requestBody = { email, password };

    post('/auth/login', requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/'); // Navigate to dashboard after login      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img className="logimg" src={E3Login} alt="Welcome back!" />
      </div>
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please login to your account.</p>
        </div>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={handlePassword}
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

    

          <button type="submit" className="login-button">Login</button>

          <div className="signup-link">
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;
