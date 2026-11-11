// America thumbnails (render as stills; 1920x1080 -> scaled to 1280x720 on upload). No real people drawn.
// Fable's picks: A (default) house in a hard hat + "2 EXTRA YEARS"; B paycheck + "FLAT SINCE 1979"; C house + "4.5 → 6.3 YEARS".
import React from "react";
import { AbsoluteFill } from "remotion";
import { Fonts, Paper, Svg, COL, HAND } from "../kit";
import { Prop } from "../scenes";

const Big: React.FC<{ x: number; y: number; size: number; col?: string; children: React.ReactNode; rot?: number }> = ({ x, y, size, col = COL.ink, children, rot = 0 }) => (
  <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
    stroke="#fffdf3" strokeWidth={size * 0.14} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{children}</text>
);

// A: a house wearing a hard hat, "2 EXTRA YEARS"
export const AmericaThumbA: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f4efe3"><Svg>
    <Prop kind="house" x={540} y={1030} s={1.8} seed={930} />
    <Prop kind="hardhat" x={540} y={400} s={1.8} seed={931} />
    <Big x={1430} y={450} size={250} col={COL.red}>2 EXTRA</Big>
    <Big x={1430} y={740} size={270}>YEARS</Big>
  </Svg></Paper></AbsoluteFill>
);

// B: the paycheck that stood still
export const AmericaThumbB: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eaf3e6"><Svg>
    <Prop kind="paycheck" x={560} y={560} s={2.0} seed={940} label="$6.70/hr" />
    <Big x={1430} y={380} size={230}>FLAT</Big>
    <Big x={1430} y={600} size={190} col={COL.red}>SINCE</Big>
    <Big x={1430} y={830} size={230} col={COL.red}>1979</Big>
  </Svg></Paper></AbsoluteFill>
);

// C: the house, 4.5 -> 6.3 years (duplicates the title, test variant only)
export const AmericaThumbC: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f3ecec"><Svg>
    <Prop kind="house" x={520} y={960} s={2.0} seed={950} />
    <Big x={1330} y={430} size={200}>4.5 → <tspan fill={COL.red}>6.3</tspan></Big>
    <Big x={1330} y={700} size={240} col={COL.red}>YEARS</Big>
  </Svg></Paper></AbsoluteFill>
);
