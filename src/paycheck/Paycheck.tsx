// "Paycheck to Paycheck on a Full-Time Job? 3 Bills Can Take 61%" (publishes Tue Nov 24, 2026).
// Narration: animate/narration/paycheck in the private repo (script approved Nov 10).
// Storyboard: Fable review, Nov 10. Numbers: cleared claim log factcheck/paycheck-to-paycheck.md (Nov 9)
// + the Nov 10 CPI note. Only narrated numbers are shown; rounding on screen matches the narration.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import WORDS from "../../public/paycheck/words.json";
import { Fonts, Captions, Narration, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const TL = makeTimeline((WORDS as any).words ?? (WORDS as any), FPS);
const G = COL.green, R = COL.red, N = COL.navy, GR = "#8a8f99";
const GUIDE = "beginner's guide: link in the description";
const MOVES = "general education, not financial advice";

const SPECS: ShotSpec[] = [
  // ── hook ──────────────────────────────────────────────────────────────────────────────────────
  { at: "If you're living paycheck to paycheck", items: [
    { k: "guy", x: 300, y: 880, s: 0.7, pose: "idle", expr: "deadpan", poses: [["can take about 61%", "shrug", "shock"]] },
    { k: "prop", kind: "paycheck", x: 900, y: 520, s: 1.3, label: "$ $ $" },
    { k: "tag", w: "Rent,", x: 1500, y: 230, text: "rent", size: 50, bg: R },
    { k: "tag", w: "child care", x: 1500, y: 330, text: "child care", size: 50, bg: R },
    { k: "tag", w: "and health coverage", x: 1500, y: 430, text: "health coverage", size: 50, bg: R },
    { k: "num", w: "can take about 61%", x: 1500, y: 680, to: 61, f: "raw", pre: "~", post: "%", size: 200, col: R, sub: "of the paycheck, before tax" },
    { k: "tag", x: 960, y: 60, text: "an illustration · our math from BLS, Census, Child Care Aware, KFF", size: 28 },
  ] },
  { at: "And it's not because you bought", tone: "#f6efe6", items: [
    { k: "prop", kind: "coffee", x: 800, y: 760, s: 1.6 },
    { k: "stamp", plus: 12, x: 800, y: 480, text: "NOT THIS", size: 90 },
    { k: "guy", x: 1450, y: 880, s: 0.7, pose: "point", expr: "sideeye" },
  ] },
  { at: "Center-based child care for two kids", items: [
    { k: "prop", kind: "daycare", x: 520, y: 760, s: 1.1 },
    { k: "txt", w: "costs more than", x: 960, y: 520, text: ">", size: 200, col: R },
    { k: "prop", w: "a year of median rent", kind: "apartment", x: 1400, y: 820, s: 0.9 },
    { k: "num", w: "in all 47 states", x: 960, y: 220, to: 47, f: "raw", post: " of 47 states", size: 110, col: R, sub: "two kids in a center vs. a year of median rent" },
    { k: "tag", x: 960, y: 60, text: "Child Care Aware of America price report", size: 28 },
  ] },
  { at: "The national average for even one child", tone: "#eef2f6", items: [
    { k: "num", x: 620, y: 420, to: 13184, f: "money", post: "/yr", size: 150, col: N, sub: "average price, one child (Child Care Aware)" },
    { k: "prop", w: "For a single parent,", kind: "person", x: 1380, y: 880, s: 1.2 },
    { k: "num", w: "about a third", x: 1380, y: 330, to: 33, f: "raw", pre: "~", post: "%", size: 150, col: R, sub: "of a single parent's median income" },
  ] },
  { at: "Stay for the whole budget.", items: [
    { k: "list", x: 300, y: 170, wd: 1200, h: 470, title: "STAY FOR", items: [
      { w: "build it line by line,", text: "1. the whole budget, line by line", mark: "none" },
      { w: "who actually sets each price,", text: "2. who actually sets each price", mark: "none" },
      { w: "how household income hit a record", text: "3. record income, thin cushion", mark: "none" }] },
    { k: "num", w: "while 37% of adults", x: 960, y: 820, to: 37, f: "raw", post: "%", size: 110, col: R, sub: "wouldn't cover a $400 surprise with cash (Fed)" },
    { k: "guy", x: 1700, y: 880, s: 0.55, pose: "point", expr: "smug" },
  ] },
  // ── the paycheck ──────────────────────────────────────────────────────────────────────────────
  { at: "First, the paycheck.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "paycheck", x: 620, y: 480, s: 1.3, label: "$1,232 / week" },
    { k: "num", w: "made $1,232 a week.", x: 620, y: 830, to: 1232, f: "money", post: "/week", size: 100, col: N, sub: "median full-time worker, Q3 2026 (BLS)" },
    { k: "num", w: "about $64,064 a year", x: 1420, y: 480, to: 64064, f: "money", post: "/yr", size: 140, col: G, sub: "before tax (our math: × 52)" },
  ] },
  { at: "That's the middle.", items: [
    { k: "swarm", kind: "worker", n: 10, cols: 10, x: 960, y: 400, dx: 150, dy: 0, s: 1.8, col: N },
    { k: "num", w: "122.2 million", x: 620, y: 700, to: 1222, f: "tenth", post: "M", size: 110, col: N, sub: "full-time wage & salary workers" },
    { k: "num", w: "$849 a week", x: 1350, y: 700, to: 849, f: "money", post: "/wk or less", size: 100, col: R, sub: "a quarter of them" },
    { k: "stamp", w: "Not the bottom.", x: 960, y: 200, text: "THE TYPICAL FULL-TIMER", size: 48, col: N },
  ] },
  { at: "Is that paycheck keeping up?", tone: "#f3ecec", items: [
    { k: "tag", x: 960, y: 90, text: "Q3 2026 vs a year earlier · BLS", size: 32 },
    { k: "bars", x: 620, base: 800, max: 4, h: 520, gap: 460, bw: 240, bars: [
      { w: "pay was up 1.5%", label: "median weekly pay", v: 1.5, text: "+1.5%", col: N },
      { w: "Consumer prices rose 3.5%.", label: "consumer prices", v: 3.5, text: "+3.5%", col: R }] },
    { k: "stamp", w: "lost ground.", x: 1560, y: 560, text: "LOST GROUND", size: 56 },
  ] },
  { at: "Now the fair read.", tone: "#eaf3e6", items: [
    { k: "tag", x: 960, y: 90, text: "12-month changes · BLS", size: 32 },
    { k: "bars", x: 620, base: 800, max: 4, h: 520, gap: 460, bw: 240, bars: [
      { w: "Average hourly earnings were up 3.1%", label: "hourly pay (to Oct)", v: 3.1, text: "+3.1%", col: G },
      { w: "rose 2.6%", label: "core prices (to Sept)", v: 2.6, text: "+2.6%", col: GR }] },
    { k: "guy", w: "So pay is beating those.", x: 1600, y: 880, s: 0.6, pose: "shrug", expr: "fakesmile" },
  ] },
  { at: "But the headline number rose 3.7%", items: [
    { k: "num", x: 520, y: 360, to: 37, f: "tenth", post: "%", size: 170, col: R, sub: "headline prices, 12 mo to Sept (BLS)" },
    { k: "prop", w: "Gasoline alone rose 9.1%", kind: "car", x: 1350, y: 760, s: 1.3 },
    { k: "num", w: "Gasoline alone rose 9.1%", x: 1350, y: 360, to: 91, f: "tenth", pre: "+", post: "%", size: 150, col: R, sub: "gasoline, in September alone" },
    { k: "tag", w: "over half of that month's increase.", x: 960, y: 620, text: "over half of September's increase", size: 40, bg: R },
  ] },
  { at: "So wages against prices is only half", tone: "#f6efe6", items: [
    { k: "guy", x: 420, y: 880, s: 0.7, pose: "walk", expr: "thinking" },
    { k: "prop", w: "The squeeze hides in three bills.", kind: "mail", x: 960, y: 600, s: 0.8, label: "RENT" },
    { k: "prop", w: "The squeeze hides in three bills.", plus: 5, kind: "mail", x: 1300, y: 600, s: 0.8, label: "CHILD CARE" },
    { k: "prop", w: "The squeeze hides in three bills.", plus: 10, kind: "mail", x: 1640, y: 600, s: 0.8, label: "HEALTH" },
  ] },
  // ── the three bills ───────────────────────────────────────────────────────────────────────────
  { at: "Bill one: rent.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 1: RENT", size: 48, bg: R },
    { k: "prop", kind: "apartment", x: 520, y: 860, s: 1.1 },
    { k: "num", w: "was $1,557 a month", x: 1350, y: 400, to: 1557, f: "money", post: "/mo", size: 140, col: N, sub: "median gross rent (rent + utilities), 2025 · Census" },
    { k: "num", w: "about 29% of the pay,", x: 1350, y: 720, to: 29, f: "raw", pre: "~", post: "%", size: 140, col: R, sub: "of the median paycheck, before tax (29.2%)" },
  ] },
  { at: "Bill two: child care.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 2: CHILD CARE", size: 48, bg: R },
    { k: "prop", kind: "daycare", x: 520, y: 760, s: 1.1 },
    { k: "num", w: "is about a fifth", x: 1350, y: 400, to: 20, f: "raw", pre: "~", post: "%", size: 150, col: R, sub: "$13,184 vs the median paycheck (20.6%)" },
    { k: "num", w: "at 10% of median income.", x: 1350, y: 720, to: 10, f: "raw", post: "%", size: 120, col: N, sub: "two-parent households (Child Care Aware)" },
  ] },
  { at: "Bill three: health coverage.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 3: HEALTH COVERAGE · KFF 2026", size: 44, bg: R },
    { k: "prop", kind: "health", x: 520, y: 520, s: 1.1 },
    { k: "num", w: "averaged $28,303 a year", x: 1350, y: 380, to: 28303, f: "money", post: "/yr", size: 130, col: N, sub: "average family premium, 2026" },
    { k: "num", w: "still pay $7,471 a year", x: 1350, y: 720, to: 7471, f: "money", post: "/yr", size: 130, col: R, sub: "the worker's share" },
  ] },
  { at: "Now put them on one receipt.", items: [
    { k: "prop", kind: "receipt", x: 500, y: 560, s: 1.6 },
    { k: "list", x: 860, y: 170, wd: 900, h: 420, title: "ONE PAYCHECK", items: [
      { w: "Rent,", text: "rent + utilities", mark: "none" },
      { w: "one child's care", text: "one child's care", mark: "none" },
      { w: "worker's share of a family premium", text: "your share of a family premium", mark: "none" }] },
    { k: "num", w: "about $39,300 a year.", x: 1310, y: 760, to: 39300, f: "money", pre: "~", post: "/yr", size: 120, col: R, sub: "our math ($39,339)" },
  ] },
  { at: "That's roughly 61% of the median", tone: "#f3ecec", items: [
    { k: "bars", x: 620, base: 800, max: 100, h: 560, gap: 460, bw: 260, bars: [
      { label: "three bills", v: 61, text: "~61%", col: R },
      { w: "Before tax, food,", label: "everything else", v: 39, text: "~39%", col: GR }] },
    { k: "guy", x: 1600, y: 880, s: 0.65, pose: "facepalm", expr: "defeated" },
    { k: "tag", w: "Before tax, food,", x: 1500, y: 300, text: "...before tax, food, gas", size: 44 },
  ] },
  { at: "To be fair, many households", items: [
    { k: "prop", kind: "person", x: 640, y: 880, s: 1.2 },
    { k: "prop", plus: 6, kind: "person", x: 820, y: 880, s: 1.1, seed: 9 },
    { k: "tag", w: "This is an illustration,", x: 1350, y: 420, text: "ILLUSTRATION, NOT A REAL BUDGET", size: 48, bg: N },
    { k: "txt", w: "how much of one paycheck", x: 1350, y: 620, text: "...but it shows the size of the bite", size: 52 },
  ] },
  { at: "The government's spending survey", tone: "#eaf3e6", items: [
    { k: "prop", kind: "house", x: 460, y: 820, s: 0.9 },
    { k: "num", w: "spent $27,790 on housing", x: 1250, y: 330, to: 27790, f: "money", size: 130, col: N, sub: "average household housing spending, 2025 (BLS)" },
    { k: "num", w: "and it's $38,423.", x: 1250, y: 620, to: 38423, f: "money", size: 130, col: R, sub: "housing + food" },
    { k: "stamp", w: "nearly half", x: 1250, y: 860, text: "NEARLY HALF", size: 60 },
  ] },
  { at: "Spending runs from $37,935", items: [
    { k: "bars", x: 420, base: 760, max: 170000, h: 520, gap: 420, bw: 240, ls: 34, bars: [
      { label: "lowest fifth", v: 37935, text: "$37,935", col: N },
      { w: "$159,512 for the highest.", label: "highest fifth", v: 159512, text: "$159,512", col: N }] },
    { k: "guy", w: "It's who sets the prices.", x: 1550, y: 880, s: 0.65, pose: "point", expr: "thinking" },
    { k: "txt", w: "It's who sets the prices.", x: 1500, y: 300, text: "who sets the prices?", size: 70, col: R },
  ] },
  { at: "Quick one: if this is useful,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "my beginner's guide", x: 900, y: 700, text: "📘 " + GUIDE, size: 44, bg: G },
  ] },
  // ── who sets the price: health ────────────────────────────────────────────────────────────────
  { at: "Start with health coverage.", tone: "#eef2f6", items: [
    { k: "prop", kind: "health", x: 380, y: 400, s: 0.8 },
    { k: "tag", x: 1150, y: 90, text: "worker's share of a family premium · KFF 2026", size: 32 },
    { k: "bars", x: 760, base: 800, max: 40, h: 500, gap: 360, bw: 220, bars: [
      { w: "On average, workers pay 27%", label: "average", v: 27, text: "27%", col: N },
      { w: "At small firms,", label: "small firms", v: 37, text: "37%", col: R },
      { w: "At large firms,", label: "large firms", v: 25, text: "25%", col: GR }] },
  ] },
  { at: "KFF's 2026 survey of employers", items: [
    { k: "tag", x: 960, y: 90, text: "KFF Employer Health Benefits Survey, 2026", size: 32 },
    { k: "bars", x: 420, base: 800, max: 6, h: 500, gap: 420, bw: 240, bars: [
      { w: "grew 5% in 2026,", label: "family premium", v: 5, text: "+5%", col: R },
      { w: "while wages grew 3.7%.", label: "wages", v: 3.7, text: "+3.7%", col: N }] },
    { k: "num", w: "up 28%.", x: 1500, y: 420, to: 28, f: "raw", pre: "+", post: "%", size: 170, col: R, sub: "family premium since 2021" },
  ] },
  { at: "Here's the part that stings.", tone: "#f3ecec", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, pose: "idle", expr: "angry" },
    { k: "prop", kind: "paycheck", x: 960, y: 500, s: 1.2, label: "your paycheck" },
    { k: "num", w: "rose 9% in 2026.", x: 1550, y: 360, to: 9, f: "raw", pre: "+", post: "%", size: 160, col: R, sub: "worker's share of a family premium" },
    { k: "num", w: "That's $621 more", x: 1550, y: 680, to: 621, f: "money", pre: "+", post: "/yr", size: 120, col: R, sub: "vs 2025" },
    { k: "tag", w: "Faster than the bill.", x: 960, y: 820, text: "faster than the bill · faster than the raise", size: 44, bg: R },
  ] },
  { at: "And premiums are only the front door.", items: [
    { k: "prop", kind: "door", x: 480, y: 880, s: 1.1 },
    { k: "num", w: "was $1,955 in 2026,", x: 1300, y: 380, to: 1955, f: "money", size: 140, col: N, sub: "average single-coverage deductible, 2026" },
    { k: "tag", w: "up from $1,886 in 2025.", x: 1300, y: 620, text: "2025: $1,886 (KFF calls the change statistically similar)", size: 32 },
  ] },
  { at: "Now a wrinkle.", tone: "#eceaf3", items: [
    { k: "tag", x: 960, y: 90, text: "12 months to Sept (BLS CPI) vs KFF premium survey", size: 32 },
    { k: "bars", x: 420, base: 800, max: 6.5, h: 500, gap: 420, bw: 240, bars: [
      { w: "medical care prices up just 1.5%", label: "medical care prices", v: 1.5, text: "+1.5%", col: GR },
      { w: "hospital services rose 5.6%.", label: "hospital services", v: 5.6, text: "+5.6%", col: R },
      { w: "Yet premiums rose 5%,", label: "family premiums", v: 5, text: "+5%", col: N }] },
    { k: "guy", w: "Both can be true.", x: 1700, y: 880, s: 0.55, pose: "shrug", expr: "sideeye" },
  ] },
  { at: "So why does the bill keep climbing?", items: [
    { k: "list", x: 300, y: 170, wd: 1300, h: 470, title: "WHY THE BILL CLIMBS", items: [
      { w: "named provider consolidation", text: "provider consolidation", mark: "none" },
      { w: "GLP-1 drugs", text: "GLP-1 drugs: ~1 point of the rise", mark: "none" },
      { w: "more price leverage", text: "more price leverage over insurers", mark: "none" }] },
    { k: "tag", x: 960, y: 760, text: "Mercer (now Marsh) National Survey of Employer-Sponsored Health Plans", size: 30 },
  ] },
  { at: "Giants negotiating with giants.", tone: "#f6efe6", items: [
    { k: "prop", kind: "bank", x: 560, y: 760, s: 1.5 },
    { k: "prop", kind: "bank", x: 1360, y: 760, s: 1.5 },
    { k: "prop", w: "You're not in that room.", kind: "lock", x: 960, y: 640, s: 1.0 },
    { k: "guy", w: "You're not in that room.", x: 960, y: 1000, s: 0.4, pose: "shrug", expr: "defeated" },
  ] },
  { at: "Zoom out.", items: [
    { k: "num", w: "about $62,000.", x: 620, y: 380, to: 62000, f: "money", size: 140, col: N, sub: "full-time worker's average earnings (KFF)" },
    { k: "prop", kind: "health", x: 1350, y: 480, s: 1.0 },
    { k: "num", w: "was over 40% of that", x: 1350, y: 800, to: 40, f: "raw", pre: "over ", post: "%", size: 120, col: R, sub: "full family premium, 2025" },
  ] },
  // ── who sets the price: child care, rent ──────────────────────────────────────────────────────
  { at: "Bill two, child care, is a supply problem", tone: "#f6efe6", items: [
    { k: "prop", kind: "daycare", x: 520, y: 760, s: 1.1 },
    { k: "num", w: "Licensed child care centers fell 1%", x: 1300, y: 340, to: 1, f: "raw", pre: "−", post: "%", size: 140, col: R, sub: "licensed centers, 2024 → 2025" },
    { k: "num", w: "Family child care homes rose 1.4%.", x: 1300, y: 620, to: 14, f: "tenth", pre: "+", post: "%", size: 120, col: G, sub: "family child care homes" },
    { k: "tag", w: "supply fails to keep pace", x: 1300, y: 820, text: "Child Care Aware: supply fails to keep pace with demand", size: 32, bg: N },
  ] },
  { at: "For an infant plus a 4-year-old,", items: [
    { k: "prop", kind: "map", x: 600, y: 540, s: 1.3, label: "center care > mortgage" },
    { k: "num", w: "in 39 states.", x: 1400, y: 450, to: 39, f: "raw", post: " states", size: 170, col: R, sub: "infant + 4-year-old: care tops the median mortgage" },
  ] },
  { at: "In the words of Child Care Aware's CEO,", tone: "#eceaf3", items: [
    { k: "quote", x: 960, y: 380, size: 56, quote: ["“families are being asked to shoulder costs", "that rival or exceed their biggest", "monthly expenses”"], who: "CEO, Child Care Aware of America", src: "Child Care Aware of America" },
  ] },
  { at: "Bill three, rent, runs on a lease clock.", tone: "#eef2f6", items: [
    { k: "prop", kind: "lease", x: 520, y: 560, s: 1.2 },
    { k: "prop", kind: "clock", x: 900, y: 500, s: 1.0 },
    { k: "num", w: "rose 2.8%", x: 1450, y: 450, to: 28, f: "tenth", pre: "+", post: "%", size: 160, col: N, sub: "official rent measure, 12 mo to Sept (BLS)" },
  ] },
  { at: "Apartment List's data tells", items: [
    { k: "prop", kind: "clock", x: 520, y: 500, s: 1.2 },
    { k: "num", w: "up just 0.1%", x: 1350, y: 400, to: 1, f: "tenth", pre: "+", post: "%", size: 170, col: G, sub: "national median rent, Oct vs a year ago (Apartment List)" },
    { k: "tag", w: "the first year-over-year increase", x: 1350, y: 680, text: "first yearly increase since mid-2023", size: 40, bg: N },
  ] },
  { at: "And rent is local.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "map", x: 560, y: 540, s: 1.3, label: "Census, county data" },
    { k: "num", w: "rose in 626 counties", x: 1380, y: 360, to: 626, f: "raw", size: 140, col: R, sub: "counties: median rent rose" },
    { k: "num", w: "and fell in 330.", x: 1380, y: 660, to: 330, f: "raw", size: 140, col: G, sub: "counties: median rent fell" },
  ] },
  { at: "Three bills, three pricing systems,", items: [
    { k: "prop", kind: "door", x: 480, y: 820, s: 0.8 },
    { k: "prop", plus: 5, kind: "door", x: 960, y: 820, s: 0.8 },
    { k: "prop", plus: 10, kind: "door", x: 1440, y: 820, s: 0.8 },
    { k: "tag", plus: 2, x: 480, y: 360, text: "rent", size: 44, bg: R },
    { k: "tag", plus: 7, x: 960, y: 360, text: "child care", size: 44, bg: R },
    { k: "tag", plus: 12, x: 1440, y: 360, text: "health", size: 44, bg: R },
    { k: "txt", w: "none of them set by the worker.", x: 960, y: 200, text: "none set by the worker", size: 64, col: R },
  ] },
  // ── record income, thin cushion ───────────────────────────────────────────────────────────────
  { at: "So how can income hit a record", tone: "#f6efe6", items: [
    { k: "guy", x: 960, y: 900, s: 0.75, pose: "shrug", expr: "thinking" },
    { k: "txt", x: 960, y: 260, text: "record income... thin cushion?", size: 80, col: N },
  ] },
  { at: "Here's the contradiction.", items: [
    { k: "num", w: "hit $87,460.", x: 960, y: 380, to: 87460, f: "money", size: 190, col: G, sub: "real median household income, 2025 (Census)" },
    { k: "tag", w: "Up 2.6%,", x: 600, y: 700, text: "+2.6%", size: 64, bg: G },
    { k: "tag", w: "the highest in records", x: 1300, y: 700, text: "highest since records began, 1967", size: 48, bg: N },
  ] },
  { at: "Same year, the Fed asked adults", tone: "#eef2f6", items: [
    { k: "prop", kind: "fed", x: 380, y: 520, s: 0.9 },
    { k: "tag", x: 1150, y: 90, text: "a $400 emergency · Fed survey, 2025", size: 32 },
    { k: "bars", x: 820, base: 800, max: 70, h: 500, gap: 360, bw: 220, bars: [
      { w: "63% would cover it", label: "cash or equivalent", v: 63, text: "63%", col: G },
      { w: "The other 37% wouldn't,", label: "wouldn't", v: 37, text: "37%", col: R },
      { w: "And 12% said", label: "couldn't pay now", v: 12, text: "12%", col: R }] },
  ] },
  { at: "That 63% was 68% in 2021.", items: [
    { k: "tag", x: 960, y: 90, text: "could cover $400 with cash or equivalent · Fed", size: 32 },
    { k: "line", x: 420, y: 760, wd: 1000, h: 400, min: 55, max: 72, post: "%", col: N, points: [
      { label: "2021", v: 68, w: "That 63% was 68%" }, { label: "2022", v: 63, w: "From 2022" }, { label: "2023", v: 63, w: "From 2022", plus: 6 },
      { label: "2024", v: 63, w: "From 2022", plus: 12 }, { label: "2025", v: 63, w: "four years running." }] },
    { k: "stamp", w: "The cushion hasn't rebuilt.", x: 1450, y: 280, text: "NOT REBUILT", size: 60 },
  ] },
  { at: "The same survey has good news.", tone: "#eaf3e6", items: [
    { k: "bars", x: 420, base: 800, max: 80, h: 520, gap: 420, bw: 240, ls: 34, bars: [
      { w: "73% of adults", label: "okay / comfortable", v: 73, text: "73%", col: G },
      { w: "But 19% said", label: "just getting by", v: 19, text: "19%", col: GR },
      { w: "and 8% said", label: "finding it difficult", v: 8, text: "8%", col: R }] },
    { k: "tag", x: 960, y: 90, text: "how adults said they were doing, 2025 · Fed", size: 32 },
  ] },
  { at: "The thinner number is savings.", items: [
    { k: "prop", kind: "piggy", x: 520, y: 760, s: 1.3, label: "empty" },
    { k: "num", w: "18% of adults said", x: 1350, y: 360, to: 18, f: "raw", post: "%", size: 160, col: R, sub: "could cover less than $100 from savings" },
    { k: "num", w: "Another 12% said", x: 1350, y: 680, to: 12, f: "raw", post: "%", size: 130, col: R, sub: "$100 to $499" },
  ] },
  { at: "And surprises aren't rare.", tone: "#f3ecec", items: [
    { k: "prop", kind: "fixer", x: 520, y: 800, s: 1.0 },
    { k: "guy", x: 900, y: 900, s: 0.55, pose: "shrug", expr: "shock" },
    { k: "num", w: "59% of adults", x: 1400, y: 340, to: 59, f: "raw", post: "%", size: 150, col: R, sub: "had a major unexpected expense in 12 months" },
    { k: "num", w: "27% paid $5,000 or more.", x: 1400, y: 670, to: 27, f: "raw", post: "%", size: 120, col: R, sub: "of major home/appliance repairs cost $5,000+" },
  ] },
  { at: "So both things are true.", items: [
    { k: "tag", x: 960, y: 90, text: "household income, 2025 · Census", size: 32 },
    { k: "bars", x: 620, base: 760, max: 2, h: 460, gap: 460, bw: 240, bars: [
      { w: "the 90th percentile rose 1.7%", label: "top (90th pct)", v: 1.7, text: "+1.7%", col: G },
      { w: "the 10th percentile", label: "bottom (10th pct)", v: 0.05, text: "no sig. change", col: GR }] },
  ] },
  { at: "Income is what comes in.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "paycheck", x: 420, y: 480, s: 0.9 },
    { k: "arrow", w: "A cushion is what's left", pts: [[680, 480], [860, 480]], col: N },
    { k: "list", w: "A cushion is what's left", x: 900, y: 300, wd: 420, h: 340, items: [
      { w: "A cushion is what's left", text: "rent", mark: "x" }, { w: "after three bills", text: "child care", mark: "x" }, { w: "priced somewhere else.", text: "health", mark: "x" }] },
    { k: "prop", w: "priced somewhere else.", plus: 12, kind: "piggy", x: 1600, y: 760, s: 0.9, label: "empty" },
  ] },
  { at: "And the job itself is a worry.", items: [
    { k: "guy", x: 480, y: 900, s: 0.7, hat: "hard", pose: "idle", expr: "defeated" },
    { k: "num", w: "42% of adults", x: 1300, y: 380, to: 42, f: "raw", post: "%", size: 170, col: R, sub: "worried about finding or keeping a job (2025)" },
    { k: "tag", w: "up from 37%", x: 1300, y: 650, text: "up from 37% in 2024", size: 44, bg: N },
    { k: "tag", w: "Price increases still topped", x: 1300, y: 780, text: "#1 worry: price increases", size: 44, bg: R },
  ] },
  // ── what's next ───────────────────────────────────────────────────────────────────────────────
  { at: "So what happens to these bills next?", tone: "#f3ecec", items: [
    { k: "prop", kind: "health", x: 480, y: 520, s: 1.0 },
    { k: "num", w: "rise 8.2% in 2027,", x: 1350, y: 380, to: 82, f: "tenth", pre: "+", post: "%", size: 170, col: R, sub: "employer health costs, 2027 (projected)" },
    { k: "stamp", w: "biggest jump since 2003.", x: 1350, y: 650, text: "BIGGEST SINCE 2003", size: 52 },
    { k: "tag", x: 1350, y: 820, text: "forecast · Mercer (now Marsh) survey", size: 34 },
  ] },
  { at: "Other projections land nearby.", items: [
    { k: "tag", x: 960, y: 90, text: "2027 employer health cost projections (forecasts)", size: 32 },
    { k: "bars", x: 420, base: 800, max: 12, h: 500, gap: 420, bw: 240, ls: 34, bars: [
      { label: "Marsh (after changes)", v: 8.2, text: "+8.2%", col: N },
      { w: "Aon projects 9.5%.", label: "Aon", v: 9.5, text: "+9.5%", col: N },
      { w: "it's about 11%.", label: "Marsh (before changes)", v: 11, text: "~11%", col: R }] },
    { k: "tag", w: "59% of employers plan", x: 960, y: 175, text: "59% of employers plan cost cuts, like higher deductibles", size: 32, bg: R },
  ] },
  { at: "If you buy your own plan,", tone: "#eef2f6", items: [
    { k: "prop", kind: "card", x: 480, y: 520, s: 1.3 },
    { k: "num", w: "increase of 15%.", x: 1350, y: 360, to: 15, f: "raw", pre: "+", post: "%", size: 160, col: R, sub: "median proposed 2027 increase, 276 insurers (KFF)" },
    { k: "num", w: "rose an average of 58%", x: 1350, y: 680, to: 58, f: "raw", pre: "+", post: "%", size: 130, col: R, sub: "out-of-pocket premiums in 2026, after subsidies expired" },
  ] },
  { at: "Here's how one insurer explained it,", items: [
    { k: "quote", w: "UnitedHealthcare wrote", x: 960, y: 380, size: 48, quote: ["the subsidy expiry and a proposed federal", "marketplace rule “account for 12.7%", "of the requested rate change”"], who: "UnitedHealthcare, New York rate filing", src: "as quoted by Peterson-KFF Health System Tracker" },
  ] },
  { at: "Groceries look calmer.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "cart", x: 520, y: 800, s: 1.2 },
    { k: "num", w: "up 2.8% in 2026", x: 1350, y: 300, to: 28, f: "tenth", pre: "+", post: "%", size: 140, col: N, sub: "all food prices, 2026 (USDA forecast)" },
    { k: "num", w: "1.7% in 2027.", x: 1350, y: 580, to: 17, f: "tenth", pre: "+", post: "%", size: 140, col: G, sub: "all food prices, 2027 (USDA forecast)" },
    { k: "tag", w: "food at home even slipped.", x: 1350, y: 820, text: "September: food at home slipped", size: 40, bg: G },
  ] },
  { at: "One more thing to watch.", items: [
    { k: "swarm", kind: "cal", n: 12, cols: 6, x: 560, y: 360, dx: 120, dy: 140, s: 1.6, keep: 12 },
    { k: "prop", w: "never collected", kind: "capitol", x: 1450, y: 760, s: 0.9 },
    { k: "tag", w: "couldn't publish most 12-month changes", x: 1380, y: 200, text: "Oct 2026: no 12-month rates (BLS)", size: 40, bg: R },
    { k: "tag", w: "September is the latest", x: 560, y: 780, text: "latest full yearly read: September", size: 40, bg: N },
  ] },
  // ── moves + close ─────────────────────────────────────────────────────────────────────────────
  { at: "So what do you do with all this?", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 100, text: MOVES, size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { w: "Three moves,", text: "1. health plans: your share + the deductible", size: 48, mark: "none", plus: 30 }] },
    { k: "guy", x: 1750, y: 900, s: 0.5, pose: "point", expr: "smug" },
  ] },
  { at: "One: when you compare health plans,", items: [
    { k: "prop", kind: "sheet", x: 620, y: 560, s: 1.1 },
    { k: "prop", plus: 6, kind: "sheet", x: 1300, y: 560, s: 1.1 },
    { k: "tag", w: "the worker's share of the premium", x: 620, y: 880, text: "your share of the premium", size: 40, bg: G },
    { k: "tag", w: "and the deductible,", x: 1300, y: 880, text: "the deductible", size: 40, bg: G },
    { k: "txt", w: "not just the plan name.", x: 960, y: 220, text: "not just the plan name", size: 64, col: R },
  ] },
  { at: "Two: on rent,", tone: "#eef2f6", items: [
    { k: "prop", kind: "lease", x: 480, y: 560, s: 1.1 },
    { k: "prop", kind: "clock", x: 860, y: 520, s: 0.8 },
    { k: "num", w: "fell 0.3% in October", x: 1450, y: 400, to: 3, f: "tenth", pre: "−", post: "%", size: 160, col: G, sub: "national median rent, Oct vs Sept (Apartment List)" },
    { k: "tag", w: "know what nearby listings ask.", x: 1300, y: 700, text: "before you renew: check nearby listings", size: 40, bg: G },
  ] },
  { at: "Three: on groceries,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "cart", x: 440, y: 800, s: 1.1 },
    { k: "bars", x: 900, base: 760, max: 4, h: 420, gap: 360, bw: 220, bars: [
      { w: "Store-brand dollar sales rose 3.3%", label: "store brands", v: 3.3, text: "+3.3%", col: G },
      { w: "against 1.2%", label: "national brands", v: 1.2, text: "+1.2%", col: GR }] },
    { k: "num", w: "a record $282.8 billion.", x: 1500, y: 200, to: 2828, f: "tenth", pre: "$", post: "B", size: 110, col: G, sub: "store-brand sales, 2025 (PLMA, Circana data)" },
  ] },
  { at: "So, paycheck to paycheck on a full-time job?", tone: "#f3ecec", items: [
    { k: "prop", kind: "receipt", x: 480, y: 560, s: 1.5 },
    { k: "num", w: "about $64,064 a year.", x: 1300, y: 300, to: 64064, f: "money", size: 120, col: N, sub: "median full-time paycheck" },
    { k: "num", w: "can claim about 61% of it.", x: 1300, y: 580, to: 61, f: "raw", pre: "~", post: "%", size: 140, col: R, sub: "rent + one child's care + health share" },
    { k: "stamp", w: "That's the receipt.", x: 1300, y: 820, text: "THAT'S THE RECEIPT", size: 56 },
  ] },
  { at: "So tell me:", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, pose: "point", expr: "smug" },
    { k: "tag", w: "rent,", x: 800, y: 260, text: "rent?", size: 60, bg: R },
    { k: "tag", w: "child care", x: 1180, y: 260, text: "child care?", size: 60, bg: R },
    { k: "tag", w: "or health coverage?", x: 1600, y: 260, text: "health?", size: 60, bg: R },
    { k: "comment", w: "Tell me in the comments.", x: 1180, y: 560, who: "you", text: "my biggest bite is ___", size: 50 },
  ] },
  { at: "If you got something out of this,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "a like and a subscribe", plus: 30, x: 960, y: 660, text: "📘 " + GUIDE, size: 40, bg: G },
  ] },
];

export const SHOTS = resolveShots(TL, SPECS, 0, TL.totalFrames + 300); // 10 s hold for the end screen
export const PAYCHECK_FRAMES = SHOTS[SHOTS.length - 1].b;
const LINES = TL.lines(0, TL.words.length - 1);
const HI = ["rent", "child", "care", "health", "paycheck", "premium", "deductible", "cushion", "record", "receipt"];
SHOTS[0] = { ...SHOTS[0], a: 0 };

export const Paycheck: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src="paycheck/narration.mp3" slices={TL.slices} />
    </AbsoluteFill>
  );
};
