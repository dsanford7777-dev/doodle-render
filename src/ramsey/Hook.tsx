// "I Ran Dave Ramsey's Plan on a 2026 Paycheck": hook (first ~30 s), timed to the real narration.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  Fonts, Paper, Narration, Captions, Sfx, Cam, Layer, Svg, Guy, Ink, Box, Oval, Txt, PopG, QuoteCard, Stamp, Caption,
  COL, FPS, k, pop, ease, easeOut, lerp, count, money, clamp01,
} from "../kit";

// Timing comes from the real narration (public/ramsey/words.json). Each segment starts on its first word;
// HOLDS add silence after a word so a graphic can stay up longer than the voice would allow.
import { TL, NARRATION } from "./edit";
const SEGS = [
  "Dave Ramsey knows the system is rigged.",
  "Then he hands you a plan",
  "So I ran his plan",
  "Here's what's at stake",
];
const END_PHRASE = "where he's actually right.";
const segIdx = (() => { let from = 0; return SEGS.map((p) => (from = TL.find(p, from))); })();
const lastIdx = TL.find(END_PHRASE, segIdx[segIdx.length - 1]) + END_PHRASE.split(" ").length - 1;
const TIMES = segIdx.map((i, n) => {
  const j = n + 1 < segIdx.length ? segIdx[n + 1] - 1 : lastIdx;
  return {
    start: n === 0 ? 0 : TL.startF(i) - 4,
    end: n + 1 < segIdx.length ? TL.startF(segIdx[n + 1]) - 4 : TL.endF(lastIdx) + 20,
    words: Array.from({ length: j - i + 1 }, (_, k2) => ({ w: TL.words[i + k2].word, at: TL.startF(i + k2) })),
  };
});
const onset = (seg: number, word: string) => {
  const w = TIMES[seg].words.find((x) => x.w.toLowerCase().replace(/[^a-z0-9$]/g, "").startsWith(word.toLowerCase().replace(/[^a-z0-9$]/g, "")));
  return w ? w.at : TIMES[seg].start;
};
const LINES = TL.lines(0, lastIdx);
// the hook ends where the next part of the edit begins
export const HOOK_FRAMES = TL.slices.find((x) => x.a >= TL.words[TL.parts[1].a].start - 0.2)!.from;
TIMES[TIMES.length - 1].end = HOOK_FRAMES;

// ── shots ───────────────────────────────────────────────────────────────────────────────────
const S1: React.FC<{ t: number; d: number; o: number }> = ({ t, d, o }) => (
  <Paper>
    <Cam t={t} d={d} from={1.0} to={1.1} oy={40}>
      <Svg>
        <QuoteCard t={t} at={4} quote={["Corporate America", "has screwed you."]} who="Dave Ramsey" src="FOX Business · Mar 22, 2026" y={470} />
        <Stamp t={t} at={onset(0, "national") - o} x={1450} y={760} text="ON NATIONAL TV" size={64} r={-8} col={COL.red} />
      </Svg>
    </Cam>
  </Paper>
);

const S2: React.FC<{ t: number; d: number; o: number }> = ({ t, d, o }) => {
  const reach = easeOut(k(t, onset(1, "hands") - o - 6, 16));
  const hx = lerp(-420, 520, reach);
  return (
    <Paper tone="#eef2f6">
      <Cam t={t} d={d} from={1.04} to={1.12} dx={-40} ox={60}>
        <Svg>
          <Ink pts={[[0, 780], [1920, 784]]} sw={6} seed={4} />
          {/* a suit sleeve hands over the plan */}
          <g transform={`translate(${hx} 0)`}>
            <Ink pts={[[-600, 470], [140, 480], [150, 560], [-600, 570]]} closed fill="#3b3b44" seed={21} sw={7} />
            <Ink pts={[[130, 470], [160, 470], [165, 570], [135, 570]]} closed fill="#ffffff" seed={22} sw={5} />
            <Oval cx={200} cy={520} rx={44} ry={40} fill={COL.skin} seed={23} sw={6} />
            <g transform="translate(250 420) rotate(-6)">
              <Box x={0} y={0} w={260} h={330} r={10} fill={COL.green} seed={24} sw={7} />
              <Txt x={130} y={95} size={52} col="#fff">THE</Txt>
              <Txt x={130} y={160} size={58} col="#fff">PLAN</Txt>
              <Txt x={130} y={230} size={64} col={COL.amber}>✓</Txt>
              <Txt x={130} y={300} size={22} col="#e8fff1" font="PatrickHand">*works if the system is fair</Txt>
            </g>
          </g>
          <Guy x={1380} y={760} s={0.95} pose={t > onset(1, "only") - o ? "shrug" : "idle"} expr={t > onset(1, "only") - o ? "sideeye" : "deadpan"} seed={5} />
          {/* 2x -> 6x beat at the end of the line */}
          <PopG t={t} at={onset(1, "only") - o} x={800} y={250}>
            <Box x={480} y={150} w={640} h={210} r={20} fill={COL.paper} seed={26} sw={8} />
            <Txt x={630} y={290} size={120}>2x</Txt>
            <Txt x={800} y={285} size={90} col={COL.red}>→</Txt>
            <Txt x={970} y={290} size={120} col={COL.red}>6x</Txt>
            <Txt x={800} y={345} size={30} font="PatrickHand" col="#555">home price ÷ income, 1970s → now</Txt>
          </PopG>
          <Stamp t={t} at={onset(1, "isnt") - o + 20} x={560} y={440} text="HIS OWN SHOW" size={46} r={-6} col={COL.red} />
        </Svg>
      </Cam>
    </Paper>
  );
};

