import React, { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

export default function FieldAdvisory({ fieldId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fieldId) return;

    const fetchAdvisory = async () => {
      setLoading(true);
      try {
        // This matches the router.get("/:fieldId") we built
        const response = await apiFetch(`/advisory/${fieldId}`);
        setData(response.data); 
      } catch (err) {
        setError("Could not load advisory data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisory();
  }, [fieldId]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Select a field to see advisory.</p>;

  return (
    <div className="advisory-container">
      <style>{`
        .advisory-card {
          background: #ffffff;
          border-left: 5px solid #4caf50;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-top: 20px;
        }
        .stage-badge {
          display: inline-block;
          background: #e8f5e9;
          color: #2e7d32;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .advice-list {
          list-style: none;
          padding: 0;
        }
        .advice-item {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
        }
        .advice-item:last-child { border-bottom: none; }
        .icon { margin-right: 10px; }
      `}</style>

      <div className="advisory-card">
        <span className="stage-badge">Current Stage: {data.stage}</span>
        <h3 style={{ margin: "10px 0", color: "#333" }}>Expert Suggestions</h3>
        
        <ul className="advice-list">
          {data.recommendations.map((text, index) => (
            <li key={index} className="advice-item">
              <span className="icon">🌱</span> {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}