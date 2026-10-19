// src/hooks/useMediaPipeEyeTracking.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { moveCustomCursor, updateDwellProgress } from "./useCustomCursor";
import { EyeFeatures, gazeModel } from "../utils/gazeRegression";

export function useMediaPipeEyeTracking() {
  const [currentFeatures, setCurrentFeatures] = useState<EyeFeatures | null>(null);
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const smoothedPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dwellStartTime = useRef<number | null>(null);
  const lastTargetElement = useRef<Element | null>(null);
  const isPausedRef = useRef(isPaused);

  isPausedRef.current = isPaused;

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
    updateDwellProgress(0);
  }, []);

  const checkCalibrationStatus = useCallback(() => {
    setIsCalibrated(gazeModel.getStatus());
  }, []);

  useEffect(() => {
    let isMounted = true;
    let faceLandmarker: FaceLandmarker | null = null;
    let animationFrameId: number | null = null;
    let mediaStream: MediaStream | null = null;

    const video = document.createElement("video");
    video.style.position = "fixed";
    video.style.bottom = "0";
    video.style.right = "0";
    video.style.width = "160px";
    video.style.height = "120px";
    video.style.zIndex = "-1";
    video.style.opacity = "0.01";
    video.autoplay = true;
    video.playsInline = true;
    document.body.appendChild(video);

    const initMediaPipe = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm"
        );

        if (!isMounted) return;

        faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });

        if (!isMounted) return;

        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!isMounted) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        video.srcObject = mediaStream;
        await video.play();

        let lastVideoTime = -1;
        const processFrame = () => {
          if (!isMounted) return;

          if (faceLandmarker && video.currentTime !== lastVideoTime && video.readyState >= 2) {
            lastVideoTime = video.currentTime;
            const results = faceLandmarker.detectForVideo(video, performance.now());

            if (results.faceLandmarks && results.faceLandmarks.length > 0) {
              const landmarks = results.faceLandmarks[0];

              const leftIris = landmarks[468];
              const leftCornerIn = landmarks[133];
              const leftCornerOut = landmarks[33];

              const rightIris = landmarks[473];
              const rightCornerIn = landmarks[362];
              const rightCornerOut = landmarks[263];

              if (leftIris && rightIris) {
                const leftWidth = Math.hypot(leftCornerOut.x - leftCornerIn.x, leftCornerOut.y - leftCornerIn.y) || 0.05;
                const leftCenterX = (leftCornerIn.x + leftCornerOut.x) / 2;
                const leftCenterY = (leftCornerIn.y + leftCornerOut.y) / 2;

                const rightWidth = Math.hypot(rightCornerOut.x - rightCornerIn.x, rightCornerOut.y - rightCornerIn.y) || 0.05;
                const rightCenterX = (rightCornerIn.x + rightCornerOut.x) / 2;
                const rightCenterY = (rightCornerIn.y + rightCornerOut.y) / 2;

                const features: EyeFeatures = {
                  leftIrisX: (leftIris.x - leftCenterX) / leftWidth,
                  leftIrisY: (leftIris.y - leftCenterY) / leftWidth,
                  rightIrisX: (rightIris.x - rightCenterX) / rightWidth,
                  rightIrisY: (rightIris.y - rightCenterY) / rightWidth,
                };

                setCurrentFeatures(features);

                if (gazeModel.getStatus() && !isPausedRef.current) {
                  const rawPoint = gazeModel.predict(features);
                  if (rawPoint) {
                    const alpha = 0.2;
                    smoothedPos.current.x += alpha * (rawPoint.x - smoothedPos.current.x);
                    smoothedPos.current.y += alpha * (rawPoint.y - smoothedPos.current.y);

                    let targetX = smoothedPos.current.x;
                    let targetY = smoothedPos.current.y;

                    const hoveredElem = document.elementFromPoint(targetX, targetY);
                    let interactiveElem = hoveredElem?.closest("button, a, [role='button'], [data-interactive='true']");

                    // --- IMÁN PEGAJOSO (HISTÉRESIS / PERIODO DE GRACIA) ---
                    // Si ya estamos enganchados a un botón, será MUY difícil soltarlo accidentalmente
                    if (lastTargetElement.current && lastTargetElement.current !== interactiveElem) {
                      const rect = lastTargetElement.current.getBoundingClientRect();
                      const centerX = rect.left + rect.width / 2;
                      const centerY = rect.top + rect.height / 2;
                      const dist = Math.hypot(targetX - centerX, targetY - centerY);
                      
                      // Radio de escape gigante (250px): Tolera temblores graves del ojo
                      if (dist < 250) {
                        interactiveElem = lastTargetElement.current;
                      }
                    }

                    if (interactiveElem) {
                      const rect = interactiveElem.getBoundingClientRect();
                      const centerX = rect.left + rect.width / 2;
                      const centerY = rect.top + rect.height / 2;

                      // Centrar visualmente de inmediato
                      targetX = centerX;
                      targetY = centerY;
                    }

                    moveCustomCursor(targetX, targetY);
                    handleDwellClick(interactiveElem);
                  }
                }
              } else {
                setCurrentFeatures(null);
              }
            } else {
              setCurrentFeatures(null);
            }
          }
          animationFrameId = requestAnimationFrame(processFrame);
        };

        processFrame();
      } catch (err) {
        console.error("Error en MediaPipe:", err);
      }
    };

    const handleDwellClick = (interactiveTarget: Element | null | undefined) => {
      if (interactiveTarget) {
        if (lastTargetElement.current !== interactiveTarget) {
          // Entramos a un elemento nuevo
          lastTargetElement.current = interactiveTarget;
          dwellStartTime.current = performance.now();
        } else if (dwellStartTime.current) {
          // Llenando la barra verde de confirmación
          const elapsed = performance.now() - dwellStartTime.current;
          const dwellDuration = 1500; // 1.5 segundos
          const progressPercent = Math.min(100, (elapsed / dwellDuration) * 100);

          updateDwellProgress(progressPercent);

          if (elapsed >= dwellDuration) {
            // Disparar Clic
            const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
            interactiveTarget.dispatchEvent(clickEvent);
            
            // Pausar el temporizador para no hacer clics dobles (espera a que el usuario mire afuera)
            dwellStartTime.current = null;
            updateDwellProgress(0);
          }
        }
      } else {
        // Mirando al vacío
        lastTargetElement.current = null;
        dwellStartTime.current = null;
        updateDwellProgress(0);
      }
    };

    initMediaPipe();

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (faceLandmarker) faceLandmarker.close();
      if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop());
      if (video.parentNode) document.body.removeChild(video);
    };
  }, []);

  return {
    currentFeatures,
    isCalibrated,
    isPaused,
    togglePause,
    checkCalibrationStatus,
  };
}