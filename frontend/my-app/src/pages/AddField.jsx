import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddField() {
  const [farmId, setFarmId] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!farmId || !name || !area) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await apiFetch("/fields", {
        method: "POST",
        body: JSON.stringify({ farmId, name, area }),
      });

      setFarmId("");
      setName("");
      setArea("");
    } catch (err) {
      setError("Failed to save field");
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
          box-sizing: border-box;
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
        <h2 className="title">Add Field</h2>

        {error && <div className="error">{error}</div>}

        <input
          className="input"
          placeholder="Farm ID"
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
        />

        <input
          className="input"
          placeholder="Field Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Area (e.g. 1.5 acres)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <button className="button" onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Save Field"}
        </button>
      </div>
    </>
  );
}
