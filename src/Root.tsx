import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { RamseyHook, HOOK_FRAMES } from "./ramsey/Hook";
import { RamseyMath, MATH_FRAMES } from "./ramsey/Math";
import { RamseyVoice, VOICE_FRAMES } from "./ramsey/Voice";
import { RamseyFull, FULL_FRAMES } from "./ramsey/Full";
import { ThumbA, ThumbB, ThumbC, ThumbD, ThumbE } from "./ramsey/Thumbs";
import { Age40, AGE40_FRAMES } from "./age40/Age40";
import { Age40ThumbA, Age40ThumbB, Age40ThumbC } from "./age40/Thumbs";
import { America, AMERICA_FRAMES } from "./america/America";
import { AmericaThumbA, AmericaThumbB, AmericaThumbC } from "./america/Thumbs";
import { Paycheck, PAYCHECK_FRAMES } from "./paycheck/Paycheck";
import { PaycheckThumbA, PaycheckThumbB, PaycheckThumbC } from "./paycheck/Thumbs";
import { Shrink, SHRINK_FRAMES } from "./shrink/Shrink";
import { Paycheck2, PAYCHECK2_FRAMES } from "./paycheck2/Paycheck2";
import { ShrinkThumbA, ShrinkThumbB, ShrinkThumbC } from "./shrink/Thumbs";

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
    <Composition id="RamseyFull" component={RamseyFull} durationInFrames={FULL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="RamseyThumbA" component={ThumbA} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RamseyThumbB" component={ThumbB} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RamseyThumbC" component={ThumbC} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RamseyThumbD" component={ThumbD} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RamseyThumbE" component={ThumbE} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="RamseyVoice" component={RamseyVoice} durationInFrames={VOICE_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="Age40Full" component={Age40} durationInFrames={AGE40_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="Age40ThumbA" component={Age40ThumbA} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="Age40ThumbB" component={Age40ThumbB} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="Age40ThumbC" component={Age40ThumbC} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="AmericaFull" component={America} durationInFrames={AMERICA_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="AmericaThumbA" component={AmericaThumbA} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="AmericaThumbB" component={AmericaThumbB} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="AmericaThumbC" component={AmericaThumbC} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="PaycheckFull" component={Paycheck} durationInFrames={PAYCHECK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="PaycheckThumbA" component={PaycheckThumbA} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="PaycheckThumbB" component={PaycheckThumbB} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="PaycheckThumbC" component={PaycheckThumbC} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="ShrinkFull" component={Shrink} durationInFrames={SHRINK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="ShrinkThumbA" component={ShrinkThumbA} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="ShrinkThumbB" component={ShrinkThumbB} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="ShrinkThumbC" component={ShrinkThumbC} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="Paycheck2Full" component={Paycheck2} durationInFrames={PAYCHECK2_FRAMES} fps={30} width={1920} height={1080} />
  </>
);
