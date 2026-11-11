// Shrinkflation thumbnails (generic packages only, no brands). Fable's picks:
// A (default) cereal box inside the dashed outline of its old size "SAME PRICE. SMALLER."; B shelf tag "READ THIS NUMBER"; C paper roll "WHERE'D IT GO?"
import React from "react";
import { AbsoluteFill } from "remotion";
import { Fonts, Paper, Svg, Ink, COL, HAND } from "../kit";
import { Prop } from "../scenes";

const Big: React.FC<{ x: number; y: number; size: number; col?: string; children: React.ReactNode }> = ({ x, y, size, col = COL.ink, children }) => (
  <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col}
    stroke="#fffdf3" strokeWidth={size * 0.14} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{children}</text>
);

export const ShrinkThumbA: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f4efe3"><Svg>
    <Prop kind="pack" x={560} y={1010} s={2.1} seed={990} label="CEREAL" ghost />
    <Big x={1400} y={450} size={160}>SAME PRICE.</Big>
    <Big x={1400} y={720} size={200} col={COL.red}>SMALLER.</Big>
  </Svg></Paper></AbsoluteFill>
);

export const ShrinkThumbB: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eef2f6"><Svg>
    <Prop kind="shelftag" x={640} y={600} s={2.0} seed={991} label="$$$" sub="unit price: per oz" />
    <Ink pts={[[160, 660], [700, 640], [760, 700], [180, 730], [150, 670]]} sw={10} col={COL.red} seed={992} />
    <Big x={1480} y={420} size={190}>READ</Big>
    <Big x={1480} y={640} size={190} col={COL.red}>THIS</Big>
    <Big x={1480} y={860} size={190}>NUMBER</Big>
  </Svg></Paper></AbsoluteFill>
);

export const ShrinkThumbC: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f3ecec"><Svg>
    <Prop kind="roll" x={560} y={900} s={2.2} seed={993} label="" />
    <Big x={1420} y={460} size={220}>WHERE'D</Big>
    <Big x={1420} y={730} size={240} col={COL.red}>IT GO?</Big>
  </Svg></Paper></AbsoluteFill>
);
