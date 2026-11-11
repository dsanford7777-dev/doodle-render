// "When America Made Everything: A House Cost 4.5 Years of Factory Pay. Now 6.3" (publishes Fri Nov 20, 2026).
// Narration: animate/narration/america in the private repo (script approved Nov 10).
// Storyboard: Fable (Claude Fable 5.2) review, Nov 10. Every number comes from the cleared fact list
// (project doc scripts/when-america-made-everything.md); "our math" figures are recomputed there.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import WORDS from "../../public/america/words.json";
import { Fonts, Captions, Narration, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const TL = makeTimeline((WORDS as any).words ?? (WORDS as any), FPS);
const G = COL.green, R = COL.red, N = COL.navy, A = "#c98f2b";
const GUIDE = "beginner's guide: link in the description";
// numbers that can move before publish (Freddie Mac weekly rate): one place to edit
const RATE = 7.18, PAY26 = 2712, SHARE26 = 51;

const SPECS: ShotSpec[] = [
  // ── hook ──────────────────────────────────────────────────────────────────────────────────────
  { at: "In 1979, a new house cost", items: [
    { k: "guy", x: 300, y: 880, s: 0.7, hat: "hard", poses: [["In 2026,", "shrug", "shock"]], expr: "deadpan" },
    { k: "prop", kind: "house", x: 960, y: 820, s: 1.0 },
    { k: "num", w: "nearly four and a half years", x: 960, y: 260, to: 45, f: "tenth", post: " years", size: 120, col: N, sub: "of factory pay, 1979" },
    { k: "num", w: "about 6.3 years.", x: 1560, y: 470, to: 63, f: "tenth", post: " years", size: 150, col: R, sub: "of factory pay, 2026" },
    { k: "stamp", w: "Nearly two more years", x: 1520, y: 760, text: "NEARLY 2 MORE YEARS", size: 54 },
    { k: "tag", x: 960, y: 60, text: "our math: Census, SSA + BLS data · same 40.2-hour week", size: 28 },
  ] },
  { at: "That's two extra years on the line", tone: "#f6efe6", items: [
    { k: "prop", kind: "factory", x: 520, y: 760, s: 1.0 },
    { k: "guy", x: 1000, y: 880, s: 0.65, hat: "hard", pose: "walk", expr: "defeated" },
    { k: "prop", w: "before the house is yours.", kind: "house", x: 1560, y: 760, s: 0.75 },
    { k: "txt", w: "And the reason isn't", x: 960, y: 200, text: "the reason isn't the one you've been told", size: 58, col: R },
  ] },
  { at: "Stick around for three things.", items: [
    { k: "list", x: 300, y: 170, wd: 1200, h: 470, title: "STAY FOR THREE THINGS", items: [
      { w: "What really happened", text: "1. what happened to the factory paycheck", mark: "none" },
      { w: "Why the monthly payment", text: "2. why the monthly payment barely moved", mark: "none" },
      { w: "And a pay number", text: "3. a pay number that flips the story", mark: "none" }] },
    { k: "guy", x: 1700, y: 880, s: 0.55, hat: "hard", pose: "point", expr: "smug" },
  ] },
  // ── jobs ──────────────────────────────────────────────────────────────────────────────────────
  { at: "Start with how big it was.", tone: "#eef2f6", items: [
    { k: "prop", kind: "factory", x: 560, y: 800, s: 1.2, label: "1979" },
    { k: "num", w: "19.6 million people.", x: 1400, y: 400, to: 196, f: "tenth", post: "M", size: 200, col: N, sub: "factory jobs, June 1979 (all-time peak)" },
    { k: "num", w: "22 percent of all", x: 1400, y: 700, to: 22, f: "raw", post: "%", size: 130, col: R, sub: "of all nonfarm jobs" },
    { k: "tag", x: 960, y: 70, text: "BLS, Beyond the Numbers", size: 30 },
  ] },
  { at: "More than one job in five", items: [
    { k: "swarm", kind: "worker", n: 5, cols: 5, x: 960, y: 420, dx: 220, dy: 0, s: 2.6, stagger: 5 },
    { k: "txt", plus: 20, x: 960, y: 760, text: "more than 1 in 5 jobs was a factory job", size: 64, col: N },
  ] },
  { at: "And that peak was built fast.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 110, text: "factory jobs added (BLS)", size: 36 },
    { k: "bars", x: 620, base: 780, max: 4.5, h: 480, gap: 460, bw: 240, bars: [
      { w: "Factories added 4 million", label: "1961–1969", v: 4, text: "+4M", col: G },
      { w: "Then 3 million more", label: "1975–1979", v: 3, text: "+3M", col: G }] },
  ] },
  { at: "Now fast forward.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 100, text: "manufacturing jobs · BLS via FRED (Oct 2026 preliminary)", size: 30 },
    { k: "line", x: 380, y: 760, wd: 1100, h: 460, min: 10, max: 21, post: "M", col: R, points: [
      { label: "June 1979", v: 19.6, w: "Now fast forward." }, { label: "Oct 2026", v: 12.7, w: "about 12.7 million" }] },
    { k: "stamp", w: "roughly 35 percent below", x: 1320, y: 300, text: "35% BELOW PEAK", size: 56 },
  ] },
  { at: "Still millions of people.", items: [
    { k: "swarm", kind: "worker", n: 14, cols: 7, x: 700, y: 320, dx: 120, dy: 150, s: 1.6, stagger: 2 },
    { k: "prop", w: "what one of those jobs can buy.", kind: "paycheck", x: 760, y: 780, s: 0.9 },
    { k: "arrow", w: "what one of those jobs can buy.", plus: 10, pts: [[1020, 780], [1260, 760]], col: N },
    { k: "prop", w: "what one of those jobs can buy.", plus: 14, kind: "house", x: 1500, y: 880, s: 0.8 },
  ] },
  { at: "The big break came fast.", tone: "#f3ecec", items: [
    { k: "tag", x: 960, y: 100, text: "factory jobs · BLS data via FRED", size: 32 },
    { k: "line", x: 420, y: 760, wd: 900, h: 420, min: 12, max: 18.5, post: "M", col: R, points: [
      { label: "Jan 2000", v: 17.3, w: "from 17.3 million" }, { label: "Dec 2007", v: 13.7, w: "to 13.7 million." }] },
    { k: "arrow", w: "total employment", pts: [[1560, 760], [1600, 600], [1640, 420]], col: G },
    { k: "tag", w: "total employment", x: 1640, y: 360, text: "total jobs: UP", size: 40, bg: G },
  ] },
  { at: "So what did it?", items: [
    { k: "guy", x: 960, y: 900, s: 0.7, hat: "hard", pose: "shrug", expr: "thinking" },
    { k: "tag", w: "Trade?", x: 420, y: 260, text: "Trade?", size: 64, bg: N },
    { k: "prop", w: "Machines?", kind: "robot", x: 1480, y: 520, s: 1.0 },
    { k: "tag", w: "Machines?", x: 1480, y: 200, text: "Machines?", size: 64, bg: N },
    { k: "tag", w: "Something else?", x: 960, y: 140, text: "Something else?", size: 56, bg: R },
  ] },
  { at: "Trade is part of it.", tone: "#eef2f6", items: [
    { k: "prop", kind: "map", x: 520, y: 520, s: 1.1, label: "imports" },
    { k: "num", w: "about a tenth of", x: 1360, y: 420, to: 10, f: "raw", pre: "~", post: "%", size: 200, col: N, sub: "of 1999–2011 factory job losses" },
    { k: "tag", w: "direct competition", x: 1360, y: 680, text: "direct competition from rising Chinese imports", size: 38, bg: N },
    { k: "tag", x: 1360, y: 820, text: "Autor, Dorn & Hanson, Annual Review of Economics (2016)", size: 28 },
  ] },
  { at: "Counting supply chains,", items: [
    { k: "num", x: 960, y: 330, to: 985000, f: "raw", size: 170, col: R, sub: "factory jobs, broader estimate incl. supply chains" },
    { k: "prop", w: "Those were real towns.", kind: "fixer", x: 520, y: 860, s: 0.6 },
    { k: "prop", w: "Those were real towns.", plus: 5, kind: "fixer", x: 820, y: 880, s: 0.5 },
    { k: "stamp", w: "nowhere near the whole", x: 1420, y: 760, text: "NOT THE WHOLE STORY", size: 52 },
  ] },
  { at: "A Cleveland Fed Economic Commentary", tone: "#eceaf3", items: [
    { k: "prop", kind: "fed", x: 460, y: 620, s: 1.1 },
    { k: "tag", x: 460, y: 240, text: "Cleveland Fed Economic Commentary, 2026", size: 32 },
    { k: "prop", w: "pulling in younger workers.", kind: "door", x: 1300, y: 860, s: 1.0 },
    { k: "swarm", w: "Fewer people walking", kind: "worker", n: 2, cols: 2, x: 1530, y: 720, dx: 110, dy: 0, s: 1.8 },
    { k: "tag", w: "the key driver", x: 1350, y: 250, text: "key driver: too few young workers coming in", size: 36, bg: N },
  ] },
  // ── the paycheck ──────────────────────────────────────────────────────────────────────────────
  { at: "So what happened to the paychecks", items: [
    { k: "guy", x: 560, y: 900, s: 0.75, hat: "hard", pose: "point", expr: "sideeye" },
    { k: "prop", kind: "paycheck", x: 1250, y: 520, s: 1.3, label: "$ ?" },
  ] },
  { at: "In 1979, a factory production worker averaged", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 100, text: "hourly pay, 1979 · SSA Statistical Supplement", size: 32 },
    { k: "bars", x: 620, base: 780, max: 7.5, h: 500, gap: 460, bw: 240, bars: [
      { w: "averaged $6.70 an hour.", label: "factory worker", v: 6.7, text: "$6.70", col: N },
      { w: "The federal minimum wage", label: "minimum wage", v: 2.9, text: "$2.90", col: "#8a8f99" }] },
    { k: "stamp", w: "more than double the minimum.", x: 1500, y: 300, text: "MORE THAN DOUBLE", size: 54, col: G },
  ] },
  { at: "Run that $6.70 through inflation,", items: [
    { k: "prop", kind: "paycheck", x: 500, y: 520, s: 1.0, label: "$6.70/hr (1979)" },
    { k: "arrow", w: "through inflation,", pts: [[780, 520], [1080, 520]], col: N },
    { k: "num", w: "about $31.10", x: 1450, y: 540, to: 3110, f: "dec", pre: "$", size: 170, col: N, sub: "1979 pay in Sept 2026 dollars (our math, CPI-U)" },
  ] },
  { at: "The actual average in September 2026?", tone: "#eef2f6", items: [
    { k: "bars", x: 420, base: 800, max: 33, h: 520, gap: 460, bw: 240, bars: [
      { label: "1979 pay, in 2026 $", v: 31.1, text: "$31.10", col: N },
      { w: "$30.38.", label: "actual, Sept 2026", v: 30.38, text: "$30.38", col: R }] },
    { k: "stamp", w: "About 2 percent lower.", x: 1560, y: 560, text: "ABOUT 2% LOWER", size: 56 },
    { k: "tag", x: 400, y: 100, text: "BLS, factory production workers", size: 30 },
  ] },
  { at: "So the paycheck didn't collapse.", tone: "#f6efe6", items: [
    { k: "prop", kind: "treadmill", x: 900, y: 860, s: 1.4 },
    { k: "guy", x: 860, y: 800, s: 0.65, hat: "hard", pose: "walk", expr: "deadpan" },
    { k: "txt", w: "forty-seven years.", x: 960, y: 220, text: "47 years. Basically flat.", size: 80, col: R },
  ] },
  // ── the house ─────────────────────────────────────────────────────────────────────────────────
  { at: "Now the house.", items: [
    { k: "prop", kind: "house", x: 460, y: 820, s: 0.65 },
    { k: "num", w: "about $62,750,", x: 460, y: 320, to: 62750, f: "money", size: 120, col: N, sub: "median new house, 1979" },
    { k: "prop", w: "Census put the median", kind: "house", x: 1380, y: 860, s: 1.3 },
    { k: "num", w: "$400,400.", x: 1380, y: 260, to: 400400, f: "money", size: 140, col: R, sub: "Sept 2026, preliminary (Census)" },
    { k: "stamp", w: "treat it as a snapshot.", x: 960, y: 560, text: "SNAPSHOT", size: 54, col: N },
  ] },
  { at: "Put the three side by side.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "how much each rose, 1979 → Sept 2026 (our math)", size: 32 },
    { k: "bars", x: 420, base: 800, max: 8, h: 560, gap: 420, bw: 240, bars: [
      { w: "consumer prices rose", label: "prices", v: 4.6, text: "4.6x", col: "#8a8f99" },
      { w: "Factory pay rose", label: "factory pay", v: 4.5, text: "4.5x", col: N },
      { w: "The house rose nearly", label: "new house", v: 6.4, text: "6.4x", col: R }] },
    { k: "stamp", w: "That gap is where", x: 640, y: 250, text: "NEARLY 2 EXTRA YEARS", size: 46 },
  ] },
  { at: "Run one worker through it.", tone: "#eaf3e6", items: [
    { k: "guy", x: 300, y: 880, s: 0.65, hat: "hard", pose: "point", expr: "deadpan" },
    { k: "prop", kind: "jar", x: 760, y: 820, s: 1.1 },
    { k: "num", w: "about $12,550.", x: 1350, y: 300, to: 12550, f: "money", size: 130, col: N, sub: "20% down, 1979" },
    { k: "tag", w: "0.9 of a year", x: 1350, y: 520, text: "≈ 0.9 of a year of factory pay", size: 44 },
    { k: "prop", w: "Save 15 percent", kind: "clock", x: 1250, y: 860, s: 0.9 },
    { k: "num", w: "takes about six years.", x: 1560, y: 760, to: 6, f: "raw", pre: "~", post: " yrs", size: 120, col: G, sub: "saving 15% of pay" },
  ] },
  { at: "In 2026, 20 percent down", tone: "#f3ecec", items: [
    { k: "prop", kind: "jar", x: 640, y: 880, s: 1.6 },
    { k: "num", w: "about $80,080.", x: 1350, y: 300, to: 80080, f: "money", size: 140, col: R, sub: "20% down, Sept 2026" },
    { k: "tag", w: "1.26 years", x: 1350, y: 520, text: "≈ 1.26 years of factory pay", size: 44 },
    { k: "num", w: "more than eight years.", x: 1350, y: 740, to: 8, f: "raw", post: "+ yrs", size: 120, col: R, sub: "saving 15% of pay" },
    { k: "stamp", w: "if prices froze", x: 640, y: 260, text: "IF PRICES FROZE", size: 50, col: N },
  ] },
  // ── the payment ───────────────────────────────────────────────────────────────────────────────
  { at: "So you'd expect the monthly payment", items: [
    { k: "guy", x: 560, y: 900, s: 0.75, hat: "hard", pose: "idle", expr: "defeated", poses: [["It isn't.", "shrug", "shock"]] },
    { k: "prop", kind: "receipt", x: 1250, y: 560, s: 1.4, label: "" },
    { k: "tag", x: 1250, y: 860, text: "the monthly payment", size: 40 },
    { k: "txt", w: "It isn't.", x: 1250, y: 200, text: "It isn't.", size: 110, col: G },
  ] },
  { at: "In 1979, the average 30-year mortgage rate", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "average 30-year mortgage rate · Bankrate citing Freddie Mac", size: 30 },
    { k: "line", x: 420, y: 760, wd: 900, h: 460, min: 0, max: 18, post: "%", col: R, points: [
      { label: "1979", v: 11.2, w: "was 11.2 percent." }, { label: "1981", v: 16.6, w: "averaged about 16.6." }] },
    { k: "guy", w: "Imagine a sixteen", x: 1680, y: 880, s: 0.6, hat: "hard", pose: "shrug", expr: "shock" },
  ] },
  { at: "In early November 2026,", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "Freddie Mac weekly survey, Nov 5, 2026", size: 30 },
    { k: "line", x: 380, y: 760, wd: 1100, h: 460, min: 0, max: 18, post: "%", col: R, points: [
      { label: "1979 avg", v: 11.2 }, { label: "1981 avg", v: 16.6 }, { label: "Nov 2026 (weekly)", v: RATE, w: "at 7.18 percent." }] },
    { k: "stamp", w: "treat it as a snapshot too.", x: 1500, y: 300, text: "SNAPSHOT", size: 54, col: N },
  ] },
  { at: "Now a thought experiment.", tone: "#f6efe6", items: [
    { k: "list", x: 360, y: 200, wd: 1200, h: 480, title: "THOUGHT EXPERIMENT", items: [
      { w: "One earner,", text: "one earner, 40.2-hour week", mark: "none" },
      { w: "the whole price financed,", text: "the whole price financed, 30 years", mark: "none" },
      { w: "principal and interest only.", text: "principal + interest only", mark: "none" }] },
    { k: "stamp", w: "This is not what buyers", x: 960, y: 800, text: "NOT WHAT BUYERS PAID", size: 54 },
  ] },
  { at: "In 1979, that payment is about $607", items: [
    { k: "prop", kind: "paycheck", x: 620, y: 520, s: 1.2, label: "$1,167/mo gross" },
    { k: "num", x: 620, y: 860, to: 607, f: "money", post: "/mo", size: 110, col: R, sub: "payment at 11.2%, 1979" },
    { k: "num", w: "About 52 percent.", x: 1450, y: 520, to: 52, f: "raw", post: "%", size: 260, col: R, sub: "of gross pay, 1979" },
  ] },
  { at: "In 2026, it's about $2,712", tone: "#eef2f6", items: [
    { k: "prop", kind: "paycheck", x: 620, y: 520, s: 1.2, label: "$5,292/mo gross" },
    { k: "num", x: 620, y: 860, to: PAY26, f: "money", post: "/mo", size: 110, col: R, sub: `payment at ${RATE}%, 2026` },
    { k: "num", w: "About 51 percent.", x: 1450, y: 520, to: SHARE26, f: "raw", post: "%", size: 260, col: R, sub: "of gross pay, 2026" },
  ] },
  { at: "Lower rate.", tone: "#f3ecec", items: [
    { k: "tag", x: 520, y: 230, text: "1979: 52% of pay", size: 48, bg: N },
    { k: "tag", x: 1400, y: 230, text: `2026: ${SHARE26}% of pay`, size: 48, bg: N },
    { k: "stamp", w: "Lower rate.", x: 520, y: 520, text: "LOWER RATE", size: 70, col: G, r: -6 },
    { k: "stamp", w: "Higher price.", x: 1400, y: 520, text: "HIGHER PRICE", size: 70, r: 5 },
    { k: "stamp", w: "Same bite.", x: 960, y: 800, text: "SAME BITE", size: 100, col: N, r: -3 },
  ] },
  { at: "Quick one: if this is useful,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, hat: "hard", pose: "point", expr: "fakesmile" },
    { k: "tag", w: "my beginner's guide", x: 900, y: 700, text: "📘 " + GUIDE, size: 44, bg: G },
  ] },
  { at: "So the system didn't make the house easier.", items: [
    { k: "guy", x: 960, y: 900, s: 0.7, hat: "hard", pose: "shrug", expr: "deadpan" },
    { k: "txt", w: "It changed which number", x: 960, y: 160, text: "it changed which number does the squeezing", size: 56 },
    { k: "tag", w: "High rates did it then.", x: 480, y: 420, text: "THEN: high rates", size: 64, bg: R },
    { k: "tag", w: "High prices do it now.", x: 1440, y: 420, text: "NOW: high prices", size: 64, bg: R },
  ] },
  { at: "And here's why that matters.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "dial", x: 560, y: 620, s: 1.3 },
    { k: "txt", w: "A rate can fall.", x: 560, y: 760, text: "a rate can fall", size: 60, col: G },
    { k: "num", w: "6.94 percent,", x: 1350, y: 380, to: 694, f: "dec", post: "%", size: 170, col: G, sub: "average 30-year rate, 1998" },
    { k: "prop", w: "could refinance into that.", kind: "loan", x: 1350, y: 820, s: 0.9 },
  ] },
  { at: "You can't refinance a price.", tone: "#f3ecec", items: [
    { k: "prop", kind: "house", x: 760, y: 820, s: 1.3 },
    { k: "prop", plus: 6, kind: "lock", x: 760, y: 700, s: 1.2 },
    { k: "stamp", w: "The price is the price.", x: 1400, y: 420, text: "THE PRICE IS THE PRICE", size: 52, r: 4 },
  ] },
  { at: "Zoom out to the whole household,", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "median new house ÷ median household income (our math, Census)", size: 30 },
    { k: "bars", x: 420, base: 800, max: 5.5, h: 520, gap: 420, bw: 240, bars: [
      { w: "about 3.8 times", label: "1979", v: 3.8, text: "3.8x", col: N },
      { w: "nearly 4.8 times.", label: "2025", v: 4.8, text: "4.8x", col: R }] },
    { k: "tag", w: "Household income did hit a record", x: 1430, y: 520, text: "record real household income, 2025", size: 32, bg: G },
  ] },
  // ── the surprise ──────────────────────────────────────────────────────────────────────────────
  { at: "Now the surprise I promised you.", items: [
    { k: "list", x: 300, y: 170, wd: 1200, h: 470, title: "STAY FOR THREE THINGS", items: [
      { text: "1. what happened to the factory paycheck", mark: "none", col: "#999" },
      { text: "2. why the monthly payment barely moved", mark: "none", col: "#999" },
      { w: "The factory pay number", text: "3. a pay number that flips the story", mark: "none", col: R }] },
    { k: "guy", x: 1700, y: 880, s: 0.55, hat: "hard", pose: "point", expr: "smug" },
  ] },
  { at: "In October 2026, factory production workers", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 90, text: "average hourly pay, Oct 2026 (preliminary) · BLS", size: 32 },
    { k: "bars", x: 420, base: 800, max: 35, h: 520, gap: 420, bw: 240, bars: [
      { w: "averaged $30.43", label: "factory floor", v: 30.43, text: "$30.43", col: R },
      { w: "the average was $32.75.", label: "all private, rank-and-file", v: 32.75, text: "$32.75", col: N }] },
    { k: "stamp", w: "pays below that average.", x: 1560, y: 560, text: "BELOW AVERAGE", size: 54 },
  ] },
  { at: "Think about that.", items: [
    { k: "prop", kind: "hardhat", x: 960, y: 560, s: 1.6 },
    { k: "tag", w: "once paid more than double", x: 960, y: 150, text: "1979: more than 2x the minimum wage", size: 46, bg: G },
    { k: "tag", w: "now pays less", x: 960, y: 260, text: "2026: below the average rank-and-file job", size: 46, bg: R },
    { k: "guy", w: "now pays less", x: 1600, y: 900, s: 0.5, pose: "shrug", expr: "defeated" },
  ] },
  { at: "This isn't new, either.", tone: "#eceaf3", items: [
    { k: "prop", kind: "factory", x: 560, y: 800, s: 0.9 },
    { k: "tag", w: "A 2019 BLS Monthly", x: 1350, y: 300, text: "BLS Monthly Labor Review, 2019", size: 40 },
    { k: "txt", w: "fell below", x: 1350, y: 500, text: "durable-goods floor pay fell below average", size: 46 },
    { k: "stamp", w: "in 2015.", x: 1350, y: 700, text: "SINCE 2015", size: 66, col: N },
  ] },
  { at: "To be fair, it depends where you stand.", items: [
    { k: "guy", x: 460, y: 900, s: 0.65, hat: "hard", pose: "idle", expr: "deadpan" },
    { k: "num", x: 460, y: 300, to: 3043, f: "dec", pre: "$", size: 120, col: R, sub: "factory floor, Oct 2026" },
    { k: "prop", w: "Across all manufacturing employees,", kind: "person", x: 1400, y: 900, s: 1.4 },
    { k: "num", w: "$37.24", x: 1400, y: 300, to: 3724, f: "dec", pre: "$", size: 120, col: N, sub: "all manufacturing employees, Oct 2026" },
    { k: "tag", w: "Engineers, managers", x: 960, y: 520, text: "engineers, managers, technicians", size: 40 },
  ] },
  { at: "So where did the job growth go instead?", tone: "#eaf3e6", items: [
    { k: "prop", kind: "health", x: 420, y: 480, s: 0.9 },
    { k: "tag", x: 1200, y: 90, text: "jobs added, Oct 2025 → Oct 2026 (our math, preliminary BLS)", size: 30 },
    { k: "bars", x: 960, base: 800, max: 560, h: 540, gap: 400, bw: 230, ls: 34, bars: [
      { w: "added about 519,000 jobs,", label: "health care + social asst.", v: 519, text: "+519,000", col: G },
      { w: "Manufacturing added about", label: "manufacturing", v: 78, text: "+78,000", col: N }] },
  ] },
  { at: "And the factories aren't idle.", tone: "#eef2f6", items: [
    { k: "prop", kind: "robot", x: 480, y: 760, s: 1.4 },
    { k: "num", w: "up 1.1 percent.", x: 1100, y: 380, to: 11, f: "tenth", pre: "+", post: "%", size: 160, col: G, sub: "factory output, 12 mo to Sept (Fed)" },
    { k: "num", w: "rose about 0.4 percent,", x: 1600, y: 380, to: 4, f: "tenth", pre: "+", post: "%", size: 160, col: N, sub: "factory jobs (BLS)" },
    { k: "stamp", w: "More output.", x: 1350, y: 720, text: "MORE OUTPUT. BARELY MORE PEOPLE.", size: 44 },
  ] },
  { at: "Government forecasters expect more of the same.", items: [
    { k: "quote", w: "BLS says", x: 960, y: 300, size: 50, quote: ["“continued deployment of automated machinery", "and processes in manufacturing operations is", "expected to reduce labor needs”"],
      who: "Bureau of Labor Statistics", src: "Employment Projections, Aug 2026" },
    { k: "num", w: "grow 9.5 percent", x: 620, y: 760, to: 95, f: "tenth", pre: "+", post: "%", size: 130, col: G, sub: "health care + social asst. jobs, 2025–35 (projected)" },
    { k: "stamp", w: "Those are forecasts,", x: 1400, y: 780, text: "FORECASTS, NOT PROMISES", size: 46, col: N },
  ] },
  { at: "There is a counter-signal.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "factory", x: 520, y: 800, s: 1.0 },
    { k: "num", w: "added 101,000 jobs", x: 1350, y: 330, to: 101000, f: "raw", pre: "+", size: 140, col: G, sub: "factory jobs since the Dec 2025 low (BLS)" },
    { k: "num", w: "about 0.6 percent", x: 1350, y: 660, to: 6, f: "tenth", pre: "+", post: "%", size: 120, col: N, sub: "projected factory jobs, 2025–35" },
  ] },
  { at: "So here's the honest picture.", tone: "#f6efe6", items: [
    { k: "tag", w: "Not a pay collapse.", x: 520, y: 200, text: "✗ pay collapse", size: 56, bg: "#8a8f99" },
    { k: "tag", w: "Not a jobs revival.", x: 1400, y: 200, text: "✗ jobs revival", size: 56, bg: "#8a8f99" },
    { k: "prop", w: "A paycheck that stood still", kind: "treadmill", x: 700, y: 880, s: 1.2 },
    { k: "guy", w: "A paycheck that stood still", x: 660, y: 830, s: 0.55, hat: "hard", pose: "walk", expr: "defeated" },
    { k: "prop", w: "the house ran away", kind: "house", x: 1500, y: 860, s: 0.8 },
  ] },
  // ── close ─────────────────────────────────────────────────────────────────────────────────────
  { at: "Three ways to use this.", items: [
    { k: "tag", x: 960, y: 100, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { w: "One: when someone compares", text: "1. ask for years of pay, not dollars", size: 50, mark: "none" }] },
    { k: "txt", w: "Dollars lie across decades.", x: 960, y: 820, text: "dollars lie across decades", size: 52, col: R },
  ] },
  { at: "Two: check the rate", items: [
    { k: "tag", x: 960, y: 100, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { text: "1. ask for years of pay, not dollars", size: 50, mark: "none" },
      { w: "Two: check the rate", text: "2. check the rate behind the payment", size: 50, mark: "none" }] },
  ] },
  { at: "Three: ask which pay.", items: [
    { k: "tag", x: 960, y: 100, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { text: "1. ask for years of pay, not dollars", size: 50, mark: "none" },
      { text: "2. check the rate behind the payment", size: 50, mark: "none" },
      { w: "Three: ask which pay.", text: "3. ask which pay: floor or whole payroll", size: 50, mark: "none" }] },
    { k: "tag", w: "were $30.43 and $37.24", x: 960, y: 800, text: "Oct 2026: $30.43 floor vs $37.24 all employees", size: 40, bg: N },
  ] },
  { at: "So, when America made everything,", tone: "#f6efe6", items: [
    { k: "prop", kind: "house", x: 960, y: 840, s: 1.0 },
    { k: "num", w: "about four and a half years", x: 520, y: 380, to: 45, f: "tenth", post: " years", size: 130, col: N, sub: "of factory pay, 1979" },
    { k: "num", w: "Today, about 6.3.", x: 1400, y: 380, to: 63, f: "tenth", post: " years", size: 150, col: R, sub: "of factory pay, 2026" },
    { k: "txt", w: "The house didn't wait", x: 960, y: 160, text: "the house didn't wait for the paycheck", size: 58, col: R },
  ] },
  { at: "So which surprised you more:", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, hat: "hard", pose: "point", expr: "smug" },
    { k: "tag", w: "the house,", x: 900, y: 260, text: "the house?", size: 64, bg: R },
    { k: "tag", w: "or the payment?", x: 1450, y: 260, text: "the payment?", size: 64, bg: N },
    { k: "comment", w: "Tell me in the comments.", x: 1180, y: 560, who: "you", text: "what surprised me was ___", size: 50 },
  ] },
  { at: "If you got something out of this,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, hat: "hard", pose: "point", expr: "fakesmile" },
    { k: "tag", w: "a like and a subscribe", plus: 30, x: 960, y: 660, text: "📘 " + GUIDE, size: 40, bg: G },
  ] },
];

export const SHOTS = resolveShots(TL, SPECS, 0, TL.totalFrames + 300); // 10 s hold for the end screen (same as age40)
export const AMERICA_FRAMES = SHOTS[SHOTS.length - 1].b;
const LINES = TL.lines(0, TL.words.length - 1);
const HI = ["1979", "2026", "factory", "house", "paycheck", "rate", "price", "snapshot", "minimum", "average"];
SHOTS[0] = { ...SHOTS[0], a: 0 };

export const America: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src="america/narration.mp3" slices={TL.slices} />
    </AbsoluteFill>
  );
};
