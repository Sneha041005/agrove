import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function VoiceInput() {
  const [typedText, setTypedText] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState(""); // Stores the advice from backend
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition safely
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => setMessage("Listening...");
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setMessage(`You said: "${speechResult}"`);
      handleSubmitQuestion(speechResult);
    };
    recognition.onerror = (event) => setMessage("Error: " + event.error);
    recognition.onend = () => setMessage("Listening stopped.");
  }, []);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      setAnswer("");
      recognitionRef.current.start();
    }
  };

  const handleTextSubmit = () => {
    if (typedText.trim() === "") {
      setMessage("Please type something first!");
      return;
    }
    setMessage(`You typed: "${typedText}"`);
    handleSubmitQuestion(typedText);
    setTypedText("");
  };

  const handleSubmitQuestion = async (question) => {
    setLoading(true);
    setAnswer(""); // Clear previous answer
    try {
      const res = await fetch("http://localhost:5000/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Failed to get advice");

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Error fetching advice. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <header className="header">
        <div className="logo-text">
          <i className="fas fa-leaf logo-icon"></i>
          <span className="app-name">Agrove</span>
        </div>
      </header>

      <main className="main-content">
        <h1 className="instruction-text">Speak or Type Your Question</h1>

        {/* Voice Input */}
        <button className="primary-action-button" onClick={handleVoiceInput}>
          <i className="fas fa-microphone"></i> TAP TO SPEAK
        </button>

        <p id="resultText" className="subtitle">{message}</p>

        {/* Manual Text Input */}
        <div className="manual-input">
          <input
            type="text"
            className="text-input"
            placeholder="Type your question here..."
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
          />
          <button className="secondary-button" onClick={handleTextSubmit}>
            Submit
          </button>
        </div>

        {/* Display backend answer */}
        {loading && <p className="answer-text">Getting advice...</p>}
        {answer && (
          <div className="answer-container">
            <h3>Agrove Says:</h3>
            <p>{answer}</p>
          </div>
        )}
      </main>
    </div>
  );
}
