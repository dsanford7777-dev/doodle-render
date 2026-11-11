// Age-40 thumbnails (render as stills at scale 2/3 -> 1280x720). No real people drawn.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Fonts, Paper, Svg, Guy, Ink, Box, Txt, Stamp, COL, HAND } from "../kit";
import { Prop } from "../scenes";

const Big: React.FC<{ x: number; y: number; size: number; col?: string; children: React.ReactNode; rot?: number }> = ({ x, y, size, col = COL.ink, children, rot = 0 }) => (
  <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
    stroke="#fffdf3" strokeWidth={size * 0.14} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{children}</text>
);

// A: the scoreboard 29 -> 40
export const Age40ThumbA: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f4efe3"><Svg>
    <g transform="translate(160 170) rotate(-3)">
      <Box x={0} y={0} w={1080} h={560} r={36} fill={COL.paper} seed={900} sw={12} />
      <Big x={250} y={400} size={300}>29</Big>
      <Big x={540} y={380} size={230} col={COL.red}>→</Big>
      <Big x={830} y={400} size={330} col={COL.red}>40</Big>
      <Txt x={540} y={510} size={54} font="PatrickHand" col="#4a4a55">first-time home buyer age, 1981 → now</Txt>
    </g>
    <Guy x={1560} y={1150} s={1.15} pose="shrug" expr="shock" bob={false} />
    <Stamp t={100} at={0} x={760} y={900} text="RECORD HIGH" size={110} r={-5} />
  </Svg></Paper></AbsoluteFill>
);

// B: "40" + "MILLENNIALS DIDN'T FAIL"
export const Age40ThumbB: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eef2f6"><Svg>
    <Prop kind="house" x={480} y={820} s={1.7} seed={910} />
    <Big x={480} y={380} size={360} col={COL.red}>40</Big>
    <Big x={1350} y={360} size={170}>MILLENNIALS</Big>
    <Big x={1350} y={560} size={190} col={COL.red}>DIDN'T</Big>
    <Big x={1350} y={770} size={190}>FAIL</Big>
  </Svg></Paper></AbsoluteFill>
);

// C: the avocado vs the house
export const Age40ThumbC: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f6efe6"><Svg>
    <Prop kind="avocado" x={430} y={760} s={2.0} seed={920} />
    <Ink pts={[[230, 300], [640, 820]]} sw={22} col={COL.red} seed={921} />
    <Ink pts={[[640, 300], [230, 820]]} sw={22} col={COL.red} seed={922} />
    <Big x={1330} y={330} size={160}>IT WAS</Big>
    <Big x={1330} y={530} size={180} col={COL.red}>NEVER THE</Big>
    <Big x={1330} y={740} size={180}>AVOCADO</Big>
  </Svg></Paper></AbsoluteFill>
);
