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

/** caption: current line, words light up as spoken (word times in frames, relative to the shot) */
export const Caption: React.FC<{ t: number; words: { w: string; at: number }[] }> = ({ t, words }) => {
  if (!words.length) return null;
  return (
    <div style={{ position: "absolute", left: 160, right: 160, bottom: 70, textAlign: "center", fontFamily: HAND, fontWeight: 700,
      fontSize: 60, lineHeight: 1.2, color: "#fff", textShadow: "0 0 6px #000, 0 3px 0 #000, 0 -3px 0 #000, 3px 0 0 #000, -3px 0 0 #000" }}>
      {words.map((x, i) => (
        <span key={i} style={{ color: t >= x.at ? (/\$|\d/.test(x.w) ? COL.amber : "#fff") : "rgba(255,255,255,0.55)" }}>{x.w} </span>
      ))}
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
export const Captions: React.FC<{ t: number; lines: { start: number; end: number; words: { w: string; at: number }[] }[] }> = ({ t, lines }) => {
  const line = lines.find((l) => t >= l.start - 2 && t < l.end);
  return line ? <Caption t={t} words={line.words} /> : null;
};
