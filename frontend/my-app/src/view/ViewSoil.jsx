import React, { useEffect, useState } from "react";

export default function ViewCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/crops")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) data = [];
        setCrops(data);
      })
      .catch(err => setError("Failed to fetch crops"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading crops...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Crops</h2>
      {crops.length === 0 ? (
        <p>No crops added yet</p>
      ) : (
        crops.map(crop => (
          <div key={crop._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <p><b>Name:</b> {crop.name}</p>
            <p><b>Variety:</b> {crop.variety || "Not specified"}</p>
          </div>
        ))
      )}
    </div>
  );
}
