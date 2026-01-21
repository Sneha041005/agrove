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

  // 🔹 CSV EXPORT FUNCTION
  const exportCSV = () => {
    if (crops.length === 0) return;

    const headers = ["ID", "Name", "Variety"];
    const rows = crops.map(crop => [
      crop._id,
      crop.name,
      crop.variety || "Not specified"
    ]);

    const csvContent =
      headers.join(",") + "\n" +
      rows.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crops.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading crops...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      {/* Header + Export Button */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Crops</h2>
        <button onClick={exportCSV} disabled={crops.length === 0}>
          Export CSV
        </button>
      </div>

      {crops.length === 0 ? (
        <p>No crops added yet</p>
      ) : (
        crops.map(crop => (
          <div
            key={crop._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6
            }}
          >
            <p><b>Name:</b> {crop.name}</p>
            <p><b>Variety:</b> {crop.variety || "Not specified"}</p>
          </div>
        ))
      )}
    </div>
  );
}
