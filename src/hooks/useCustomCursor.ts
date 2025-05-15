import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    document.body.appendChild(cursor);

    const style = document.createElement("style");
    style.textContent = `
      #custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        background-color: blue;
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: top 0.05s linear, left 0.05s linear;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.body.removeChild(cursor);
    };
  }, []);
}

export function moveCustomCursor(x: number, y: number) {
  const cursor = document.getElementById("custom-cursor");
  if (cursor && isFinite(x) && isFinite(y)) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }
}
