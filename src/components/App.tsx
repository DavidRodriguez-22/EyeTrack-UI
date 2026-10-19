// src/components/App.tsx
import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaPipeEyeTracking } from "../hooks/useMediaPipeEyeTracking";
import { useCustomCursor } from "../hooks/useCustomCursor";
import { CalibrationModal } from "./CalibrationModal";

import Home from "../pages/Home";
import Necesidades from "../pages/Necesidades";
import Actividades from "../pages/Actividades";
import Comodidad from "../pages/Comodidad";
import Emociones from "../pages/Emociones";
import Emergencias from "../pages/Emergencias";
import Comunicacion from "../pages/Comunicacion";

export default function App() {
  useCustomCursor();
  const { currentFeatures, checkCalibrationStatus, isPaused, togglePause } = useMediaPipeEyeTracking();
  const [showCalibration, setShowCalibration] = useState<boolean>(true);

  const handleCalibrationComplete = useCallback(() => {
    setShowCalibration(false);
    checkCalibrationStatus();
  }, [checkCalibrationStatus]);

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Router>
      {showCalibration && (
        <CalibrationModal
          currentFeatures={currentFeatures}
          onComplete={handleCalibrationComplete}
        />
      )}

      {!showCalibration && (
        <>
          {/* Botón SÍ perfectamente centrado */}
          <button
            onClick={() => handleSpeak("Sí")}
            style={{
              position: "fixed",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              width: "120px",
              height: "120px",
              backgroundColor: "#2ed573",
              color: "white",
              borderRadius: "50%",
              fontSize: "2.5rem",
              fontWeight: "900",
              border: "5px solid white",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              zIndex: 9998,
              cursor: "pointer",
              display: "flex",           // <-- SOLUCIÓN CENTRADO
              justifyContent: "center",  // <-- SOLUCIÓN CENTRADO
              alignItems: "center",      // <-- SOLUCIÓN CENTRADO
              padding: 0
            }}
            data-interactive="true"
          >
            SÍ
          </button>

          {/* Botón NO perfectamente centrado */}
          <button
            onClick={() => handleSpeak("No")}
            style={{
              position: "fixed",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              width: "120px",
              height: "120px",
              backgroundColor: "#ff4757",
              color: "white",
              borderRadius: "50%",
              fontSize: "2.5rem",
              fontWeight: "900",
              border: "5px solid white",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              zIndex: 9998,
              cursor: "pointer",
              display: "flex",           // <-- SOLUCIÓN CENTRADO
              justifyContent: "center",  // <-- SOLUCIÓN CENTRADO
              alignItems: "center",      // <-- SOLUCIÓN CENTRADO
              padding: 0
            }}
            data-interactive="true"
          >
            NO
          </button>

          <button
            onClick={togglePause}
            style={{
              position: "fixed",
              bottom: "25px",
              left: "25px",
              padding: "16px 30px",
              backgroundColor: isPaused ? "#ffa502" : "#3742fa",
              color: "#ffffff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              zIndex: 9999,
              transition: "background-color 0.2s",
            }}
            data-interactive="true"
          >
            {isPaused ? "▶️ REANUDAR MIRADA" : "⏸️ DESCANSAR OJOS"}
          </button>

          {/* Recalibrar (Protegido: no tiene data-interactive ni role="button") */}
          <button
            onClick={() => setShowCalibration(true)}
            style={{
              position: "fixed",
              bottom: "25px",
              right: "25px",
              padding: "16px 30px",
              backgroundColor: "#2ed573",
              color: "#ffffff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              zIndex: 9999,
            }}
          >
            🎯 RECALIBRAR
          </button>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/necesidades" element={<Necesidades />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/comodidad" element={<Comodidad />} />
        <Route path="/emociones" element={<Emociones />} />
        <Route path="/emergencias" element={<Emergencias />} />
        <Route path="/comunicacion" element={<Comunicacion />} />
      </Routes>
    </Router>
  );
}