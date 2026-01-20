import React, { useState } from "react";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // redirect to dashboard
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f2f2f2",
    }}>
      <div className="login-box" style={{
        background: "white",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "320px",
      }}>
        <h1 style={{ color: "#4CAF50", marginBottom: "30px" }}> Login</h1>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleLogin}
          className="login-button"
          disabled={loading}
          style={{
            backgroundColor: "#388E3C",
            color: "white",
            padding: "15px",
            width: "100%",
            borderRadius: "8px",
            fontSize: "16px",
            border: "none",
            marginTop: "10px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "LOG IN"}
        </button>

        <p style={{ marginTop: "20px" }}>
          <Link to="/signup" style={{ color: "#4CAF50", textDecoration: "none" }}>
            New User? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
