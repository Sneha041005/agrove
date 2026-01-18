import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/activity/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setActivities(data))
        .catch(() => {});
    }
  }, [token]);

  const goProtected = (path) => {
    if (!token) navigate("/login");
    else navigate(path);
  };

  return (
    <div className="card-container">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
          <i className="fas fa-leaf logo-icon"></i>
          <span className="app-name">Agrove</span>
        </div>

        {!token ? (
          <Link to="/login" className="language-button">LOGIN</Link>
        ) : (
          <Link to="/dashboard" className="language-button">DASHBOARD</Link>
        )}
      </header>

      {/* Weather Section */}
      <div className="weather-card">
        <i className="fas fa-sun weather-icon"></i>
        <p className="temperature">32°C, Pune, India</p>
        <div className="alert-tag">
          ALERT: Heavy Rain Expected Tonight - Harvest ASAP
        </div>
      </div>

      {/* Buttons */}
      <button
        className="action-button scan-button"
        onClick={() => goProtected("/cameraoptions")}
      >
        <i className="fas fa-camera"></i> SCAN CROP FOR DISEASE
      </button>

      <button
        className="action-button voice-button"
        onClick={() => goProtected("/voiceinput")}
      >
        <i className="fas fa-microphone"></i> ASK AGRO-AI FOR ADVICE
      </button>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3 className="activity-title">Recent Activity</h3>

        {!token && (
          <p className="activity-date">Login to view your activity</p>
        )}

        {token && activities.length === 0 && (
          <p className="activity-date">No recent activity</p>
        )}

        {activities.map((item, index) => (
          <div className="activity-item" key={index}>
            <span>{item.title}</span>
            <span className="activity-date">
              {new Date(item.date).toLocaleDateString()}
            </span>
            <i className="fas fa-chevron-right"></i>
          </div>
        ))}
      </div>
    </div>
  );
}
