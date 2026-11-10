// The Ramsey video's edit of the recorded narration (no re-recording needed):
//  - the maths ("Running Dave's Plan") now comes straight after the hook (it used to wait until 1:26)
//  - "as of last week" is cut, so the video doesn't date itself (the rate's date is shown on screen)
//  - "What Dave Admits" follows the maths, without its "So let's test it..." lead-in
//  - the "$1,270 is the raise that never showed up" comparison is cut (apples to oranges)
import WORDS from "../../public/ramsey/words.json";
import { makeTimeline } from "../timeline";
import { FPS } from "../kit";

export const TL = makeTimeline(
  WORDS as any,
  FPS,
  [{ after: "only works if it isn't.", sec: 2.0 }], // let the 2x -> 6x card + stamp land
  [
    { from: "Dave Ramsey knows the system", to: "where he's actually right." },
    { from: "Ramsey's home-buying rules are simple.", to: "about $403,000. And", gap: 0.45 },
    { from: "Freddie Mac has the average", to: "worse, not better.", gap: 0.05 },
    { from: "Let's be fair to the man", to: "the man", gap: 0.6 },
    { from: "because I want his fans", to: "the steps, and wait.", gap: 0.05 },
    { from: "Quick one: if this is useful,", to: "a month before taxes.", gap: 0.6 },
    // cut: "Remember that $1,270 monthly shortfall? That's about the size of the raise that never showed up."
    // (it compared one worker's pre-tax raise with a household's take-home gap)
    { from: "Now, EPI leans pro-labor,", to: "$END", gap: 0.5 },
  ],
);
export const NARRATION = "ramsey/narration.mp3";
