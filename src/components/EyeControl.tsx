// src/components/EyeControl.tsx
import React from "react";
import { useCustomCursor } from "../hooks/useCustomCursor";
import { useMediaPipeEyeTracking } from "../hooks/useMediaPipeEyeTracking";

const EyeControl: React.FC = () => {
  useCustomCursor();
  useMediaPipeEyeTracking();
  return null;
};

export default EyeControl;
