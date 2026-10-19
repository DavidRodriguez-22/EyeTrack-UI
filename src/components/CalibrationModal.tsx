// src/components/CalibrationModal.tsx
import React, { useState, useRef } from "react";
import { EyeFeatures, gazeModel } from "../utils/gazeRegression";

interface CalibrationModalProps {
  currentFeatures: EyeFeatures | null;
  onComplete: () => void;
}

const CALIBRATION_POINTS = [
  { x: 0.20, y: 0.20 },
  { x: 0.50, y: 0.20 },
  { x: 0.80, y: 0.20 },
  { x: 0.20, y: 0.50 },
  { x: 0.50, y: 0.50 },
  { x: 0.80, y: 0.50 },
  { x: 0.20, y: 0.80 },
  { x: 0.50, y: 0.80 },
  { x: 0.80, y: 0.80 },
];

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
  currentFeatures,
  onComplete,
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [pointIndex, setPointIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const samplesRef = useRef<{ features: EyeFeatures; target: { x: number; y: number } }[]>([]);
  const currentBatchRef = useRef<EyeFeatures[]>([]);
  const latestFeaturesRef = useRef<EyeFeatures | null>(null);
  latestFeaturesRef.current = currentFeatures;

  const currentPoint = CALIBRATION_POINTS[pointIndex];
  const isDetectingFace = !!currentFeatures;

  const handleCapturePoint = () => {
    if (!latestFeaturesRef.current || isCapturing) return;

    setIsCapturing(true);
    currentBatchRef.current = [];
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      if (latestFeaturesRef.current) {
        currentBatchRef.current.push(latestFeaturesRef.current);
      }

      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(timer);
        
        // Sacar promedio de las muestras capturadas durante el conteo
        if (currentBatchRef.current.length > 0) {
          const batch = currentBatchRef.current;
          const avgFeatures: EyeFeatures = {
            leftIrisX: batch.reduce((acc, f) => acc + f.leftIrisX, 0) / batch.length,
            leftIrisY: batch.reduce((acc, f) => acc + f.leftIrisY, 0) / batch.length,
            rightIrisX: batch.reduce((acc, f) => acc + f.rightIrisX, 0) / batch.length,
            rightIrisY: batch.reduce((acc, f) => acc + f.rightIrisY, 0) / batch.length,
          };

          const screenTarget = {
            x: currentPoint.x * window.innerWidth,
            y: currentPoint.y * window.innerHeight,
          };
          samplesRef.current.push({
            features: avgFeatures,
            target: screenTarget,
          });
        }

        setIsCapturing(false);

        if (pointIndex + 1 < CALIBRATION_POINTS.length) {
          setPointIndex((prev) => prev + 1);
        } else {
          gazeModel.train(samplesRef.current);
          onComplete();
        }
      }
    }, 500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 15, 30, 0.96)",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {!hasStarted ? (
        <div style={{ textAlign: "center", maxWidth: "520px", padding: "20px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>🎯 Calibración de Mirada</h2>
          <p style={{ color: "#a0aec0", fontSize: "1.1rem", marginBottom: "24px", lineHeight: "1.5" }}>
            Fija tu vista en el punto rojo y presiona <strong>"Capturar Punto"</strong>. Mantén la mirada inmóvil mientras el contador llega a 0.
          </p>
          <button
            onClick={() => setHasStarted(true)}
            style={{
              padding: "14px 32px",
              fontSize: "1.2rem",
              backgroundColor: "#ff4757",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(255, 71, 87, 0.4)",
            }}
          >
            Comenzar Calibración
          </button>
        </div>
      ) : (
        <>
          <div style={{ position: "absolute", top: 30, textAlign: "center" }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
              Punto {pointIndex + 1} de 9
            </h2>
            <p style={{ color: "#a0aec0", fontSize: "1.1rem" }}>
              {isCapturing
                ? `Mantén la mirada inmóvil... ${countdown}`
                : "Fija la mirada en el punto rojo y presiona 'Capturar'."}
            </p>
            {!isDetectingFace && (
              <p style={{ color: "#ff4757", fontWeight: "bold", marginTop: "12px" }}>
                ⚠️ Buscando rostro... Mantente frente a la cámara.
              </p>
            )}
          </div>

          <div
            onClick={handleCapturePoint}
            style={{
              position: "absolute",
              left: `${currentPoint.x * 100}%`,
              top: `${currentPoint.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 65,
              height: 65,
              borderRadius: "50%",
              backgroundColor: isCapturing ? "#2ed573" : isDetectingFace ? "#ff4757" : "#718096",
              border: "4px solid #ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: isDetectingFace ? "0 0 30px rgba(255, 71, 87, 0.9)" : "none",
              cursor: isDetectingFace && !isCapturing ? "pointer" : "default",
              transition: "left 0.3s ease, top 0.3s ease, background-color 0.3s",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              {isCapturing ? countdown : "AQUÍ"}
            </span>
          </div>

          {!isCapturing && isDetectingFace && (
            <button
              onClick={handleCapturePoint}
              style={{
                position: "absolute",
                bottom: "40px",
                padding: "12px 28px",
                fontSize: "1.1rem",
                backgroundColor: "#2ed573",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(46, 213, 115, 0.4)",
              }}
            >
              Capturar Punto ({pointIndex + 1}/9)
            </button>
          )}
        </>
      )}
    </div>
  );
};