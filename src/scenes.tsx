// Data-driven scenes: a shot is a list of items, each tied to the narration word it appears on.
// Used for everything after the maths section.
import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import {
  Paper, Cam, Svg, Guy, Ink, Box, Oval, Txt, PopG, Stamp, QuoteCard, Tag, BigNum, Swarm, Icon, Bubble, Dash, Dave, Sfx,
  COL, KEY, HAND2, k, ease, easeOut, lerp, money, clamp01,
} from "./kit";

export type Item = { k: string; w?: string; [key: string]: any };
export type ShotSpec = { at: string; tone?: string; zoom?: number; dx?: number; items: Item[] };
export type Shot = ShotSpec & { a: number; b: number; i0: number; tl: any };

const startOf = (TL: any, phrase: string, after: number) => {
  const i = TL.find(phrase, after);
  if (i < 0) throw new Error("phrase not found: " + phrase);
  return i;
};

/** resolve shot specs into absolute frames: each shot runs from its phrase to the next shot's phrase */
export function resolveShots(TL: any, specs: ShotSpec[], afterIdx: number, endFrame: number): Shot[] {
  let cur = afterIdx;
  const idxs = specs.map((s) => { cur = startOf(TL, s.at, cur); return cur++; });
  const out = specs.map((s, n) => ({
    ...s, i0: idxs[n], tl: TL,
    a: TL.startF(idxs[n]) - 4,
    b: n + 1 < specs.length ? TL.startF(idxs[n + 1]) - 4 : endFrame,
  }));
  // validate every item phrase now, so a typo fails the build instead of silently showing nothing
  out.forEach((s) => s.items.forEach((it) => { for (const w of [it.w, it.split, it.prod, it.pay, it.until, it.cross, it.drop, ...(it.items ?? []).map((x: any) => x.w), ...(it.bars ?? []).map((x: any) => x.w), ...(it.points ?? []).map((x: any) => x.w), ...((it.poses ?? it.arms ?? []).map((x: any) => x[0]))]) if (w) startOf(TL, w, s.i0); }));
  return out;
}

/** absolute frame of an item phrase inside a shot (or shot start + 6) */
const when = (s: Shot, w?: string, plus = 0) => (w ? s.tl.startF(startOf(s.tl, w, s.i0)) : s.a + 8) + plus;

