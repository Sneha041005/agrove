import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddCrop() {
  const [fieldId, setFieldId] = useState("");
  const [cropName, setCropName] = useState("");
  const [season, setSeason] = useState("");

  const submit = async () => {
    await apiFetch("/crops", {
      method: "POST",
      body: JSON.stringify({ fieldId, cropName, season }),
    });
  };

  return (
    <div>
      <h2>Add Crop</h2>
      <input placeholder="Field ID" onChange={e => setFieldId(e.target.value)} />
      <input placeholder="Crop Name" onChange={e => setCropName(e.target.value)} />
      <input placeholder="Season" onChange={e => setSeason(e.target.value)} />
      <button onClick={submit}>Save</button>
    </div>
  );
}
