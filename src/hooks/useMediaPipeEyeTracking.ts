import { useEffect, useRef } from "react";
import { FaceMesh, Results } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { moveCustomCursor } from "./useCustomCursor.ts";

export function useMediaPipeEyeTracking() {
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const inactivityTimerRef = useRef<number | null>(null);
  const isInDeadZoneRef = useRef(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.style.display = "none";
    video.autoplay = true;
    video.playsInline = true;
    document.body.appendChild(video);

    //Importacion de archivo wasm para evitar errores
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        if (file === 'face_mesh_solution_simd_wasm_bin.js' || 
            file === 'face_mesh_solution_simd_wasm_bin.wasm') {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    function updateCursorLoop() {
      const { vx, vy } = velocityRef.current;

      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        cursorRef.current.x += vx;
        cursorRef.current.y += vy;

        cursorRef.current.x = Math.max(0, Math.min(window.innerWidth, cursorRef.current.x));
        cursorRef.current.y = Math.max(0, Math.min(window.innerHeight, cursorRef.current.y));

        moveCustomCursor(cursorRef.current.x, cursorRef.current.y);
        
        // Resetear el timer si hay movimiento
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
          inactivityTimerRef.current = null;
        }
        isInDeadZoneRef.current = false;
      }

      requestAnimationFrame(updateCursorLoop);
    }
    requestAnimationFrame(updateCursorLoop);

    function triggerClick() {
      const element = document.elementFromPoint(cursorRef.current.x, cursorRef.current.y);
      if (element) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(clickEvent);
      }
    }

    faceMesh.onResults(onResults);

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
        const camera = new Camera(video, {
          onFrame: async () => {
            await faceMesh.send({ image: video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      } catch (err) {
        console.error("No se pudo acceder a la cámara:", err);
      }
    };
    startCamera();

    function onResults(results: Results) {
      if (!results.multiFaceLandmarks?.length) return;
      const landmarks = results.multiFaceLandmarks[0];

      const iris = landmarks[468];
      const left = landmarks[133];
      const right = landmarks[33]; 
      const top = landmarks[159];
      const bottom = landmarks[145];

      const eyeWidth = right.x - left.x;
      const eyeHeight = bottom.y - top.y;

      const relativeX = (iris.x - left.x) / eyeWidth;
      const relativeY = (iris.y - top.y) / eyeHeight;

      const centerX = 0.5;
      const centerY = 0.5; 

      const deadZone = 0.1;
      const speedFactor = 30;

      let deltaX = relativeX - centerX;
      let deltaY = relativeY - centerY;

      const isInDeadZone = Math.abs(deltaX) < deadZone && Math.abs(deltaY) < deadZone;

      if (isInDeadZone) {
        if (!isInDeadZoneRef.current) {
          // Acabamos de entrar en la zona muerta
          isInDeadZoneRef.current = true;
          inactivityTimerRef.current = window.setTimeout(() => {
            triggerClick();
          }, 2000);
        }
      } else {
        // Salimos de la zona muerta
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
          inactivityTimerRef.current = null;
        }
        isInDeadZoneRef.current = false;
      }

      // Si esta dentro de la zona muerta, no mover el mouse
      if (Math.abs(deltaX) < deadZone) deltaX = 0;
      if (Math.abs(deltaY) < deadZone) deltaY = 0;

      // Ajuste de la velocidad de movimiento
      velocityRef.current = {
        vx: deltaX * speedFactor,
        vy: deltaY * speedFactor,
      };
    }

    return () => {
      faceMesh.close();
      document.body.removeChild(video);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);
}