// ── props ────────────────────────────────────────────────────────────────────────────────────────
export const Prop: React.FC<{ kind: string; x: number; y: number; s?: number; seed?: number; label?: string }> = ({ kind, x, y, s = 1, seed = 400, label }) => {
  const P = (() => {
    switch (kind) {
      case "house": return (<g>
        <Box x={-160} y={-220} w={320} h={220} r={8} fill="#f4d9a8" seed={seed} />
        <Ink pts={[[-195, -212], [0, -370], [195, -212]]} closed fill={COL.red} seed={seed + 1} />
        <Box x={-34} y={-120} w={68} h={120} r={6} fill="#8a5a3a" seed={seed + 2} sw={5} />
        <Box x={-130} y={-180} w={70} h={60} r={6} fill="#bfe3f2" seed={seed + 3} sw={5} />
        <Box x={60} y={-180} w={70} h={60} r={6} fill="#bfe3f2" seed={seed + 4} sw={5} /></g>);
      case "fixer": return (<g>
        <Box x={-160} y={-220} w={320} h={220} r={8} fill="#cdbb9a" seed={seed} />
        <Ink pts={[[-195, -212], [-40, -340], [10, -300], [195, -212]]} closed fill="#8c4b4b" seed={seed + 1} />
        <Ink pts={[[-120, -170], [-40, -120]]} sw={14} col="#8a5a3a" seed={seed + 2} />
        <Ink pts={[[-120, -120], [-40, -170]]} sw={14} col="#8a5a3a" seed={seed + 3} />
        <Ink pts={[[60, -60], [100, -150], [130, -80]]} sw={5} seed={seed + 4} /></g>);
      case "lot": return (<g>
        <Ink pts={[[-200, 0], [200, 2]]} sw={6} seed={seed} />
        <Ink pts={[[-90, 0], [-90, -150]]} sw={7} seed={seed + 1} />
        <Box x={-160} y={-230} w={150} h={90} r={6} fill="#fff" seed={seed + 2} sw={5} />
        <Txt x={-85} y={-172} size={34}>SOLD</Txt></g>);
      case "road": return (<g>
        <Ink pts={[[-220, 0], [-40, -260], [40, -260], [220, 0]]} closed fill="#9a9a9a" seed={seed} />
        <Ink pts={[[0, -20], [0, -70]]} sw={8} col="#fff" seed={seed + 1} /><Ink pts={[[0, -120], [0, -160]]} sw={7} col="#fff" seed={seed + 2} />
        <Prop kind="car" x={-60} y={-10} s={0.6} seed={seed + 3} /></g>);
      case "car": return (<g>
        <Ink pts={[[-120, -40], [-90, -100], [70, -100], [110, -40]]} closed fill="#5b8bd6" seed={seed} />
        <Box x={-150} y={-50} w={300} h={60} r={14} fill="#5b8bd6" seed={seed + 1} />
        <Oval cx={-85} cy={12} rx={30} ry={30} fill="#333" seed={seed + 2} sw={5} />
        <Oval cx={85} cy={12} rx={30} ry={30} fill="#333" seed={seed + 3} sw={5} /></g>);
      case "card": return (<g>
        <Box x={-140} y={-90} w={280} h={180} r={18} fill="#6b5bd6" seed={seed} />
        <Box x={-110} y={-50} w={60} h={44} r={6} fill={KEY} seed={seed + 1} sw={4} />
        <Txt x={20} y={60} size={34} col="#fff">•••• 4417</Txt></g>);
      case "loan": return (<g>
        <Box x={-110} y={-140} w={220} h={280} r={10} fill={COL.paper} seed={seed} />
        <Txt x={0} y={-80} size={36}>LOAN</Txt>
        <Ink pts={[[-70, -30], [70, -28]]} sw={4} col="#999" seed={seed + 1} /><Ink pts={[[-70, 10], [50, 12]]} sw={4} col="#999" seed={seed + 2} />
        <Ink pts={[[-140, -150], [0, -200], [140, -150], [0, -110]]} closed fill="#333" seed={seed + 3} sw={5} /></g>);
      case "bank": return (<g>
        <Ink pts={[[-170, -200], [0, -300], [170, -200]]} closed fill="#d9d4c7" seed={seed} />
        {[-120, -40, 40, 120].map((cx, i) => <Box key={i} x={cx - 18} y={-200} w={36} h={170} r={4} fill="#ece7da" seed={seed + 2 + i} sw={5} />)}
        <Box x={-190} y={-30} w={380} h={30} r={4} fill="#d9d4c7" seed={seed + 8} /></g>);
      case "capitol": return (<g>
        <Box x={-200} y={-120} w={400} h={120} r={6} fill="#efece4" seed={seed} />
        <Box x={-80} y={-200} w={160} h={80} r={6} fill="#efece4" seed={seed + 1} />
        <Ink pts={[[-90, -200], [-80, -270], [-40, -320], [0, -332], [40, -320], [80, -270], [90, -200]]} closed fill="#efece4" seed={seed + 2} />
        <Ink pts={[[0, -332], [0, -380]]} sw={7} seed={seed + 3} /></g>);
      case "fed": return (<g>
        <Box x={-190} y={-180} w={380} h={180} r={6} fill="#e3e8ee" seed={seed} />
        <Ink pts={[[-210, -180], [0, -250], [210, -180]]} closed fill="#c9d2dc" seed={seed + 1} />
        {[-130, -65, 0, 65, 130].map((cx, i) => <Ink key={i} pts={[[cx, -160], [cx, -20]]} sw={10} col="#b3bdc9" seed={seed + 3 + i} />)}</g>);
      case "mic": return (<g>
        <Box x={-50} y={-240} w={100} h={170} r={50} fill="#555a66" seed={seed} />
        <Ink pts={[[-80, -140], [-80, -60], [0, -20], [80, -60], [80, -140]]} sw={8} seed={seed + 1} />
        <Ink pts={[[0, -20], [0, 40]]} sw={9} seed={seed + 2} /><Ink pts={[[-60, 40], [60, 40]]} sw={9} seed={seed + 3} />
        <g transform="translate(140 -250)"><Box x={0} y={0} w={170} h={64} r={12} fill={COL.red} seed={seed + 4} sw={5} /><Txt x={85} y={46} size={36} col="#fff">ON AIR</Txt></g></g>);
      case "phone": return (<g>
        <Box x={-110} y={-210} w={220} h={420} r={30} fill="#2b2e36" seed={seed} />
        <Box x={-90} y={-170} w={180} h={320} r={14} fill="#dfe9f5" seed={seed + 1} sw={4} />
        <Oval cx={0} cy={-70} rx={44} ry={44} fill="#b7c4d6" seed={seed + 2} sw={5} />
        <Ink pts={[[-60, 40], [-50, -10], [50, -10], [60, 40]]} closed fill="#b7c4d6" seed={seed + 3} sw={5} /></g>);
      case "apartment": return (<g>
        <Box x={-170} y={-420} w={340} h={420} r={8} fill="#d8c3a5" seed={seed} />
        {Array.from({ length: 9 }, (_, i) => <Box key={i} x={-130 + (i % 3) * 95} y={-380 + Math.floor(i / 3) * 110} w={70} h={70} r={5} fill="#bfe3f2" seed={seed + 2 + i} sw={4} />)}
        <g transform="translate(140 -120) rotate(6)"><Box x={0} y={0} w={190} h={80} r={8} fill="#fff" seed={seed + 20} sw={5} /><Txt x={95} y={56} size={38} col={COL.red}>FOR RENT</Txt></g></g>);
      case "door": return (<g>
        <Box x={-130} y={-420} w={260} h={420} r={10} fill="#8a5a3a" seed={seed} sw={8} />
        <Box x={-90} y={-370} w={180} h={150} r={8} fill="#a06c46" seed={seed + 1} sw={5} />
        <Box x={-90} y={-190} w={180} h={150} r={8} fill="#a06c46" seed={seed + 2} sw={5} />
        <Oval cx={90} cy={-200} rx={14} ry={14} fill={KEY} seed={seed + 3} sw={4} /></g>);
      case "lock": return (<g>
        <Ink pts={[[-50, -80], [-50, -140], [0, -175], [50, -140], [50, -80]]} sw={14} col="#888" seed={seed} />
        <Box x={-80} y={-90} w={160} h={130} r={14} fill={KEY} seed={seed + 1} />
        <Oval cx={0} cy={-35} rx={12} ry={12} fill={COL.ink} seed={seed + 2} sw={2} /></g>);
      case "printer": return (<g>
        <Box x={-170} y={-200} w={340} h={170} r={14} fill="#c9ced8" seed={seed} />
        <Box x={-120} y={-250} w={240} h={60} r={6} fill="#fff" seed={seed + 1} sw={5} />
        <Oval cx={120} cy={-150} rx={14} ry={14} fill={COL.green} seed={seed + 2} sw={4} />
        <Box x={-140} y={-40} w={280} h={20} r={6} fill="#555" seed={seed + 3} sw={4} /></g>);
      case "dial": return (<g>
        <Ink pts={Array.from({ length: 21 }, (_, i) => [Math.cos(Math.PI + (i / 20) * Math.PI) * 170, Math.sin(Math.PI + (i / 20) * Math.PI) * 170])} sw={10} seed={seed} />
        <Txt x={-170} y={40} size={34}>0%</Txt><Txt x={170} y={40} size={34}>high</Txt></g>);
      case "press": return (<g>
        <Box x={-80} y={-260} w={160} h={240} r={14} fill="rgba(200,230,255,0.6)" seed={seed} />
        <Box x={-70} y={-150} w={140} h={120} r={8} fill="#6b4226" seed={seed + 1} sw={4} />
        <Ink pts={[[0, -260], [0, -330]]} sw={10} seed={seed + 2} /><Ink pts={[[-40, -330], [40, -330]]} sw={10} seed={seed + 3} />
        <Ink pts={[[80, -220], [130, -200], [130, -90], [80, -70]]} sw={10} seed={seed + 4} /></g>);
      case "jar": return (<g>
        <Ink pts={[[-110, -260], [-120, -20], [-90, 0], [90, 0], [120, -20], [110, -260]]} closed fill="rgba(200,230,255,0.55)" seed={seed} />
        <Box x={-120} y={-290} w={240} h={36} r={8} fill="#888" seed={seed + 1} sw={5} />
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} kind="coin" x={-50 + (i % 3) * 50} y={-40 - Math.floor(i / 3) * 50 - (i % 2) * 10} s={0.8} seed={seed + 5 + i} />)}</g>);
      case "daycare": return (<g>
        <Box x={-200} y={-240} w={400} h={240} r={10} fill="#ffe1a8" seed={seed} />
        <Ink pts={[[-230, -230], [0, -360], [230, -230]]} closed fill="#5bb0d6" seed={seed + 1} />
        {["A", "B", "C"].map((l, i) => <g key={l}><Box x={-150 + i * 105} y={-170} w={80} h={80} r={8} fill={[COL.red, COL.green, KEY][i]} seed={seed + 2 + i} sw={5} /><Txt x={-110 + i * 105} y={-112} size={52} col="#fff">{l}</Txt></g>)}</g>);
      case "health": return (<g>
        <Box x={-200} y={-130} w={400} h={260} r={18} fill="#fff" seed={seed} />
        <Box x={-200} y={-130} w={400} h={70} r={18} fill="#3c8dde" seed={seed + 1} />
        <Txt x={0} y={-82} size={40} col="#fff">FAMILY HEALTH PLAN</Txt>
        <Box x={-40} y={-30} w={80} h={120} r={6} fill={COL.red} seed={seed + 2} sw={4} /><Box x={-80} y={10} w={160} h={40} r={6} fill={COL.red} seed={seed + 3} sw={4} /></g>);
      case "coffee": return (<g>
        <Ink pts={[[-70, -180], [-55, 0], [55, 0], [70, -180]]} closed fill="#fff" seed={seed} />
        <Box x={-80} y={-200} w={160} h={30} r={8} fill="#6b4226" seed={seed + 1} sw={5} />
        <Box x={-62} y={-130} w={124} h={60} r={6} fill="#c79a6b" seed={seed + 2} sw={4} /></g>);
      case "receipt": return (<g>
        <Box x={-110} y={-160} w={220} h={320} r={6} fill={COL.paper} seed={seed} />
        {[0, 1, 2, 3].map((i) => <Ink key={i} pts={[[-70, -100 + i * 45], [60 - i * 12, -98 + i * 45]]} sw={4} col="#999" seed={seed + 1 + i} />)}
        <Txt x={0} y={120} size={40} col={COL.red}>{label ?? ""}</Txt></g>);
      case "sheet": return (<g>
        <Box x={-150} y={-200} w={300} h={400} r={8} fill="#fff" seed={seed} />
        <Txt x={0} y={-140} size={34}>BUDGET</Txt>
        {Array.from({ length: 6 }, (_, i) => <g key={i}><Ink pts={[[-110, -90 + i * 50], [110, -88 + i * 50]]} sw={3} col="#aaa" seed={seed + 1 + i} /></g>)}</g>);
      case "ticket": return (<g>
        <Box x={-190} y={-80} w={380} h={160} r={16} fill={KEY} seed={seed} />
        <Ink pts={[[-120, -80], [-120, 80]]} sw={4} col={COL.ink} seed={seed + 1} />
        <Txt x={40} y={20} size={56}>FREE PASS</Txt></g>);
      case "grade": return (<g>
        <Box x={-170} y={-220} w={340} h={440} r={8} fill="#fff" seed={seed} />
        <Txt x={0} y={-150} size={36}>REPORT CARD</Txt>
        {Array.from({ length: 4 }, (_, i) => <Ink key={i} pts={[[-120, -90 + i * 50], [120, -88 + i * 50]]} sw={3} col="#aaa" seed={seed + 1 + i} />)}
        <Oval cx={0} cy={140} rx={70} ry={60} fill="none" seed={seed + 9} sw={7} />
        <Txt x={0} y={170} size={100} col={COL.red}>F</Txt></g>);
      case "fork": return (<g>
        <Ink pts={[[0, 0], [0, -150]]} sw={14} col="#8a5a3a" seed={seed} />
        <Ink pts={[[-220, -340], [0, -150], [220, -340]]} sw={60} col="#c9c2b2" seed={seed + 1} /></g>);
      case "clock": return (<g>
        <Oval cx={0} cy={-100} rx={100} ry={100} fill="#fff" seed={seed} />
        <Ink pts={[[0, -100], [0, -170]]} sw={8} seed={seed + 1} /><Ink pts={[[0, -100], [50, -80]]} sw={8} seed={seed + 2} /></g>);
      case "cap": return (<g>
        <Ink pts={[[-150, -90], [0, -150], [150, -90], [0, -30]]} closed fill="#333" seed={seed} />
        <Ink pts={[[-80, -60], [-80, 0], [80, 0], [80, -60]]} sw={8} seed={seed + 1} />
        <Ink pts={[[120, -90], [130, 0]]} sw={5} col={KEY} seed={seed + 2} /></g>);
      case "chart_up": return (<g>
        <Ink pts={[[-180, 0], [180, 0]]} sw={6} seed={seed} /><Ink pts={[[-180, 0], [-180, -260]]} sw={6} seed={seed + 1} />
        <Ink pts={[[-160, -30], [-80, -70], [0, -60], [80, -150], [160, -220]]} sw={10} col={COL.green} seed={seed + 2} /></g>);
      case "subscribe": return (<g>
        <Box x={-230} y={-60} w={460} h={120} r={60} fill={COL.red} seed={seed} />
        <Txt x={0} y={22} size={64} col="#fff">SUBSCRIBE</Txt></g>);
      case "thumb": return (<g>
        {/* "like" badge: a fist on its side with the thumb up at the left, knuckles on the right */}
        <Oval cx={0} cy={0} rx={170} ry={170} fill="#ffffff" seed={seed} sw={8} />
        <Box x={-30} y={-150} w={56} h={130} r={28} fill={COL.skin} seed={seed + 1} sw={7} />
        <Box x={-70} y={-40} w={150} h={140} r={26} fill={COL.skin} seed={seed + 2} sw={7} />
        {[-5, 30, 65].map((yy, i) => <Ink key={i} pts={[[20, yy], [78, yy + 2]]} sw={6} seed={seed + 3 + i} />)}
        <Box x={-125} y={-48} w={50} h={156} r={10} fill={COL.navy} seed={seed + 8} sw={7} /></g>);
      case "comment": return (<g>
        <Oval cx={-330} cy={-30} rx={44} ry={44} fill="#b7c4d6" seed={seed} sw={5} />
        <Box x={-270} y={-90} w={640} h={150} r={22} fill="#fff" seed={seed + 1} sw={6} /></g>);
      case "avocado": return (<g>
        <Ink pts={[[-150, -30], [150, -30], [130, 20], [-130, 20]]} closed fill="#d9a066" seed={seed} />
        <Ink pts={[[-120, -40], [-60, -90], [60, -95], [120, -40]]} closed fill="#a6d16b" seed={seed + 1} />
        {[-70, 0, 70].map((cx, i) => <Oval key={i} cx={cx} cy={-62} rx={20} ry={12} fill="#7fae46" seed={seed + 2 + i} sw={3} />)}
        <Txt x={0} y={80} size={40} col={COL.red}>{label ?? ""}</Txt></g>);
      case "mail": return (<g>
        <Box x={-160} y={-110} w={320} h={210} r={10} fill="#fffdf3" seed={seed} />
        <Ink pts={[[-160, -105], [0, 10], [160, -105]]} sw={6} seed={seed + 1} />
        <Box x={80} y={-95} w={56} h={48} r={4} fill={COL.red} seed={seed + 2} sw={4} />
        <Txt x={0} y={80} size={30} font={HAND2}>{label ?? "SURVEY"}</Txt></g>);
      case "gavel": return (<g>
        <g transform="rotate(-30)"><Box x={-110} y={-60} w={220} h={90} r={16} fill="#8a5a3a" seed={seed} />
        <Box x={-14} y={30} w={28} h={200} r={8} fill="#a06c46" seed={seed + 1} sw={5} /></g>
        <Box x={-150} y={170} w={300} h={50} r={10} fill="#6b4226" seed={seed + 2} /></g>);
      case "duplex": return (<g>
        <Box x={-220} y={-260} w={440} h={260} r={8} fill="#cfe0f0" seed={seed} />
        <Ink pts={[[-250, -250], [0, -400], [250, -250]]} closed fill="#5b7fb0" seed={seed + 1} />
        <Ink pts={[[0, -260], [0, 0]]} sw={6} seed={seed + 2} />
        {[-150, 80].map((x0, i) => <g key={i}><Box x={x0} y={-210} w={70} h={60} r={5} fill="#fff" seed={seed + 3 + i} sw={4} /><Box x={x0 + 10} y={-110} w={56} h={110} r={5} fill="#8a5a3a" seed={seed + 6 + i} sw={4} /></g>)}</g>);
      case "person": return (<g>
        <Ink pts={[[-14, -100], [-18, 0]]} sw={12} col="#3b3f4a" seed={seed} /><Ink pts={[[14, -100], [18, 0]]} sw={12} col="#3b3f4a" seed={seed + 1} />
        <Ink pts={[[-50, -110], [-44, -230], [44, -230], [50, -110]]} closed fill={label === "boomer" ? "#7d5ba6" : "#4f9d8a"} seed={seed + 2} sw={6} />
        <Oval cx={0} cy={-280} rx={46} ry={50} fill={COL.skin} seed={seed + 3} sw={6} />
        <Ink pts={[[-46, -290], [-40, -330], [0, -340], [40, -330], [46, -290], [20, -318], [-20, -318]]} closed fill={label === "boomer" ? "#d8d8d8" : "#4a3326"} seed={seed + 4} sw={5} />
        <Oval cx={-16} cy={-282} rx={5} ry={6} fill={COL.ink} seed={seed + 5} sw={1} /><Oval cx={16} cy={-282} rx={5} ry={6} fill={COL.ink} seed={seed + 6} sw={1} />
        <Ink pts={[[-14, -258], [0, -252], [14, -258]]} sw={4} seed={seed + 7} /></g>);
      case "will": return (<g>
        <Box x={-130} y={-170} w={260} h={340} r={8} fill="#fffdf3" seed={seed} />
        <Txt x={0} y={-110} size={34}>INHERITANCE</Txt>
        {[0, 1, 2].map((i) => <Ink key={i} pts={[[-90, -60 + i * 45], [90, -58 + i * 45]]} sw={3} col="#aaa" seed={seed + 1 + i} />)}
        <Oval cx={70} cy={120} rx={34} ry={34} fill={COL.red} seed={seed + 5} sw={4} /></g>);
      case "treadmill": return (<g>
        <Ink pts={[[-220, 0], [200, -40]]} sw={30} col="#3b3f4a" seed={seed} />
        <Ink pts={[[160, -40], [200, -260], [150, -270]]} sw={12} seed={seed + 1} />
        <Ink pts={[[-210, 10], [-210, 40]]} sw={10} seed={seed + 2} /><Ink pts={[[190, -30], [190, 40]]} sw={10} seed={seed + 3} /></g>);
      case "key": return (<g>
        <Oval cx={-100} cy={0} rx={60} ry={60} fill={KEY} seed={seed} sw={7} />
        <Oval cx={-100} cy={0} rx={20} ry={20} fill={COL.paper} seed={seed + 1} sw={5} />
        <Box x={-45} y={-14} w={200} h={28} r={6} fill={KEY} seed={seed + 2} sw={6} />
        <Box x={110} y={10} w={20} h={40} r={4} fill={KEY} seed={seed + 3} sw={5} /><Box x={70} y={10} w={20} h={30} r={4} fill={KEY} seed={seed + 4} sw={5} /></g>);
      case "map": return (<g>
        <Box x={-260} y={-180} w={520} h={360} r={14} fill="#e8f0d8" seed={seed} />
        {Array.from({ length: 12 }, (_, i) => <Box key={i} x={-230 + (i % 4) * 120} y={-150 + Math.floor(i / 4) * 110} w={100} h={90} r={6}
          fill={i < 9 ? "#f4d9a8" : "#9fb3d1"} seed={seed + 1 + i} sw={4} />)}
        <Txt x={0} y={225} size={34} font={HAND2}>{label ?? ""}</Txt></g>);
      default: return <Oval cx={0} cy={0} rx={40} ry={40} fill={COL.paper} seed={seed} />;
    }
  })();
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{P}</g>;
};

