// Thumbnails for an A/B/C test (render as stills at scale 2/3 -> 1280x720). No photos of Dave: the doodle caricature only.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Fonts, Paper, Svg, Guy, Ink, Box, Txt, Dave, Stamp, COL, HAND } from "../kit";

const Big: React.FC<{ x: number; y: number; size: number; col?: string; children: React.ReactNode; rot?: number }> = ({ x, y, size, col = COL.ink, children, rot = 0 }) => (
  <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col} transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
    stroke="#fffdf3" strokeWidth={size * 0.14} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{children}</text>
);

const Calculator: React.FC<{ x: number; y: number; s?: number; r?: number }> = ({ x, y, s = 1, r = -6 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <Box x={-330} y={-430} w={660} h={860} r={50} fill="#3b3f4a" seed={801} sw={10} />
    <Box x={-270} y={-370} w={540} h={230} r={20} fill="#cfe8c9" seed={802} sw={8} />
    <Txt x={0} y={-205} size={150} col={COL.red}>-$1,270</Txt>
    {Array.from({ length: 12 }, (_, i) => (
      <Box key={i} x={-270 + (i % 3) * 190} y={-90 + Math.floor(i / 3) * 125} w={160} h={100} r={18}
        fill={i === 11 ? COL.red : "#e8e6df"} seed={810 + i} sw={6} />
    ))}
  </g>
);

export const ThumbA: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f4efe3"><Svg>
    <Calculator x={560} y={560} s={1.08} />
    <Big x={1430} y={330} size={230}>MATH</Big>
    <Big x={1430} y={580} size={210} col={COL.red}>DOESN'T</Big>
    <Big x={1430} y={830} size={230}>WORK</Big>
  </Svg></Paper></AbsoluteFill>
);

export const ThumbB: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eef2f6"><Svg>
    <g transform="translate(300 160) rotate(-3)">
      <Box x={0} y={0} w={1320} h={560} r={36} fill={COL.paper} seed={820} sw={12} />
      <Big x={330} y={400} size={330}>2x</Big>
      <Big x={660} y={390} size={260} col={COL.red}>→</Big>
      <Big x={1000} y={400} size={330} col={COL.red}>6x</Big>
      <Txt x={660} y={510} size={56} font="PatrickHand" col="#4a4a55">home price vs. income, 1970s → now</Txt>
    </g>
    <Stamp t={100} at={0} x={1180} y={880} text="HIS OWN SHOW" size={120} r={-6} />
  </Svg></Paper></AbsoluteFill>
);

export const ThumbC: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f6efe6"><Svg>
    <Dave x={400} y={1150} s={1.5} arm="point" />
    <Guy x={1560} y={1230} s={1.25} pose="hold" expr="shock" bob={false} sign="-$1,270" />
    <Big x={1180} y={210} size={170} col={COL.red}>-$1,270/mo</Big>
    <Big x={1180} y={350} size={110}>HIS OWN RULE</Big>
  </Svg></Paper></AbsoluteFill>
);

// D + E (Nov 12): Daniel asked for the drawn Dave front and centre after A got no clicks.
// Caricature only, no words put in his mouth; the number is the cleared -$1,270/mo shortfall.
export const ThumbD: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f4efe3"><Svg>
    <Dave x={520} y={1560} s={2.3} arm="point" />
    <Big x={1400} y={300} size={170}>DAVE'S PLAN</Big>
    <Big x={1470} y={620} size={270} col={COL.red}>-$1,270</Big>
    <Big x={1400} y={860} size={170}>A MONTH</Big>
  </Svg></Paper></AbsoluteFill>
);

export const ThumbE: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eef2f6"><Svg>
    <Dave x={500} y={1560} s={2.3} arm="cash" />
    <Big x={1400} y={380} size={250}>STILL</Big>
    <Big x={1400} y={680} size={250} col={COL.red}>WORKS?</Big>
    <Stamp t={100} at={0} x={1500} y={930} text="2026 PAYCHECK" size={84} r={-4} />
  </Svg></Paper></AbsoluteFill>
);
