import React, { useEffect, useState } from "react";

export default function ViewFarms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/farms");
        if (!res.ok) throw new Error("Failed to fetch farms");
        const data = await res.json();
        setFarms(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Farms</h2>
      {farms.length === 0 ? (
        <p>No farms added yet</p>
      ) : (
        farms.map(farm => (
          <div
            key={farm._id}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
          >
            <p><b>Name:</b> {farm.name}</p>
            <p><b>Location:</b> {farm.location}</p>
            <small>ID: {farm._id}</small>
          </div>
        ))
      )}
    </div>
  );
}
