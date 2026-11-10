import React from "react";
import { Composition } from "remotion";
import { RamseyHook, HOOK_FRAMES } from "./ramsey/Hook";
import { RamseyVoice, VOICE_FRAMES } from "./ramsey/Voice";

export const Root: React.FC = () => (
  <>
    <Composition id="RamseyHook" component={RamseyHook} durationInFrames={HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="RamseyVoice" component={RamseyVoice} durationInFrames={VOICE_FRAMES} fps={30} width={1920} height={1080} />
  </>
);
