// "Shrinkflation Explained: Why Your Groceries Got Smaller" (publishes Fri Nov 27, 2026).
// Narration: animate/narration/shrink in the private repo (script approved Nov 10; two precision fixes after Fable's check).
// Storyboard + fact check: Fable, Nov 10. Brands appear only as words with "per Mouse Print" — no logos or trade dress.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import WORDS from "../../public/shrink/words.json";
import { Fonts, Captions, Narration, COL, FPS } from "../kit";
import { makeTimeline } from "../timeline";
import { resolveShots, ShotsTrack, ShotSpec } from "../scenes";

export const TL = makeTimeline((WORDS as any).words ?? (WORDS as any), FPS);
const G = COL.green, R = COL.red, N = COL.navy, GR = "#8a8f99";
const GUIDE = "beginner's guide: link in the description";
const MP = "per Mouse Print (Consumer World)";
const GAO = "GAO-25-107451 (July 2025)";

const SPECS: ShotSpec[] = [
  // ── hook ──────────────────────────────────────────────────────────────────────────────────────
  { at: "Shrinkflation is real.", items: [
    { k: "prop", kind: "pack", x: 620, y: 860, s: 1.4, label: "CEREAL" },
    { k: "prop", w: "really did get smaller.", kind: "pack", x: 1250, y: 860, s: 1.1, label: "CEREAL", ghost: true },
    { k: "stamp", w: "Shrinkflation is real.", plus: 20, x: 960, y: 200, text: "REAL", size: 90 },
    { k: "guy", x: 1700, y: 900, s: 0.55, pose: "idle", expr: "deadpan", poses: [["really did get smaller.", "shrug", "shock"]] },
  ] },
  { at: "And the government's own math", tone: "#eef2f6", items: [
    { k: "prop", kind: "capitol", x: 520, y: 760, s: 1.1 },
    { k: "tag", w: "barely moves inflation.", x: 1300, y: 300, text: "\"barely moves inflation\"", size: 56, bg: N },
    { k: "stamp", w: "Both of those are true,", x: 1300, y: 560, text: "BOTH TRUE", size: 80, col: G },
    { k: "guy", w: "that's exactly the problem.", x: 1450, y: 920, s: 0.55, pose: "shrug", expr: "sideeye" },
  ] },
  { at: "Because the products that shrink", items: [
    { k: "prop", kind: "cart", x: 700, y: 820, s: 1.3 },
    { k: "guy", x: 1150, y: 900, s: 0.6, pose: "walk", expr: "deadpan" },
    { k: "tag", w: "the ones you buy every week.", x: 1450, y: 300, text: "the stuff you buy every week", size: 48, bg: R },
  ] },
  { at: "And research shows shoppers", tone: "#f6efe6", items: [
    { k: "prop", kind: "shelftag", x: 760, y: 520, s: 1.4 },
    { k: "arrow", w: "a price tag", pts: [[1300, 280], [1050, 400]], col: R },
    { k: "guy", x: 1500, y: 900, s: 0.65, pose: "point", expr: "sideeye" },
    { k: "txt", w: "than to a net weight.", x: 760, y: 830, text: "the net weight? barely noticed", size: 48, col: GR },
  ] },
  { at: "Stick around for three things.", items: [
    { k: "list", x: 300, y: 170, wd: 1250, h: 470, title: "STAY FOR THREE THINGS", items: [
      { w: "How the government actually counts", text: "1. how the government counts a smaller box", mark: "none" },
      { w: "can still cost you real money.", text: "2. why \"barely\" still costs you money", mark: "none" },
      { w: "And a bigger kind of shrinking", text: "3. the shrinking nobody notices", mark: "none" }] },
    { k: "guy", x: 1720, y: 880, s: 0.55, pose: "point", expr: "smug" },
  ] },
  // ── what it looks like ────────────────────────────────────────────────────────────────────────
  { at: "First, what it looks like.", tone: "#eceaf3", items: [
    { k: "prop", kind: "mail", x: 560, y: 520, s: 1.0, label: "OLD vs NEW" },
    { k: "prop", plus: 6, kind: "mail", x: 960, y: 560, s: 1.0, label: "OLD vs NEW" },
    { k: "prop", plus: 12, kind: "mail", x: 1360, y: 520, s: 1.0, label: "OLD vs NEW" },
    { k: "tag", w: "Mouse Print,", x: 960, y: 200, text: "Mouse Print · Edgar Dworsky, Consumer World", size: 42, bg: N },
    { k: "txt", w: "sent in by shoppers.", x: 960, y: 820, text: "photos sent in by shoppers", size: 52 },
  ] },
  { at: "This year it reported", items: [
    { k: "prop", kind: "pack", x: 480, y: 860, s: 1.2, label: "CEREAL", sub: "18.1 oz" },
    { k: "prop", w: "to 16.4.", kind: "pack", x: 900, y: 860, s: 1.05, label: "CEREAL", sub: "16.4 oz", ghost: true },
    { k: "txt", w: "Kellogg's Corn Pops", x: 1450, y: 300, text: "Kellogg's Corn Pops", size: 64 },
    { k: "num", w: "going from 18.1 ounces", x: 1450, y: 520, to: 181, f: "tenth", post: " oz", size: 110, col: N },
    { k: "num", w: "to 16.4.", x: 1450, y: 700, to: 164, f: "tenth", post: " oz", size: 110, col: R },
    { k: "tag", x: 1450, y: 860, text: MP, size: 32 },
  ] },
  { at: "Hershey's snack-size chocolate bags", tone: "#f6efe6", items: [
    { k: "list", x: 300, y: 170, wd: 1320, h: 380, title: "MORE FROM MOUSE PRINT, 2026", items: [
      { w: "Hershey's snack-size chocolate bags", text: "Hershey's snack-size bag:  19.8 oz → 18 oz", mark: "none" },
      { w: "Oscar Mayer beef franks", text: "Oscar Mayer beef franks:  1 lb → 15 oz", mark: "none" }] },
    { k: "tag", x: 960, y: 640, text: MP, size: 32 },
    { k: "guy", w: "Oscar Mayer beef franks", x: 1700, y: 920, s: 0.5, pose: "shrug", expr: "sideeye" },
  ] },
  { at: "And store brands aren't immune.", items: [
    { k: "prop", kind: "pack", x: 560, y: 880, s: 1.4, label: "SOFTENER", ghost: true },
    { k: "num", w: "went from 187 ounces", x: 1300, y: 380, to: 187, f: "raw", post: " oz", size: 130, col: N },
    { k: "num", w: "to 150,", x: 1300, y: 620, to: 150, f: "raw", post: " oz", size: 130, col: R },
    { k: "tag", w: "according to the same column.", x: 1150, y: 840, text: "Costco's Kirkland brand · " + MP, size: 30 },
    { k: "guy", w: "to 150,", x: 1750, y: 920, s: 0.5, pose: "facepalm", expr: "defeated" },
  ] },
  { at: "Same shelf.", tone: "#eef2f6", items: [
    { k: "prop", kind: "pack", x: 520, y: 790, s: 0.9, label: "SNACKS" },
    { k: "prop", w: "Same spot.", kind: "pack", x: 960, y: 790, s: 0.75, label: "SNACKS", ghost: true },
    { k: "stamp", w: "Less inside.", x: 1400, y: 400, text: "LESS INSIDE", size: 80 },
  ] },
  { at: "That's shrinkflation.", items: [
    { k: "prop", kind: "shelftag", x: 560, y: 480, s: 1.2, label: "SAME", sub: "same sticker price" },
    { k: "prop", w: "smaller package.", kind: "pack", x: 1250, y: 860, s: 1.0, label: "BOX", ghost: true },
    { k: "txt", w: "paying more per ounce,", x: 1250, y: 260, text: "↑ more per ounce", size: 80, col: R },
  ] },
  // ── how BLS counts it ─────────────────────────────────────────────────────────────────────────
  { at: "So does the government catch it?", tone: "#eaf3e6", items: [
    { k: "prop", kind: "capitol", x: 600, y: 760, s: 1.1 },
    { k: "guy", x: 1300, y: 900, s: 0.65, pose: "idle", expr: "thinking" },
    { k: "stamp", w: "Mostly, yes.", x: 1350, y: 300, text: "MOSTLY, YES", size: 80, col: G },
  ] },
  { at: "The Bureau of Labor Statistics prices", items: [
    { k: "num", w: "about 100,000 goods", x: 960, y: 330, to: 100000, f: "raw", pre: "~", size: 190, col: N, sub: "goods & services priced every month for the CPI (BLS)" },
    { k: "prop", w: "records the new size", kind: "receipt", x: 560, y: 820, s: 0.9 },
    { k: "tag", w: "works out the price per unit.", x: 1250, y: 760, text: "→ price per unit", size: 56, bg: G },
  ] },
  { at: "Its own example:", tone: "#f6efe6", items: [
    { k: "prop", kind: "pack", x: 480, y: 860, s: 1.2, label: "ICE CREAM", sub: "64 oz" },
    { k: "prop", w: "at $5.99.", kind: "shelftag", x: 1350, y: 380, s: 1.0, label: "$5.99", sub: "half-gallon, 64 oz" },
    { k: "prop", w: "Next month it's 60 ounces,", kind: "pack", x: 900, y: 860, s: 1.1, label: "ICE CREAM", sub: "60 oz", ghost: true },
    { k: "stamp", w: "The sticker didn't change.", x: 1350, y: 720, text: "STICKER: SAME", size: 60, col: N },
    { k: "tag", x: 960, y: 60, text: "BLS's own example, Beyond the Numbers (2023)", size: 30 },
  ] },
  { at: "But BLS counts that as a 6.7 percent", items: [
    { k: "num", w: "a 6.7 percent price increase,", x: 760, y: 420, to: 67, f: "tenth", pre: "+", post: "%", size: 220, col: R, sub: "price per ounce, as BLS counts it" },
    { k: "guy", x: 1500, y: 900, s: 0.7, pose: "shrug", expr: "shock" },
  ] },
  { at: "Same with toilet paper.", tone: "#eef2f6", items: [
    { k: "prop", kind: "roll", x: 480, y: 760, s: 1.2, label: "220" },
    { k: "prop", w: "to 200", kind: "roll", x: 860, y: 760, s: 1.1, label: "200" },
    { k: "num", w: "is a 10 percent increase", x: 1450, y: 420, to: 10, f: "raw", pre: "+", post: "%", size: 200, col: R, sub: "price per sheet (BLS example)" },
    { k: "stamp", w: "And BLS counts it.", x: 1450, y: 760, text: "COUNTED", size: 70, col: G },
  ] },
  // ── how much it adds ──────────────────────────────────────────────────────────────────────────
  { at: "So how much does all this shrinking", items: [
    { k: "guy", x: 960, y: 900, s: 0.75, pose: "shrug", expr: "thinking" },
    { k: "txt", w: "Here's the number", x: 960, y: 260, text: "how much does shrinking add?", size: 76, col: N },
  ] },
  { at: "In 2025, the Government Accountability Office", tone: "#eceaf3", items: [
    { k: "prop", kind: "sheet", x: 480, y: 560, s: 1.1 },
    { k: "tag", x: 480, y: 200, text: GAO, size: 36, bg: N },
    { k: "tag", w: "from December 2019", x: 1350, y: 260, text: "Dec 2019 → Dec 2024", size: 48 },
    { k: "num", w: "rose 34.5 percent.", x: 1350, y: 560, to: 345, f: "tenth", pre: "+", post: "%", size: 180, col: N, sub: "consumer prices over 5 years" },
  ] },
  { at: "Downsizing contributed six hundredths", items: [
    { k: "bars", x: 420, base: 800, max: 36, h: 560, gap: 420, bw: 260, bars: [
      { label: "all price increases", v: 34.5, text: "34.5 pts", col: N },
      { w: "Downsizing contributed", label: "from downsizing", v: 0.3, text: "0.06 pt", col: R }] },
    { k: "tag", w: "About 0.01 points a year.", x: 1450, y: 400, text: "~0.01 point a year", size: 50, bg: R },
    { k: "stamp", w: "GAO called the overall impact minimal.", x: 1450, y: 650, text: "\"MINIMAL\" · GAO", size: 60, col: N },
  ] },
  { at: "Even for food,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "cart", x: 520, y: 800, s: 1.1 },
    { k: "num", w: "rose 32.4 percent", x: 1350, y: 330, to: 324, f: "tenth", pre: "+", post: "%", size: 150, col: N, sub: "food prices, Dec 2019–Dec 2024 (GAO)" },
    { k: "num", w: "just 0.38 of a point.", x: 1350, y: 640, to: 38, f: "dec", post: " pt", size: 150, col: R, sub: "of that from downsizing" },
  ] },
  { at: "So if someone tells you", items: [
    { k: "prop", kind: "person", x: 500, y: 880, s: 1.2 },
    { k: "bubble", x: 820, y: 260, wd: 680, lines: ["shrinkflation is why", "everything costs more!"], tx: 560, ty: 520, size: 50 },
    { k: "stamp", w: "the data says no.", x: 1450, y: 620, text: "THE DATA SAYS NO", size: 64 },
    { k: "tag", w: "plain old price increases.", x: 1300, y: 860, text: "mostly: plain price increases", size: 44, bg: N },
  ] },
  { at: "But here's where it gets personal.", tone: "#f6efe6", items: [
    { k: "txt", w: "most things never shrink.", x: 960, y: 180, text: "most things never shrink", size: 64, col: N },
    { k: "prop", w: "Gas doesn't shrink.", kind: "car", x: 460, y: 680, s: 1.0 },
    { k: "prop", w: "Rent doesn't shrink.", kind: "apartment", x: 960, y: 800, s: 0.75 },
    { k: "prop", w: "Haircuts don't shrink.", kind: "person", x: 1450, y: 840, s: 1.0 },
  ] },
  { at: "When you zoom in on the aisles", tone: "#f3ecec", zoom: 1.12, items: [
    { k: "tag", x: 960, y: 90, text: "points added by downsizing, Dec 2019–Dec 2024 · GAO", size: 32 },
    { k: "bars", x: 260, base: 800, max: 3.4, h: 520, gap: 300, bw: 200, ls: 32, bars: [
      { w: "it added 3 full percentage points", label: "paper goods", v: 3.0, text: "3.0", col: R },
      { w: "Snacks, 2.6.", label: "snacks", v: 2.6, text: "2.6", col: R },
      { w: "Candy and gum, 2.3.", label: "candy & gum", v: 2.3, text: "2.3", col: R },
      { w: "Ice cream, 1.8.", label: "ice cream", v: 1.8, text: "1.8", col: R },
      { w: "Breakfast cereal, 1.6.", label: "cereal", v: 1.6, text: "1.6", col: R }] },
  ] },
  { at: "That's not nothing.", items: [
    { k: "prop", kind: "cart", x: 760, y: 820, s: 1.3 },
    { k: "prop", kind: "roll", x: 1250, y: 780, s: 0.8, label: "" },
    { k: "guy", x: 1650, y: 900, s: 0.6, pose: "point", expr: "smug" },
    { k: "stamp", w: "The stuff in almost every cart.", x: 960, y: 260, text: "ALMOST EVERY CART", size: 70 },
  ] },
  { at: "Quick one: if this is useful,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "my beginner's guide", x: 900, y: 700, text: "📘 " + GUIDE, size: 44, bg: G },
  ] },
  // ── common in your cart ───────────────────────────────────────────────────────────────────────
  { at: "Now the part that really explains", items: [
    { k: "prop", kind: "receipt", x: 560, y: 560, s: 1.4 },
    { k: "tag", w: "store scanner data", x: 1300, y: 400, text: "store scanner data, 2021–2023 · GAO", size: 44, bg: N },
    { k: "guy", x: 1400, y: 900, s: 0.6, pose: "walk", expr: "thinking" },
  ] },
  { at: "Take cereal.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 90, text: "cereal, 2021–2023 · GAO (NielsenIQ data)", size: 32 },
    { k: "bars", x: 420, base: 800, max: 10, h: 540, gap: 420, bw: 260, bars: [
      { w: "about 1.1 percent of cereal items", label: "items downsized", v: 1.1, text: "1.1%", col: GR },
      { w: "made up 8.6 percent", label: "their dollar sales", v: 8.6, text: "8.6%", col: R }] },
    { k: "stamp", w: "The boxes that shrank were the popular boxes.", x: 1500, y: 300, text: "THE POPULAR BOXES", size: 54 },
  ] },
  { at: "In paper towels, it's even bigger.", items: [
    { k: "prop", kind: "roll", x: 560, y: 780, s: 1.3, label: "" },
    { k: "num", w: "were 38.6 percent", x: 1350, y: 460, to: 386, f: "tenth", post: "%", size: 200, col: R, sub: "of paper-towel dollar sales: downsized products (GAO)" },
  ] },
  { at: "And for the products that did shrink,", tone: "#eef2f6", items: [
    { k: "tag", x: 960, y: 90, text: "average per-unit price rise, downsized items, 2021–23 · GAO", size: 32 },
    { k: "bars", x: 520, base: 800, max: 36, h: 540, gap: 460, bw: 260, bars: [
      { w: "11.6 percent for paper towels", label: "paper towels", v: 11.6, text: "+11.6%", col: R },
      { w: "32.4 percent for coffee.", label: "coffee", v: 32.4, text: "+32.4%", col: R }] },
    { k: "prop", w: "32.4 percent for coffee.", kind: "coffee", x: 1600, y: 760, s: 1.2 },
  ] },
  { at: "So shrinkflation is rare across the store,", items: [
    { k: "txt", x: 520, y: 300, text: "rare across the store", size: 60, col: GR },
    { k: "txt", w: "but common in your cart.", x: 1400, y: 300, text: "common in your cart", size: 60, col: R },
    { k: "prop", w: "but common in your cart.", kind: "cart", x: 1400, y: 820, s: 1.1 },
    { k: "stamp", w: "The bestsellers get trimmed.", x: 620, y: 650, text: "BESTSELLERS GET TRIMMED", size: 50 },
  ] },
  // ── why shrink the box ────────────────────────────────────────────────────────────────────────
  { at: "So why shrink the box", tone: "#f6efe6", items: [
    { k: "prop", kind: "pack", x: 520, y: 860, s: 1.1, label: "BOX", ghost: true },
    { k: "txt", plus: 10, x: 960, y: 520, text: "vs", size: 90, col: GR },
    { k: "prop", w: "raising the price?", kind: "shelftag", x: 1400, y: 560, s: 1.0, label: "+$", sub: "a higher sticker" },
    { k: "tag", w: "Marketing Science", x: 960, y: 140, text: "journal Marketing Science, 2026", size: 40, bg: N },
  ] },
  { at: "Researchers Aljoscha Janssen", items: [
    { k: "prop", kind: "sheet", x: 380, y: 560, s: 1.0 },
    { k: "num", w: "about 1.92 percent", x: 1000, y: 360, to: 192, f: "dec", post: "%", size: 150, col: N, sub: "of products downsized (10 years of scanner data)" },
    { k: "num", w: "more than five times", x: 1000, y: 680, to: 5, f: "raw", pre: "> ", post: "×", size: 140, col: R, sub: "downsizing vs upsizing, by sales" },
    { k: "tag", w: "without the price coming down.", x: 1550, y: 860, text: "price rarely came down", size: 40, bg: R },
  ] },
  { at: "The key finding:", tone: "#eceaf3", items: [
    { k: "prop", kind: "shelftag", x: 600, y: 480, s: 1.3, label: "PRICE", sub: "net wt: (tiny print)" },
    { k: "guy", x: 1050, y: 900, s: 0.6, pose: "point", expr: "deadpan" },
    { k: "num", w: "only about half as responsive", x: 1500, y: 360, to: 50, f: "raw", pre: "~", post: "%", size: 130, col: R, sub: "as responsive to size as to price" },
    { k: "tag", w: "an effective way", x: 1500, y: 640, text: "authors: \"an effective way\"", size: 40, bg: N },
  ] },
  { at: "That's the business logic.", items: [
    { k: "prop", kind: "factory", x: 520, y: 800, s: 1.0 },
    { k: "list", x: 960, y: 220, wd: 760, h: 300, items: [
      { w: "push back on a higher price", text: "raise the sticker", mark: "x" },
      { w: "the smaller box wins.", text: "shrink the box", mark: "v" }] },
  ] },
  // ── the bigger version ────────────────────────────────────────────────────────────────────────
  { at: "Now, the bigger version I promised.", tone: "#eaf3e6", items: [
    { k: "tag", x: 960, y: 90, text: "UMass Amherst study, packaged food 2012–2019 (via WBUR)", size: 32 },
    { k: "line", w: "from 2012 to 2019.", x: 420, y: 720, wd: 1000, h: 380, min: 80, max: 102, labels: false, col: R, points: [
      { label: "2012", v: 100 }, { label: "2019", v: 85, w: "fell by nearly 15 percent" }] },
    { k: "num", w: "fell by nearly 15 percent", x: 1500, y: 320, to: 15, f: "raw", pre: "−", post: "%", size: 150, col: R, sub: "nearly: average package size" },
  ] },
  { at: "But here's the twist.", items: [
    { k: "prop", kind: "pack", x: 700, y: 860, s: 1.4, label: "SNACKS" },
    { k: "prop", w: "A smaller one shows up", kind: "pack", x: 1150, y: 860, s: 0.8, label: "SNACKS" },
    { k: "tag", w: "They added new, smaller versions", x: 1350, y: 300, text: "new, smaller versions added", size: 46, bg: N },
    { k: "guy", w: "The big one stays", x: 1650, y: 900, s: 0.5, pose: "shrug", expr: "sideeye" },
  ] },
  { at: "The lead author, economist Christian Rojas,", tone: "#eceaf3", items: [
    { k: "quote", w: "put it simply:", x: 960, y: 400, size: 80, quote: ["“the average product", "is becoming smaller”"], who: "Christian Rojas, UMass Amherst", src: "via WBUR, Feb 2026" },
  ] },
  { at: "And the study found something else.", items: [
    { k: "num", w: "nearly 4 percent.", x: 560, y: 400, to: 4, f: "raw", pre: "~", post: "%", size: 200, col: R, sub: "food inflation understated" },
    { k: "tag", w: "nearly 4 percent.", plus: 10, x: 560, y: 620, text: "if smaller packs aren't counted", size: 36 },
    { k: "prop", w: "steepest in sugary foods,", kind: "map", x: 1400, y: 560, s: 1.0, label: "weaker unit-pricing rules" },
    { k: "tag", w: "steepest in sugary foods,", x: 1400, y: 200, text: "steepest: sugary foods", size: 44, bg: R },
  ] },
  // ── is it legal ───────────────────────────────────────────────────────────────────────────────
  { at: "So the label on the shelf matters.", tone: "#f6efe6", items: [
    { k: "prop", kind: "gavel", x: 560, y: 560, s: 1.1 },
    { k: "txt", w: "Is any of this legal?", x: 1300, y: 300, text: "is it legal?", size: 90, col: N },
    { k: "stamp", w: "Mostly, yes.", x: 1300, y: 620, text: "MOSTLY, YES", size: 74 },
  ] },
  { at: "GAO says the two main federal packaging laws", items: [
    { k: "tag", x: 960, y: 90, text: "GAO: federal packaging laws \"do not expressly prohibit product downsizing\"", size: 30 },
    { k: "prop", w: "nonfunctional slack-fill.", kind: "pack", x: 600, y: 860, s: 1.3, label: "CHIPS", ghost: true },
    { k: "tag", w: "nonfunctional slack-fill.", x: 600, y: 300, text: "slack-fill = empty space", size: 44, bg: N },
    { k: "tag", w: "In food packaging,", x: 1350, y: 480, text: "food you can't see + no-purpose air", size: 40 },
    { k: "stamp", w: "it's prohibited.", x: 1350, y: 680, text: "PROHIBITED", size: 70 },
  ] },
  { at: "But shrinking the product itself,", tone: "#eef2f6", items: [
    { k: "prop", kind: "pack", x: 560, y: 860, s: 1.2, label: "CEREAL", sub: "new net wt" },
    { k: "stamp", w: "That isn't expressly banned.", x: 1350, y: 320, text: "NOT EXPRESSLY BANNED", size: 54, col: N },
    { k: "tag", w: "according to FTC officials,", x: 1350, y: 620, text: "no FTC rule calling it deceptive (per FTC officials, GAO)", size: 30 },
  ] },
  { at: "Some lawmakers want to change that.", items: [
    { k: "prop", kind: "capitol", x: 480, y: 760, s: 1.0 },
    { k: "tag", w: "Connecticut's attorney general", x: 1300, y: 260, text: "Connecticut AG (2025): require a notice", size: 42, bg: N },
    { k: "tag", w: "swapped that rule", x: 1300, y: 380, text: "committee: a UConn study instead", size: 42, bg: GR },
    { k: "tag", w: "Representative Lou Correa", x: 1300, y: 560, text: "Deceptive Downsizing Prohibition Act of 2025", size: 36, bg: N },
    { k: "tag", w: "Representative Lou Correa", plus: 8, x: 1300, y: 650, text: "introduced by Rep. Lou Correa", size: 32 },
  ] },
  { at: "Other countries have gone further.", tone: "#eaf3e6", items: [
    { k: "prop", kind: "door", x: 520, y: 860, s: 1.0 },
    { k: "tag", w: "France has required large supermarkets", x: 1350, y: 280, text: "FRANCE · since July 2024", size: 52, bg: N },
    { k: "swarm", w: "for two months", kind: "cal", n: 2, cols: 2, x: 1350, y: 520, dx: 160, s: 2.0 },
    { k: "tag", w: "its price per unit goes up.", x: 1350, y: 760, text: "store notice: smaller pack, higher unit price", size: 38, bg: G },
  ] },
  { at: "In the US, for now,", items: [
    { k: "prop", kind: "shelftag", x: 760, y: 520, s: 1.5, label: "PRICE", sub: "unit price: per oz ← read this" },
    { k: "guy", x: 1550, y: 900, s: 0.65, pose: "point", expr: "smug" },
  ] },
  // ── three moves + close ───────────────────────────────────────────────────────────────────────
  { at: "Three moves.", tone: "#f6efe6", items: [
    { k: "tag", x: 960, y: 100, text: "general education, not financial advice", size: 34 },
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { w: "One: read the unit price,", text: "1. read the unit price, not the sticker", size: 48, mark: "none" }] },
    { k: "prop", w: "It's usually in small print", kind: "shelftag", x: 960, y: 860, s: 0.7, label: "PRICE" },
  ] },
  { at: "Two: when you see", tone: "#f6efe6", items: [
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { text: "1. read the unit price, not the sticker", size: 48, mark: "none" },
      { w: "Two: when you see", text: "2. \"new look\"? check the net weight", size: 48, mark: "none" }] },
    { k: "prop", w: "check the net weight.", kind: "pack", x: 1760, y: 860, s: 0.55, label: "NEW LOOK!", ghost: true },
  ] },
  { at: "Three: compare against the store brand.", tone: "#f6efe6", items: [
    { k: "list", x: 260, y: 180, wd: 1400, h: 480, title: "THREE MOVES", items: [
      { text: "1. read the unit price, not the sticker", size: 48, mark: "none" },
      { text: "2. \"new look\"? check the net weight", size: 48, mark: "none" },
      { w: "Three: compare against the store brand.", text: "3. compare the store brand (it can shrink too)", size: 48, mark: "none" }] },
    { k: "tag", w: "store-brand dollar sales grew faster", x: 960, y: 820, text: "2025: store-brand sales grew faster (PLMA)", size: 38, bg: G },
  ] },
  { at: "So, shrinkflation explained.", items: [
    { k: "list", x: 300, y: 110, wd: 1250, h: 720, title: "SHRINKFLATION, EXPLAINED", items: [
      { w: "It's real.", text: "it's real" }, { w: "The government counts it.", text: "the government counts it" },
      { w: "it's a rounding error.", text: "economy-wide: a rounding error" }, { w: "But it's concentrated", text: "concentrated in your cart" },
      { w: "And it works because", text: "it works because we watch the price" }] },
    { k: "guy", x: 1720, y: 900, s: 0.55, pose: "point", expr: "smug" },
  ] },
  { at: "So tell me:", tone: "#eaf3e6", items: [
    { k: "guy", x: 340, y: 880, s: 0.7, pose: "point", expr: "smug" },
    { k: "comment", w: "what's the most obvious shrink", x: 1180, y: 420, who: "you", text: "my most obvious shrink: ___", size: 50 },
    { k: "tag", w: "Drop it in the comments.", x: 1100, y: 640, text: "drop it in the comments", size: 50, bg: N },
  ] },
  { at: "If you got something out of this,", tone: "#eaf3e6", items: [
    { k: "prop", kind: "thumb", x: 600, y: 420, s: 1.1 },
    { k: "prop", w: "a like and a subscribe", kind: "subscribe", x: 1250, y: 420, s: 1.1 },
    { k: "guy", x: 1650, y: 880, s: 0.5, pose: "point", expr: "fakesmile" },
    { k: "tag", w: "a like and a subscribe", plus: 30, x: 960, y: 660, text: "📘 " + GUIDE, size: 40, bg: G },
  ] },
];

export const SHOTS = resolveShots(TL, SPECS, 0, TL.totalFrames + 300); // 10 s hold for the end screen
export const SHRINK_FRAMES = SHOTS[SHOTS.length - 1].b;
const LINES = TL.lines(0, TL.words.length - 1);
const HI = ["shrinkflation", "BLS", "GAO", "unit", "ounce", "ounces", "smaller", "price", "cart"];
SHOTS[0] = { ...SHOTS[0], a: 0 };

export const Shrink: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Fonts />
      <ShotsTrack shots={SHOTS} />
      <Captions t={f} lines={LINES} hi={HI} />
      <Narration src="shrink/narration.mp3" slices={TL.slices} />
    </AbsoluteFill>
  );
};
