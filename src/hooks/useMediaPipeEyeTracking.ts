import { useEffect, useRef } from "react";
import { FaceMesh, Results } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { moveCustomCursor } from "./useCustomCursor";

export function useMediaPipeEyeTracking() {
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const video = document.createElement("video");
    video.style.display = "none";
    video.autoplay = true;
    video.playsInline = true;
    document.body.appendChild(video);

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
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
      }

      requestAnimationFrame(updateCursorLoop);
    }
    requestAnimationFrame(updateCursorLoop);

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
      const top = landmarks[159]; //párpado superior
      const bottom = landmarks[145]; //párpado inferior

      const eyeWidth = right.x - left.x;
      const eyeHeight = bottom.y - top.y;

      const relativeX = (iris.x - left.x) / eyeWidth;
      const relativeY = (iris.y - top.y) / eyeHeight;

      const centerX = 0.5;
      const centerY = 0.5; 

      const deadZone = 0.1; //Zona muerta para evitar movimientos por accidente
      const speedFactor = 30; //Velocidad de movimiento en X y Y

      let deltaX = relativeX - centerX;
      let deltaY = relativeY - centerY;

      //Si esta dentro de la zona muerta, no mover el mouse
      if (Math.abs(deltaX) < deadZone) deltaX = 0;
      if (Math.abs(deltaY) < deadZone) deltaY = 0;

      //Ajuste de la velocidad de movimiento
      velocityRef.current = {
        vx: deltaX * speedFactor,
        vy: deltaY * speedFactor,
      };
    }

    return () => {
      faceMesh.close();
      document.body.removeChild(video);
    };
  }, []);
}
