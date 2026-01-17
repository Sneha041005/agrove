import React from "react";
import "./styles.css"; // optional external stylesheet

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        className="login-box"
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h1 style={{ color: "#4CAF50", marginBottom: "30px" }}>Agro-AI Login</h1>

        <input
          type="text"
          placeholder="Username or Email"
          className="login-input"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <a
          href="/"
          className="login-button"
          style={{
            backgroundColor: "#388E3C",
            color: "white",
            padding: "15px",
            width: "100%",
            display: "block",
            borderRadius: "8px",
            fontSize: "16px",
            textDecoration: "none",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          LOG IN
        </a>

        <p style={{ marginTop: "20px" }}>
          <a href="#" style={{ color: "#4CAF50", textDecoration: "none" }}>
            New User? Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
