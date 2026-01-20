import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddCrop() {
  const [fieldId, setFieldId] = useState("");
  const [cropName, setCropName] = useState("");
  const [season, setSeason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    if (!fieldId || !cropName || !season) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      await apiFetch("/crops", {
        method: "POST",
        body: JSON.stringify({ fieldId, cropName, season }),
      });

      setFieldId("");
      setCropName("");
      setSeason("");
      setError("");
      setSuccess("Crop added successfully");
    } catch {
      setError("Failed to add crop");
      setSuccess("");
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

        .card-container {
          width: 90%;
          max-width: 420px;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 25px;
          box-sizing: border-box;
        }

        .form-title {
          font-size: 20px;
          font-weight: bold;
          color: #2e7d32;
          margin-bottom: 15px;
        }

        .text-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border: 2px solid #4caf50;
          border-radius: 12px;
          font-size: 16px;
          outline: none;
        }

        .text-input:focus {
          border-color: #2e7d32;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
        }

        .primary-button {
          width: 100%;
          padding: 14px 0;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 6px 14px rgba(76, 175, 80, 0.3);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .primary-button:hover {
          background-color: #388e3c;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(76, 175, 80, 0.4);
        }

        .primary-button:active {
          transform: scale(0.98);
        }

        .error {
          color: #d32f2f;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .success {
          color: #2e7d32;
          font-size: 14px;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="card-container">
        <h2 className="form-title">Add Crop</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <input
          className="text-input"
          placeholder="Field ID"
          value={fieldId}
          onChange={(e) => setFieldId(e.target.value)}
        />

        <input
          className="text-input"
          placeholder="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
        />

        <input
          className="text-input"
          placeholder="Season (e.g. Kharif, Rabi)"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />

        <button className="primary-button" onClick={submit}>
          Save Crop
        </button>
      </div>
    </>
  );
}
