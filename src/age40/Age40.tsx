// "First Time Home Buyer Age Is 40, NAR Says. Millennials Didn't Fail" redone in the doodle style.
// Narration: the first-time-buyer-40-millennials script re-voiced (animate/narration/age40 in the private repo).
// Every number on screen comes from that video's cleared fact list (production/first-time-buyer-40-millennials.json).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import WORDS from "../../public/age40/words.json";
import { Fonts, Captions, Narration, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const TL = makeTimeline((WORDS as any).words ?? (WORDS as any), FPS);
const G = COL.green, R = COL.red, N = COL.navy;
const GUIDE = "beginner's guide: link in the description";

const SPECS: ShotSpec[] = [
  // ── hook ──────────────────────────────────────────────────────────────────────────────────────
  { at: "The typical first-time home buyer is now 40", items: [
    { k: "guy", x: 360, y: 860, s: 0.75, pose: "idle", expr: "shock" },
    { k: "num", w: "is now 40", x: 1150, y: 520, to: 40, f: "raw", size: 320, col: R, sub: "median age, first-time home buyers" },
    { k: "tag", x: 1150, y: 160, text: "NAR 2026 Profile of Home Buyers and Sellers", size: 34 },
    { k: "stamp", w: "all-time high.", x: 1150, y: 760, text: "TIES THE RECORD", size: 60 },
  ] },
  { at: "Waiting for rates to drop?", tone: "#eef2f6", items: [
    { k: "tag", x: 760, y: 120, text: "Freddie Mac 30-year mortgage rate, 2026", size: 34 },
    { k: "line", w: "The 30-year rate", x: 260, y: 700, wd: 1000, h: 420, min: 5.5, max: 7.8, post: "%", col: R, points: [
      { label: "late Feb", v: 5.98, w: "5.98%" }, { label: "Mar", v: 6.22, w: "to 7.40%" }, { label: "Aug", v: 6.65, w: "to 7.40%", plus: 6 },
      { label: "Oct 1", v: 7.28, w: "to 7.40%", plus: 12 }, { label: "Oct 8", v: 7.4, w: "to 7.40%", plus: 18 }] },
    { k: "num", w: "about $376 more", x: 1560, y: 420, to: 376, f: "money", pre: "+", post: "/mo", size: 110, col: R, sub: "on a $400,000 loan (AP estimate)" },
    { k: "stamp", w: "real money, every month.", x: 1560, y: 640, text: "EVERY MONTH", size: 56 },
  ] },
  { at: "Stay for three payoffs.", items: [
    { k: "list", x: 360, y: 160, wd: 1200, h: 470, title: "STAY FOR THREE THINGS", items: [
      { w: "The second message", text: "1. the other half of the avocado interview", mark: "none" },
      { w: "What NAR says waiting", text: "2. what waiting can cost you", mark: "none" },
      { w: "a zoning idea", text: "3. a rule from Berkeley, 1916", mark: "none" }] },
    { k: "guy", x: 1700, y: 860, s: 0.55, pose: "point", expr: "smug" },
  ] },
  // ── setup: two messages ───────────────────────────────────────────────────────────────────────
  { at: "Millennials got two messages", tone: "#f6efe6", items: [
    { k: "guy", x: 960, y: 860, s: 0.7, pose: "shrug", expr: "sideeye" },
    { k: "tag", w: "The first: stop wasting money.", x: 480, y: 300, text: "MESSAGE 1: stop wasting money", size: 42, bg: R },
    { k: "prop", w: "stop wasting money.", kind: "coffee", x: 480, y: 620, s: 0.8 },
  ] },
  { at: "In 2017, property developer Tim Gurner", items: [
    { k: "quote", x: 960, y: 330, size: 56, quote: ["“When I was trying to buy my first home", "I wasn't buying smashed avocados for 19 bucks", "and four coffees at $4 each”"],
      who: "Tim Gurner, property developer", src: "60 Minutes Australia · May 2017" },
    { k: "prop", w: "Those were Australian dollars,", kind: "avocado", x: 700, y: 760, s: 0.9, label: "" },
    { k: "tag", w: "Those were Australian dollars,", x: 1250, y: 760, text: "A$19 ≈ US$15 in 2017", size: 44 },
  ] },
  { at: "The second message was quieter.", tone: "#eceaf3", items: [
    { k: "tag", x: 960, y: 140, text: "MESSAGE 2: just wait", size: 46, bg: N },
    { k: "prop", w: "boomer wealth being passed down", kind: "person", x: 520, y: 820, s: 1.2, label: "boomer" },
    { k: "prop", w: "boomer wealth being passed down", kind: "will", x: 900, y: 560, s: 0.9 },
    { k: "num", w: "as long as 20 years.", x: 1450, y: 450, to: 20, f: "raw", pre: "up to ", post: " years", size: 110, col: N },
    { k: "stamp", w: "Our read:", x: 1400, y: 720, text: "WAIT FOR THE INHERITANCE", size: 50 },
  ] },
  { at: "And NAR's 2026 profile found", items: [
    { k: "prop", kind: "will", x: 560, y: 520, s: 1.1 },
    { k: "tag", w: "more likely to rely", x: 1250, y: 380, text: "first-time buyers: leaning more on", size: 40 },
    { k: "tag", w: "inheritance or financial gifts", x: 1250, y: 470, text: "inheritance or family gifts (NAR 2026)", size: 40, bg: N },
    { k: "txt", w: "Here's where waiting", x: 1250, y: 680, text: "so where did waiting get them?", size: 58, col: R },
  ] },
  // ── act 1: the scoreboard ─────────────────────────────────────────────────────────────────────
  { at: "Start with the scoreboard.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 110, text: "NAR survey · median age of first-time buyers", size: 34 },
    { k: "line", w: "In 1981,", x: 260, y: 740, wd: 1400, h: 470, min: 25, max: 42, col: R, points: [
      { label: "1981", v: 29, w: "In 1981," }, { label: "2000", v: 32, w: "By 2021," }, { label: "2021", v: 33, w: "By 2021," , plus: 8 },
      { label: "2022", v: 36, w: "Now it's 40," }, { label: "2023", v: 35, w: "Now it's 40,", plus: 5 }, { label: "2024", v: 38, w: "Now it's 40,", plus: 10 },
      { label: "2025", v: 40, w: "Now it's 40,", plus: 15 }, { label: "2026", v: 40, w: "Now it's 40,", plus: 20 }] },
    { k: "stamp", w: "Watch the slope", x: 1300, y: 260, text: "WATCH THE SLOPE", size: 52, r: -6 },
  ] },
  { at: "To be fair, that 40 is NAR's mail survey.", items: [
    { k: "prop", kind: "mail", x: 380, y: 380, s: 1.0, label: "NAR mail survey" },
    { k: "num", w: "NAR's mail survey.", x: 380, y: 800, to: 40, f: "raw", size: 120, col: R, sub: "NAR survey" },
    { k: "num", w: "between 32 and 35,", x: 1250, y: 330, to: 35, from: 32, f: "raw", pre: "32–", size: 130, col: N, sub: "other datasets (MBA, NY Fed, Redfin...)" },
    { k: "tag", w: "one analysis says", x: 1250, y: 600, text: "MBA (Nov 2025): \"likely not much older than one a decade ago\"", size: 30, bg: N },
  ] },
  { at: "Even inside NAR's own numbers,", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 120, text: "NAR 2026 · median age, first-time buyers", size: 36 },
    { k: "bars", x: 650, base: 780, max: 60, h: 520, gap: 400, bw: 220, bars: [
      { w: "who financed are 38.", label: "financed", v: 38, text: "38", col: N },
      { w: "All-cash first-timers are 54,", label: "all cash", v: 54, text: "54", col: R }],
      line: { w: "pull the overall median up.", v: 40, col: COL.amber } },
    { k: "tag", w: "pull the overall median up.", x: 1550, y: 420, text: "overall: 40", size: 40, bg: COL.amber },
  ] },
  { at: "NAR defines older millennials", items: [
    { k: "tag", x: 960, y: 170, text: "OLDER MILLENNIALS: born 1980–1989 (NAR)", size: 48 },
    { k: "guy", w: "So a 40-year-old buyer", x: 960, y: 860, s: 0.7, pose: "point", expr: "deadpan" },
    { k: "txt", w: "Forty isn't some future", x: 960, y: 340, text: "40 isn't a future generation's problem", size: 56 },
    { k: "stamp", w: "it's yours.", x: 1450, y: 560, text: "IT'S YOURS", size: 70 },
  ] },
  { at: "First-time buyers were 22% of purchases", tone: "#eef2f6", items: [
    { k: "txt", x: 960, y: 140, text: "first-time buyers' share of home purchases (NAR)", size: 48 },
    { k: "bars", x: 700, base: 780, max: 45, h: 500, gap: 380, bw: 220, bars: [
      { w: "traditionally about 40%", label: "before 2008", v: 40, text: "~40%", col: G },
      { w: "22% of purchases", label: "this year", v: 22, text: "22%", col: R }] },
  ] },
  { at: "Meanwhile the typical repeat buyer is 62,", items: [
    { k: "prop", kind: "person", x: 480, y: 820, s: 1.3, label: "boomer" },
    { k: "num", w: "repeat buyer is 62,", x: 1150, y: 400, to: 62, f: "raw", size: 200, col: N, sub: "median repeat buyer age (NAR)" },
    { k: "num", w: "a record 12 years.", x: 1150, y: 720, to: 12, f: "raw", post: " years", size: 110, col: R, sub: "how long sellers stayed: a record" },
  ] },
  { at: "Now the other side of the table.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 120, text: "NAR Generational Trends 2026", size: 36 },
    { k: "bars", x: 420, base: 760, max: 60, h: 480, gap: 380, bw: 220, bars: [
      { w: "boomers were 42% of buyers", label: "boomers: buyers", v: 42, text: "42%", col: N },
      { w: "and 55% of sellers.", label: "boomers: sellers", v: 55, text: "55%", col: R },
      { w: "Millennials were 26% of buyers.", label: "millennials: buyers", v: 26, text: "26%", col: G }] },
    { k: "tag", w: "nearly four in five buyers", x: 1500, y: 220, text: "~4 in 5 buyers had owned before", size: 32, bg: N },
  ] },
  { at: "Under 35, 36.6% own their homes.", items: [
    { k: "txt", x: 760, y: 140, text: "homeownership rate (Census, Q3 2026)", size: 48 },
    { k: "bars", x: 280, base: 760, max: 90, h: 480, gap: 380, bw: 220, bars: [
      { w: "Under 35, 36.6%", label: "under 35", v: 36.6, text: "36.6%", col: R },
      { w: "For 65 and older,", label: "65 and older", v: 79.1, text: "79.1%", col: N }] },
    { k: "tag", w: "35-to-44 group", x: 1380, y: 360, text: "35–44: lower than a year earlier", size: 34, bg: R },
    { k: "txt", w: "Afford it compared to what?", x: 1380, y: 600, text: "afford it compared to WHAT?", size: 54, col: R },
  ] },
  { at: "Here's the thing about the word afford.", tone: "#eef2f6", items: [
    { k: "txt", w: "It isn't a feeling.", x: 960, y: 200, text: "\"afford\" isn't a feeling. It's a ratio:", size: 64 },
    { k: "txt", w: "what a house costs,", x: 960, y: 380, text: "house price", size: 90, col: R },
    { k: "txt", w: "divided by what a household", x: 960, y: 450, text: "———————", size: 90 },
    { k: "txt", w: "divided by what a household", x: 960, y: 560, text: "household income", size: 90, col: G },
    { k: "num", w: "between 3.1 and 3.4.", x: 960, y: 760, to: 34, from: 31, f: "tenth", pre: "3.1x – ", post: "x", size: 100, col: N, sub: "1980–1999 (Harvard JCHS)" },
  ] },
  { at: "That held for twenty years.", items: [
    { k: "bars", x: 420, base: 760, max: 5.5, h: 480, gap: 380, bw: 220, bars: [
      { w: "That held for twenty years.", label: "1980–99", v: 3.2, text: "~3.2x", col: G },
      { w: "nearly five times median income,", label: "2025", v: 4.9, text: "nearly 5x", col: R }] },
    { k: "num", w: "Home prices rose 54%", x: 1450, y: 420, to: 54, f: "raw", pre: "+", post: "%", size: 160, col: R, sub: "home prices, 2020 → early 2026" },
    { k: "tag", w: "Harvard's 2026 report says.", x: 1450, y: 640, text: "Harvard JCHS, 2026", size: 36 },
  ] },
  { at: "By our math, that changes the down payment.", tone: "#f6efe6", items: [
    { k: "txt", x: 960, y: 140, text: "a 20% down payment, in years of pay (our math)", size: 50 },
    { k: "bars", x: 650, base: 760, max: 1.1, h: 480, gap: 400, bw: 220, bars: [
      { w: "At 3.2 times income,", label: "at 3.2x income", v: 0.64, text: "~2/3 of a year", col: G },
      { w: "At nearly five times,", label: "at nearly 5x", v: 0.94, text: "almost a full year", col: R }] },
    { k: "tag", w: "already paying rent.", x: 1620, y: 520, text: "...while paying rent", size: 40, bg: R },
  ] },
  // ── mid-video ask + the guide (on-screen link text) ───────────────────────────────────────────
  { at: "Quick one: if this is useful,", tone: "#eaf3e6", items: [
    { k: "guy", x: 420, y: 860, s: 0.8, pose: "point", expr: "fakesmile" },
    { k: "prop", w: "a like", kind: "thumb", x: 960, y: 380, s: 1.2 },
    { k: "prop", w: "subscribe", kind: "subscribe", x: 1450, y: 400, s: 1.0 },
    { k: "prop", w: "if you have no idea where to start", kind: "sheet", x: 1150, y: 640, s: 0.55 },
    { k: "tag", w: "my beginner's guide", x: 1150, y: 830, text: "📘 " + GUIDE, size: 40, bg: G },
  ] },
  { at: "Harvard's report also says the income needed", items: [
    { k: "num", w: "about $120,800", x: 560, y: 450, to: 120800, f: "money", size: 130, col: R, sub: "income needed for the median home, end of 2025 (Harvard JCHS)" },
    { k: "num", w: "The median household made $87,460", x: 1380, y: 450, to: 87460, f: "money", size: 130, col: G, sub: "median household income, 2025 (Census)" },
    { k: "tag", w: "That was a record high.", x: 1380, y: 640, text: "a record high, and still short", size: 36, bg: G },
  ] },
  { at: "Now the reply you've heard:", tone: "#eceaf3", items: [
    { k: "comment", x: 640, y: 220, who: "a comment you've heard", text: "“We had 14% rates in the 80s and still bought houses.”", size: 42 },
    { k: "stamp", w: "That's true.", x: 360, y: 470, text: "TRUE", size: 70, col: G },
    { k: "num", w: "the average rate was 13.88%,", x: 820, y: 640, to: 1388, f: "dec", post: "%", size: 120, col: R, sub: "average 30-year rate, 1984" },
    { k: "num", w: "about $79,900.", x: 1450, y: 640, to: 79900, f: "money", size: 110, col: N, sub: "median new home, 1984" },
  ] },
  { at: "With 20% down, principal and interest took", items: [
    { k: "txt", x: 960, y: 140, text: "principal + interest, share of median household income", size: 48 },
    { k: "bars", x: 650, base: 760, max: 45, h: 480, gap: 400, bw: 220, bars: [
      { w: "took about 40%", label: "1984", v: 40, text: "~40%", col: R },
      { w: "In 2026 it's about 31%.", label: "2026", v: 31, text: "~31%", col: N }] },
    { k: "stamp", w: "1984 was harder.", x: 1550, y: 330, text: "1984 WAS HARDER", size: 56, col: G },
  ] },
  { at: "So why did it still work for buyers then?", tone: "#eef2f6", items: [
    { k: "line", w: "Because the expensive part was the rate,", x: 300, y: 700, wd: 600, h: 400, min: 5, max: 15, post: "%", col: G, points: [
      { label: "1984", v: 13.88, w: "Because the expensive part was the rate," }, { label: "1998", v: 6.94, w: "By 1998," }] },
    { k: "tag", w: "rates can fall.", x: 600, y: 160, text: "rates can fall → refinance", size: 40, bg: G },
    { k: "prop", w: "Today the expensive part is the price.", kind: "house", x: 1400, y: 820, s: 0.8 },
    { k: "tag", w: "Today the expensive part is the price.", x: 1400, y: 160, text: "today: the PRICE", size: 44, bg: R },
    { k: "stamp", w: "you can't refinance a price.", x: 1400, y: 330, text: "CAN'T REFINANCE A PRICE", size: 48 },
  ] },
  // ── act 2: the lock ───────────────────────────────────────────────────────────────────────────
  { at: "So why don't more homes come up for sale?", items: [
    { k: "tag", x: 960, y: 80, text: "outstanding mortgages by rate, mid-2026 (FHFA data via Realtor.com)", size: 30 },
    { k: "bars", x: 230, base: 720, max: 32, h: 440, gap: 320, bw: 200, ls: 32, vs: 46, bars: [
      { w: "had a rate below 4%.", label: "below 3%", v: 19.2, text: "19.2%", col: G },
      { w: "had a rate below 4%.", plus: 6, label: "3–4%", v: 29.9, text: "29.9%", col: G },
      { w: "Nearly one in five", label: "4–5%", v: 16.5, text: "16.5%", col: N },
      { w: "Nearly one in five", plus: 6, label: "5–6%", v: 12.0, text: "12.0%", col: N },
      { w: "Nearly one in five", plus: 12, label: "6%+", v: 22.5, text: "22.5%", col: R }] },
    { k: "tag", w: "had a rate below 4%.", x: 600, y: 175, text: "49.1% below 4%", size: 44, bg: G },
    { k: "tag", w: "In early November,", x: 1500, y: 175, text: "30-yr rate now: 7.18% (Nov 5)", size: 40, bg: R },
  ] },
  { at: "Make that real.", tone: "#f6efe6", items: [
    { k: "prop", kind: "house", x: 960, y: 520, s: 0.8 },
    { k: "tag", x: 960, y: 590, text: "$400,000 · 20% down", size: 40 },
    { k: "num", w: "At 4%,", x: 450, y: 450, to: 1528, f: "money", post: "/mo", size: 100, col: G, sub: "at 4%" },
    { k: "num", w: "At 7.18%, about $2,168.", x: 1470, y: 450, to: 2168, f: "money", post: "/mo", size: 100, col: R, sub: "at 7.18%" },
    { k: "stamp", w: "roughly $640 more", x: 960, y: 760, text: "+$640 A MONTH, SAME WALLS", size: 52 },
  ] },
  { at: "So the person with the 3% mortgage stays,", items: [
    { k: "prop", kind: "house", x: 700, y: 760, s: 1.0 },
    { k: "prop", kind: "person", x: 1150, y: 820, s: 1.2, label: "boomer" },
    { k: "prop", w: "So the person with the 3% mortgage stays,", kind: "lock", x: 700, y: 560, s: 0.9 },
    { k: "tag", w: "the kids moved out", x: 700, y: 180, text: "kids moved out years ago", size: 40 },
    { k: "stamp", w: "They're following the math.", x: 1420, y: 250, text: "JUST FOLLOWING THE MATH", size: 46, col: N },
  ] },
  { at: "And many older owners have no mortgage", tone: "#eaf3e6", items: [
    { k: "num", w: "nearly 58%", x: 960, y: 480, to: 58, f: "raw", post: "%", size: 260, col: G, sub: "of boomer homeowners: mortgage paid off (Redfin)" },
    { k: "prop", w: "nearly 58%", kind: "key", x: 960, y: 720, s: 0.9 },
  ] },
  { at: "Redfin also finds empty-nest boomers own 28%", items: [
    { k: "txt", x: 960, y: 140, text: "owner-occupied homes with 3+ bedrooms (Redfin)", size: 48 },
    { k: "bars", x: 650, base: 760, max: 32, h: 480, gap: 400, bw: 220, bars: [
      { w: "empty-nest boomers own 28%", label: "empty-nest boomers", v: 28, text: "28%", col: N },
      { w: "Millennial households with kids", label: "millennial families", v: 16, text: "16%", col: G }] },
  ] },
  { at: "That 28% was 27.7% in 2014.", tone: "#eef2f6", items: [
    { k: "line", x: 300, y: 600, wd: 600, h: 300, min: 20, max: 32, post: "%", col: N, points: [{ label: "2014", v: 27.7 }, { label: "2024", v: 28 }] },
    { k: "tag", w: "Basically unchanged", x: 600, y: 200, text: "basically unchanged in a decade", size: 40 },
    { k: "num", w: "just over one in ten moved,", x: 1400, y: 450, to: 11, f: "raw", post: "%", size: 150, col: R, sub: "households that moved in 2024: lowest on record" },
    { k: "stamp", w: "They're just not coming loose.", x: 1400, y: 700, text: "NOT COMING LOOSE", size: 56 },
  ] },
  { at: "The lock is easing, slowly.", items: [
    { k: "bars", x: 650, base: 760, max: 30, h: 480, gap: 400, bw: 220, bars: [
      { w: "loans at 6% or higher,", label: "loans at 6%+", v: 22.5, text: "22.5%", col: R },
      { w: "outnumbered loans below 3%.", label: "loans below 3%", v: 19.2, text: "19.2%", col: G }] },
    { k: "tag", x: 960, y: 140, text: "mid-2026: the lock is easing, slowly", size: 44 },
  ] },
  { at: "More homes are listed, at least.", tone: "#f6efe6", items: [
    { k: "num", w: "1.60 million,", x: 960, y: 300, to: 160, f: "dec", post: "M", size: 200, col: G, sub: "homes for sale, Sept 2026: most since Nov 2019 (NAR)" },
    { k: "quote", w: "NAR's chief economist said", x: 960, y: 640, size: 44, quote: ["“...fewer buyers can qualify", "to purchase a home.”"], who: "NAR's chief economist", src: "mid-October 2026" },
  ] },
  { at: "Waiting for rates isn't a plan", items: [
    { k: "num", w: "forecasts 7.5% through 2027,", x: 480, y: 420, to: 75, f: "tenth", post: "%", size: 150, col: R, sub: "30-yr rate forecast through 2027 (Fannie Mae ESR)" },
    { k: "num", w: "home prices up just 0.6%.", x: 1300, y: 420, to: 6, f: "tenth", pre: "+", post: "%", size: 150, col: N, sub: "home prices, 2027 forecast" },
    { k: "tag", w: "The Mortgage Bankers Association", x: 900, y: 620, text: "MBA: rates stay above 7%", size: 40, bg: R },
    { k: "prop", w: "rent while you save.", kind: "apartment", x: 1650, y: 860, s: 0.55 },
  ] },
  { at: "But in 2024, a record 22.7 million", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 120, text: "Harvard Joint Center for Housing Studies, 2026", size: 34 },
    { k: "num", w: "22.7 million", x: 560, y: 360, to: 227, f: "tenth", post: "M", size: 150, col: R, sub: "renter households, cost-burdened (a record)" },
    { k: "swarm", w: "renter households", n: 20, cols: 10, x: 1380, y: 300, dx: 62, dy: 90, kind: "house", s: 1.1 },
    { k: "swarm", w: "That's 49% of renters.", n: 10, cols: 10, x: 1380, y: 300, dx: 62, dy: 90, kind: "house", s: 1.1, col: "#e98b8b", stagger: 1 },
    { k: "tag", w: "That's 49% of renters.", x: 1380, y: 520, text: "49% of renters", size: 44, bg: R },
    { k: "txt", w: "about a quarter paid more than half", x: 960, y: 700, text: "about 1 in 4 paid more than HALF their income", size: 52 },
  ] },
  { at: "For the lowest-income renters", items: [
    { k: "txt", x: 960, y: 140, text: "extremely low-income renters, 2024 (Harvard JCHS)", size: 48 },
    { k: "bars", x: 650, base: 760, max: 12, h: 480, gap: 400, bw: 220, bars: [
      { w: "11.0 million", label: "households", v: 11, text: "11.0M", col: R },
      { w: "3.8 million affordable", label: "affordable units", v: 3.8, text: "3.8M", col: G }] },
  ] },
  { at: "The stock of cheap rentals is shrinking fast.", tone: "#f6efe6", items: [
    { k: "num", w: "fell by more than 7 million.", x: 560, y: 420, to: 7, f: "raw", pre: "−", post: "M+", size: 180, col: R, sub: "rentals under $1,000/mo, 2014 → 2024 (inflation-adjusted)" },
    { k: "num", w: "Units at $2,000 or more doubled.", x: 1380, y: 420, to: 2, f: "raw", post: "x", size: 180, col: N, sub: "rentals at $2,000+ a month" },
    { k: "prop", kind: "apartment", x: 960, y: 860, s: 0.45 },
  ] },
  { at: "Apartment rents softened a touch", items: [
    { k: "num", w: "down 0.5%", x: 480, y: 360, to: 5, f: "tenth", pre: "−", post: "%", size: 120, col: G, sub: "rents vs a year earlier, early 2026" },
    { k: "num", w: "still 29% higher", x: 1400, y: 360, to: 29, f: "raw", pre: "+", post: "%", size: 140, col: R, sub: "asking rents vs 2020 (Harvard JCHS)" },
    { k: "prop", w: "That's a treadmill.", kind: "treadmill", x: 900, y: 820, s: 1.0 },
    { k: "guy", w: "That's a treadmill.", x: 880, y: 790, s: 0.5, pose: "walk", expr: "defeated" },
    { k: "stamp", w: "That's not a plan.", x: 1450, y: 640, text: "NOT A PLAN", size: 60 },
  ] },
  { at: "And it doesn't get easier once you're in.", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 120, text: "typical monthly mortgage payment, 2019 → 2025 (ICE Mortgage Technology)", size: 30 },
    { k: "bars", x: 450, base: 760, max: 80, h: 480, gap: 400, bw: 220, bars: [
      { w: "the property tax part", label: "property tax part", v: 31, text: "+31%", col: N },
      { w: "the insurance part rose nearly 72%,", label: "insurance part", v: 72, text: "+72%", col: R }] },
    { k: "stamp", w: "The finish line moves", x: 1480, y: 470, text: "THE FINISH LINE MOVES", size: 46 },
  ] },
  // ── the money ─────────────────────────────────────────────────────────────────────────────────
  { at: "Run one buyer through it,", items: [
    { k: "prop", kind: "house", x: 380, y: 760, s: 0.8 },
    { k: "num", w: "sold for $417,500", x: 380, y: 300, to: 417500, f: "money", size: 100, col: N, sub: "median existing home, Sept 2026 (NAR)" },
    { k: "num", w: "Twenty percent down is $83,500.", x: 1050, y: 300, to: 83500, f: "money", size: 100, col: R, sub: "20% down" },
    { k: "num", w: "Save 15% of the median household's income", x: 1560, y: 560, to: 6, f: "raw", post: "+ years", size: 120, col: R, sub: "saving 15% of median income, if prices froze" },
  ] },
  { at: "They won't freeze.", tone: "#f6efe6", items: [
    { k: "stamp", x: 480, y: 220, text: "THEY WON'T FREEZE", size: 56 },
    { k: "num", w: "about $2,545 a month.", x: 560, y: 520, to: 2545, f: "money", post: "/mo", size: 110, col: R, sub: "10% down at 7.18%, principal + interest" },
    { k: "num", w: "That's about 35%", x: 1380, y: 520, to: 35, f: "raw", post: "%", size: 180, col: R, sub: "of median gross monthly income" },
    { k: "tag", w: "before property tax,", x: 960, y: 740, text: "before property tax, insurance, or a single repair", size: 40 },
  ] },
  { at: "Here's what waiting costs.", items: [
    { k: "num", w: "roughly $150,000", x: 1150, y: 420, to: 150000, f: "money", pre: "−", size: 160, col: R, sub: "equity lost buying at 40 instead of 30 (NAR estimate)" },
    { k: "guy", x: 420, y: 860, s: 0.7, pose: "idle", expr: "defeated" },
    { k: "prop", w: "Because you started the clock", kind: "clock", x: 1700, y: 880, s: 0.6 },
    { k: "tag", w: "Not because you did anything wrong.", x: 1150, y: 640, text: "not because you did anything wrong", size: 38, bg: G },
  ] },
  { at: "That's the real price of just wait.", tone: "#eceaf3", items: [
    { k: "stamp", w: "this isn't a willpower problem.", x: 960, y: 220, text: "NOT A WILLPOWER PROBLEM", size: 60 },
    { k: "tag", w: "It's prices, rates and supply.", x: 520, y: 480, text: "PRICES", size: 60, bg: R },
    { k: "tag", w: "It's prices, rates and supply.", plus: 10, x: 960, y: 480, text: "RATES", size: 60, bg: R },
    { k: "tag", w: "It's prices, rates and supply.", plus: 20, x: 1400, y: 480, text: "SUPPLY", size: 60, bg: R },
    { k: "tag", w: "It starts in Berkeley,", x: 960, y: 720, text: "next: Berkeley, California, 1916", size: 44 },
  ] },
  // ── act 3: the rule from 1916 ─────────────────────────────────────────────────────────────────
  { at: "In 1916, Berkeley, California became", tone: "#eaf3e6", items: [
    { k: "prop", kind: "map", x: 700, y: 470, s: 1.1, label: "Elmwood, Berkeley" },
    { k: "tag", x: 1450, y: 300, text: "1916: first single-family zoning", size: 40 },
    { k: "tag", w: "the city council says.", x: 1450, y: 390, text: "(City of Berkeley)", size: 32 },
    { k: "txt", w: "One house, one lot.", x: 1450, y: 620, text: "ONE HOUSE, ONE LOT", size: 70, col: R },
  ] },
  { at: "That resolution says developer Duncan McDuffie", items: [
    { k: "quote", x: 960, y: 360, size: 54, quote: ["“...lobbied for exclusionary zoning ordinances", "targeting Chinese laundries and", "African American dance halls”"], who: "Berkeley City Council resolution", src: "Feb 23, 2021" },
    { k: "tag", w: "According to historians,", x: 960, y: 760, text: "historians tie Elmwood's rule to keeping a dance hall out (some locals dispute this)", size: 30 },
  ] },
  { at: "In 1926, in Village of Euclid", tone: "#eef2f6", items: [
    { k: "prop", kind: "gavel", x: 420, y: 520, s: 1.1 },
    { k: "tag", x: 420, y: 200, text: "U.S. Supreme Court, 1926", size: 40 },
    { k: "prop", w: "kept apartment buildings out", kind: "apartment", x: 920, y: 760, s: 0.7, cross: "of its single-family districts." },
    { k: "num", w: "about 75% of residential land", x: 1550, y: 420, to: 75, f: "raw", post: "%", size: 180, col: R, sub: "of residential land: single-family only" },
    { k: "tag", w: "A New York Times analysis", x: 1550, y: 620, text: "New York Times analysis", size: 36 },
  ] },
  { at: "It varies a lot.", items: [
    { k: "bars", x: 420, base: 760, max: 100, h: 480, gap: 380, bw: 220, bars: [
      { w: "About 15% in New York City,", label: "New York City", v: 15, text: "~15%", col: G },
      { w: "94% in San Jose.", label: "San Jose", v: 94, text: "94%", col: R }] },
    { k: "prop", w: "a duplex or small apartment", kind: "duplex", x: 1450, y: 700, s: 0.8, cross: "can't be built," },
  ] },
  { at: "This isn't physics.", tone: "#eaf3e6", items: [
    { k: "stamp", w: "It's a decision,", x: 520, y: 240, text: "IT'S A DECISION", size: 64, col: N },
    { k: "prop", w: "Minneapolis made duplexes", kind: "duplex", x: 520, y: 780, s: 0.8 },
    { k: "tag", w: "Minneapolis made duplexes", x: 1350, y: 280, text: "Minneapolis: duplexes + triplexes legal", size: 38, bg: G },
    { k: "tag", w: "Arlington,", x: 1350, y: 380, text: "Arlington", size: 38, bg: G },
    { k: "tag", w: "Charlotte", x: 1350, y: 480, text: "Charlotte", size: 38, bg: G },
    { k: "tag", w: "Walla Walla", x: 1350, y: 580, text: "Walla Walla", size: 38, bg: G },
  ] },
  // ── close: three moves ────────────────────────────────────────────────────────────────────────
  { at: "Three moves, and this is general education,", items: [
    { k: "tag", x: 960, y: 110, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 440, title: "THREE MOVES", items: [
      { w: "One: compare monthly payments,", text: "1. compare monthly payments, not just prices", size: 48, mark: "none" }] },
    { k: "tag", w: "run the number at today's rate.", x: 960, y: 790, text: "run the number at today's rate", size: 40, bg: G },
  ] },
  { at: "Two: price the whole payment.", items: [
    { k: "list", x: 260, y: 180, wd: 1400, h: 440, title: "THREE MOVES", items: [
      { text: "1. compare monthly payments, not just prices", size: 48, mark: "none" },
      { w: "Two: price the whole payment.", text: "2. price the WHOLE payment: taxes + insurance", size: 48, mark: "none" }] },
  ] },
  { at: "Three: look up your local zoning.", items: [
    { k: "list", x: 260, y: 180, wd: 1400, h: 440, title: "THREE MOVES", items: [
      { text: "1. compare monthly payments, not just prices", size: 48, mark: "none" },
      { text: "2. price the WHOLE payment: taxes + insurance", size: 48, mark: "none" },
      { w: "Three: look up your local zoning.", text: "3. look up your local zoning, and who decides it", size: 48, mark: "none" }] },
  ] },
  { at: "So, afford it compared to what?", tone: "#eceaf3", items: [
    { k: "tag", w: "went from 29 to 40.", x: 520, y: 260, text: "first-time buyers: 29 → 40", size: 44, bg: R },
    { k: "tag", w: "A price ratio that held", x: 1400, y: 260, text: "a ratio that held 20 years, then broke", size: 40, bg: R },
    { k: "tag", w: "Mortgages locked low,", x: 520, y: 420, text: "mortgages locked low", size: 44, bg: N },
    { k: "tag", w: "and rules that still shape", x: 1400, y: 420, text: "rules on who can build", size: 44, bg: N },
    { k: "stamp", w: "Millennials didn't fail.", x: 960, y: 640, text: "MILLENNIALS DIDN'T FAIL", size: 70, col: G },
    { k: "txt", w: "the instructions were out of date.", x: 960, y: 800, text: "the instructions were out of date", size: 52 },
  ] },
  { at: "So if you were told to wait,", items: [
    { k: "guy", x: 360, y: 860, s: 0.75, pose: "point", expr: "smug" },
    { k: "txt", x: 1100, y: 200, text: "who were you waiting for?", size: 66, col: R },
    { k: "comment", w: "Tell me in the comments", x: 1120, y: 470, who: "you", text: "I bought my first home at ___", size: 52 },
    { k: "tag", w: "how old you'll be", x: 1100, y: 680, text: "...or how old you'll be if you're still waiting", size: 38 },
  ] },
  { at: "If you got something out of this,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "a like and a subscribe", plus: 30, x: 960, y: 660, text: "📘 " + GUIDE, size: 40, bg: G },
  ] },
];

export const SHOTS = resolveShots(TL, SPECS, 0, TL.totalFrames + 300); // 10 s hold for the end screen
export const AGE40_FRAMES = SHOTS[SHOTS.length - 1].b;
const LINES = TL.lines(0, TL.words.length - 1);
const HI = ["NAR", "NAR's", "millennials", "Millennials", "boomer", "boomers", "afford", "inheritance", "Harvard", "Berkeley", "1916", "zoning", "wait", "waiting", "refinance", "price", "rates"];
// the first shot starts at frame 0
SHOTS[0] = { ...SHOTS[0], a: 0 };

export const Age40: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src="age40/narration.mp3" slices={TL.slices} />
    </AbsoluteFill>
  );
};
