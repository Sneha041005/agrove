import React, { useEffect, useState } from "react";

export default function ViewActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Corrected URL to match backend
    fetch("http://localhost:5000/api/activity/recent")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) data = [];
        setActivities(data);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch activities");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Recent Activities</h2>
      {activities.length === 0 ? (
        <p>No activities yet</p>
      ) : (
        activities.map(act => (
          <div key={act._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 6 }}>
            <p><b>Type:</b> {act.type}</p>
            <p><b>Details:</b> {act.details}</p>
            <p><small>Date: {new Date(act.date).toLocaleDateString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
}
