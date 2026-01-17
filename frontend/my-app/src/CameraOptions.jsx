import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function ScanOptions() {
  return (
    <div className="card-container">
      <header className="header">
        <div className="logo-text">
          <i className="fas fa-leaf logo-icon"></i>
          <span className="app-name">Agro-AI</span>
        </div>
        <Link to="/" className="language-button">HOME</Link>
      </header>

      <main className="main-content">
        <h1 className="instruction-text">
          Take a photo of the<br />infected leaf
        </h1>

        <Link to="/cameracapture" className="primary-action-button">
          <i className="fas fa-camera"></i> OPEN CAMERA
        </Link>

        <button className="secondary-action-button">
          <i className="fas fa-image"></i> UPLOAD FROM GALLERY
        </button>

        <p className="subtle-option">
          Or choose from your phone's photos
        </p>
      </main>
    </div>
  );
}
