import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye, faEyeSlash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../Style/login.css";
import { Container } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: ""
  });
  
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ username: "", password: "" });

    if (!agreeTerms) {
      setError("You must agree to the terms of use");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("https://192.168.0.180:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message?.trim() || "";
        
        if (errorMessage === "Invalid Username!!") {
          setFieldErrors({
            username: "Invalid username. Please check and try again.",
            password: ""
          });
        } else if (errorMessage === "Incorrect Password !") {
          setFieldErrors({
            username: "",
            password: "Incorrect password. Please try again."
          });
        } else {
          const detailMessage = data.details?.[0]?.trim() || "";
          setError(detailMessage || "Authentication failed. Please try again.");
        }
        return;
      }

      if (!data.token) {
        setError("Authentication failed. No token received.");
        return;
      }

      // Use the auth context to handle login
      login(data.token);
      
      // Redirect to the intended page or default
      const from = location.state?.from?.pathname || '/service-request';
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-links">
          <Link to="/login" className="active">Sign In</Link>
        </div>

        <div className="brand-title">
          <h1>Sign In</h1>
        </div> 
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="your username"
              className={fieldErrors.username ? "error-border" : ""}
            />
          </div>
          {fieldErrors.username && (
            <div className="field-error">
              <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
              {fieldErrors.username}
            </div>
          )}
        </div>

        <div className="input-group">
          <div className="password-header">
            <label>Password</label>
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"
              className={fieldErrors.password ? "error-border" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {fieldErrors.password && (
            <div className="field-error">
              <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
              {fieldErrors.password}
            </div>
          )}
        </div> 

        <div className="robot-check">
          <Link to="/password-recovery" className="forgot-password">
            Forgot password?
          </Link>
        </div> 

        <div className="terms-check">
          <input
            type="checkbox"
            id="termsCheck"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            required
          />
          <label htmlFor="termsCheck">I agree to Ultimate Trade Terms of use</label>
        </div> 

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="welcome-message">
        <p>Welcome to the Universal Trading digital wallet</p>
      </div>
    </div>
  );
};

export default Login;