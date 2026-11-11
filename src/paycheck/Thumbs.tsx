// Paycheck thumbnails. Fable's picks: A (default) bitten paycheck "61% GONE"; B long receipt "3 BILLS"; C mascot + sliver "WHAT'S LEFT?"
import React from "react";
import { AbsoluteFill } from "remotion";
import { Fonts, Paper, Svg, Guy, Box, Ink, Oval, Txt, COL, HAND } from "../kit";
import { Prop } from "../scenes";

const Big: React.FC<{ x: number; y: number; size: number; col?: string; children: React.ReactNode }> = ({ x, y, size, col = COL.ink, children }) => (
  <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col}
    stroke="#fffdf3" strokeWidth={size * 0.14} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{children}</text>
);
const BG = "#f4efe3";

// A: a paycheck with a big bite taken out of it
export const PaycheckThumbA: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone={BG}><Svg>
    <Prop kind="paycheck" x={560} y={560} s={2.0} seed={960} label="$64,064" />
    {[[1010, 330, 120], [1000, 470, 130], [1015, 610, 110], [1030, 740, 90]].map(([cx, cy, r], i) => <Oval key={i} cx={cx} cy={cy} rx={r} ry={r} fill={BG} seed={962 + i} sw={0} />)}
    <Big x={1500} y={480} size={300} col={COL.red}>61%</Big>
    <Big x={1500} y={760} size={260}>GONE</Big>
  </Svg></Paper></AbsoluteFill>
);

// B: a receipt unrolling past the frame
export const PaycheckThumbB: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#eef2f6"><Svg>
    <g transform="rotate(-6 560 540)">
      <Box x={380} y={-60} w={360} h={1200} r={8} fill={COL.paper} seed={970} sw={9} />
      {["RENT", "CHILD CARE", "HEALTH"].map((t, i) => <g key={t}><Txt x={560} y={260 + i * 170} size={56}>{t}</Txt>
        <Ink pts={[[420, 300 + i * 170], [700, 302 + i * 170]]} sw={4} col="#999" seed={971 + i} /></g>)}
      <Txt x={560} y={820} size={70} col={COL.red}>~61%</Txt>
    </g>
    <Big x={1400} y={470} size={300} col={COL.red}>3</Big>
    <Big x={1400} y={760} size={260}>BILLS</Big>
  </Svg></Paper></AbsoluteFill>
);

// C: the mascot holding what's left
export const PaycheckThumbC: React.FC = () => (
  <AbsoluteFill><Fonts /><Paper tone="#f3ecec"><Svg>
    <Guy x={520} y={1120} s={1.15} pose="shrug" expr="defeated" bob={false} />
    <g transform="translate(860 300) rotate(12)"><Box x={0} y={0} w={170} h={110} r={8} fill="#e7f4e4" seed={980} sw={7} /><Txt x={85} y={72} size={44} col={COL.green}>$</Txt></g>
    <Big x={1430} y={460} size={240}>WHAT'S</Big>
    <Big x={1430} y={740} size={270} col={COL.red}>LEFT?</Big>
  </Svg></Paper></AbsoluteFill>
);