const S3: React.FC<{ t: number; d: number; o: number }> = ({ t, d, o }) => {
  const at$ = onset(2, "$1,270") - o;
  const n = t < at$ - 30 ? 0 : count(t, at$ - 30, at$, 0, -1270);
  const shocked = t > at$;
  return (
    <Paper tone="#f6efe2">
      <Cam t={t} d={d} from={1.0} to={1.28} ox={57} oy={52}>
        <Layer depth={0.85}>
          <Svg>
            {/* kitchen: window + wall clock */}
            <Box x={160} y={140} w={420} h={300} r={8} fill="#cfe6f5" seed={41} />
            <Ink pts={[[370, 140], [370, 440]]} seed={42} sw={6} />
            <Ink pts={[[160, 290], [580, 290]]} seed={43} sw={6} />
            <Oval cx={1640} cy={230} rx={80} ry={80} fill="#fff" seed={44} />
            <Ink pts={[[1640, 230], [1640, 175]]} seed={45} sw={6} />
            <Ink pts={[[1640, 230], [1680, 250]]} seed={46} sw={6} />
          </Svg>
        </Layer>
        <Svg>
          <Guy x={720} y={930} s={0.9} pose="idle" expr={shocked ? "shock" : "deadpan"} seed={7} />
          {/* table in front of him */}
          <Ink pts={[[300, 700], [1650, 700], [1600, 760], [350, 760]]} closed fill="#c98a52" seed={47} />
          <Ink pts={[[420, 760], [430, 1080]]} seed={48} sw={14} />
          <Ink pts={[[1520, 760], [1510, 1080]]} seed={49} sw={14} />
          {/* bills on the table */}
          <g transform="translate(330 640) rotate(-7)"><Box x={0} y={0} w={180} h={60} r={6} fill="#fff" seed={50} sw={5} /><Txt x={90} y={42} size={30} font="PatrickHand">MORTGAGE</Txt></g>
          {/* calculator */}
          <g transform="translate(1000 420) rotate(4)">
            <Box x={0} y={0} w={380} h={300} r={26} fill="#2b2f3a" seed={51} sw={8} />
            <Box x={30} y={30} w={320} h={100} r={10} fill="#cfe8c7" seed={52} sw={5} />
            <Txt x={330} y={105} size={70} anchor="end" col={n < 0 ? COL.red : COL.ink}>{money(n)}</Txt>
            {[0, 1, 2, 3].map((i) => [0, 1, 2].map((j) => (
              <Box key={`${i}${j}`} x={40 + i * 80} y={150 + j * 45} w={60} h={34} r={6} fill="#555b6a" seed={60 + i * 3 + j} sw={3} />
            )))}
          </g>
          <Stamp t={t} at={onset(2, "every") - o} x={1190} y={300} text="EVERY. SINGLE. MONTH." size={54} r={-6} />
        </Svg>
      </Cam>
    </Paper>
  );
};

