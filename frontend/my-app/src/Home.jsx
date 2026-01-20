import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activities, setActivities] = useState([]);

  // Fetch recent activities if logged in
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/activities", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setActivities(data))
        .catch(() => setActivities([]));
    }
  }, [token]);

  // Navigate to pages
  const goToPage = (path) => {
    navigate(path);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // refresh to update UI
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
          <>
            <Link to="/login" className="language-button">LOGIN</Link>
            <Link to="/signup" className="language-button">SIGN UP</Link>
          </>
        ) : (
          <button className="language-button" onClick={handleLogout}>
            LOGOUT
          </button>
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

      {/* Action Buttons */}
      <button
        className="action-button scan-button"
        onClick={() => goToPage("/cameraoptions")}
      >
        <i className="fas fa-camera"></i> SCAN CROP FOR DISEASE
      </button>

      <button
        className="action-button voice-button"
        onClick={() => goToPage("/voiceinput")}
      >
        <i className="fas fa-microphone"></i> ASK AGROVE FOR ADVICE
      </button>

      {/* Farm/Field/Crop/Soil Buttons */}
      <div className="home-navigation">
        <button onClick={() => goToPage("/add-farm")}>Add Farm</button>
        <button onClick={() => goToPage("/add-field")}>Add Field</button>
        <button onClick={() => goToPage("/add-crop")}>Add Crop</button>
        <button onClick={() => goToPage("/add-soil")}>Add Soil</button>
        <button onClick={() => goToPage("/farms")}>View Farms</button>
        <button onClick={() => goToPage("/fields")}>View Fields</button>
        <button onClick={() => goToPage("/crops")}>View Crops</button>
        <button onClick={() => goToPage("/soil")}>View Soil</button>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3 className="activity-title">Recent Activity</h3>

        {!token && <p className="activity-date">Login to view your activity</p>}

        {token && activities.length === 0 && (
          <p className="activity-date">No recent activity</p>
        )}

        {activities.map((item, index) => (
          <div className="activity-item" key={index}>
            <span>{item.type}: {item.description}</span>
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
