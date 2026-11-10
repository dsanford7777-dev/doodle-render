// "Running Dave's Plan": the maths section (Dave's rules -> the house -> the loan -> the paycheck -> the gap -> 5% down).
// One picture per sentence, timed to the real narration. Every figure on screen comes from the script's source list.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import {
  Fonts, Paper, Narration, Captions, Sfx, Cam, Svg, Guy, Ink, Box, Oval, Txt, PopG, Stamp, Tag, BigNum, Swarm, Icon, Bubble, Dash, Dave,
  COL, KEY, k, ease, easeOut, lerp, money, clamp01,
} from "../kit";
import { TL, NARRATION } from "./edit";

// composition starts where the hook ends (first slice of part 2)
export const MATH_F0 = TL.slices.find((x) => x.a >= TL.words[TL.parts[1].a].start - 0.2)!.from;
const I0 = TL.parts[1].a;
/** frame (relative to this composition) of the first word of `phrase`, searching from word index `after` */
const ev = (phrase: string, after = I0) => TL.startF(TL.find(phrase, after)) - MATH_F0;
const idx = (phrase: string, after = I0) => TL.find(phrase, after);

const END_I = TL.findEnd("worse, not better.", I0);
const NEXT = TL.slices.find((x) => x.a >= TL.words[END_I].end)!.from - MATH_F0;
export const MATH_FRAMES = Math.min(NEXT, TL.endF(END_I) - MATH_F0 + 45);

const CUT = {
  rules: 0,
  house: ev("Now the real-world") - 4,
  loan: ev("Put 20% down") - 4,
  pay: ev("Your monthly payment") - 4,
  check: ev("Now the paycheck.") - 4,
  cap: ev("Twenty-five percent of that") - 4,
  tv: ev("Now, Dave's actually said") - 4,
  five: ev("Okay, let's try that.") - 4,
  end: MATH_FRAMES,
};
const PAYMENT_AT = idx("The payment is");

type P = { g: number; a: number; b: number };
const camT = (p: P) => ({ t: p.g - p.a, d: p.b - p.a });