/** EPI productivity vs pay chart (simplified shape; labels carry EPI's numbers) */
const EpiChart: React.FC<{ g: number; at: number; splitAt: number; x: number; y: number; prodAt?: number; payAt?: number }> = ({ g, at, splitAt, x, y, prodAt = 1e9, payAt = 1e9 }) => {
  if (g < at) return null;
  const W = 1100, H = 520;
  const X = (yr: number) => x + ((yr - 1948) / (2019 - 1948)) * W;
  const together = [[1948, 0], [1955, 0.18], [1962, 0.38], [1969, 0.6], [1979, 0.8]];
  const prod = [[1979, 0.8], [1989, 0.95], [1999, 1.12], [2009, 1.3], [2019, 1.45]];
  const pay = [[1979, 0.8], [1989, 0.8], [1999, 0.86], [2009, 0.88], [2019, 0.93]];
  const P = (p: number[][]) => p.map(([yr, v]) => [X(yr), y - v * (H / 1.5)]);
  const reveal1 = easeOut(k(g, at, 40)), reveal2 = easeOut(k(g, splitAt, 50));
  return (
    <g>
      <defs>
        <clipPath id="c1"><rect x={x - 20} y={y - H - 40} width={(X(1979) - x + 30) * reveal1} height={H + 80} /></clipPath>
        <clipPath id="c2"><rect x={X(1979) - 10} y={y - H - 40} width={(W - (X(1979) - x) + 40) * reveal2} height={H + 80} /></clipPath>
      </defs>
      <Ink pts={[[x - 20, y], [x + W + 30, y]]} sw={6} seed={501} />
      <Ink pts={[[x - 20, y], [x - 20, y - H]]} sw={6} seed={502} />
      {[1948, 1979, 2019].map((yr) => <Txt key={yr} x={X(yr)} y={y + 50} size={36} font={HAND2}>{yr}</Txt>)}
      <g clipPath="url(#c1)"><Ink pts={P(together)} sw={12} col={COL.navy} seed={503} /></g>
      <g clipPath="url(#c2)">
        <Ink pts={P(prod)} sw={12} col={COL.navy} seed={504} />
        <Ink pts={P(pay)} sw={12} col={COL.red} seed={505} />
      </g>
      {g >= splitAt && <Txt x={X(1979)} y={y - 0.8 * (H / 1.5) - 40} size={36} col="#555" font={HAND2} o={clamp01((g - splitAt) / 8)}>1979</Txt>}
      <BigNum t={g} at={prodAt} x={X(2019) + 40} y={y - 1.45 * (H / 1.5) - 10} to={60} fmt={(n) => `+${n}%`} size={80} col={COL.navy} sub="productivity" r={0} />
      <BigNum t={g} at={payAt} x={X(2019) + 40} y={y - 0.93 * (H / 1.5) + 90} to={16} fmt={(n) => `+${n}%`} size={80} col={COL.red} sub="typical pay" r={0} />
    </g>
  );
};

