import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    if (document.getElementById("custom-cursor-container")) return;

    const container = document.createElement("div");
    container.id = "custom-cursor-container";

    container.innerHTML = `
      <div id="custom-cursor">
        <div id="custom-cursor-progress"></div>
      </div>
    `;
    document.body.appendChild(container);

    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.textContent = `
      #custom-cursor-container {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: transform 0.05s ease-out;
      }
      #custom-cursor {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: rgba(0, 122, 255, 0.35);
        border: 3px solid #007aff;
        box-shadow: 0 0 15px rgba(0, 122, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      #custom-cursor-progress {
        width: 0%;
        height: 0%;
        border-radius: 50%;
        background-color: #34c759;
        transition: width 0.1s linear, height 0.1s linear;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingContainer = document.getElementById("custom-cursor-container");
      const existingStyles = document.getElementById("custom-cursor-styles");
      if (existingContainer) document.body.removeChild(existingContainer);
      if (existingStyles) document.head.removeChild(existingStyles);
    };
  }, []);
}

export function moveCustomCursor(x: number, y: number) {
  const container = document.getElementById("custom-cursor-container");
  if (container && isFinite(x) && isFinite(y)) {
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
  }
}

export function updateDwellProgress(percentage: number) {
  const progress = document.getElementById("custom-cursor-progress");
  if (progress) {
    progress.style.width = `${percentage}%`;
    progress.style.height = `${percentage}%`;
  }
}