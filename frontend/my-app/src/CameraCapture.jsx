import React, { useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  //  Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      alert("Camera access denied or not available.");
      console.error(err);
    }
  };

  //  Capture a photo
  const takePhoto = () => {
    const width = 320;
    const height = 240;

    const video = videoRef.current;
    const photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  // Retake photo (clear the canvas)
  const closePhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  return (
    <div className="card-container">
      <header className="header">
        <div className="logo-text">
          <i className="fas fa-leaf logo-icon"></i>
          <span className="app-name">Agro-AI</span>
        </div>
        <Link to="./Home.jsx" className="language-button">HOME</Link>
      </header>

      <main className="main-content">
        <h1 className="instruction-text">Point camera at<br />the infected leaf</h1>

        {/*  Live Camera */}
        <div className="camera-placeholder">
          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: "10px" }}></video>
        </div>

        {/* Take Photo Button */}
        {!hasPhoto ? (
          <>
            <button className="take-photo-button" onClick={startCamera}>
              <i className="fas fa-video"></i> Start Camera
            </button>

            <button className="secondary-action-button" onClick={takePhoto}>
              <i className="fas fa-camera"></i> Take Photo
            </button>
          </>
        ) : (
          <>
            <canvas ref={photoRef} style={{ width: "100%", borderRadius: "10px" }}></canvas>
            <button className="take-photo-button" onClick={closePhoto}>
              <i className="fas fa-redo"></i> Retake
            </button>
          </>
        )}

        <button className="secondary-action-button">
          <i className="fas fa-image"></i> Upload from Gallery
        </button>
      </main>
    </div>
  );
}
