import React from "react";
import "./styles.css"; // keep using your external stylesheet
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card-container">
      {/* Header */}
      <header className="header">
        <div className="logo-text">
          <i className="fas fa-leaf logo-icon"></i>
          <span className="app-name">Agro-AI</span>
        </div>

        {/* LOGIN Button */}
        <Link to="/login" className="language-button">
          LOGIN
        </Link>
      </header>

      {/* Subtitle */}
      <p className="subtitle">Smart Agricultural Assistant</p>

      {/* Weather Section */}
      <div className="weather-card">
        <i className="fas fa-sun weather-icon"></i>
        <p className="temperature">32°C, Pune, India</p>
        <div className="alert-tag">
          ALERT: Heavy Rain Expected Tonight - Harvest ASAP
        </div>
      </div>

      {/* Buttons */}
      <Link to="/cameraoptions" className="action-button scan-button">
  <i className="fas fa-camera"></i> SCAN CROP FOR DISEASE
</Link>


    <Link to="/voiceinput" className="action-button voice-button">
  <i className="fas fa-microphone"></i> ASK AGRO-AI FOR ADVICE
</Link>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3 className="activity-title">Recent Activity</h3>
        <div className="activity-item">
          <span>Wheat Rust</span>
          <span className="activity-date">*10/08/2024</span>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="activity-item">
          <span>Maize Fertilizer</span>
          <span className="activity-date">*09/08/2024</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
}
