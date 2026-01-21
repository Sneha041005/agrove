import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import CameraOptions from "./CameraOptions";
import CameraCapture from "./CameraCapture";
import VoiceInput from "./VoiceInput";
import Signup from "./Signup";

import AddFarm from "./pages/AddFarm";
import AddField from "./pages/AddField";
import AddCrop from "./pages/AddCrop";
import AddActivity from "./pages/AddActivity";
import AddSoil from "./pages/AddSoil";

import ViewFarms from "./view/ViewFarms";
import ViewFields from "./view/ViewFields";
import ViewCrops from "./view/ViewCrops";
import ViewSoil from "./view/ViewSoil";
import ViewActivity from "./view/ViewActivity";

import ViewAdvisory from "./view/ViewAdvisory"; // NEW
import Advisory from "../components/Advisory";
function App() {
  // Placeholder for selected fieldId; we’ll update this dynamically later
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cameraoptions" element={<CameraOptions />} />
        <Route path="/cameracapture" element={<CameraCapture />} />
        <Route path="/voiceinput" element={<VoiceInput />} /> 
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/add-farm" element={<AddFarm />} />
        <Route path="/add-crops" element={<AddCrop />} />
        <Route path="/add-fields" element={<AddField />} />
        <Route path="/add-soil" element={<AddSoil />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/farms" element={<ViewFarms />} />
        <Route 
          path="/fields" 
          element={<ViewFields setSelectedFieldId={setSelectedFieldId} />} 
        />
        <Route path="/crops" element={<ViewCrops />} />
        <Route path="/soil" element={<ViewSoil />} />
        <Route path="/activity" element={<ViewActivity />} />
        <Route path="/advisory" element={<Advisory/>}/>

        {/* NEW Advisory Route */}
        <Route 
          path="/advisory" 
          element={<ViewAdvisory fieldId={selectedFieldId || "TEST_FIELD_ID"} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
