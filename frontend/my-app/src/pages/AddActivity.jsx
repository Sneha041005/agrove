import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddActivity() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    if (!title.trim()) {
      setError("Activity cannot be empty");
      setSuccess("");
      return;
    }

    try {
      await apiFetch("/activity", {
        method: "POST",
        body: JSON.stringify({ title }),
      });

      setTitle("");
      setError("");
      setSuccess("Activity added successfully");
    } catch {
      setError("Something went wrong");
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

        .activity-heading {
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

        .secondary-button {
          width: 100%;
          padding: 12px 0;
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

        .secondary-button:hover {
          background-color: #388e3c;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(76, 175, 80, 0.4);
        }

        .secondary-button:active {
          transform: scale(0.98);
        }

        .error {
          color: #d32f2f;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .success {
          color: #2e7d32;
          font-size: 14px;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="card-container">
        <h2 className="activity-heading">Add Activity</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <input
          className="text-input"
          placeholder="Activity"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="secondary-button" onClick={submit}>
          Add Activity
        </button>
      </div>
    </>
  );
}
