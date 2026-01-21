import { useEffect, useState } from "react";

export default function ViewAdvisory({ fieldId }) {
  const [advisoryList, setAdvisoryList] = useState([]);

  useEffect(() => {
    if (fieldId) loadAdvisory(fieldId);
  }, [fieldId]);

  async function loadAdvisory(fieldId) {
    try {
      const res = await fetch(`http://localhost:5000/api/advisory/${fieldId}`);
      const data = await res.json();
      if (data.success) setAdvisoryList(data.advisory);
    } catch (err) {
      console.error("Failed to load advisory", err);
    }
  }

  return (
    <div>
      <h2>Farm Advisory</h2>
      <div id="advisoryContainer">
        {advisoryList.length === 0 ? (
          <p>No advisory available</p>
        ) : (
          advisoryList.map((advice, idx) => (
            <div key={idx} className="advisory-card">
              {advice}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