// ── item renderer ────────────────────────────────────────────────────────────────────────────────
const fmtOf = (f?: string, pre = "", post = "") => (n: number) =>
  pre + (f === "money" ? money(n) : f === "dec" ? (n / 100).toFixed(2) : f === "tenth" ? (n / 10).toFixed(1) : n.toLocaleString("en-US")) + post;

const ItemView: React.FC<{ s: Shot; it: Item; g: number; n: number }> = ({ s, it, g, n }) => {
  const at = when(s, it.w, it.plus ?? 0);
  if (it.until && g >= when(s, it.until)) return null;
  switch (it.k) {
    case "guy": {
      let pose = it.pose ?? "idle", expr = it.expr ?? "deadpan";
      for (const [w, p, e] of it.poses ?? []) if (g >= when(s, w)) { pose = p; expr = e; }
      return g >= at ? <Guy x={it.x} y={it.y} s={it.s ?? 0.7} pose={pose} expr={expr} seed={20 + n} sign={it.sign} /> : null;
    }
    case "dave": {
      let arm = it.arm ?? "idle";
      for (const [w, a] of it.arms ?? []) if (g >= when(s, w)) arm = a;
      return g >= at ? <Dave x={it.x} y={it.y} s={it.s ?? 0.8} arm={arm} /> : null;
    }
    case "tv": return (
      <PopG t={g} at={at} x={it.x} y={it.y}>
        <g transform={`translate(${it.x - 380} ${it.y - 330})`}>
          <Ink pts={[[280, -80], [360, 0]]} sw={6} seed={270} /><Ink pts={[[480, -80], [400, 0]]} sw={6} seed={271} />
          <Box x={0} y={0} w={760} h={560} r={30} fill="#3b3f4a" seed={272} sw={8} />
          <Box x={50} y={45} w={660} h={460} r={18} fill="#cfe3f7" seed={273} sw={6} />
          <clipPath id={`tv${n}`}><rect x={54} y={49} width={652} height={452} rx={16} /></clipPath>
          <g clipPath={`url(#tv${n})`}><Dave x={380} y={650} s={0.85} arm={it.arm ?? "point"} /></g>
        </g>
      </PopG>);
    case "tag": return <Tag t={g} at={at} x={it.x} y={it.y} text={it.text} size={it.size ?? 40} bg={it.bg} r={it.r ?? 0} />;
    case "num": return <BigNum t={g} at={at} x={it.x} y={it.y} to={it.to} from={it.from ?? 0} size={it.size ?? 140} col={it.col ?? COL.ink}
      fmt={fmtOf(it.f, it.pre, it.post)} sub={it.sub} r={it.r ?? -2} />;
    case "txt": return g >= at ? <Txt x={it.x} y={it.y} size={it.size ?? 60} col={it.col ?? COL.ink} o={clamp01((g - at) / 6)} font={it.font} rot={it.rot ?? 0}>{it.text}</Txt> : null;
    case "stamp": return <Stamp t={g} at={at} x={it.x} y={it.y} text={it.text} size={it.size ?? 70} r={it.r ?? -8} col={it.col ?? COL.red} />;
    case "quote": return <QuoteCard t={g} at={at} quote={it.quote} who={it.who} src={it.src} x={it.x ?? 960} y={it.y ?? 430} size={it.size ?? 80} />;
    case "bubble": return <Bubble t={g} at={at} x={it.x} y={it.y} w={it.wd} lines={it.lines} tx={it.tx} ty={it.ty} size={it.size ?? 52} />;
    case "prop": return (
      <PopG t={g} at={at} x={it.x} y={it.y - 100} r={it.r ?? 0}>
        <Prop kind={it.kind} x={it.x} y={it.y} s={it.s ?? 1} seed={400 + n * 31} label={it.label} />
        {it.cross && g >= when(s, it.cross) && <g opacity={clamp01((g - when(s, it.cross)) / 5)}>
          <Ink pts={[[it.x - 150 * (it.s ?? 1), it.y - 300 * (it.s ?? 1)], [it.x + 150 * (it.s ?? 1), it.y + 10]]} sw={16} col={COL.red} seed={480 + n} />
          <Ink pts={[[it.x + 150 * (it.s ?? 1), it.y - 300 * (it.s ?? 1)], [it.x - 150 * (it.s ?? 1), it.y + 10]]} sw={16} col={COL.red} seed={481 + n} /></g>}
      </PopG>);
    case "comment": return (
      <PopG t={g} at={at} x={it.x} y={it.y} r={-1}>
        <Oval cx={it.x - 330} cy={it.y - 30} rx={44} ry={44} fill="#b7c4d6" seed={430 + n} sw={5} />
        <Box x={it.x - 270} y={it.y - 90} w={Math.max(640, it.text.length * (it.size ?? 52) * 0.5 + 70)} h={150} r={22} fill="#fff" seed={431 + n} sw={6} />
        <Txt x={it.x - 245} y={it.y - 48} size={30} anchor="start" font={HAND2} col="#666">{it.who ?? "a Ramsey fan"}</Txt>
        <Txt x={it.x - 245} y={it.y + 18} size={it.size ?? 52} anchor="start">{it.text}</Txt>
      </PopG>);
    case "swarm": return <Swarm t={g} at={at} n={it.n} cols={it.cols} x={it.x} y={it.y} dx={it.dx ?? 90} dy={it.dy ?? 56} kind={it.kind ?? "bill"}
      s={it.s ?? 1} keep={it.keep ?? it.n} dropAt={it.drop ? when(s, it.drop, it.dropPlus ?? 0) : 1e9} stagger={it.stagger ?? 2} col={it.col} />;
    case "list": {
      return (
        <PopG t={g} at={at} x={it.x + (it.wd ?? 900) / 2} y={it.y + 200} r={it.r ?? 1}>
          <Box x={it.x} y={it.y} w={it.wd ?? 900} h={it.h ?? 120 + it.items.length * 100} r={18} fill={it.fill ?? COL.paper} seed={440 + n} sw={8} />
          {it.title && <Txt x={it.x + (it.wd ?? 900) / 2} y={it.y + 80} size={56}>{it.title}</Txt>}
          {it.items.map((x: any, i: number) => {
            const t0 = when(s, x.w, x.plus ?? 0);
            if (g < t0) return null;
            const yy = it.y + (it.title ? 175 : 85) + i * 100;
            return (
              <g key={i} opacity={clamp01((g - t0) / 5)}>
                {x.mark === "x"
                  ? <Txt x={it.x + 60} y={yy} size={60} col={COL.red}>✗</Txt>
                  : x.mark === "none" ? null : <Txt x={it.x + 60} y={yy} size={60} col={COL.green}>✓</Txt>}
                <Txt x={it.x + 110} y={yy} size={x.size ?? 50} anchor="start" col={x.col ?? COL.ink}>{x.text}</Txt>
              </g>
            );
          })}
        </PopG>);
    }
    case "bars": {
      const base = it.base ?? 780, H = it.h ?? 520, max = it.max;
      return (
        <g>
          {g >= when(s, it.bars[0].w) && <Ink pts={[[it.x - 60, base], [it.x + it.bars.length * (it.gap ?? 260) - 100, base + 2]]} sw={7} seed={450 + n} />}
          {it.bars.map((b: any, i: number) => {
            const t0 = when(s, b.w, b.plus ?? 0);
            if (g < t0) return null;
            const hh = (b.v / max) * H * easeOut(k(g, t0, 20));
            const bx = it.x + i * (it.gap ?? 260);
            return (
              <g key={i}>
                <Box x={bx} y={base - hh} w={it.bw ?? 170} h={Math.max(1, hh)} r={8} fill={b.col ?? COL.navy} seed={455 + n + i} sw={7} />
                <Txt x={bx + (it.bw ?? 170) / 2} y={base + 56} size={it.ls ?? 40}>{b.label}</Txt>
                <Txt x={bx + (it.bw ?? 170) / 2} y={base - hh - 22} size={it.vs ?? 52} col={b.col ?? COL.navy} o={clamp01((g - t0 - 10) / 6)}>{b.text}</Txt>
              </g>
            );
          })}
          {it.line && g >= when(s, it.line.w) && <Dash x1={it.x - 50} x2={it.x + it.bars.length * (it.gap ?? 260) - 110} y={base - (it.line.v / max) * H} col={it.line.col ?? COL.green} seed={470 + n} />}
        </g>);
    }
    case "line": {
      // points: [{label, v, w?}] revealed one by one (w = narration phrase) or all from `at`
      const W = it.wd ?? 1200, H = it.h ?? 420, X0 = it.x ?? 360, Y0 = it.y ?? 760, lo = it.min ?? 0, hi = it.max;
      const pts = it.points.map((p: any, i: number) => ({ ...p, t: p.w ? when(s, p.w, p.plus ?? 0) : at + i * 6,
        px: X0 + (i / Math.max(1, it.points.length - 1)) * W, py: Y0 - ((p.v - lo) / (hi - lo)) * H }));
      if (g < at) return null;
      const shown = pts.filter((p: any) => g >= p.t);
      return (
        <g opacity={clamp01((g - at) / 6)}>
          <Ink pts={[[X0 - 30, Y0], [X0 + W + 30, Y0]]} sw={6} seed={600 + n} />
          {pts.map((p: any, i: number) => <Txt key={i} x={p.px} y={Y0 + 50} size={it.ls ?? 32} font={HAND2}>{p.label}</Txt>)}
          {shown.length > 1 && <Ink pts={shown.map((p: any) => [p.px, p.py])} sw={10} col={it.col ?? COL.red} seed={610 + n} />}
          {shown.map((p: any, i: number) => (
            <g key={i}>
              <Oval cx={p.px} cy={p.py} rx={12} ry={12} fill={it.col ?? COL.red} seed={620 + n + i} sw={4} />
              {(it.labels ?? true) && <Txt x={p.px} y={p.py - 28} size={it.vs ?? 44} col={it.col ?? COL.red}>{(it.pre ?? "") + p.v + (it.post ?? "")}</Txt>}
            </g>
          ))}
        </g>);
    }
    case "epi": return <EpiChart g={g} at={at} splitAt={when(s, it.split)} prodAt={it.prod ? when(s, it.prod) : 1e9} payAt={it.pay ? when(s, it.pay) : 1e9} x={it.x ?? 380} y={it.y ?? 760} />;
    case "arrow": {
      if (g < at) return null;
      const [p1, p2] = [it.pts.at(-2), it.pts.at(-1)];
      const ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
      const hd = (d: number) => [p2[0] + Math.cos(ang + d) * 44, p2[1] + Math.sin(ang + d) * 44];
      return (<g opacity={clamp01((g - at) / 6)}>
        <Ink pts={it.pts} sw={it.sw ?? 10} col={it.col ?? COL.red} seed={490 + n} />
        <Ink pts={[hd(Math.PI * 0.8), p2, hd(-Math.PI * 0.8)]} sw={it.sw ?? 10} col={it.col ?? COL.red} seed={495 + n} /></g>);
    }
    default: return null;
  }
};

