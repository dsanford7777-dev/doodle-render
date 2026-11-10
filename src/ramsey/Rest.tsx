// Everything after the maths: "What Dave Admits" -> "Buy less house" -> 1981 -> the productivity gap -> the bills ->
// Washington -> where Dave is right -> what I'd do. One picture per sentence; numbers only from the script's sources.
// Co-host lines (May 19, 2026 episode) were George Kamel & Rachel Cruze, NOT Dave: never put them in Dave's mouth.
import { COL, KEY } from "../kit";
import { TL } from "./edit";
import { resolveShots, ShotSpec } from "./scenes";

const G = COL.green, R = COL.red, N = COL.navy;

const SPECS: ShotSpec[] = [
  // ── What Dave admits ───────────────────────────────────────────────────────────────────────────
  { at: "Let's be fair to the man", tone: "#f4efe3", items: [
    { k: "dave", x: 1250, y: 820, s: 0.85 },
    { k: "tag", x: 1250, y: 200, text: "DAVE RAMSEY" },
    { k: "guy", x: 520, y: 840, s: 0.8, pose: "idle", expr: "thinking" },
    { k: "txt", w: "fair", x: 520, y: 220, text: "let's be fair", size: 70 },
  ] },
  { at: "Dave Ramsey isn't pretending", tone: "#eceaf3", items: [
    { k: "tv", x: 560, y: 470, arm: "idle" },
    { k: "tag", w: "In March,", x: 560, y: 830, text: "FOX Business · Mar 22, 2026", size: 34 },
    { k: "txt", w: "young people", x: 1420, y: 300, text: "can't scrape together", size: 56 },
    { k: "txt", w: "young people", plus: 6, x: 1420, y: 380, text: "a down payment", size: 56 },
    { k: "bubble", w: "Corporate America has", x: 1010, y: 470, wd: 820, tx: 820, ty: 560, size: 66, lines: ["“Corporate America", "has screwed you.”"] },
  ] },
  { at: "He was talking about car payments", items: [
    { k: "prop", w: "car payments,", kind: "car", x: 380, y: 420, s: 1 },
    { k: "prop", w: "student loans", kind: "cap", x: 960, y: 420, s: 1.2 },
    { k: "prop", w: "credit cards.", kind: "card", x: 1540, y: 390, s: 1 },
    { k: "prop", w: "car companies,", kind: "car", x: 380, y: 760, s: 0.6 },
    { k: "tag", w: "car companies,", x: 380, y: 830, text: "car companies", size: 36 },
    { k: "prop", w: "big banks,", kind: "bank", x: 960, y: 770, s: 0.6 },
    { k: "tag", w: "big banks,", x: 960, y: 830, text: "big banks", size: 36 },
    { k: "prop", w: "and Congress.", kind: "capitol", x: 1540, y: 770, s: 0.6 },
    { k: "tag", w: "and Congress.", x: 1540, y: 830, text: "Congress", size: 36 },
  ] },
  { at: "And in May, on The Ramsey Show,", tone: "#eef2f6", items: [
    { k: "prop", kind: "mic", x: 330, y: 620, s: 1.1 },
    { k: "tag", x: 420, y: 790, text: "The Ramsey Show · May 19, 2026", size: 32 },
    { k: "tag", w: "his own co-hosts", x: 420, y: 160, text: "co-hosts (Dave wasn't on)", size: 34, bg: "#3b3f4a" },
    { k: "txt", w: "the median home now", x: 1320, y: 180, text: "home price ÷ income", size: 52, col: "#4a4a55" },
    { k: "bars", x: 1040, base: 760, max: 6.5, h: 470, gap: 320, bw: 200, bars: [
      { w: "about two times", label: "1970s", v: 2, text: "~2x", col: G },
      { w: "six times", label: "now", v: 6, text: "~6x", col: R } ] },
    { k: "quote", w: "Part of it is structural.", x: 960, y: 430, size: 90, quote: ["“Part of it is structural.”"], who: "Ramsey Show co-hosts", src: "The Ramsey Show · May 19, 2026" },
  ] },
  { at: "So we agree on the problem.", items: [
    { k: "list", x: 360, y: 150, wd: 1200, title: "WE AGREE", items: [
      { w: "Prices got away", text: "Prices got away from paychecks", size: 54 },
      { w: "Big companies profit", text: "Big companies profit off people who struggle", size: 48 } ] },
    { k: "guy", w: "So we agree", x: 1680, y: 860, s: 0.55, pose: "point", expr: "smug" },
  ] },
  { at: "Here's where we split.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "fork", x: 960, y: 820, s: 1.3 },
    { k: "tag", w: "where we split", x: 640, y: 300, text: "fix the system", size: 44, bg: G },
    { k: "tag", w: "the fix is you.", x: 1280, y: 300, text: "fix YOU", size: 44, bg: R },
    { k: "dave", w: "After Dave admits", x: 1650, y: 840, s: 0.6, arms: [["the fix is you.", "point"]] },
    { k: "list", w: "Pay off the debt,", x: 140, y: 420, wd: 560, h: 380, items: [
      { w: "Pay off the debt,", text: "pay off debt", mark: "none" },
      { w: "follow the steps,", text: "follow the steps", mark: "none" },
      { w: "and wait.", text: "...and wait", mark: "none", col: R } ] },
    { k: "prop", w: "and wait.", kind: "clock", x: 960, y: 560, s: 0.7 },
  ] },
  // ── Buy less house ────────────────────────────────────────────────────────────────────────────
  { at: "Quick one: if this is useful,", tone: "#f6efe6", items: [
    { k: "guy", x: 520, y: 840, s: 0.85, pose: "point", expr: "fakesmile" },
    { k: "prop", w: "a like", kind: "thumb", x: 1100, y: 420, s: 1.4 },
    { k: "prop", w: "subscribe", kind: "subscribe", x: 1400, y: 640, s: 1.1 },
  ] },
  { at: "Now, Dave's fans already have", items: [
    { k: "comment", w: "Then buy less house.", x: 820, y: 380, text: "“Then buy less house.”", size: 60 },
    { k: "guy", w: "Okay. Let's do that.", x: 1600, y: 860, s: 0.6, pose: "shrug", expr: "deadpan" },
  ] },
  { at: "Working his rule backwards", tone: "#eef2f6", items: [
    { k: "prop", kind: "house", x: 560, y: 760, s: 1.1 },
    { k: "num", x: 560, y: 270, to: 403200, f: "money", size: 100, sub: "median home" },
    { k: "prop", w: "about $222,000.", kind: "house", x: 1380, y: 760, s: 0.6 },
    { k: "num", w: "about $222,000.", x: 1380, y: 420, to: 222000, f: "money", size: 110, col: G, sub: "what Dave's rule allows" },
    { k: "stamp", w: "barely half", x: 1380, y: 200, text: "BARELY HALF", size: 64 },
  ] },
  { at: "In most of the country,", items: [
    { k: "txt", x: 960, y: 170, text: "not a starter home. It's...", size: 64 },
    { k: "prop", w: "a long commute,", kind: "road", x: 380, y: 680, s: 1 },
    { k: "tag", w: "a long commute,", x: 380, y: 760, text: "a long commute", size: 36 },
    { k: "prop", w: "a major fixer-upper,", kind: "fixer", x: 960, y: 680, s: 0.9 },
    { k: "tag", w: "a major fixer-upper,", x: 960, y: 760, text: "a fixer-upper", size: 36 },
    { k: "prop", w: "or nothing at all.", kind: "lot", x: 1540, y: 680, s: 1 },
    { k: "tag", w: "or nothing at all.", x: 1540, y: 760, text: "nothing at all", size: 36 },
  ] },
  { at: "Then make more money.", items: [
    { k: "comment", x: 820, y: 260, text: "“Then make more money.”", size: 60 },
    { k: "txt", w: "To buy the median", x: 960, y: 470, text: "take-home needed for the median home, Dave's way", size: 46, col: "#4a4a55" },
    { k: "num", w: "about $11,300", x: 560, y: 650, to: 11300, f: "money", post: "/mo", size: 105, col: R },
    { k: "num", w: "roughly $135,000", x: 1360, y: 650, to: 135000, f: "money", post: "/yr", size: 105, col: R },
    { k: "stamp", w: "Not before taxes. After.", plus: 20, x: 1360, y: 790, text: "AFTER TAXES", size: 56 },
  ] },
  { at: "And on that same episode", tone: "#eceaf3", items: [
    { k: "prop", kind: "phone", x: 420, y: 560, s: 1.2 },
    { k: "tag", w: "a caller named Owen", x: 420, y: 160, text: "CALLER: OWEN", size: 44 },
    { k: "tag", x: 420, y: 830, text: "The Ramsey Show · May 19, 2026", size: 30 },
    { k: "list", w: "he makes $124,000", x: 820, y: 130, wd: 980, h: 660, items: [
      { w: "he makes $124,000", text: "$124,000 a year", size: 54 },
      { w: "working two jobs,", text: "works two jobs" },
      { w: "bought a used car,", text: "bought a used car" },
      { w: "went to a cheap", text: "cheap in-state college" },
      { w: "still can't afford", text: "still can't afford a home", mark: "x", col: R } ] },
  ] },
  { at: "So what does everybody else do?", items: [
    { k: "prop", w: "They rent.", kind: "apartment", x: 860, y: 820, s: 1.2 },
    { k: "guy", w: "They rent.", x: 1460, y: 860, s: 0.6, pose: "idle", expr: "defeated" },
  ] },
  { at: "And Harvard's Joint Center", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 120, text: "Harvard Joint Center for Housing Studies · 2024", size: 34 },
    { k: "num", w: "22.7 million", x: 600, y: 330, to: 227, f: "tenth", pre: "", post: "M", size: 150, col: R, sub: "renter households, cost-burdened (a record)" },
    { k: "txt", w: "spending more than 30%", x: 600, y: 480, text: "30%+ of income on rent & utilities", size: 46 },
    { k: "swarm", w: "renter households", n: 20, cols: 10, x: 1380, y: 300, dx: 62, dy: 90, kind: "house", s: 1.1 },
    { k: "swarm", w: "about half of all renters.", n: 10, cols: 10, x: 1380, y: 300, dx: 62, dy: 90, kind: "house", s: 1.1, col: "#e98b8b", stagger: 1 },
    { k: "tag", w: "about half of all renters.", x: 1380, y: 520, text: "about HALF of all renters", size: 40, bg: R },
  ] },
  { at: "Back in 2001,", items: [
    { k: "txt", x: 960, y: 140, text: "full-time WORKING renters, cost-burdened", size: 52 },
    { k: "bars", x: 700, base: 760, max: 40, h: 480, gap: 360, bw: 200, bars: [
      { w: "Back in 2001,", label: "2001", v: 25, text: "25%", col: N },
      { w: "By 2023,", label: "2023", v: 36, text: "36%", col: R } ] },
    { k: "stamp", w: "36%. Full-time.", plus: 14, x: 380, y: 340, text: "FULL-TIME.", size: 56, r: -6 },
    { k: "stamp", w: "Full-time. Working. Following", plus: 22, x: 1530, y: 300, text: "WORKING.", size: 56, r: 6 },
    { k: "stamp", w: "Following the rules.", x: 1500, y: 560, text: "FOLLOWING THE RULES.", size: 48, r: -4 },
  ] },
  { at: "Owen asked how to stop", tone: "#eceaf3", items: [
    { k: "prop", kind: "phone", x: 300, y: 560, s: 0.9 },
    { k: "tag", x: 300, y: 260, text: "OWEN", size: 40 },
    { k: "prop", w: "Dave's co-hosts", kind: "mic", x: 1520, y: 640, s: 0.8 },
    { k: "tag", w: "Dave's co-hosts", x: 1560, y: 780, text: "co-hosts, May 19, 2026", size: 30 },
    { k: "bubble", w: "mad at the entire", x: 560, y: 140, wd: 900, tx: 1400, ty: 420, size: 54, lines: ["“He's mad at the entire", "boomer generation.”"] },
    { k: "list", w: "Admit the problem.", x: 560, y: 470, wd: 820, h: 300, items: [
      { w: "Admit the problem.", text: "1. admit the problem", mark: "none" },
      { w: "Then work on", text: "2. work on YOUR attitude", mark: "none", col: R } ] },
    { k: "stamp", w: "That's the pattern.", x: 970, y: 820, text: "THE PATTERN", size: 52, r: -4 },
  ] },
  // ── "Your grandparents had it worse" ────────────────────────────────────────────────────────────
  { at: "Now, the smartest Ramsey fans", items: [
    { k: "comment", w: "Your grandparents", x: 700, y: 300, text: "“Your grandparents had it worse.”", size: 54 },
    { k: "num", w: "over 16% in 1981.", x: 960, y: 640, to: 16, f: "raw", pre: "", post: "%+ in 1981", size: 140, col: R, sub: "mortgage rates" },
  ] },
  { at: "They're right. They were.", tone: "#f6efe6", items: [
    { k: "guy", x: 360, y: 860, s: 0.7, pose: "idle", expr: "thinking" },
    { k: "prop", w: "And if you adjust", kind: "house", x: 1000, y: 760, s: 0.9 },
    { k: "tag", w: "And if you adjust", x: 1000, y: 160, text: "1981", size: 50 },
    { k: "num", w: "around $2,800", x: 1500, y: 450, to: 2800, f: "money", post: "/mo", size: 120, col: R, sub: "1981 payment, in today's dollars" },
    { k: "tag", w: "One analysis", x: 1500, y: 620, text: "Census + Freddie Mac data", size: 32 },
  ] },
  { at: "Fair points. I'm not hiding them.", items: [
    { k: "list", w: "That brutal 1981", x: 160, y: 170, wd: 760, h: 480, title: "1981", fill: "#f3ece0", items: [
      { w: "That brutal 1981", text: "~$2,800 / month", mark: "none", size: 56 },
      { w: "30-year loan.", text: "30-YEAR loan", mark: "none", col: G, size: 56 } ] },
    { k: "list", w: "Dave's plan today", x: 1000, y: 170, wd: 760, h: 480, title: "2026, Dave's way", fill: "#eef2f6", items: [
      { w: "about $2,822.", text: "~$2,822 / month", mark: "none", size: 56 },
      { w: "15-year loan,", text: "15-YEAR loan", mark: "none", col: R, size: 56 } ] },
    { k: "txt", w: "costs about the same", x: 960, y: 450, text: "=", size: 160, col: R },
    { k: "stamp", w: "the worst year", x: 960, y: 760, text: "SAME AS THE WORST YEAR", size: 56, r: -4 },
  ] },
  { at: "And the down payment got heavier", tone: "#eaf3e6", items: [
    { k: "txt", x: 960, y: 140, text: "down payment ÷ a year's household income", size: 50 },
    { k: "bars", x: 700, base: 780, max: 115, h: 520, gap: 360, bw: 200, bars: [
      { w: "In the late 1970s,", label: "late 1970s", v: 72, text: "72%", col: G },
      { w: "By the early 2020s,", label: "early 2020s", v: 105, text: "100%+", col: R } ] },
    { k: "tag", w: "it was over 100%.", x: 1500, y: 420, text: "more than a whole year's pay", size: 36, bg: R },
  ] },
  { at: "And the people who bought in 1981", items: [
    { k: "prop", kind: "house", x: 500, y: 760, s: 0.8 },
    { k: "tag", x: 500, y: 200, text: "1981 buyers", size: 40 },
    { k: "arrow", w: "refinance as rates fell", pts: [[220, 340], [500, 400], [760, 470]], col: G },
    { k: "txt", w: "refinance as rates fell", x: 500, y: 300, text: "rates fell → refinance", size: 42, col: G },
    { k: "arrow", w: "went up in value.", pts: [[800, 720], [800, 560]], col: G },
    { k: "prop", w: "locked into low rates", kind: "lock", x: 1350, y: 520, s: 1.2 },
    { k: "tag", w: "locked into low rates", x: 1350, y: 620, text: "owners locked into low rates", size: 34 },
    { k: "guy", w: "the people trying to get in", x: 1650, y: 860, s: 0.5, pose: "idle", expr: "defeated" },
    { k: "tag", w: "paying today's prices.", x: 1650, y: 450, text: "today's prices", size: 34, bg: R },
  ] },
  { at: "So yes, 1981 was rough.", tone: "#f6efe6", items: [
    { k: "prop", kind: "door", x: 960, y: 840, s: 1.3 },
    { k: "tag", w: "Today the door", x: 960, y: 220, text: "the door: more than a year of your income", size: 40, bg: R },
    { k: "guy", w: "Today the door", x: 1500, y: 860, s: 0.6, pose: "shrug", expr: "sideeye" },
  ] },
  // ── The productivity gap ──────────────────────────────────────────────────────────────────────
  { at: "So why doesn't the paycheck", items: [
    { k: "prop", kind: "receipt", x: 700, y: 520, s: 1.3, label: "PAYCHECK" },
    { k: "txt", x: 1000, y: 380, text: "?", size: 220, col: R },
    { k: "prop", w: "Here's the part nobody", kind: "mic", x: 1450, y: 680, s: 0.9 },
    { k: "stamp", w: "wants to touch.", x: 1460, y: 330, text: "DON'T TOUCH", size: 54 },
  ] },
  { at: "From the late 1940s", tone: "#eef2f6", zoom: 1.02, items: [
    { k: "tag", x: 960, y: 110, text: "Economic Policy Institute · productivity vs. typical pay (simplified)", size: 30 },
    { k: "epi", w: "From the late 1940s", split: "Then around 1979,", prod: "net productivity grew", pay: "About 16%.", x: 380, y: 760 },
    { k: "txt", w: "That was the deal.", x: 640, y: 330, text: "they rose together", size: 46, col: N },
    { k: "stamp", w: "the deal broke.", x: 1060, y: 200, text: "THE DEAL BROKE", size: 56, r: -5 },
  ] },
  { at: "EPI calculates that", items: [
    { k: "txt", x: 960, y: 160, text: "if typical pay had kept up with productivity", size: 52 },
    { k: "num", w: "about $9 more an hour.", x: 960, y: 350, to: 9, f: "money", pre: "+", post: " an hour", size: 110, col: G },
    { k: "num", w: "roughly $18,000 a year,", x: 960, y: 530, to: 18000, f: "money", pre: "+", post: " a year", size: 110, col: G },
    { k: "num", w: "about $1,500 a month", x: 960, y: 710, to: 1500, f: "money", pre: "+", post: " a month", size: 110, col: G, sub: "before taxes" },
  ] },
  { at: "Now, EPI leans pro-labor,", tone: "#eef2f6", zoom: 1.02, items: [
    { k: "tag", x: 520, y: 140, text: "EPI leans pro-labor", size: 40, bg: "#3b3f4a" },
    { k: "tag", w: "Look it up yourself.", x: 1400, y: 140, text: "look it up yourself", size: 40 },
    { k: "epi", w: "Every version", split: "the lines split.", x: 380, y: 760 },
    { k: "guy", w: "You didn't get lazy.", x: 1700, y: 870, s: 0.5, pose: "point", expr: "angry" },
    { k: "stamp", w: "Your raise got redirected.", x: 900, y: 300, text: "REDIRECTED", size: 66, r: -6 },
  ] },
  // ── The other bills ───────────────────────────────────────────────────────────────────────────
  { at: "And housing isn't even", tone: "#f6efe6", items: [
    { k: "prop", kind: "coffee", x: 420, y: 700, s: 1.2 },
    { k: "tag", w: "Dave has posted", x: 1180, y: 200, text: "@DaveRamsey on X · Sep 3, 2024", size: 34 },
    { k: "quote", w: "Dave has posted", x: 1180, y: 470, size: 56, quote: ["“How to waste $5,000 a year:", "Spend $13.70 a day on", "things you don't need.”"], who: "Dave Ramsey", src: "X, Sep 3, 2024" },
    { k: "stamp", w: "True. Real money.", x: 420, y: 300, text: "TRUE", size: 70, col: G },
  ] },
  { at: "But KFF's 2025 survey", items: [
    { k: "prop", kind: "health", x: 500, y: 380, s: 1.1 },
    { k: "tag", x: 500, y: 140, text: "KFF 2025 survey", size: 36 },
    { k: "num", w: "cost $26,993,", x: 500, y: 660, to: 26993, f: "money", post: "/yr", size: 100, sub: "average family plan through work" },
    { k: "bars", x: 1100, base: 800, max: 7500, h: 520, gap: 340, bw: 200, bars: [
      { w: "bigger than Dave's", label: "Dave's \"waste\"", v: 5000, text: "$5,000", col: G },
      { w: "workers paid about $6,850", label: "workers' share", v: 6850, text: "$6,850", col: R } ] },
  ] },
  { at: "Child Care Aware of America", tone: "#eaf3e6", items: [
    { k: "prop", kind: "daycare", x: 520, y: 640, s: 1.1 },
    { k: "tag", x: 520, y: 160, text: "Child Care Aware of America · 2024", size: 32 },
    { k: "num", w: "$13,128 a year,", x: 520, y: 790, to: 13128, f: "money", post: "/yr", size: 100, col: R, sub: "one kid" },
    { k: "txt", w: "That jumped 29%", x: 1400, y: 160, text: "2020 → 2024", size: 52 },
    { k: "bars", x: 1150, base: 760, max: 32, h: 480, gap: 320, bw: 200, bars: [
      { w: "That jumped 29%", label: "child care", v: 29, text: "+29%", col: R },
      { w: "overall prices rose about 22%.", label: "all prices", v: 22, text: "+22%", col: N } ] },
  ] },
  { at: "You can't \"amputate\" health insurance.", items: [
    { k: "prop", kind: "health", x: 420, y: 380, s: 0.9, cross: "health insurance." },
    { k: "prop", w: "You can't make daycare", kind: "press", x: 960, y: 520, s: 1.1, cross: "French press." },
    { k: "tag", w: "These are the bills", x: 960, y: 690, text: "the bills that decide if you ever hit Dave's 25%", size: 36, bg: R },
    { k: "prop", w: "skipped Chili's.", kind: "receipt", x: 1500, y: 450, s: 0.9, label: "dinner out" },
    { k: "txt", w: "skipped Chili's.", x: 1500, y: 200, text: "skipping this won't fix it", size: 40, col: R },
  ] },
  // ── Washington ────────────────────────────────────────────────────────────────────────────────
  { at: "Now both sides of the aisle", tone: "#eceaf3", items: [
    { k: "prop", kind: "capitol", x: 520, y: 700, s: 1.2 },
    { k: "tag", w: "both sides", x: 520, y: 190, text: "both parties", size: 44 },
    { k: "num", w: "about 24%.", x: 1380, y: 500, to: 24, f: "raw", pre: "+", post: "%", size: 200, col: R, sub: "overall prices, 2020 → 2025 (BLS)" },
  ] },
  { at: "You didn't print trillions", items: [
    { k: "prop", kind: "printer", x: 420, y: 520, s: 1.1 },
    { k: "swarm", w: "You didn't print", n: 12, cols: 4, x: 420, y: 560, dx: 90, dy: 50, s: 1, stagger: 2 },
    { k: "prop", w: "You didn't hold", kind: "dial", x: 1050, y: 500, s: 1 },
    { k: "arrow", w: "You didn't hold", pts: [[1050, 500], [900, 470]], col: COL.ink, sw: 9 },
    { k: "tag", w: "near zero", x: 1050, y: 600, text: "rates near 0", size: 36 },
    { k: "prop", w: "Washington did that,", kind: "capitol", x: 1560, y: 450, s: 0.7 },
    { k: "tag", w: "under both parties,", x: 1560, y: 520, text: "both parties", size: 34 },
    { k: "prop", w: "the Federal Reserve", kind: "fed", x: 1560, y: 800, s: 0.6 },
    { k: "tag", w: "the Federal Reserve", x: 1560, y: 840, text: "the Fed", size: 34 },
  ] },
  { at: "Then, when prices took off,", tone: "#f6efe6", items: [
    { k: "prop", kind: "dial", x: 520, y: 500, s: 1.2 },
    { k: "arrow", w: "the fix was higher rates,", pts: [[520, 500], [680, 380]], col: R, sw: 10 },
    { k: "tag", w: "the fix was higher rates,", x: 520, y: 620, text: "higher rates", size: 40, bg: R },
    { k: "prop", w: "which made mortgages", kind: "house", x: 1300, y: 760, s: 0.8 },
    { k: "arrow", w: "which made mortgages", pts: [[1560, 760], [1560, 420]], col: R },
    { k: "guy", w: "already getting squeezed.", x: 980, y: 870, s: 0.5, pose: "idle", expr: "defeated" },
  ] },
  { at: "And Dave himself has gone after", items: [
    { k: "dave", x: 380, y: 840, s: 0.7, arms: [["the car companies.", "point"]] },
    { k: "prop", w: "the banks", kind: "bank", x: 900, y: 450, s: 0.7 },
    { k: "prop", w: "the car companies.", kind: "car", x: 1350, y: 430, s: 0.8 },
    { k: "stamp", w: "He's right about them.", x: 1100, y: 640, text: "HE'S RIGHT", size: 56, col: G },
  ] },
  { at: "But here's the trick.", tone: "#eceaf3", items: [
    { k: "guy", x: 340, y: 860, s: 0.6, pose: "shrug", expr: "sideeye" },
    { k: "list", w: "nobody has to change", x: 700, y: 120, wd: 640, h: 440, title: "has to change:", items: [
      { w: "Not the government.", text: "the government", mark: "x" },
      { w: "Not the lenders.", text: "the lenders", mark: "x" },
      { w: "Not the companies.", text: "the companies", mark: "x" } ] },
    { k: "prop", w: "The system gets a free pass,", kind: "ticket", x: 1580, y: 280, s: 0.8 },
    { k: "prop", w: "you get a budgeting worksheet.", kind: "sheet", x: 1560, y: 680, s: 0.8 },
  ] },
  { at: "That's my problem with Dave's plan.", items: [
    { k: "stamp", w: "Not that it's mean.", x: 520, y: 260, text: "NOT MEAN", size: 60, col: N },
    { k: "tag", w: "diagnoses a rigged game,", x: 520, y: 520, text: "diagnoses: a RIGGED game", size: 46, bg: R },
    { k: "prop", w: "then grades you", kind: "grade", x: 1350, y: 520, s: 1.1 },
    { k: "tag", w: "like it's a fair one.", x: 1350, y: 830, text: "grades: like a FAIR one", size: 40 },
  ] },
  // ── Where Dave is right ───────────────────────────────────────────────────────────────────────
  { at: "Okay. I've spent ten minutes", tone: "#eaf3e6", items: [
    { k: "dave", w: "here's where he's right,", x: 360, y: 840, s: 0.75 },
    { k: "tag", w: "here's where he's right,", x: 360, y: 200, text: "WHERE DAVE IS RIGHT", size: 40, bg: G },
    { k: "guy", x: 1640, y: 860, s: 0.55, pose: "idle", expr: "deadpan" },
    { k: "list", w: "Get out of high-interest", x: 680, y: 120, wd: 820, h: 560, items: [
      { w: "Get out of high-interest", text: "get out of high-interest debt" },
      { w: "Build an emergency", text: "build an emergency fund" },
      { w: "Invest for retirement.", text: "invest for retirement" } ] },
    { k: "tag", w: "A $1,000 car payment", x: 900, y: 790, text: "$1,000 car payment", size: 34, bg: R },
    { k: "tag", w: "a credit card at 25%", x: 1300, y: 790, text: "25% credit card", size: 34, bg: R },
  ] },
  { at: "Where I'd push back is waiting.", items: [
    { k: "prop", w: "a 401(k) match,", kind: "jar", x: 700, y: 720, s: 1.3 },
    { k: "tag", w: "a 401(k) match,", x: 700, y: 280, text: "401(k) MATCH", size: 48, bg: G },
    { k: "txt", w: "that's free money,", x: 700, y: 200, text: "free money", size: 60, col: G },
    { k: "prop", w: "while you snowball", kind: "car", x: 1400, y: 560, s: 0.8 },
    { k: "tag", w: "while you snowball", x: 1400, y: 640, text: "snowballing a car loan", size: 34 },
    { k: "stamp", w: "leaves part of your pay", x: 1400, y: 780, text: "PAY LEFT ON THE TABLE", size: 44 },
  ] },
  { at: "And on housing, here's my honest take:", tone: "#f6efe6", items: [
    { k: "stamp", w: "the rules aren't the problem.", x: 560, y: 220, text: "RULES: FINE", size: 60, col: G, r: -4 },
    { k: "stamp", w: "The prices are.", x: 1360, y: 220, text: "PRICES: THE PROBLEM", size: 60, r: 4 },
    { k: "prop", w: "a house worth half", kind: "house", x: 420, y: 760, s: 0.5 },
    { k: "prop", w: "your coffee is the reason,", kind: "coffee", x: 960, y: 740, s: 0.9, cross: "take the debt fight" },
    { k: "prop", w: "put whatever you can", kind: "chart_up", x: 1500, y: 720, s: 1 },
    { k: "tag", w: "assets that grow", x: 1500, y: 790, text: "assets that grow", size: 36, bg: G },
  ] },
  { at: "So here's what I'd actually do", items: [
    { k: "guy", x: 300, y: 860, s: 0.7, pose: "hold", expr: "smug", sign: "-$1,270" },
    { k: "list", w: "First, kill any debt", x: 620, y: 110, wd: 1180, h: 520, title: "WHAT I'D DO WITH THE $1,270", items: [
      { w: "First, kill any debt", text: "1. kill debt with a rate that starts with a 2", size: 46, mark: "none" },
      { w: "Second, grab every dollar", text: "2. grab every dollar of employer match", size: 46, mark: "none" },
      { w: "Third, stop treating", text: "3. a house isn't the only finish line", size: 46, mark: "none" } ] },
    { k: "prop", w: "A family that rents", kind: "apartment", x: 900, y: 860, s: 0.45 },
    { k: "prop", w: "invests the difference", kind: "chart_up", x: 1350, y: 830, s: 0.7 },
    { k: "stamp", w: "isn't failing.", x: 1650, y: 760, text: "NOT FAILING", size: 46, col: G },
  ] },
  { at: "Dave's right that you need a plan.", tone: "#eceaf3", items: [
    { k: "dave", x: 420, y: 840, s: 0.75 },
    { k: "list", w: "Dave's right that", x: 820, y: 220, wd: 900, h: 340, items: [
      { w: "you need a plan.", text: "you need a plan", size: 56 },
      { w: "He's wrong that", text: "the plan is the whole story", size: 56, mark: "x" } ] },
  ] },
  { at: "So here's my question.", items: [
    { k: "tag", w: "Ramsey fans,", x: 960, y: 140, text: "RAMSEY FANS: PICK ONE", size: 48 },
    { k: "list", w: "Is the answer really", x: 160, y: 250, wd: 760, h: 300, fill: "#eaf3e6", items: [
      { w: "Is the answer really", text: "A: just wait,", size: 52, mark: "none" },
      { w: "buy less house,\"", text: "buy less house", size: 52, mark: "none" } ] },
    { k: "list", w: "or is the plan broken", x: 1000, y: 250, wd: 760, h: 300, fill: "#fbe9e9", items: [
      { w: "or is the plan broken", text: "B: the plan is", size: 52, mark: "none" },
      { w: "broken for 2026?", text: "broken for 2026", size: 52, mark: "none", col: R } ] },
    { k: "tag", w: "Pick one in the comments,", x: 960, y: 615, text: "tell me why in the comments", size: 40 },
    { k: "prop", w: "subscribe,", kind: "subscribe", x: 960, y: 800, s: 0.9 },
    { k: "txt", w: "every week.", x: 960, y: 712, text: "new video every week", size: 44, col: R },
  ] },
];

// the rest starts at part 3 of the edit ("Let's be fair to the man"; recorded before the maths, played after it)
export const REST_SHOTS = resolveShots(SPECS, TL.parts[3].a, TL.totalFrames + 300); // 10 s hold at the end for the end screen
export const REST_START = REST_SHOTS[0].a;
export const REST_LINES = TL.lines(TL.parts[3].a, TL.words.length - 1);
export const REST_HI = ["Dave", "Dave's", "Owen", "structural", "rent", "half", "1981", "15-year", "30-year", "productivity", "redirected",
  "Washington", "Federal", "Reserve", "right", "wrong", "match", "prices", "worksheet", "fair", "rigged", "boomer", "KFF's", "EPI"];
