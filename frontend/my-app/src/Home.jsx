import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activities, setActivities] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/activity")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(() => setActivities([]));
  }, []);

  const goToPage = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="card-container">
      
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

      {/* Weather Card */}
      <div className="weather-card">
        <i className="fas fa-sun weather-icon"></i>
        <p className="temperature">32°C, Pune, India</p>
        <div className="alert-tag">
          ALERT: Heavy Rain Expected Tonight - Harvest ASAP
        </div>
      </div>

      
      <div className="main-actions">
        <button className="action-button scan-button" onClick={() => goToPage("/cameraoptions")}>
          <i className="fas fa-camera"></i> SCAN CROP FOR DISEASE
        </button>

        <button className="action-button voice-button" onClick={() => goToPage("/voiceinput")}>
          <i className="fas fa-microphone"></i> ASK AGROVE FOR ADVICE
        </button>
      </div>

      
      <div className="home-navigation">
        <h3>Manage Farms, Fields, Crops & Soil</h3>
        <div className="button-group">
          <button onClick={() => goToPage("/add-farm")}>Add Farm</button>
          <button onClick={() => goToPage("/add-fields")}>Add Field</button>
          <button onClick={() => goToPage("/add-crops")}>Add Crop</button>
          <button onClick={() => goToPage("/add-activity")}>Add Activity</button>
          <button onClick={() => goToPage("/add-soil")}>Add Soil</button>
        </div>

        <h3>View Records</h3>
        <div className="button-group">
          <button onClick={() => goToPage("/farms")}>View Farms</button>
          <button onClick={() => goToPage("/fields")}>View Fields</button>
          <button onClick={() => goToPage("/crops")}>View Crops</button>
          <button onClick={() => goToPage("/activities")}>View Activities</button>
          <button onClick={() => goToPage("/soil")}>View Soil</button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="recent-activity">
        <h3 className="activity-title">Recent Activity</h3>

        {activities.length === 0 ? (
          <p className="activity-date">No recent activity</p>
        ) : (
          activities.map((item, index) => (
            <div className="activity-item" key={index}>
              <span>{item.type}: {item.description}</span>
              <span className="activity-date">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