const S4: React.FC<{ t: number; d: number; o: number }> = ({ t, d, o }) => {
  const u = t / d;
  const houseX = lerp(1350, 1750, ease(u));
  const yrs = Math.min(12, Math.floor(clamp01((t - (onset(3, "years") - o) + 20) / 90) * 12));
  return (
    <Paper tone="#eaf3e6">
      <Cam t={t} d={d} from={1.06} to={1.0} dx={-120}>
        <Layer depth={0.6}>
          <Svg>
            <Ink pts={[[0, 560], [400, 520], [900, 560], [1400, 510], [2200, 560]]} seed={70} sw={6} col="#7aa86c" />
            <Oval cx={1700} cy={170} rx={70} ry={70} fill="#ffd84d" seed={71} />
          </Svg>
        </Layer>
        <Svg>
          <Ink pts={[[-200, 800], [2300, 806]]} seed={72} sw={7} />
          {/* the house on wheels, drifting away */}
          <g transform={`translate(${houseX} 0)`}>
            <Box x={-170} y={520} w={340} h={240} r={8} fill="#f4d9a8" seed={73} />
            <Ink pts={[[-200, 530], [0, 380], [200, 530]]} closed fill={COL.red} seed={74} />
            <Box x={-40} y={640} w={80} h={120} r={6} fill="#8a5a3a" seed={75} sw={5} />
            <Oval cx={-110} cy={790} rx={34} ry={34} fill="#444" seed={76} sw={5} />
            <Oval cx={110} cy={790} rx={34} ry={34} fill="#444" seed={77} sw={5} />
            <g transform="translate(140 470) rotate(8)"><Box x={0} y={0} w={190} h={70} r={8} fill="#fff" seed={78} sw={5} /><Txt x={95} y={50} size={36} col={COL.red}>$403,200</Txt></g>
          </g>
          <Guy x={lerp(380, 620, ease(u))} y={800} s={0.8} pose="walk" expr={u > 0.6 ? "defeated" : "deadpan"} seed={9} />
          <PopG t={t} at={onset(3, "years") - o} x={430} y={260}>
            <Box x={260} y={170} w={340} h={170} r={16} fill={COL.paper} seed={79} sw={7} />
            <Txt x={430} y={240} size={40} font="PatrickHand" col="#555">years saving...</Txt>
            {/* tally marks pile up: "years", no invented number */}
            {Array.from({ length: Math.max(1, yrs) }, (_, i) => {
              const g = Math.floor(i / 5), j = i % 5, x0 = 312 + g * 92;
              return j < 4
                ? <Ink key={i} pts={[[x0 + j * 16, 272], [x0 + j * 16 + 2, 322]]} sw={7} seed={90 + i} />
                : <Ink key={i} pts={[[x0 - 8, 312], [x0 + 60, 280]]} sw={7} seed={90 + i} col={COL.red} />;
            })}
          </PopG>
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── composition ─────────────────────────────────────────────────────────────────────────────
const SHOTS = [
  { C: S1, a: 0, b: TIMES[0].end },
  { C: S2, a: TIMES[1].start, b: TIMES[1].end },
  { C: S3, a: TIMES[2].start, b: TIMES[2].end },
  { C: S4, a: TIMES[3].start, b: HOOK_FRAMES },
];

export const RamseyHook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      {SHOTS.map(({ C, a, b }, i) => (
        <Sequence key={i} from={a} durationInFrames={b - a}>
          <ShotWrap C={C} d={b - a} o={a} />
        </Sequence>
      ))}
      <Captions t={f} lines={LINES} />
      <Narration src={NARRATION} slices={TL.slices.filter((x) => x.from < HOOK_FRAMES)} />
      {/* effects (library files are long; dur keeps just the hit) */}
      <Sfx name="pop" at={4} vol={0.35} dur={0.8} />
      <Sfx name="stamp" at={onset(0, "national")} vol={0.5} dur={1.2} />
      <Sfx name="whoosh" at={TIMES[1].start} vol={0.25} dur={0.9} />
      <Sfx name="pop" at={onset(1, "only")} vol={0.35} dur={0.8} />
      <Sfx name="stamp" at={onset(1, "isnt") + 20} vol={0.5} dur={1.2} />
      <Sfx name="whoosh" at={TIMES[2].start} vol={0.25} dur={0.9} />
      <Sfx name="calc_keys" at={onset(2, "$1,270") - 30} vol={0.35} dur={1.0} />
      <Sfx name="wrong" at={onset(2, "$1,270")} vol={0.3} dur={1.0} />
      <Sfx name="stamp" at={onset(2, "every")} vol={0.5} dur={1.2} />
      <Sfx name="whistle_fall" at={TIMES[3].start + 10} vol={0.18} dur={2.2} />
    </AbsoluteFill>
  );
};
const ShotWrap: React.FC<{ C: React.FC<{ t: number; d: number; o: number }>; d: number; o: number }> = ({ C, d, o }) => {
  const t = useCurrentFrame();
  return <C t={t} d={d} o={o} />;
};
