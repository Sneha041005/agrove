import React, { useState } from "react";
import { apiFetch } from "../api/api";

export default function AddActivity() {
  const [title, setTitle] = useState("");

  const submit = async () => {
    await apiFetch("/activity", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  };

  return (
    <div>
      <h2>Add Activity</h2>
      <input placeholder="Activity" onChange={e => setTitle(e.target.value)} />
      <button onClick={submit}>Add</button>
    </div>
  );
}
