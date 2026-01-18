import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
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
        <h1 style={{ color: "#4CAF50", marginBottom: "30px" }}>Agro-AI Login</h1>

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
          style={{
            backgroundColor: "#388E3C",
            color: "white",
            padding: "15px",
            width: "100%",
            borderRadius: "8px",
            fontSize: "16px",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          LOG IN
        </button>

        <p style={{ marginTop: "20px" }}>
          <span style={{ color: "#4CAF50" }}>
            New User? Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
