// Simple Money Co 2D doodle kit (Remotion). Same idea as Paradox Town Explained's kit: every board sits
// under a moving camera, things pop in on the narration's words, and the line work "boils" (re-seeded
// every few frames) so even still frames feel hand-drawn. 1920x1080 @ 30 fps; captions own y > 860.
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
// @ts-ignore
import { character, wob, ell, rrect, COL } from "./mascot.js";

export { COL };
export const FPS = 30;
export const HAND = "Kalam";
export const HAND2 = "PatrickHand";

export const Fonts: React.FC = () => (
  <style>{`
    @font-face{font-family:Kalam;font-weight:700;src:url(${staticFile("fonts/Kalam-Bold.woff")}) format("woff")}
    @font-face{font-family:PatrickHand;src:url(${staticFile("fonts/PatrickHand.woff")}) format("woff")}
  `}</style>
);

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const ease = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const k = (t: number, at: number, dur = 10) => clamp01((t - at) / dur);
export const pop = (t: number, at: number, dur = 9) => {
  const u = clamp01((t - at) / dur);
  if (u <= 0) return 0;
  const s = 1.70158 * 1.4, x = u - 1;
  return 1 + (s + 1) * x * x * x + s * x * x;
};
export const count = (t: number, t0: number, t1: number, a: number, b: number) =>
  Math.round(lerp(a, b, easeOut((t - t0) / Math.max(1, t1 - t0))));
export const money = (n: number) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US");

/** line boil: a seed that changes every `every` frames (12 fps-ish hand-drawn feel) */
export const useBoil = (base = 1, every = 3) => base + Math.floor(useCurrentFrame() / every) * 7;

/** paper background with soft vignette and fibre */
export const Paper: React.FC<{ tone?: string; children?: React.ReactNode }> = ({ tone = "#f4efe3", children }) => (
  <AbsoluteFill style={{ background: tone }}>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 55%, rgba(40,40,60,0.18) 100%)" }} />
    <svg width={1920} height={1080} style={{ position: "absolute", opacity: 0.12, mixBlendMode: "multiply" }}>
      <filter id="fib"><feTurbulence type="fractalNoise" baseFrequency="0.85 0.05" numOctaves={2} seed={4} /><feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0 0.3  0 0 0 0.9 0" /></filter>
      <rect width={1920} height={1080} filter="url(#fib)" />
    </svg>
    {children}
  </AbsoluteFill>
);

/** camera: push/pull + drift over the shot; layers inside can add parallax with <Layer depth> */
export const CamCtx = React.createContext({ u: 0, dx: 0, dy: 0 });
export const Cam: React.FC<{ t: number; d: number; from?: number; to?: number; dx?: number; dy?: number; ox?: number; oy?: number; children: React.ReactNode }> =
  ({ t, d, from = 1.0, to = 1.08, dx = 0, dy = 0, ox = 50, oy = 45, children }) => {
    const u = ease(t / Math.max(1, d));
    return (
      <CamCtx.Provider value={{ u, dx, dy }}>
        <AbsoluteFill style={{ transform: `translate(${dx * u}px, ${dy * u}px) scale(${lerp(from, to, u)})`, transformOrigin: `${ox}% ${oy}%` }}>
          {children}
        </AbsoluteFill>
      </CamCtx.Provider>
    );
  };
/** parallax: depth < 1 moves less than the camera (background), > 1 moves more (foreground) */
export const Layer: React.FC<{ depth: number; children: React.ReactNode }> = ({ depth, children }) => {
  const { u, dx, dy } = React.useContext(CamCtx);
  const f = depth - 1;
  return <AbsoluteFill style={{ transform: `translate(${dx * u * f}px, ${dy * u * f}px)` }}>{children}</AbsoluteFill>;
};

/** whole-frame svg */
export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", overflow: "visible" }}>{children}</svg>
);
export const Raw: React.FC<{ svg: string }> = ({ svg }) => <g dangerouslySetInnerHTML={{ __html: svg }} />;

/** the mascot, boiling */
export const Guy: React.FC<{ x: number; y: number; s?: number; pose?: string; expr?: string; seed?: number; bob?: boolean; sign?: string }> =
  ({ x, y, s = 1, pose = "idle", expr = "deadpan", seed = 3, bob = true, sign }) => {
    const f = useCurrentFrame();
    const b = useBoil(seed, 4);
    const breathe = bob ? Math.sin(f / 14) * 3 : 0;
    return <Raw svg={character({ x, y: y + breathe * 0.3, s, pose, expr, seed: b, bob: breathe, sign })} />;
  };

