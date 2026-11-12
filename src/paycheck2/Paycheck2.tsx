// "Paycheck to Paycheck on a Full-Time Job? 3 Bills Can Take 61%" — v2 (publishes Tue Nov 24, 2026).
// Re-voiced Nov 12 under Daniel's numbers rule: the narrator says rounded numbers, the screen shows the exact
// figure with its source, one or two numbers per shot. Numbers: cleared claim log factcheck/paycheck-to-paycheck.md.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import WORDS from "../../public/paycheck2/words.json";
import { Fonts, Captions, Narration, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const TL = makeTimeline((WORDS as any).words ?? (WORDS as any), FPS);
const G = COL.green, R = COL.red, N = COL.navy, GR = "#8a8f99";
const GUIDE = "beginner's guide: link in the description";

const SPECS: ShotSpec[] = [
  // ── hook ──────────────────────────────────────────────────────────────────────────────────────
  { at: "If you're living paycheck to paycheck", items: [
    { k: "guy", x: 300, y: 880, s: 0.7, pose: "idle", expr: "deadpan", poses: [["about six dollars out of every ten", "shrug", "shock"]] },
    { k: "prop", kind: "paycheck", x: 900, y: 520, s: 1.3, label: "$ $ $" },
    { k: "tag", w: "Rent,", x: 1500, y: 230, text: "rent", size: 50, bg: R },
    { k: "tag", w: "child care", x: 1500, y: 330, text: "child care", size: 50, bg: R },
    { k: "tag", w: "and health coverage", x: 1500, y: 430, text: "health coverage", size: 50, bg: R },
    { k: "num", w: "about six dollars out of every ten", x: 1500, y: 680, to: 61, f: "raw", pre: "~", post: "%", size: 200, col: R, sub: "of the median paycheck, before tax" },
    { k: "tag", x: 960, y: 60, text: "an illustration · our math from BLS, Census, Child Care Aware, KFF", size: 28 },
  ] },
  { at: "And it's not because you bought", tone: "#f6efe6", items: [
    { k: "prop", kind: "coffee", x: 420, y: 760, s: 1.3 },
    { k: "stamp", plus: 12, x: 420, y: 480, text: "NOT THIS", size: 80 },
    { k: "prop", w: "Putting two kids", kind: "daycare", x: 1050, y: 780, s: 0.9 },
    { k: "num", w: "in all 47 states", x: 1450, y: 330, to: 47, f: "raw", post: " of 47 states", size: 100, col: R, sub: "2 kids in a center cost more than a year of median rent" },
    { k: "tag", x: 1300, y: 60, text: "Child Care Aware of America", size: 28 },
  ] },
  { at: "So let's build the budget,", items: [
    { k: "prop", kind: "receipt", x: 620, y: 560, s: 1.4 },
    { k: "guy", x: 1350, y: 900, s: 0.7, pose: "point", expr: "smug" },
    { k: "txt", w: "who actually sets each price.", x: 1350, y: 260, text: "who sets each price?", size: 70, col: R },
  ] },
  // ── the paycheck ──────────────────────────────────────────────────────────────────────────────
  { at: "First, the paycheck.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "paycheck", x: 620, y: 480, s: 1.3, label: "$1,232 / week" },
    { k: "tag", x: 620, y: 800, text: "median full-time worker, Q3 2026 · BLS", size: 34 },
    { k: "num", w: "about sixty-four thousand dollars a year,", x: 1420, y: 480, to: 64064, f: "money", post: "/yr", size: 140, col: G, sub: "before tax (our math: × 52)" },
  ] },
  { at: "And that's the middle.", items: [
    { k: "swarm", kind: "worker", n: 10, cols: 10, x: 960, y: 440, dx: 150, dy: 0, s: 1.8, col: N },
    { k: "txt", w: "Half of all full-time workers", x: 960, y: 720, text: "half earn less", size: 70, col: N },
    { k: "stamp", w: "Not the bottom.", x: 960, y: 200, text: "THE TYPICAL FULL-TIMER", size: 48, col: N },
  ] },
  { at: "Is that paycheck keeping up?", tone: "#f3ecec", items: [
    { k: "tag", x: 960, y: 90, text: "Q3 2026 vs a year earlier · BLS", size: 32 },
    { k: "bars", x: 420, base: 800, max: 4, h: 520, gap: 420, bw: 240, bars: [
      { w: "rose about one and a half percent.", label: "median weekly pay", v: 1.5, text: "+1.5%", col: N },
      { w: "Prices rose more than twice", label: "consumer prices", v: 3.5, text: "+3.5%", col: R }] },
    { k: "stamp", w: "Prices rose more than twice", plus: 20, x: 1500, y: 560, text: "LOST GROUND", size: 56 },
  ] },
  { at: "To be fair, other pay measures", tone: "#eaf3e6", items: [
    { k: "tag", x: 960, y: 90, text: "12-month changes · BLS", size: 32 },
    { k: "bars", x: 420, base: 800, max: 4, h: 520, gap: 420, bw: 240, bars: [
      { w: "Average hourly pay", label: "hourly pay (to Oct)", v: 3.1, text: "+3.1%", col: G },
      { w: "once you leave out food and energy.", label: "core prices (to Sept)", v: 2.6, text: "+2.6%", col: GR }] },
    { k: "prop", w: "But nobody gets to leave out gas.", kind: "car", x: 1500, y: 700, s: 0.9 },
    { k: "tag", w: "But nobody gets to leave out gas.", x: 1500, y: 300, text: "gasoline: +9.1% in September alone", size: 36, bg: R },
  ] },
  { at: "And wages against prices is only half", tone: "#f6efe6", items: [
    { k: "guy", x: 420, y: 880, s: 0.7, pose: "walk", expr: "thinking" },
    { k: "prop", w: "The squeeze hides in three bills.", kind: "mail", x: 960, y: 600, s: 0.8, label: "RENT" },
    { k: "prop", w: "The squeeze hides in three bills.", plus: 5, kind: "mail", x: 1300, y: 600, s: 0.8, label: "CHILD CARE" },
    { k: "prop", w: "The squeeze hides in three bills.", plus: 10, kind: "mail", x: 1640, y: 600, s: 0.8, label: "HEALTH" },
  ] },
  // ── the three bills ───────────────────────────────────────────────────────────────────────────
  { at: "Bill one: rent.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 1: RENT", size: 48, bg: R },
    { k: "prop", kind: "apartment", x: 520, y: 860, s: 1.1 },
    { k: "num", w: "just over fifteen hundred dollars a month.", x: 1350, y: 400, to: 1557, f: "money", post: "/mo", size: 140, col: N, sub: "median gross rent (rent + utilities), 2025 · Census" },
    { k: "num", w: "nearly three dollars of every ten", x: 1350, y: 720, to: 292, f: "tenth", post: "%", size: 130, col: R, sub: "of the median paycheck, before tax" },
  ] },
  { at: "Bill two: child care.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 2: CHILD CARE", size: 48, bg: R },
    { k: "prop", kind: "daycare", x: 520, y: 760, s: 1.1 },
    { k: "num", w: "about thirteen thousand dollars a year,", x: 1350, y: 380, to: 13184, f: "money", post: "/yr", size: 140, col: N, sub: "average price, one child · Child Care Aware" },
    { k: "tag", w: "about a fifth of the paycheck.", x: 1350, y: 620, text: "20.6% of the median paycheck", size: 40, bg: R },
    { k: "tag", w: "For a single parent,", x: 1350, y: 740, text: "single parent: 33% of median income", size: 40, bg: R },
  ] },
  { at: "Bill three: health coverage.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "BILL 3: HEALTH COVERAGE · KFF 2026", size: 44, bg: R },
    { k: "prop", kind: "health", x: 520, y: 520, s: 1.1 },
    { k: "num", w: "about twenty-eight thousand dollars a year.", x: 1350, y: 380, to: 28303, f: "money", post: "/yr", size: 130, col: N, sub: "average family premium, 2026" },
    { k: "num", w: "about seventy-five hundred dollars.", x: 1350, y: 720, to: 7471, f: "money", post: "/yr", size: 130, col: R, sub: "the worker's share" },
  ] },
  { at: "Now put them on one receipt.", items: [
    { k: "prop", kind: "receipt", x: 500, y: 560, s: 1.6 },
    { k: "list", x: 860, y: 170, wd: 900, h: 420, title: "ONE PAYCHECK", items: [
      { w: "Rent.", text: "rent + utilities", mark: "none" },
      { w: "One child's care.", text: "one child's care", mark: "none" },
      { w: "Your share of a family health plan.", text: "your share of a family premium", mark: "none" }] },
    { k: "num", w: "about thirty-nine thousand dollars a year.", x: 1310, y: 760, to: 39339, f: "money", post: "/yr", size: 120, col: R, sub: "our math" },
  ] },
  { at: "Against a sixty-four thousand dollar paycheck,", tone: "#f3ecec", items: [
    { k: "bars", x: 420, base: 800, max: 100, h: 560, gap: 420, bw: 260, bars: [
      { w: "that's about 61 percent.", label: "three bills", v: 61, text: "~61%", col: R },
      { w: "Before tax, before food,", label: "everything else", v: 39, text: "~39%", col: GR }] },
    { k: "stamp", w: "Gone.", x: 1500, y: 300, text: "GONE", size: 110 },
    { k: "guy", x: 1600, y: 900, s: 0.6, pose: "facepalm", expr: "defeated" },
  ] },
  { at: "To be fair, many households", items: [
    { k: "prop", kind: "person", x: 640, y: 880, s: 1.2 },
    { k: "prop", plus: 6, kind: "person", x: 820, y: 880, s: 1.1, seed: 9 },
    { k: "tag", w: "This is an illustration,", x: 1350, y: 420, text: "ILLUSTRATION, NOT A REAL BUDGET", size: 48, bg: N },
    { k: "txt", w: "how much of one paycheck", x: 1350, y: 620, text: "...but it shows the size of the bite", size: 52 },
  ] },
  { at: "And the government's own spending survey", tone: "#eaf3e6", items: [
    { k: "prop", kind: "house", x: 460, y: 820, s: 0.9 },
    { k: "prop", plus: 8, kind: "cart", x: 900, y: 860, s: 0.7 },
    { k: "num", w: "nearly half of everything it spends.", x: 1400, y: 400, to: 38423, f: "money", size: 130, col: R, sub: "housing ($27,790) + food, average household, 2025 · BLS" },
    { k: "stamp", w: "nearly half of everything it spends.", plus: 16, x: 1400, y: 700, text: "NEARLY HALF", size: 60 },
  ] },
  { at: "But the real question isn't", items: [
    { k: "guy", x: 960, y: 900, s: 0.75, pose: "point", expr: "thinking" },
    { k: "txt", w: "It's who sets the prices.", x: 960, y: 260, text: "who sets the prices?", size: 90, col: R },
  ] },
  { at: "Quick one: if this is useful,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "my beginner's guide", x: 900, y: 700, text: "📘 " + GUIDE, size: 44, bg: G },
  ] },
  // ── who sets the price ────────────────────────────────────────────────────────────────────────
  { at: "Start with health coverage.", tone: "#eef2f6", items: [
    { k: "prop", kind: "health", x: 380, y: 400, s: 0.8 },
    { k: "tag", x: 1150, y: 90, text: "worker's share of a family premium · KFF 2026", size: 32 },
    { k: "bars", x: 820, base: 800, max: 40, h: 500, gap: 400, bw: 230, bars: [
      { w: "a little over a quarter", label: "average", v: 27, text: "27%", col: N },
      { w: "it's more than a third.", label: "small firms", v: 37, text: "37%", col: R }] },
  ] },
  { at: "Now watch the speed.", items: [
    { k: "tag", x: 960, y: 90, text: "KFF Employer Health Benefits Survey, 2026", size: 32 },
    { k: "bars", x: 420, base: 800, max: 6, h: 500, gap: 420, bw: 240, bars: [
      { w: "grew 5 percent.", label: "family premium", v: 5, text: "+5%", col: R },
      { w: "Wages grew less than 4.", label: "wages", v: 3.7, text: "+3.7%", col: N }] },
  ] },
  { at: "Here's the part that stings.", tone: "#f3ecec", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, pose: "idle", expr: "angry" },
    { k: "prop", kind: "paycheck", x: 960, y: 480, s: 1.1, label: "your paycheck" },
    { k: "num", w: "About 9 percent.", x: 1500, y: 340, to: 9, f: "raw", pre: "+", post: "%", size: 160, col: R, sub: "worker's premium share, 2026" },
    { k: "num", w: "more than six hundred dollars extra", x: 1500, y: 660, to: 621, f: "money", pre: "+", post: "/yr", size: 120, col: R, sub: "vs 2025 · KFF" },
  ] },
  { at: "Faster than the bill.", items: [
    { k: "stamp", x: 620, y: 420, text: "FASTER THAN THE BILL", size: 60, r: -5 },
    { k: "stamp", w: "Faster than the raise.", x: 1300, y: 660, text: "FASTER THAN THE RAISE", size: 60, r: 4 },
  ] },
  { at: "So why does it keep climbing?", tone: "#f6efe6", items: [
    { k: "list", x: 300, y: 170, wd: 1300, h: 470, title: "WHY THE BILL CLIMBS", items: [
      { w: "hospitals and doctor groups merging.", text: "hospitals + doctor groups merging", mark: "none" },
      { w: "more power to set prices", text: "more price leverage over insurers", mark: "none" },
      { w: "GLP-1 drugs,", text: "GLP-1 drugs: ~1 point of the rise", mark: "none" }] },
    { k: "tag", x: 960, y: 760, text: "Mercer (now Marsh) National Survey of Employer-Sponsored Health Plans", size: 30 },
  ] },
  { at: "Giants negotiating with giants.", items: [
    { k: "prop", kind: "bank", x: 560, y: 760, s: 1.5 },
    { k: "prop", kind: "bank", x: 1360, y: 760, s: 1.5 },
    { k: "prop", w: "You're not in that room.", kind: "lock", x: 960, y: 640, s: 1.0 },
    { k: "guy", w: "You're not in that room.", x: 960, y: 1000, s: 0.4, pose: "shrug", expr: "defeated" },
  ] },
  { at: "Bill two, child care, is a different story.", tone: "#f6efe6", items: [
    { k: "prop", kind: "daycare", x: 520, y: 760, s: 1.1 },
    { k: "tag", w: "It's a supply problem", x: 1300, y: 240, text: "a supply problem", size: 60, bg: N },
    { k: "num", w: "dipped about 1 percent last year,", x: 1300, y: 520, to: 1, f: "raw", pre: "−", post: "%", size: 150, col: R, sub: "licensed centers, 2024 → 2025 (homes: +1.4%)" },
  ] },
  { at: "Child Care Aware's own headline", tone: "#eceaf3", items: [
    { k: "quote", x: 960, y: 420, size: 70, quote: ["“supply fails to keep", "pace with demand”"], who: "Child Care Aware of America", src: "report headline" },
  ] },
  { at: "In 39 states,", items: [
    { k: "prop", kind: "map", x: 560, y: 540, s: 1.2, label: "center care > mortgage" },
    { k: "num", x: 1400, y: 420, to: 39, f: "raw", post: " states", size: 170, col: R, sub: "infant + 4-year-old: care tops the median mortgage" },
    { k: "tag", w: "In the words of Child Care Aware's CEO,", x: 1350, y: 760, text: "“rival or exceed” the biggest monthly bills", size: 32, bg: N },
  ] },
  { at: "Bill three, rent, runs on a lease clock.", tone: "#eef2f6", items: [
    { k: "prop", kind: "lease", x: 420, y: 560, s: 1.1 },
    { k: "prop", kind: "clock", x: 780, y: 500, s: 0.9 },
    { k: "num", w: "just under 3 percent", x: 1300, y: 360, to: 28, f: "tenth", pre: "+", post: "%", size: 130, col: N, sub: "official rent measure, 12 mo to Sept · BLS" },
    { k: "num", w: "basically flat from a year ago.", x: 1300, y: 700, to: 1, f: "tenth", pre: "+", post: "%", size: 130, col: G, sub: "rents on new leases, Oct vs a year ago · Apartment List" },
  ] },
  { at: "One reason for the gap:", items: [
    { k: "prop", kind: "lease", x: 560, y: 560, s: 1.2 },
    { k: "swarm", w: "usually once a year.", kind: "cal", n: 12, cols: 6, x: 1100, y: 360, dx: 110, dy: 130, s: 1.4, keep: 12 },
    { k: "tag", w: "So the official number moves slower", x: 1380, y: 760, text: "official number: slower than new leases", size: 40, bg: N },
  ] },
  { at: "Three bills.", tone: "#f6efe6", items: [
    { k: "prop", kind: "door", x: 480, y: 820, s: 0.8 },
    { k: "prop", w: "Three pricing systems.", kind: "door", x: 960, y: 820, s: 0.8 },
    { k: "prop", w: "Three pricing systems.", plus: 6, kind: "door", x: 1440, y: 820, s: 0.8 },
    { k: "tag", x: 480, y: 360, text: "rent", size: 44, bg: R },
    { k: "tag", w: "Three pricing systems.", x: 960, y: 360, text: "child care", size: 44, bg: R },
    { k: "tag", w: "Three pricing systems.", plus: 6, x: 1440, y: 360, text: "health", size: 44, bg: R },
    { k: "txt", w: "None of them set by the worker.", x: 960, y: 200, text: "none set by the worker", size: 64, col: R },
  ] },
  // ── record income, thin cushion ───────────────────────────────────────────────────────────────
  { at: "So here's the contradiction.", items: [
    { k: "num", w: "About eighty-seven thousand dollars,", x: 960, y: 380, to: 87460, f: "money", size: 190, col: G, sub: "real median household income, 2025 · Census" },
    { k: "tag", w: "the highest on record,", x: 960, y: 700, text: "highest since records began in 1967 (+2.6%)", size: 44, bg: N },
  ] },
  { at: "Same year, the Federal Reserve asked", tone: "#eef2f6", items: [
    { k: "prop", kind: "fed", x: 460, y: 620, s: 1.0 },
    { k: "num", w: "a four hundred dollar emergency", x: 1350, y: 400, to: 400, f: "money", size: 220, col: N, sub: "an emergency expense · Fed survey, 2025" },
    { k: "tag", w: "with cash,", x: 1350, y: 720, text: "paid with cash or its equivalent?", size: 40 },
  ] },
  { at: "About six in ten said yes.", items: [
    { k: "tag", x: 960, y: 90, text: "a $400 emergency · Fed survey, 2025", size: 32 },
    { k: "bars", x: 380, base: 800, max: 70, h: 500, gap: 400, bw: 230, bars: [
      { label: "cash or equivalent", v: 63, text: "63%", col: G },
      { w: "Nearly four in ten said no.", label: "wouldn't", v: 37, text: "37%", col: R },
      { w: "about one in eight adults", label: "couldn't pay now", v: 12, text: "12%", col: R }] },
  ] },
  { at: "And that number isn't healing.", tone: "#f3ecec", items: [
    { k: "tag", x: 960, y: 90, text: "could cover $400 with cash or equivalent · Fed", size: 32 },
    { k: "line", x: 420, y: 760, wd: 1000, h: 400, min: 55, max: 72, post: "%", col: N, points: [
      { label: "2021", v: 68, w: "68 percent could cover it." }, { label: "2022", v: 63, w: "stuck at 63," }, { label: "2023", v: 63, w: "stuck at 63,", plus: 6 },
      { label: "2024", v: 63, w: "stuck at 63,", plus: 12 }, { label: "2025", v: 63, w: "four years running." }] },
    { k: "stamp", w: "The cushion hasn't rebuilt.", x: 1450, y: 280, text: "NOT REBUILT", size: 60 },
  ] },
  { at: "It gets thinner.", items: [
    { k: "prop", kind: "piggy", x: 520, y: 760, s: 1.3, label: "empty" },
    { k: "num", w: "Nearly one in five adults", x: 1350, y: 460, to: 18, f: "raw", post: "%", size: 190, col: R, sub: "could cover less than $100 from savings alone · Fed" },
  ] },
  { at: "And surprises aren't rare.", tone: "#f3ecec", items: [
    { k: "prop", kind: "fixer", x: 520, y: 800, s: 1.0 },
    { k: "guy", x: 900, y: 900, s: 0.55, pose: "shrug", expr: "shock" },
    { k: "num", w: "About six in ten adults", x: 1400, y: 440, to: 59, f: "raw", post: "%", size: 180, col: R, sub: "had a major unexpected expense · Fed" },
  ] },
  { at: "So both things are true.", tone: "#eaf3e6", items: [
    { k: "tag", w: "Record income,", x: 520, y: 220, text: "record income", size: 60, bg: G },
    { k: "tag", w: "thin cushion.", x: 1400, y: 220, text: "thin cushion", size: 60, bg: R },
    { k: "prop", w: "Because income is what comes in.", kind: "paycheck", x: 420, y: 620, s: 0.9 },
    { k: "arrow", w: "A cushion is what's left,", pts: [[680, 620], [860, 620]], col: N },
    { k: "list", w: "A cushion is what's left,", x: 900, y: 440, wd: 420, h: 340, items: [
      { w: "A cushion is what's left,", text: "rent", mark: "x" }, { w: "after three bills", text: "child care", mark: "x" }, { w: "priced somewhere else.", text: "health", mark: "x" }] },
    { k: "prop", w: "priced somewhere else.", plus: 12, kind: "piggy", x: 1600, y: 860, s: 0.9, label: "empty" },
  ] },
  // ── what's next ───────────────────────────────────────────────────────────────────────────────
  { at: "So what happens to these bills next?", items: [
    { k: "guy", x: 960, y: 900, s: 0.75, pose: "shrug", expr: "thinking" },
    { k: "txt", x: 960, y: 260, text: "what happens next?", size: 90, col: N },
  ] },
  { at: "Health coverage first.", tone: "#f3ecec", items: [
    { k: "prop", kind: "health", x: 480, y: 520, s: 1.0 },
    { k: "num", w: "rise about 8 percent next year.", x: 1350, y: 360, to: 82, f: "tenth", pre: "+", post: "%", size: 170, col: R, sub: "employer health costs, 2027 (projected)" },
    { k: "stamp", w: "biggest jump since 2003.", x: 1350, y: 620, text: "BIGGEST SINCE 2003", size: 52 },
    { k: "tag", w: "That's a forecast,", x: 1350, y: 800, text: "FORECAST · Mercer (now Marsh) survey", size: 36, bg: N },
  ] },
  { at: "If you buy your own plan,", tone: "#eef2f6", items: [
    { k: "prop", kind: "card", x: 480, y: 520, s: 1.3 },
    { k: "num", w: "increase of 15 percent", x: 1350, y: 440, to: 15, f: "raw", pre: "+", post: "%", size: 190, col: R, sub: "median proposed 2027 increase · KFF" },
    { k: "tag", w: "marketplace insurers", x: 1350, y: 720, text: "marketplace plans, filings as of August", size: 38, bg: N },
  ] },
  { at: "Groceries look calmer.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "cart", x: 520, y: 800, s: 1.2 },
    { k: "num", w: "less than 3 percent this year,", x: 1350, y: 300, to: 28, f: "tenth", pre: "+", post: "%", size: 140, col: N, sub: "all food prices, 2026 (USDA forecast)" },
    { k: "num", w: "less than 2 next year.", x: 1350, y: 620, to: 17, f: "tenth", pre: "+", post: "%", size: 140, col: G, sub: "all food prices, 2027 (USDA forecast)" },
  ] },
  // ── moves + close ─────────────────────────────────────────────────────────────────────────────
  { at: "So what do you do with all this?", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 100, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { w: "One: when you compare health plans,", text: "1. health plans: your share + the deductible", size: 48, mark: "none" },
      { w: "Two: before you renew a lease,", text: "2. before you renew: check nearby listings", size: 48, mark: "none" },
      { w: "Three: at the grocery store,", text: "3. compare unit prices on store brands", size: 48, mark: "none" }] },
    { k: "tag", w: "Store-brand sales grew", x: 960, y: 820, text: "store brands +3.3% vs name brands +1.2%, 2025 · PLMA (Circana data)", size: 32, bg: G },
  ] },
  { at: "So, paycheck to paycheck on a full-time job?", tone: "#f3ecec", items: [
    { k: "prop", kind: "receipt", x: 480, y: 560, s: 1.5 },
    { k: "num", w: "about six dollars of every ten.", x: 1300, y: 400, to: 61, f: "raw", pre: "~", post: "%", size: 180, col: R, sub: "rent + one child's care + health share" },
    { k: "stamp", w: "That's the receipt.", x: 1300, y: 760, text: "THAT'S THE RECEIPT", size: 56 },
  ] },
  { at: "So tell me:", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, pose: "point", expr: "smug" },
    { k: "tag", w: "Rent,", x: 800, y: 260, text: "rent?", size: 60, bg: R },
    { k: "tag", w: "child care,", x: 1180, y: 260, text: "child care?", size: 60, bg: R },
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
export const PAYCHECK2_FRAMES = SHOTS[SHOTS.length - 1].b;
const LINES = TL.lines(0, TL.words.length - 1);
const HI = ["rent", "child", "care", "health", "paycheck", "premium", "cushion", "record", "receipt"];
SHOTS[0] = { ...SHOTS[0], a: 0 };

export const Paycheck2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src="paycheck2/narration.mp3" slices={TL.slices} />
    </AbsoluteFill>
  );
};
