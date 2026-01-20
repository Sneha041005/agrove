import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CameraOptions from "./CameraOptions";
import CameraCapture from "./CameraCapture";
import VoiceInput from "./VoiceInput";
import Signup from "./Signup";
import AddFarm from "./pages/AddFarm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cameraoptions" element={<CameraOptions/>}/>
        <Route path="/cameracapture" element={<CameraCapture/>}/>
        <Route path="/voiceinput" element={<VoiceInput />} /> 
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/add-farm" element={<AddFarm />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
