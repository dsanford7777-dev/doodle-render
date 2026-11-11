// The whole video: hook + maths (hand-built) + the rest (data-driven shots), one narration track.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Fonts, Captions, Narration } from "../kit";
import { TL, NARRATION } from "./edit";
import { RamseyHook, HOOK_FRAMES } from "./Hook";
import { RamseyMath, MATH_FRAMES } from "./Math";
import { REST_SHOTS, REST_LINES, REST_HI } from "./Rest";
import { ShotsTrack } from "../scenes";

const MATH_END = HOOK_FRAMES + MATH_FRAMES;
// close any gap between the maths and the first "rest" shot
const SHOTS = REST_SHOTS.map((s, i) => (i === 0 ? { ...s, a: Math.min(s.a, MATH_END) } : s));
export const FULL_FRAMES = SHOTS[SHOTS.length - 1].b;

export const RamseyFull: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <Sequence from={0} durationInFrames={HOOK_FRAMES}><RamseyHook /></Sequence>
      <Sequence from={HOOK_FRAMES} durationInFrames={MATH_FRAMES}><RamseyMath /></Sequence>
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={REST_LINES} hi={REST_HI} />
      <Narration src={NARRATION} slices={TL.slices.filter((x) => x.from >= MATH_END)} />
    </AbsoluteFill>
  );
};
