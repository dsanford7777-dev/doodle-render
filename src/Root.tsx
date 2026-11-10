import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { RamseyHook, HOOK_FRAMES } from "./ramsey/Hook";
import { RamseyMath, MATH_FRAMES } from "./ramsey/Math";
import { RamseyVoice, VOICE_FRAMES } from "./ramsey/Voice";

// the animated opening so far: hook, then straight into the maths
const RamseyOpening: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={HOOK_FRAMES}><RamseyHook /></Sequence>
    <Sequence from={HOOK_FRAMES} durationInFrames={MATH_FRAMES}><RamseyMath /></Sequence>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="RamseyHook" component={RamseyHook} durationInFrames={HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="RamseyMath" component={RamseyMath} durationInFrames={MATH_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="RamseyOpening" component={RamseyOpening} durationInFrames={HOOK_FRAMES + MATH_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="RamseyVoice" component={RamseyVoice} durationInFrames={VOICE_FRAMES} fps={30} width={1920} height={1080} />
  </>
);