/** wobbly ink path helpers for scenes */
export const Ink: React.FC<{ pts: number[][]; seed?: number; sw?: number; col?: string; fill?: string; closed?: boolean }> =
  ({ pts, seed = 1, sw = 7, col = COL.ink, fill = "none", closed = false }) => {
    const b = useBoil(seed, 4);
    return <path d={wob(pts, { closed, seed: b })} stroke={col} strokeWidth={sw} fill={fill} strokeLinecap="round" strokeLinejoin="round" />;
  };
export const Box: React.FC<{ x: number; y: number; w: number; h: number; r?: number; fill?: string; seed?: number; sw?: number }> =
  ({ x, y, w, h, r = 14, fill = COL.paper, seed = 2, sw = 7 }) => <Ink pts={rrect(x, y, w, h, r)} closed fill={fill} seed={seed} sw={sw} />;
export const Oval: React.FC<{ cx: number; cy: number; rx: number; ry: number; fill?: string; seed?: number; sw?: number }> =
  ({ cx, cy, rx, ry, fill = COL.paper, seed = 2, sw = 7 }) => <Ink pts={ell(cx, cy, rx, ry)} closed fill={fill} seed={seed} sw={sw} />;

/** hand-lettered text in svg */
export const Txt: React.FC<{ x: number; y: number; size?: number; col?: string; anchor?: "start" | "middle" | "end"; font?: string; rot?: number; children: React.ReactNode; o?: number }> =
  ({ x, y, size = 60, col = COL.ink, anchor = "middle", font = HAND, rot = 0, children, o = 1 }) => (
    <text x={x} y={y} fontFamily={font} fontWeight={700} fontSize={size} fill={col} textAnchor={anchor} opacity={o}
      transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>{children}</text>
  );

