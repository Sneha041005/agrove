import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFarm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null); // 👈 new state for image
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("size", size);
      if (image) formData.append("image", image); // add file

      const res = await fetch("http://localhost:5000/api/farms", {
        method: "POST",
        body: formData, // 👈 use FormData
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to save farm");
        return;
      }

      navigate("/");
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f5;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding-top: 50px;
          margin: 0;
        }

        .card {
          width: 90%;
          max-width: 420px;
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .title {
          font-size: 22px;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 15px;
        }

        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 2px solid #4caf50;
          font-size: 16px;
          outline: none;
        }

        .input:focus {
          border-color: #2e7d32;
          box-shadow: 0 0 0 3px rgba(76,175,80,0.15);
        }

        .button {
          width: 100%;
          padding: 14px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(76,175,80,0.3);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .button:hover:not(:disabled) {
          background-color: #388e3c;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(76,175,80,0.4);
        }

        .button:disabled {
          background-color: #a5d6a7;
          cursor: not-allowed;
        }

        .error {
          color: #d32f2f;
          font-size: 14px;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="card">
        <h2 className="title">Add Farm</h2>

        {error && <div className="error">{error}</div>}

        <input
          className="input"
          placeholder="Farm Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="input"
          placeholder="Size (e.g. 2 acres)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        {/* New file input */}
        <input
          className="input"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="button" onClick={submitFarm} disabled={loading}>
          {loading ? "Saving..." : "Save Farm"}
        </button>
      </div>
    </>
  );
}
