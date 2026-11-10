// Word-accurate timing from the narration's words.json, with a simple edit list:
//  - parts:  the narration ranges to play, in order (lets us reorder sections or cut a few words
//            without re-recording). Default: the whole narration.
//  - holds:  extra seconds of silence after a word, so a graphic can stay up longer than the voice allows.
// All timing is in VIDEO frames, so captions, chapters and pops stay in sync after any edit.
// <Narration> plays the audio as slices that follow the same edit list.
export type Word = { word: string; start: number; end: number };
type PartSpec = { from: string; to: string; after?: number; gap?: number };
type HoldSpec = { after: string; from?: number; sec: number };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9$]/g, "");

export function makeTimeline(words: Word[], fps: number, holdsSpec: HoldSpec[] = [], partsSpec: PartSpec[] = []) {
  /** index of the first word of `phrase` at or after word `from` */
  const find = (phrase: string, from = 0): number => {
    const want = phrase.split(/\s+/).map(norm).filter(Boolean);
    for (let i = from; i <= words.length - want.length; i++) {
      if (want.every((w, j) => norm(words[i + j].word).startsWith(w))) return i;
    }
    throw new Error(`phrase not found after word ${from}: "${phrase}"`);
  };
  /** index of the LAST word of `phrase` */
  const findEnd = (phrase: string, from = 0) => find(phrase, from) + phrase.split(/\s+/).filter(Boolean).length - 1;

  // parts in play order: [first word, last word, gap seconds before it]
  const parts = partsSpec.length
    ? partsSpec.map((p) => ({ a: find(p.from, p.after ?? 0), b: p.to === "$END" ? words.length - 1 : findEnd(p.to, p.after ?? 0), gap: p.gap ?? 0.35 }))
    : [{ a: 0, b: words.length - 1, gap: 0 }];
  const holdAfter = new Map<number, number>();
  for (const h of holdsSpec) holdAfter.set(findEnd(h.after, h.from ?? 0), h.sec);

  // audio slices (cut at part edges and at holds) and the video start of every word
  const LEAD = 0.06, TAIL = 0.12;
  const slices: { from: number; a: number; b: number }[] = [];
  const wordStart = new Map<number, number>(); // word index -> video seconds
  const wordEnd = new Map<number, number>();
  let v = 0;
  parts.forEach((p, pi) => {
    v += pi === 0 ? 0 : p.gap;
    let a = pi === 0 && p.a === 0 ? 0 : Math.max(0, words[p.a].start - LEAD);
    let vA = v; // video time of audio time `a`
    for (let i = p.a; i <= p.b; i++) {
      wordStart.set(i, vA + (words[i].start - a));
      wordEnd.set(i, vA + (words[i].end - a));
      const hold = holdAfter.get(i);
      if (hold || i === p.b) {
        const b = i === p.b ? (i + 1 < words.length ? Math.min(words[i + 1].start, words[i].end + TAIL) : words[i].end + 0.5) : words[i].end;
        slices.push({ from: Math.round(vA * fps), a, b });
        vA += b - a + (hold ?? 0);
        a = b;
      }
    }
    v = vA;
  });
  const totalSec = v;
  const has = (i: number) => wordStart.has(i);
  const startF = (i: number) => { if (!has(i)) throw new Error(`word ${i} (${words[i]?.word}) is cut from the edit`); return Math.round(wordStart.get(i)! * fps); };
  const endF = (i: number) => Math.round(wordEnd.get(i)! * fps);
  /** frame where `phrase` starts being said (searching from word `from`) */
  const at = (phrase: string, from = 0) => startF(find(phrase, from));
  /** caption lines over words fromIdx..toIdx (word order = video order within a part) */
  const lines = (fromIdx = parts[0].a, toIdx = parts[parts.length - 1].b, max = 7) => {
    const order: number[] = [];
    for (const p of parts) for (let i = p.a; i <= p.b; i++) order.push(i);
    const sel = order.slice(order.indexOf(fromIdx), order.indexOf(toIdx) + 1);
    const out: { start: number; end: number; words: { w: string; at: number }[] }[] = [];
    let cur: { w: string; at: number }[] = [], first = 0;
    sel.forEach((i, n) => {
      if (!cur.length) first = i;
      cur.push({ w: words[i].word, at: startF(i) });
      const next = sel[n + 1];
      const partBreak = next !== undefined && next !== i + 1;
      const brk = /[.?!:;]$/.test(words[i].word) || (/,$/.test(words[i].word) && cur.length >= 4) || cur.length >= max || partBreak;
      if (brk || next === undefined) {
        out.push({ start: startF(first), end: next !== undefined && !partBreak ? startF(next) : endF(i) + Math.round(fps * 0.6), words: cur });
        cur = [];
      }
    });
    return out;
  };
  return { words, parts, find, findEnd, startF, endF, at, slices, lines, totalFrames: Math.ceil(totalSec * fps), has };
}