const ShotView: React.FC<{ s: Shot }> = ({ s }) => {
  const g = useCurrentFrame() + s.a;
  return (
    <Paper tone={s.tone}>
      <Cam t={g - s.a} d={s.b - s.a} from={1.0} to={s.zoom ?? 1.05} dx={s.dx ?? 0}>
        <Svg>{s.items.map((it, n) => <ItemView key={n} s={s} it={it} g={g} n={n} />)}</Svg>
      </Cam>
    </Paper>
  );
};

/** all shots + their automatic sound effects, placed at absolute frames */
export const ShotsTrack: React.FC<{ shots: Shot[] }> = ({ shots }) => (
  <>
    {shots.map((s, i) => (
      <Sequence key={i} from={s.a} durationInFrames={s.b - s.a}><ShotView s={s} /></Sequence>
    ))}
    {shots.flatMap((s, i) => {
      const fx: React.ReactNode[] = [<Sfx key={`w${i}`} name="whoosh" at={s.a} vol={0.2} dur={0.9} />];
      s.items.forEach((it, n) => {
        const at = when(s, it.w, it.plus ?? 0);
        const add = (name: string, t: number, vol = 0.3, dur = 1) => fx.push(<Sfx key={`${i}-${n}-${name}-${t}`} name={name} at={t} vol={vol} dur={dur} />);
        if (it.k === "stamp") add("stamp", at, 0.45, 1.1);
        else if (it.k === "num") add("calc_keys", at - 2, 0.25, 0.7);
        else if (it.k === "tag" || it.k === "prop" || it.k === "comment" || it.k === "bubble") add("pop", at, 0.25, 0.7);
        else if (it.k === "quote") add("paper", at, 0.3, 0.9);
        else if (it.k === "swarm") add(it.kind === "coin" ? "coin_lay" : "coins_drop", at, 0.25, 1.0);
        else if (it.k === "list") (it.items ?? []).forEach((x: any) => add(x.mark === "x" ? "wrong" : "pen_write", when(s, x.w, x.plus ?? 0), 0.25, 0.7));
        if (it.sfx) add(it.sfx, at, it.sfxVol ?? 0.3, 1.2);
      });
      return fx;
    })}
  </>
);
