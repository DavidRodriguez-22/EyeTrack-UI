// src/components/EyeControl.tsx
import React from "react";
import { useCustomCursor } from "../hooks/useCustomCursor.ts";
import { useMediaPipeEyeTracking } from "../hooks/useMediaPipeEyeTracking.ts";

const EyeControl: React.FC = () => {
  useCustomCursor();
  useMediaPipeEyeTracking();
  return null;
};

export default EyeControl;