/** pop wrapper around a point */
export const PopG: React.FC<{ t: number; at: number; x: number; y: number; r?: number; dur?: number; children: React.ReactNode }> =
  ({ t, at, x, y, r = 0, dur = 9, children }) => {
    const s = pop(t, at, dur);
    if (s <= 0) return null;
    return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s}) translate(${-x} ${-y})`}>{children}</g>;
  };

/** quote card: exact words, speaker, outlet, date */
export const QuoteCard: React.FC<{ t: number; at?: number; quote: string[]; who: string; src: string; x?: number; y?: number; size?: number }> =
  ({ t, at = 0, quote, who, src, x = 960, y = 420, size = 92 }) => {
    const w = 1500, h = 150 + quote.length * size * 1.1 + 110;
    return (
      <PopG t={t} at={at} x={x} y={y} r={-2}>
        <Box x={x - w / 2} y={y - h / 2} w={w} h={h} r={22} fill={COL.paper} seed={11} sw={9} />
        <Txt x={x - w / 2 + 70} y={y - h / 2 + 150} size={220} col={COL.amber} anchor="start">“</Txt>
        {quote.map((ln, i) => (
          <Txt key={i} x={x} y={y - h / 2 + 150 + i * size * 1.1 + size * 0.6} size={size}>{ln}</Txt>
        ))}
        <Txt x={x + w / 2 - 70} y={y + h / 2 - 90} size={46} anchor="end" font={HAND}>— {who}</Txt>
        <Txt x={x + w / 2 - 70} y={y + h / 2 - 40} size={36} anchor="end" font={HAND2} col="#5a5a66">{src}</Txt>
      </PopG>
    );
  };

/** rubber stamp that slams in */
export const Stamp: React.FC<{ t: number; at: number; x: number; y: number; text: string; col?: string; size?: number; r?: number }> =
  ({ t, at, x, y, text, col = COL.red, size = 90, r = -10 }) => {
    if (t < at) return null;
    const u = clamp01((t - at) / 6), s = lerp(1.9, 1, easeOut(u));
    const w = text.length * size * 0.56 + 80, h = size * 1.5;
    return (
      <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={clamp01((t - at) / 3) * 0.95}>
        <Ink pts={rrect(-w / 2, -h / 2, w, h, 18)} closed sw={10} col={col} fill="rgba(255,253,243,0.6)" seed={33} />
        <Txt x={0} y={size * 0.34} size={size} col={col}>{text}</Txt>
      </g>
    );
  };

/** caption: dark box under the picture, the line being spoken; money/numbers and any `hi` words in yellow */
export const KEY = "#ffd23f";
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9$%]/g, "");
export const Caption: React.FC<{ t: number; words: { w: string; at: number }[]; hi?: string[] }> = ({ t, words, hi = [] }) => {
  if (!words.length) return null;
  const H = new Set(hi.map(norm));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 64, display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 1500, padding: "14px 34px 18px", borderRadius: 18, background: "rgba(14,17,24,0.9)",
        boxShadow: "0 6px 0 rgba(0,0,0,0.25)", textAlign: "center", fontFamily: HAND, fontWeight: 700, fontSize: 56, lineHeight: 1.18, color: "#fff" }}>
        {words.map((x, i) => {
          const key = /\$|\d/.test(x.w) || H.has(norm(x.w));
          return <span key={i} style={{ color: key ? KEY : "#fff", opacity: t >= x.at ? 1 : 0.5 }}>{x.w} </span>;
        })}
      </div>
    </div>
  );
};

// ── sound ─────────────────────────────────────────────────────────────────────────────────────
/** the voiceover, played in slices so the timeline's holds become silence */
export const Narration: React.FC<{ src: string; slices: { from: number; a: number; b: number }[]; fromFrame?: number }> = ({ src, slices, fromFrame = 0 }) => (
  <>
    {slices.map((s, i) => (
      <Sequence key={i} from={s.from - fromFrame} durationInFrames={Number.isFinite(s.b) ? Math.max(1, Math.round((s.b - s.a) * FPS)) : undefined}>
        <Audio src={staticFile(src)} startFrom={Math.round(s.a * FPS)} />
      </Sequence>
    ))}
  </>
);

/** a one-shot effect from public/sfx: at = frame, vol = 0..1, dur = seconds to keep (long library files) */
export const Sfx: React.FC<{ name: string; at: number; vol?: number; dur?: number; skip?: number }> = ({ name, at, vol = 0.5, dur = 2, skip = 0 }) => (
  <Sequence from={Math.max(0, at)} durationInFrames={Math.round(dur * FPS)}>
    <Audio src={staticFile(`sfx/${name}.mp3`)} volume={(f) => vol * Math.min(1, (dur * FPS - f) / 8)} startFrom={Math.round(skip * FPS)} />
  </Sequence>
);

/** captions from timeline.lines(): shows the line being spoken, words light up as they are said */
export const Captions: React.FC<{ t: number; lines: { start: number; end: number; words: { w: string; at: number }[] }[]; hi?: string[] }> = ({ t, lines, hi }) => {
  const line = lines.find((l) => t >= l.start - 2 && t < l.end);
  return line ? <Caption t={t} words={line.words} hi={hi} /> : null;
};

// ── scene templates (MapScroll / Crayon Capital structure, drawn in our doodle style) ───────────
/** dark pill name tag: people, places, sources */
export const Tag: React.FC<{ t: number; at: number; x: number; y: number; text: string; size?: number; bg?: string; col?: string; r?: number }> =
  ({ t, at, x, y, text, size = 40, bg = "#15181f", col = "#fff", r = 0 }) => {
    const w = text.length * size * 0.56 + size * 1.1, h = size * 1.55;
    return (
      <PopG t={t} at={at} x={x} y={y} r={r}>
        <Ink pts={rrect(x - w / 2, y - h / 2, w, h, h / 2)} closed fill={bg} sw={5} seed={41} col={COL.ink} />
        <Txt x={x} y={y + size * 0.36} size={size} col={col}>{text}</Txt>
      </PopG>
    );
  };

/** big hand-lettered number that pops in and counts up (fmt turns the running value into text) */
export const BigNum: React.FC<{ t: number; at: number; x: number; y: number; to: number; from?: number; dur?: number; size?: number;
  col?: string; fmt?: (n: number) => string; r?: number; sub?: string }> =
  ({ t, at, x, y, to, from = 0, dur = 18, size = 150, col = COL.ink, fmt = money, r = -2, sub }) => {
    if (t < at) return null;
    const v = count(t, at, at + dur, from, to);
    return (
      <PopG t={t} at={at} x={x} y={y} r={r}>
        <text x={x} y={y} fontFamily={HAND} fontWeight={700} fontSize={size} textAnchor="middle" fill={col}
          stroke="#fffdf3" strokeWidth={size * 0.12} strokeLinejoin="round" style={{ paintOrder: "stroke" }}>{fmt(v)}</text>
        {sub && <Txt x={x} y={y + size * 0.42} size={Math.max(34, size * 0.26)} font={HAND2} col="#4a4a55">{sub}</Txt>}
      </PopG>
    );
  };

/** small doodle icons for swarms */
export const Icon: React.FC<{ kind: string; x: number; y: number; s?: number; seed?: number; col?: string }> = ({ kind, x, y, s = 1, seed = 1, col }) => {
  const w = 78 * s, h = 42 * s;
  if (kind === "bill") return (<g>
    <Box x={x - w / 2} y={y - h / 2} w={w} h={h} r={5 * s} fill={col ?? "#8fd19e"} seed={seed} sw={4} />
    <Oval cx={x} cy={y} rx={12 * s} ry={12 * s} fill={col ? "#fff" : "#d7f2dc"} seed={seed + 1} sw={3} />
    <Txt x={x} y={y + 7 * s} size={20 * s} col="#1d5e33">$</Txt></g>);
  if (kind === "cal") return (<g>
    <Box x={x - 26 * s} y={y - 28 * s} w={52 * s} h={56 * s} r={5} fill="#fff" seed={seed} sw={4} />
    <Ink pts={[[x - 26 * s, y - 12 * s], [x + 26 * s, y - 12 * s]]} sw={4} seed={seed + 1} col={COL.red} />
    <Txt x={x} y={y + 18 * s} size={24 * s} font={HAND2}>12</Txt></g>);
  if (kind === "coin") return (<g>
    <Oval cx={x} cy={y} rx={30 * s} ry={30 * s} fill={col ?? COL.amber} seed={seed} sw={4} />
    <Txt x={x} y={y + 9 * s} size={22 * s} col={COL.ink}>$75</Txt></g>);
  return <Oval cx={x} cy={y} rx={20 * s} ry={20 * s} fill={col ?? COL.paper} seed={seed} sw={4} />;
};

/** a swarm of icons in a grid: pops in one by one from `at`; after `dropAt`, everything past `keep` falls away */
export const Swarm: React.FC<{ t: number; at: number; n: number; cols: number; x: number; y: number; dx?: number; dy?: number;
  kind?: string; s?: number; keep?: number; dropAt?: number; stagger?: number; col?: string }> =
  ({ t, at, n, cols, x, y, dx = 90, dy = 56, kind = "bill", s = 1, keep = n, dropAt = 1e9, stagger = 2, col }) => (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const px = x + (c - (cols - 1) / 2) * dx, py = y + r * dy;
        const sc = pop(t, at + i * stagger, 8);
        if (sc <= 0) return null;
        const fall = i >= keep ? easeOut(k(t, dropAt + (n - i) * 1.2, 16)) : 0;
        return (
          <g key={i} opacity={1 - fall} transform={`translate(${px} ${py + fall * 260}) rotate(${fall * (i % 2 ? 40 : -40)}) scale(${sc}) translate(${-px} ${-py})`}>
            <Icon kind={kind} x={px} y={py} s={s} seed={60 + i * 3} col={i >= keep && t >= dropAt ? "#e9a2a2" : col} />
          </g>
        );
      })}
    </g>
  );

/** speech bubble (tail points at tx,ty) */
export const Bubble: React.FC<{ t: number; at: number; x: number; y: number; w: number; lines: string[]; tx: number; ty: number; size?: number; col?: string }> =
  ({ t, at, x, y, w, lines, tx, ty, size = 50, col = COL.ink }) => {
    const h = lines.length * size * 1.15 + size * 0.9;
    return (
      <PopG t={t} at={at} x={tx} y={ty}>
        <Ink pts={[[x + w * 0.3, y + h - 6], [tx, ty], [x + w * 0.45, y + h - 6]]} closed fill="#fff" sw={6} seed={51} />
        <Box x={x} y={y} w={w} h={h} r={36} fill="#fff" seed={52} sw={7} />
        {lines.map((l, i) => <Txt key={i} x={x + w / 2} y={y + size * 1.1 + i * size * 1.15} size={size} col={col}>{l}</Txt>)}
      </PopG>
    );
  };

/** dashed hand line (limits, caps) */
export const Dash: React.FC<{ x1: number; x2: number; y: number; col?: string; seed?: number }> = ({ x1, x2, y, col = COL.green, seed = 1 }) => (
  <g>{Array.from({ length: Math.floor((x2 - x1) / 44) }, (_, i) => (
    <Ink key={i} pts={[[x1 + i * 44, y], [x1 + i * 44 + 26, y + 1]]} sw={7} col={col} seed={seed + i} />))}</g>
);

/** Dave Ramsey caricature (suit, grin, grey swept hair). Only ever "says" verified quotes. */
export const Dave: React.FC<{ x: number; y: number; s?: number; arm?: "idle" | "point" | "cash"; grin?: boolean; seed?: number }> =
  ({ x, y, s = 1, arm = "idle", grin = true, seed = 300 }) => {
    const f = useCurrentFrame();
    const b = useBoil(seed, 4);
    const by = Math.sin(f / 15) * 3;
    const suit = "#2f3440", tie = "#b83232", hair = "#b8b8bc";
    return (
      <g transform={`translate(${x} ${y + by * 0.3}) scale(${s})`}>
        {/* legs + shoes */}
        <Ink pts={[[-30, -150], [-34, 0]]} sw={22} col={suit} seed={b} />
        <Ink pts={[[30, -150], [36, 0]]} sw={22} col={suit} seed={b + 1} />
        <Oval cx={-44} cy={4} rx={30} ry={12} fill={COL.ink} seed={b + 2} sw={3} />
        <Oval cx={48} cy={4} rx={30} ry={12} fill={COL.ink} seed={b + 3} sw={3} />
        {/* suit body */}
        <Ink pts={[[-92, -140], [-82, -350], [82, -350], [92, -140]]} closed fill={suit} seed={b + 4} sw={7} />
        <Ink pts={[[-30, -350], [0, -250], [30, -350]]} closed fill="#fff" seed={b + 5} sw={5} />
        <Ink pts={[[-10, -330], [10, -330], [16, -230], [0, -205], [-16, -230]]} closed fill={tie} seed={b + 6} sw={4} />
        {/* arms */}
        <Ink pts={[[-80, -330], [-112, -250], [-108, -170]]} sw={26} col={suit} seed={b + 7} />
        <Oval cx={-108} cy={-160} rx={20} ry={18} fill={COL.skin} seed={b + 8} sw={5} />
        {arm === "point"
          ? <><Ink pts={[[80, -330], [150, -370], [215, -400]]} sw={26} col={suit} seed={b + 9} /><Oval cx={228} cy={-406} rx={20} ry={18} fill={COL.skin} seed={b + 10} sw={5} /></>
          : arm === "cash"
            ? <><Ink pts={[[80, -330], [130, -290], [160, -250]]} sw={26} col={suit} seed={b + 9} />
                <g transform="translate(185 -262) rotate(-12)"><Icon kind="bill" x={0} y={0} s={1.3} seed={b + 11} /><Icon kind="bill" x={6} y={-16} s={1.3} seed={b + 12} /></g>
                <Oval cx={165} cy={-246} rx={20} ry={18} fill={COL.skin} seed={b + 10} sw={5} /></>
            : <><Ink pts={[[80, -330], [112, -250], [108, -170]]} sw={26} col={suit} seed={b + 9} /><Oval cx={108} cy={-160} rx={20} ry={18} fill={COL.skin} seed={b + 10} sw={5} /></>}
        {/* head: broad jaw */}
        <Ink pts={[[-78, -470], [-84, -420], [-70, -378], [-36, -352], [36, -352], [70, -378], [84, -420], [78, -470], [60, -520], [0, -536], [-60, -520]]} closed fill={COL.skin} seed={b + 13} sw={7} />
        <Oval cx={-84} cy={-440} rx={14} ry={20} fill={COL.skin} seed={b + 14} sw={5} />
        <Oval cx={84} cy={-440} rx={14} ry={20} fill={COL.skin} seed={b + 15} sw={5} />
        {/* grey hair swept back, high forehead */}
        <Ink pts={[[-80, -470], [-86, -516], [-50, -556], [20, -566], [70, -540], [84, -486], [66, -500], [50, -528], [-10, -536], [-60, -512], [-70, -478]]} closed fill={hair} seed={b + 16} sw={6} />
        {/* brows, eyes, nose */}
        <Ink pts={[[-50, -478], [-18, -484]]} sw={7} seed={b + 17} />
        <Ink pts={[[18, -484], [50, -478]]} sw={7} seed={b + 18} />
        <Oval cx={-33} cy={-458} rx={6} ry={7} fill={COL.ink} seed={b + 19} sw={2} />
        <Oval cx={33} cy={-458} rx={6} ry={7} fill={COL.ink} seed={b + 20} sw={2} />
        <Ink pts={[[0, -455], [-10, -420], [6, -416]]} sw={5} seed={b + 21} />
        {/* the grin */}
        {grin
          ? <Ink pts={[[-44, -398], [0, -372], [44, -398], [0, -384]]} closed fill="#fff" sw={6} seed={b + 22} />
          : <Ink pts={[[-30, -390], [30, -390]]} sw={6} seed={b + 22} />}
      </g>
    );
  };
