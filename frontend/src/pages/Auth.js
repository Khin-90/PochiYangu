import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    if (!isSignUp) {
      // Login logic
      if (email === "hinzanno@gmail.com" && password === "admin") {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } else {
      // Handle signup (placeholder)
      setIsSignUp(false);
    }
  };

  return (
    <div className="auth-overlay">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="auth-title">Pochi</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleAuth} className="auth-form">
          <label>Username</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Get started"}
          </button>

          <p className="auth-toggle" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Sign up"}
          </p>
        </form>
      </motion.div>
    </div>
  );
}