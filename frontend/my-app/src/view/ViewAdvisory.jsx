import { useEffect, useState } from "react";


export default function ViewAdvisory({ fieldId }) {
  const [advisoryList, setAdvisoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fieldId) loadAdvisory(fieldId);
  }, [fieldId]);

  async function loadAdvisory(fieldId) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/advisory/${fieldId}`);
      const data = await res.json();
      if (data.success) {
        setAdvisoryList(data.advisory);
      }
    } catch (err) {
      console.error("Failed to load advisory", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="view-advisory-container">
      <div className="header-section">
        <h2>🌾 Smart Farm Advisory</h2>
        <button className="refresh-btn" onClick={() => loadAdvisory(fieldId)}>
          🔄 Refresh
        </button>
      </div>

      <div id="advisoryContainer">
        {loading ? (
          <div className="loading-spinner">Analyzing farm data with AI...</div>
        ) : advisoryList.length === 0 ? (
          <p className="no-data">No advisory available for this field yet.</p>
        ) : (
          advisoryList.map((advice, idx) => {
            // Check if this is the AI insight we added in the backend
            const isAI = advice.includes("🤖 AI INSIGHT");

            return (
              <div 
                key={idx} 
                className={`advisory-card ${isAI ? "ai-highlight" : "standard-tip"}`}
              >
                {isAI ? (
                  <div className="ai-content">
                    <span className="ai-badge">Gemini Smart Tip</span>
                    <p>{advice.replace("🤖 AI INSIGHT:", "")}</p>
                  </div>
                ) : (
                  <div className="standard-content">
                    <span className="tip-icon">📍</span>
                    <p>{advice}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}