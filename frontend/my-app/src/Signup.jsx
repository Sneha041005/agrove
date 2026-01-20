import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);
      setError("Server not responding. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={{ color: "#4CAF50", marginBottom: "25px" }}>Signup</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Signing up..." : "SIGN UP"}
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#4CAF50", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f2f2f2",
};

const boxStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "320px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const buttonStyle = {
  backgroundColor: "#388E3C",
  color: "white",
  padding: "14px",
  width: "100%",
  borderRadius: "8px",
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
};
