// The whole edited narration on a blank frame: for checking the edit (cuts, holds, reorder) by ear.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Fonts, Captions, Narration } from "../kit";
import { TL, NARRATION } from "./edit";

const LINES = TL.lines();
export const VOICE_FRAMES = TL.totalFrames;
export const RamseyVoice: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#1f345c" }}>
      <Fonts />
      <Captions t={f} lines={LINES} />
      <Narration src={NARRATION} slices={TL.slices} />
    </AbsoluteFill>
  );
};