// ── A: Dave's rules ─────────────────────────────────────────────────────────────────────────────
const RULES = [
  { at: "Get out of debt.", text: "1. Get out of debt" },
  { at: "Build your emergency", text: "2. Emergency fund" },
  { at: "use a 15-year", text: "3. 15-year fixed loan" },
  { at: "keep the house payment", text: "4. Payment ≤ 25% of take-home" },
];
const Rules: React.FC<P> = (p) => {
  const { g } = p;
  const cash = ev("paying cash.");
  return (
    <Paper>
      <Cam {...camT(p)} from={1.0} to={1.06} ox={40}>
        <Svg>
          <Ink pts={[[0, 820], [1920, 824]]} sw={6} seed={4} />
          <Dave x={420} y={820} s={0.95} arm={g >= cash ? "cash" : g >= ev("keep the house payment") ? "point" : "idle"} />
          <Tag t={g} at={6} x={420} y={170} text="DAVE RAMSEY" />
          <PopG t={g} at={ev("Ramsey's home-buying")} x={1300} y={460} r={1.5}>
            <Box x={860} y={110} w={880} h={640} r={18} fill={COL.paper} seed={201} sw={8} />
            <Box x={1180} y={88} w={240} h={56} r={10} fill="#c9ced8" seed={202} sw={6} />
            <Txt x={1300} y={215} size={64}>DAVE'S HOUSE RULES</Txt>
            {RULES.map((r, i) => {
              const at = ev(r.at);
              if (g < at) return null;
              const last = i === 3;
              return (
                <g key={i} opacity={clamp01((g - at) / 5)}>
                  <Txt x={920} y={330 + i * 110} size={last ? 50 : 56} anchor="start" col={last ? COL.red : COL.ink}>{r.text}</Txt>
                  {last && <Ink pts={[[1250, 360 + i * 110 - 8], [1650, 356 + i * 110 - 8]]} sw={8} col={KEY} seed={209} />}
                </g>
              );
            })}
          </PopG>
          <Tag t={g} at={ev("That 25% rule")} x={1300} y={790} text="source: Ramsey Solutions website" size={30} />
          <Swarm t={g} at={cash} n={6} cols={2} x={690} y={800} dx={86} dy={-34} s={1.1} stagger={2} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── B: the house and the rate ─────────────────────────────────────────────────────────────────
const House: React.FC<{ x: number; y: number; s?: number; seed?: number; roof?: string }> = ({ x, y, s = 1, seed = 210, roof = COL.red }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Box x={-190} y={-260} w={380} h={260} r={8} fill="#f4d9a8" seed={seed} />
    <Ink pts={[[-225, -250], [0, -430], [225, -250]]} closed fill={roof} seed={seed + 1} />
    <Box x={-40} y={-140} w={80} h={140} r={6} fill="#8a5a3a" seed={seed + 2} sw={5} />
    <Box x={-150} y={-210} w={80} h={70} r={6} fill="#bfe3f2" seed={seed + 3} sw={5} />
    <Box x={70} y={-210} w={80} h={70} r={6} fill="#bfe3f2" seed={seed + 4} sw={5} />
  </g>
);
const HouseRate: React.FC<P> = (p) => {
  const { g } = p;
  const rate = ev("Freddie Mac has");
  const slide = easeOut(k(g, rate - 6, 22));
  return (
    <Paper tone="#eef2f6">
      <Cam {...camT(p)} from={1.02} to={1.0}>
        <Svg>
          <g transform={`translate(${-lerp(0, 230, slide)} 0)`}>
            <Ink pts={[[-400, 800], [2400, 804]]} sw={6} seed={220} />
            <PopG t={g} at={ev("The median price")} x={720} y={800}><House x={720} y={800} s={0.9} /></PopG>
            <Tag t={g} at={ev("The median price")} x={720} y={110} text="MEDIAN U.S. HOME · EARLY 2026" size={38} />
            <BigNum t={g} at={ev("about $403,000")} x={720} y={280} to={403200} size={130} col={COL.ink} sub="median sales price, Q1 2026 (Census/HUD)" />
          </g>
          <PopG t={g} at={rate} x={1450} y={450} r={-2}>
            <Box x={1130} y={250} w={640} h={430} r={22} fill={COL.paper} seed={225} sw={8} />
            <Txt x={1450} y={340} size={44} font="PatrickHand" col="#4a4a55">15-year fixed rate</Txt>
          </PopG>
          <BigNum t={g} at={ev("6.57%")} x={1450} y={520} to={657} size={190} col={COL.red} fmt={(n) => (n / 100).toFixed(2) + "%"} r={0} />
          <Tag t={g} at={ev("6.57%") + 8} x={1450} y={630} text="Freddie Mac · Nov 5, 2026" size={32} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── C: the loan split (shared by 20% and 5% down) ────────────────────────────────────────────
const PRICE = 403200;
const SplitBar: React.FC<{ g: number; at: number; splitAt: number; pct: number; y?: number }> = ({ g, at, splitAt, pct, y = 300 }) => {
  if (g < at) return null;
  const X = 210, W = 1500, H = 130;
  const wDown = W * pct, sep = easeOut(k(g, splitAt, 14));
  const grow = easeOut(k(g, at, 16));
  return (
    <g opacity={clamp01((g - at) / 4)}>
      <Txt x={X + W / 2} y={y - 40} size={44} font="PatrickHand" col="#4a4a55">the house: {money(PRICE)}</Txt>
      <g transform={`translate(${-sep * 40} ${sep * 30})`}>
        <Box x={X} y={y} w={wDown * grow} h={H} r={10} fill={COL.green} seed={230} sw={7} />
      </g>
      <g transform={`translate(${sep * 20} 0)`}>
        <Box x={X + wDown} y={y} w={Math.max(1, (W - wDown) * grow)} h={H} r={10} fill="#9fb3d1" seed={231} sw={7} />
      </g>
      {sep > 0.3 && (wDown > 150
        ? <Txt x={X + wDown / 2 - 40} y={y + H / 2 + 46} size={60} col="#fff">{Math.round(pct * 100)}%</Txt>
        : <Txt x={X + wDown / 2 - 40} y={y + H + 110} size={60} col={COL.green}>{Math.round(pct * 100)}%</Txt>)}
    </g>
  );
};
const Loan: React.FC<P> = (p) => {
  const { g } = p;
  const split = ev("20% down");
  return (
    <Paper>
      <Cam {...camT(p)} from={1.0} to={1.04}>
        <Svg>
          <SplitBar g={g} at={2} splitAt={split + 6} pct={0.2} />
          <BigNum t={g} at={ev("$80,600")} x={360} y={640} to={80600} size={110} col={COL.green} sub="cash up front" />
          <BigNum t={g} at={ev("$322,600")} x={1100} y={640} to={322600} size={130} col={COL.navy} sub="borrowed" />
          <Swarm t={g} at={ev("15 years.")} n={15} cols={15} x={1100} y={800} dx={70} kind="cal" s={0.9} stagger={2} />
          <Tag t={g} at={ev("15 years.") + 32} x={1630} y={720} text="15 YEARS" size={34} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── D: the monthly payment ─────────────────────────────────────────────────────────────────────
const Payment: React.FC<P> = (p) => {
  const { g } = p;
  const higher = ev("so the real number");
  const slips = [
    { at: ev("before property taxes"), text: "+ property taxes", y: 190 },
    { at: ev("Before homeowner's"), text: "+ homeowner's insurance", y: 390 },
  ];
  return (
    <Paper tone="#f6efe6">
      <Cam {...camT(p)} from={1.0} to={1.05} ox={40}>
        <Svg>
          <PopG t={g} at={2} x={640} y={450} r={-2}>
            <Box x={290} y={160} w={700} h={560} r={14} fill={COL.paper} seed={240} sw={8} />
            <Txt x={640} y={260} size={56}>MONTHLY PAYMENT</Txt>
            <Ink pts={[[350, 300], [930, 302]]} sw={4} col="#c9ced8" seed={241} />
            <Txt x={640} y={620} size={36} font="PatrickHand" col="#4a4a55">principal + interest only</Txt>
          </PopG>
          <BigNum t={g} at={ev("about $2,822")} x={640} y={490} to={2822} size={170} col={COL.red} r={0} />
          {g >= higher && (
            <g opacity={clamp01((g - higher) / 6)}>
              <Ink pts={[[1000, 520], [1000, 330]]} sw={10} col={COL.red} seed={242} />
              <Ink pts={[[960, 380], [1000, 320], [1040, 380]]} sw={10} col={COL.red} seed={243} />
              <Txt x={1000} y={300} size={46} col={COL.red}>really: higher</Txt>
            </g>
          )}
          {slips.map((s, i) => (
            <g key={i}>
              <PopG t={g} at={s.at} x={1460} y={s.y + 70} r={i ? 3 : -3}>
                <Box x={1140} y={s.y} w={640} h={150} r={10} fill="#fff" seed={245 + i} sw={6} />
                <Txt x={1460} y={s.y + 70} size={48}>{s.text}</Txt>
              </PopG>
              <Stamp t={g} at={s.at + 12} x={1560} y={s.y + 118} text="NOT INCLUDED" size={30} r={-6} />
            </g>
          ))}
          {g >= ev("I'm being generous") && <Guy x={1460} y={880} s={0.5} pose="shrug" expr="fakesmile" seed={12} />}
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── E: the paycheck ───────────────────────────────────────────────────────────────────────────
const Paycheck: React.FC<P> = (p) => {
  const { g } = p;
  const tax = ev("After federal");
  const monthly = ev("roughly $6,210");
  const bite = easeOut(k(g, tax + 4, 20));
  return (
    <Paper tone="#eaf3e6">
      <Cam {...camT(p)} from={1.0} to={1.05}>
        <Svg>
          <PopG t={g} at={2} x={960} y={360} r={-1}>
            <Box x={360} y={150} w={1200} h={420} r={14} fill="#f3fbef" seed={250} sw={8} />
            <Txt x={420} y={230} size={40} anchor="start" font="PatrickHand" col="#4a4a55">PAY TO THE ORDER OF</Txt>
            <Txt x={420} y={300} size={56} anchor="start">the median U.S. household</Txt>
            <Ink pts={[[420, 320], [1500, 322]]} sw={4} col="#9bbf95" seed={251} />
          </PopG>
          <BigNum t={g} at={ev("about $87,500")} x={960} y={470} to={87500} size={120} col={COL.ink} fmt={(n) => money(n) + " / yr"} r={0} />
          {/* taxes bite chunks off the right edge */}
          {g >= tax && [0, 1].map((i) => (
            <g key={i} opacity={1 - clamp01((g - tax - 40) / 20)}
              transform={`translate(${bite * (120 + i * 60)} ${bite * (200 + i * 90)}) rotate(${bite * (i ? 20 : -14)} 1500 360)`}>
              <Box x={1380 - i * 200} y={180 + i * 150} w={170} h={110} r={10} fill={KEY} seed={255 + i} sw={6} />
              <Txt x={1465 - i * 200} y={248 + i * 150} size={34}>{i ? "payroll tax" : "federal tax"}</Txt>
            </g>
          ))}
          <BigNum t={g} at={monthly} x={960} y={760} to={6210} size={140} col={COL.green} fmt={(n) => money(n) + " / mo"} sub="take-home" />
          <Tag t={g} at={ev("I didn't take out")} x={960} y={110} text="not counting state tax or health insurance" size={32} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── F: the cap vs the payment (the -$1,270) ─────────────────────────────────────────────────────
const Bars: React.FC<{ g: number; at: number; pay: number; payAt: number; overAt: number; over: number; x?: number }> = ({ g, at, pay, payAt, overAt, over, x = 1300 }) => {
  if (g < at) return null;
  const base = 790, perDollar = 600 / 3700;
  const capH = 1553 * perDollar * easeOut(k(g, at, 16));
  const payH = pay * perDollar * easeOut(k(g, payAt, 22));
  const capY = base - 1553 * perDollar;
  const flash = g >= overAt ? 0.6 + 0.4 * Math.sin((g - overAt) / 3) : 0;
  return (
    <g>
      <Ink pts={[[x - 330, base], [x + 330, base + 2]]} sw={7} seed={260} />
      <Box x={x - 260} y={base - capH} w={190} h={Math.max(1, capH)} r={8} fill={COL.green} seed={261} sw={7} />
      <Txt x={x - 165} y={base + 60} size={40}>Dave's cap</Txt>
      <Txt x={x - 165} y={base - capH - 20} size={48} col={COL.green}>{money(1553)}</Txt>
      {g >= payAt && (<>
        <Box x={x + 70} y={base - payH} w={190} h={Math.max(1, payH)} r={8} fill="#e98b8b" seed={262} sw={7} />
        <Txt x={x + 165} y={base + 60} size={40}>payment</Txt>
        <Txt x={x + 165} y={base - payH - 20} size={48} col={COL.red}>{money(pay)}</Txt>
      </>)}
      {g >= payAt + 10 && <Dash x1={x - 300} x2={x + 320} y={capY} />}
      {g >= overAt && (<>
        <Box x={x + 70} y={base - pay * perDollar} w={190} h={(pay - 1553) * perDollar} r={8} fill={`rgba(210,59,59,${flash})`} seed={263} sw={7} />
        <BigNum t={g} at={overAt} x={x - 470} y={capY - 120} to={over} size={120} col={COL.red} fmt={(n) => "+" + money(n) + "/mo"} r={-4} />
      </>)}
    </g>
  );
};
const Cap: React.FC<P> = (p) => {
  const { g } = p;
  const pct = ev("Twenty-five percent of that");
  const payAt = ev("The payment is");
  const capAt = ev("Dave's cap is", PAYMENT_AT);
  const over = ev("That's $1,270");
  const med = ev("For a perfectly median");
  const shift = easeOut(k(g, payAt - 6, 20));
  return (
    <Paper>
      <Cam {...camT(p)} from={1.0} to={1.03}>
        <Svg>
          {/* $6,210 as four equal stacks; one is Dave's 25% */}
          <g opacity={1 - shift}>
            <Txt x={700} y={180} size={56}>{money(6210)} take-home</Txt>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} opacity={g >= pct + 20 && i > 0 ? 0.3 : 1}>
                <Swarm t={g} at={4 + i * 6} n={7} cols={1} x={400 + i * 200} y={330} dy={52} s={1.4} stagger={1} col={i === 0 && g >= pct + 20 ? COL.green : undefined} />
              </g>
            ))}
            <Tag t={g} at={pct + 20} x={400} y={760} text="25% = $1,553" size={40} bg={COL.green} />
          </g>
          <Bars g={g} at={capAt} pay={2822} payAt={payAt} overAt={over} over={1270} />
          <Stamp t={g} at={over + 24} x={1300} y={150} text="OVER HIS OWN LIMIT" size={56} r={-6} />
          {g >= med && (<>
            <Guy x={420} y={860} s={0.62} pose="hold" expr="defeated" seed={14} />
            <Tag t={g} at={med} x={420} y={480} text="MEDIAN FAMILY" size={34} />
          </>)}
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── G: Dave on TV ──────────────────────────────────────────────────────────────────────────────
const TV: React.FC<P> = (p) => {
  const { g } = p;
  const q = ev("has always been");
  const fine = ev("and that 3%");
  return (
    <Paper tone="#eceaf3">
      <Cam {...camT(p)} from={1.04} to={1.0}>
        <Svg>
          <PopG t={g} at={2} x={520} y={480}>
            <Ink pts={[[420, 140], [500, 220]]} sw={6} seed={270} />
            <Ink pts={[[620, 140], [540, 220]]} sw={6} seed={271} />
            <Box x={140} y={220} w={760} h={560} r={30} fill="#3b3f4a" seed={272} sw={8} />
            <Box x={190} y={265} w={660} h={460} r={18} fill="#cfe3f7" seed={273} sw={6} />
            <g clipPath="url(#tvclip)"><Dave x={520} y={870} s={0.85} arm="point" /></g>
            <clipPath id="tvclip"><rect x={194} y={269} width={652} height={452} rx={16} /></clipPath>
          </PopG>
          <Tag t={g} at={8} x={520} y={830} text="DAVE RAMSEY · FOX Business · Mar 22, 2026" size={30} />
          <Bubble t={g} at={q - 4} x={940} y={160} w={900} tx={760} ty={420} size={58}
            lines={["“...has always been a myth", "for first-time home buyers.”"]} />
          <Tag t={g} at={fine} x={1120} y={560} text="3% down (FHA)" size={40} bg={COL.green} />
          <Tag t={g} at={fine + 10} x={1600} y={560} text="5% down: “all fine”" size={40} bg={COL.green} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── H: 5% down ────────────────────────────────────────────────────────────────────────────────
const Five: React.FC<P> = (p) => {
  const { g } = p;
  const split = ev("Put 5% down");
  const pmi = ev("Plus you pay");
  const payAt = ev("Now the payment is");
  const over = ev("That's $2,086");
  const worse = ev("worse, not better.");
  const toBars = easeOut(k(g, payAt - 6, 20));
  return (
    <Paper tone="#f6efe6">
      <Cam {...camT(p)} from={1.0} to={1.04}>
        <Svg>
          <g opacity={1 - toBars}>
            <SplitBar g={g} at={2} splitAt={split + 6} pct={0.05} />
            <BigNum t={g} at={ev("borrow more")} x={1000} y={620} to={383000} size={120} col={COL.navy} sub="borrowed (more)" />
            <Swarm t={g} at={pmi + 6} n={4} cols={4} x={1000} y={800} dx={90} kind="coin" s={1.2} stagger={5} />
            <Tag t={g} at={ev("which Dave himself")} x={1000} y={720} text="mortgage insurance: ~$75/mo per $100k (Dave)" size={30} />
          </g>
          {g >= payAt - 6 && (
            <g opacity={toBars}>
              <Bars g={g} at={payAt - 6} pay={3639} payAt={payAt} overAt={over} over={2086} x={1250} />
            </g>
          )}
          <Stamp t={g} at={worse} x={620} y={150} text="WORSE, NOT BETTER" size={70} r={-8} />
        </Svg>
      </Cam>
    </Paper>
  );
};

// ── composition ───────────────────────────────────────────────────────────────────────────────
const SHOTS: { C: React.FC<P>; a: number; b: number }[] = [
  { C: Rules, a: CUT.rules, b: CUT.house },
  { C: HouseRate, a: CUT.house, b: CUT.loan },
  { C: Loan, a: CUT.loan, b: CUT.pay },
  { C: Payment, a: CUT.pay, b: CUT.check },
  { C: Paycheck, a: CUT.check, b: CUT.cap },
  { C: Cap, a: CUT.cap, b: CUT.tv },
  { C: TV, a: CUT.tv, b: CUT.five },
  { C: Five, a: CUT.five, b: CUT.end },
];
const LINES = TL.lines(I0, END_I).map((l) => ({ ...l, start: l.start - MATH_F0, end: l.end - MATH_F0, words: l.words.map((w) => ({ ...w, at: w.at - MATH_F0 })) }));
const HI = ["Dave's", "Dave", "median", "cap", "limit", "worse", "myth", "generous", "higher"];

const ShotWrap: React.FC<{ C: React.FC<P>; a: number; b: number }> = ({ C, a, b }) => {
  const t = useCurrentFrame();
  return <C g={t + a} a={a} b={b} />;
};

export const RamseyMath: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      {SHOTS.map(({ C, a, b }, i) => (
        <Sequence key={i} from={a} durationInFrames={b - a}>
          <ShotWrap C={C} a={a} b={b} />
        </Sequence>
      ))}
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src={NARRATION} slices={TL.slices.filter((x) => x.from >= MATH_F0 && x.from < MATH_F0 + MATH_FRAMES)} fromFrame={MATH_F0} />
      {SHOTS.slice(1).map((s, i) => <Sfx key={i} name="whoosh" at={s.a} vol={0.22} dur={0.9} />)}
      {RULES.map((r, i) => <Sfx key={"r" + i} name="pen_write" at={ev(r.at)} vol={0.25} dur={0.7} />)}
      <Sfx name="coins_drop" at={ev("paying cash.")} vol={0.35} dur={1.2} />
      <Sfx name="calc_keys" at={ev("about $403,000") - 2} vol={0.3} dur={0.8} />
      <Sfx name="pop" at={ev("6.57%")} vol={0.35} dur={0.8} />
      <Sfx name="paper_rip" at={ev("20% down") + 6} vol={0.3} dur={1.0} />
      <Sfx name="tick" at={ev("15 years.")} vol={0.3} dur={1.2} />
      <Sfx name="calc_keys" at={ev("about $2,822") - 2} vol={0.3} dur={0.8} />
      <Sfx name="stamp" at={ev("before property taxes") + 12} vol={0.45} dur={1.0} />
      <Sfx name="stamp" at={ev("Before homeowner's") + 12} vol={0.45} dur={1.0} />
      <Sfx name="paper_crunch" at={ev("After federal") + 4} vol={0.3} dur={1.0} />
      <Sfx name="ding_up" at={ev("roughly $6,210")} vol={0.25} dur={1.0} />
      <Sfx name="coins_stack" at={ev("Twenty-five percent of that") + 20} vol={0.3} dur={1.0} />
      <Sfx name="wrong" at={ev("That's $1,270")} vol={0.35} dur={1.0} />
      <Sfx name="stamp" at={ev("That's $1,270") + 24} vol={0.5} dur={1.2} />
      <Sfx name="click" at={CUT.tv + 2} vol={0.3} dur={0.6} />
      <Sfx name="coin_lay" at={ev("Plus you pay") + 6} vol={0.3} dur={1.0} />
      <Sfx name="wrong" at={ev("That's $2,086")} vol={0.35} dur={1.0} />
      <Sfx name="stamp" at={ev("worse, not better.")} vol={0.5} dur={1.2} />
      <Sfx name="whistle_fall" at={ev("worse, not better.") + 10} vol={0.18} dur={2.0} />
    </AbsoluteFill>
  );
};
