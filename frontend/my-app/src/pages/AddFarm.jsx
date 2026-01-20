import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFarm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitFarm = async () => {
    if (!name || !location || !size) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/farms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, size }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to save farm");
        setLoading(false);
        return;
      }

      // Success → go back home
      navigate("/");
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Farm</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Farm Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <button onClick={submitFarm} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
