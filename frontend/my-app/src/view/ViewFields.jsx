import React, { useEffect, useState } from "react";

export default function ViewFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/fields")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) data = [];
        setFields(data);
      })
      .catch(() => setError("Failed to fetch fields"))
      .finally(() => setLoading(false));
  }, []);


  const exportCSV = () => {
    if (fields.length === 0) return;

    const headers = [
      "ID",
      "Field Name",
      "Crop",
      "Soil Type",
      "Sowing Date"
    ];

    const rows = fields.map(field => [
      field._id,
      field.name,
      field.crop?.name || "Not assigned",
      field.soil?.type || "Not assigned",
      field.sowingDate
        ? new Date(field.sowingDate).toLocaleDateString()
        : "Not set"
    ]);

    const csvContent =
      headers.join(",") + "\n" +
      rows.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "fields.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading fields...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      {}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Fields</h2>
        <button onClick={exportCSV} disabled={fields.length === 0}>
          Export CSV
        </button>
      </div>

      {fields.length === 0 ? (
        <p>No fields added yet</p>
      ) : (
        fields.map(field => (
          <div
            key={field._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6
            }}
          >
            <p><b>Name:</b> {field.name}</p>
            <p><b>Crop:</b> {field.crop?.name || "Not assigned"}</p>
            <p><b>Soil:</b> {field.soil?.type || "Not assigned"}</p>
            <p>
              <b>Sowing Date:</b>{" "}
              {field.sowingDate
                ? new Date(field.sowingDate).toLocaleDateString()
                : "Not set"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
