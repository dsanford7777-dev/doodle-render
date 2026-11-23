// Vertical Shorts (1080x1920) cut from the long videos' existing narration: no new voicing.
// A Short is an edit list (parts of the narration, in order) plus its own vertical shots. The words on screen are
// the same checked figures as the long video. Keep drawings inside y 170..1320: captions sit under that, and the
// YouTube Shorts interface covers the bottom ~350 px and the lower right edge.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Fonts, Captions, Narration, Paper, Svg, Guy, Txt, Tag, Sfx, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const SHORT_W = 1080, SHORT_H = 1920;
const END = 75; // 2.5 s end card after the last word

export type ShortDef = {
  id: string; words: any; src: string; parts: { from: string; to: string; after?: number; gap?: number }[];
  specs: ShotSpec[]; hi?: string[]; full: string[]; // `full`: the long video's title, in short lines, for the end card
};

export function makeShort(d: ShortDef) {
  const TL = makeTimeline(d.words.words ?? d.words, FPS, [], d.parts);
  const first = TL.parts[0].a, last = TL.parts[TL.parts.length - 1].b;
  // phone-sized type: number captions at least 42 px, source tags at least 32 px
  const specs = d.specs.map((sp) => ({ ...sp, items: sp.items.map((it) =>
    it.k === "num" ? { ss: 42, ...it } : it.k === "tag" ? { ...it, size: Math.max(32, it.size ?? 40) } : it) }));
  const shots = resolveShots(TL, specs, first, TL.totalFrames);
  shots[0] = { ...shots[0], a: 0 };
  const lines = TL.lines(first, last, 4);
  const frames = TL.totalFrames + END;
  const Comp: React.FC = () => {
    const f = useCurrentFrame();
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <Fonts />
        <ShotsTrack shots={shots} />
        <Captions t={f} lines={lines} hi={d.hi} st={{ bottom: 365, maxWidth: 860, size: 56 }} />
        <Narration src={d.src} slices={TL.slices} />
        <Sequence from={TL.totalFrames} durationInFrames={END}>
          <Paper tone="#eaf3e6">
            <Svg>
              <Tag t={f} at={TL.totalFrames + 2} x={540} y={430} text="WATCH THE FULL VIDEO" size={58} bg={COL.red} />
              {d.full.map((ln, i) => <Txt key={i} x={540} y={600 + i * 84} size={62}>{ln}</Txt>)}
              <Txt x={540} y={640 + d.full.length * 84} size={44} font="PatrickHand" col="#4a4a55">on the Simple Money Co channel</Txt>
              <Guy x={540} y={1290} s={0.7} pose="point" expr="smug" />
            </Svg>
          </Paper>
        </Sequence>
        <Sfx name="pop" at={TL.totalFrames + 2} vol={0.3} dur={0.7} />
      </AbsoluteFill>
    );
  };
  return { Comp, frames, TL, shots };
}
