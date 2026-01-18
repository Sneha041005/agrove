import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <button onClick={() => navigate("/cameraoptions")}>Scan Crop</button>
      <button onClick={() => navigate("/voiceinput")}>Ask Agrove</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
