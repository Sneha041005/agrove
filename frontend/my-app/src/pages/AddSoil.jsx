import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSoil() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    ph: "",
    moisture: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/soil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to add soil");

      alert("Soil added successfully!");
      navigate("/soil");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ===== INLINE STYLES ===== */
  const containerStyle = {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2e7d32"
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#333"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    backgroundColor: loading ? "#9e9e9e" : "#2e7d32",
    color: "#fff",
    fontSize: "15px",
    border: "none",
    borderRadius: "10px",
    cursor: loading ? "not-allowed" : "pointer"
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    marginBottom: "10px"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Add Soil</h2>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Soil Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={labelStyle}>pH Level</label>
          <input
            type="number"
            step="0.1"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={labelStyle}>Moisture (%)</label>
          <input
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Saving..." : "Save Soil"}
        </button>
      </form>
    </div>
  );
}
