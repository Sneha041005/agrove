import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddField() {
  const [farmId, setFarmId] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");

  const submit = async () => {
    await apiFetch("/fields", {
      method: "POST",
      body: JSON.stringify({ farmId, name, area }),
    });
  };

  return (
    <div>
      <h2>Add Field</h2>
      <input placeholder="Farm ID" onChange={e => setFarmId(e.target.value)} />
      <input placeholder="Field Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Area" onChange={e => setArea(e.target.value)} />
      <button onClick={submit}>Save</button>
    </div>
  );
}
