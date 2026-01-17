import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CameraOptions from "./CameraOptions";
import CameraCapture from "./CameraCapture";
import VoiceInput from "./VoiceInput";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cameraoptions" element={<CameraOptions/>}/>
        <Route path="/cameracapture" element={<CameraCapture/>}/>
        <Route path="/voiceinput" element={<VoiceInput />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
