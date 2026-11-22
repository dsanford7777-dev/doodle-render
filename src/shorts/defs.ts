// The ten Shorts (two per long video). Every figure on screen is one already checked for the long video.
import RAMSEY from "../../public/ramsey/words.json";
import AGE40 from "../../public/age40/words.json";
import AMERICA from "../../public/america/words.json";
import PAY from "../../public/paycheck2/words.json";
import SHRINK from "../../public/shrink/words.json";
import { COL } from "../kit";
import { ShortDef } from "./Short";

const G = COL.green, R = COL.red, N = COL.navy, GR = "#8a8f99", INK2 = "#4a4a55";
const RAMSEY_T = ["I Ran Dave Ramsey's Plan", "on a 2026 Paycheck"];
const AGE40_T = ["First-Time Buyer Age Is 40.", "Millennials Didn't Fail."];
const AMERICA_T = ["When America", "Made Everything"];
const PAY_T = ["Paycheck to Paycheck", "on a Full-Time Job?"];
const SHRINK_T = ["Shrinkflation Explained:", "Why Groceries Got Smaller"];

export const DEFS: ShortDef[] = [
  // ── Ramsey 1: the plan comes up $1,270 short ────────────────────────────────────────────────────
  { id: "ShortRamsey1", words: RAMSEY, src: "ramsey/narration.mp3", full: RAMSEY_T, hi: ["rigged", "short", "cap", "limit"],
    parts: [{ from: "Dave Ramsey knows", to: "Every single month." }, { from: "The median household income in America", to: "a perfectly median house." }],
    specs: [
      { at: "Dave Ramsey knows the system", tone: "#eceaf3", items: [
        { k: "dave", x: 500, y: 1290, s: 0.66, arm: "point" },
        { k: "quote", w: "He said it", x: 540, y: 440, wd: 960, size: 62, quote: ["“Corporate America", "has screwed you.”"], who: "Dave Ramsey", src: "FOX Business · Mar 22, 2026" },
        { k: "txt", w: "He said it", plus: 12, x: 540, y: 700, text: "asked about young people and down payments;", size: 36, font: "PatrickHand", col: INK2 },
        { k: "txt", w: "He said it", plus: 12, x: 540, y: 745, text: "he was talking about car payments, student loans, credit cards", size: 36, font: "PatrickHand", col: INK2 },
        { k: "stamp", w: "national TV.", x: 800, y: 850, text: "ON NATIONAL TV", size: 40 },
      ] },
      { at: "Then he hands you a plan", items: [
        { k: "prop", kind: "sheet", x: 540, y: 620, s: 1.3 },
        { k: "txt", x: 540, y: 300, text: "THE PLAN", size: 80 },
        { k: "stamp", w: "only works if it isn't.", x: 540, y: 950, text: "ONLY WORKS IF IT ISN'T", size: 52 },
        { k: "guy", x: 540, y: 1300, s: 0.45, pose: "shrug", expr: "sideeye" },
      ] },
      { at: "So I ran his plan", tone: "#eaf3e6", items: [
        { k: "prop", kind: "paycheck", x: 540, y: 430, s: 1.5, label: "2026 PAYCHECK" },
        { k: "num", w: "about $1,270 short.", x: 540, y: 860, to: -1270, f: "money", post: "/mo", size: 160, col: R, sub: "short of Dave's own 25% rule (our math)" },
        { k: "stamp", w: "Every single month.", x: 540, y: 1150, text: "EVERY. SINGLE. MONTH.", size: 54 },
      ] },
      { at: "The median household income in America", tone: "#eef2f6", items: [
        { k: "tag", x: 540, y: 190, text: "Census/HUD · Freddie Mac (Nov 5) · our tax math", size: 30 },
        { k: "list", x: 90, y: 260, wd: 900, title: "THE SETUP", items: [
          { text: "median home sold, early 2026: $403,200", mark: "none", size: 38 },
          { text: "20% down · 15-year fixed at 6.57%", mark: "none", size: 40 },
          { w: "about $87,500.", text: "median household: ~$87,500/yr", mark: "none", size: 42 },
          { w: "roughly $6,210 a month.", text: "take-home: ~$6,210 a month", mark: "none", size: 44 }] },
        { k: "tag", w: "Again, generous:", x: 540, y: 850, text: "no state tax or health insurance taken out", size: 36, bg: N },
        { k: "num", w: "is $1,553.", x: 540, y: 1090, to: 1553, f: "money", size: 170, col: G, sub: "Dave's cap: 25% of take-home" },
      ] },
      { at: "The payment is $2,822.", tone: "#f3ecec", items: [
        { k: "tag", x: 540, y: 200, text: "per month, principal + interest only", size: 34 },
        { k: "bars", x: 200, base: 1180, max: 3000, h: 720, gap: 400, bw: 240, bars: [
          { w: "The payment is $2,822.", label: "the payment", v: 2822, text: "$2,822", col: R },
          { w: "Dave's cap is $1,553.", label: "Dave's cap", v: 1553, text: "$1,553", col: G }] },
        { k: "stamp", w: "That's $1,270 a month", x: 540, y: 340, text: "$1,270 OVER", size: 70 },
      ] },
      { at: "For a perfectly median family,", items: [
        { k: "guy", x: 290, y: 1300, s: 0.75, pose: "shrug", expr: "defeated" },
        { k: "tag", x: 290, y: 760, text: "median family", size: 42, bg: N },
        { k: "prop", w: "buying a perfectly median house.", kind: "house", x: 760, y: 1290, s: 0.9 },
        { k: "tag", w: "buying a perfectly median house.", x: 760, y: 860, text: "median house", size: 42, bg: N },
        { k: "num", x: 540, y: 480, to: -1270, f: "money", post: "/mo", size: 150, col: R, sub: "over Dave's own limit" },
      ] },
    ] },

  // ── Ramsey 2: "then buy less house" / "then make more money" ───────────────────────────────────
  { id: "ShortRamsey2", words: RAMSEY, src: "ramsey/narration.mp3", full: RAMSEY_T, hi: ["half", "after", "less", "more"],
    parts: [{ from: "Now, Dave's fans already", to: "Not before taxes. After." }],
    specs: [
      { at: "Now, Dave's fans already", tone: "#f6efe6", items: [
        { k: "tag", x: 540, y: 200, text: "Dave's rule: payment ≤ 25% of take-home, 15-year loan", size: 30 },
        { k: "txt", x: 540, y: 320, text: "median home on a median paycheck:", size: 44 },
        { k: "txt", x: 540, y: 390, text: "$1,270/mo over that cap (our math)", size: 48, col: R },
        { k: "comment", w: "the answer typed out:", x: 420, y: 600, who: "the reply from his fans", text: "“Then buy less house.”", size: 56 },
        { k: "guy", w: "Okay. Let's do that.", x: 540, y: 1300, s: 0.85, pose: "shrug", expr: "deadpan" },
      ] },
      { at: "Working his rule backwards", tone: "#eef2f6", items: [
        { k: "num", x: 540, y: 340, to: 403200, f: "money", size: 120, sub: "median home sold, early 2026 (Census/HUD)" },
        { k: "num", w: "about $222,000.", x: 540, y: 660, to: 222000, f: "money", size: 140, col: G, sub: "what Dave's rule allows (20% down, our math)" },
        { k: "txt", w: "about $222,000.", plus: 10, x: 540, y: 800, text: "median household ~$87,500/yr · ~$6,210/mo take-home", size: 34, font: "PatrickHand", col: INK2 },
        { k: "txt", w: "about $222,000.", plus: 10, x: 540, y: 842, text: "15-year fixed at 6.57% · principal + interest only", size: 34, font: "PatrickHand", col: INK2 },
        { k: "stamp", w: "barely half", x: 540, y: 940, text: "BARELY HALF", size: 60 },
        { k: "prop", kind: "house", x: 320, y: 1290, s: 0.7 },
        { k: "prop", w: "about $222,000.", kind: "house", x: 800, y: 1290, s: 0.45 },
      ] },
      { at: "In most of the country,", items: [
        { k: "txt", x: 540, y: 260, text: "not a starter home. It's...", size: 56 },
        { k: "prop", w: "a long commute,", kind: "road", x: 300, y: 590, s: 0.8 },
        { k: "tag", w: "a long commute,", x: 760, y: 490, text: "a long commute", size: 40 },
        { k: "prop", w: "a major fixer-upper,", kind: "fixer", x: 300, y: 930, s: 0.7 },
        { k: "tag", w: "a major fixer-upper,", x: 760, y: 820, text: "a fixer-upper", size: 40 },
        { k: "prop", w: "or nothing at all.", kind: "lot", x: 300, y: 1260, s: 0.8 },
        { k: "tag", w: "or nothing at all.", x: 760, y: 1160, text: "nothing at all", size: 40 },
      ] },
      { at: "Then make more money.", tone: "#f6efe6", items: [
        { k: "comment", x: 420, y: 300, who: "the next reply from fans", text: "“Then make more money.”", size: 54 },
        { k: "txt", w: "To buy the median", x: 540, y: 530, text: "take-home needed for the median", size: 42, col: INK2 },
        { k: "txt", w: "To buy the median", x: 540, y: 585, text: "home, Dave's way (our math)", size: 42, col: INK2 },
        { k: "num", w: "about $11,300", x: 540, y: 790, to: 11300, f: "money", post: "/mo", size: 150, col: R },
        { k: "num", w: "roughly $135,000", x: 540, y: 1020, to: 135000, f: "money", post: "/yr", size: 150, col: R },
        { k: "stamp", w: "Not before taxes. After.", plus: 20, x: 540, y: 1200, text: "AFTER TAXES", size: 60 },
      ] },
    ] },

  // ── Age 40, 1: the two messages ─────────────────────────────────────────────────────────────────
  { id: "ShortAge40a", words: AGE40, src: "age40/narration.mp3", full: AGE40_T, hi: ["wait", "inheritance", "instructions", "avocados"],
    parts: [{ from: "Millennials got two messages", to: "dollars each." }, { from: "The second message was quieter.", to: "financial gifts from family." },
      { from: "Millennials didn't fail.", to: "were out of date." }],
    specs: [
      { at: "Millennials got two messages", tone: "#f6efe6", items: [
        { k: "tag", w: "The first: stop wasting money.", x: 540, y: 330, text: "MESSAGE 1: stop wasting money", size: 44, bg: R },
        { k: "prop", w: "stop wasting money.", kind: "coffee", x: 540, y: 700, s: 0.9 },
        { k: "guy", x: 540, y: 1290, s: 0.7, pose: "shrug", expr: "sideeye" },
      ] },
      { at: "In 2017, property developer Tim Gurner", items: [
        { k: "list", x: 60, y: 230, wd: 960, title: "TIM GURNER, 2017", items: [
          { text: "property developer, on 60 Minutes Australia", mark: "none", size: 36, col: INK2 },
          { text: "said that when he was buying his", mark: "none", size: 44 },
          { text: "first home, he wasn't buying", mark: "none", size: 44 },
          { w: "smashed avocados", text: "smashed avocados for 19 bucks", mark: "none", size: 44 },
          { w: "and four coffees", text: "and four coffees at $4 each", mark: "none", size: 44 }] },
        { k: "tag", x: 540, y: 920, text: "paraphrased · as reported by CNN, May 15, 2017", size: 32 },
        { k: "prop", w: "smashed avocados", kind: "avocado", x: 320, y: 1160, s: 0.9, label: "" },
        { k: "tag", w: "smashed avocados", x: 720, y: 1130, text: "A$19 ≈ US$15 in 2017", size: 36 },
      ] },
      { at: "The second message was quieter.", tone: "#eceaf3", items: [
        { k: "tag", x: 540, y: 240, text: "MESSAGE 2: just wait", size: 48, bg: N },
        { k: "stamp", w: "Our read:", x: 540, y: 440, text: "OUR READ: WAIT FOR THE INHERITANCE", size: 36 },
        { k: "prop", w: "boomer wealth being passed down", kind: "will", x: 640, y: 760, s: 0.9 },
        { k: "prop", w: "boomer wealth being passed down", kind: "person", x: 240, y: 1290, s: 1.2, label: "boomer" },
        { k: "num", w: "as long as 20 years.", x: 690, y: 1130, to: 20, f: "raw", pre: "up to ", post: " years", size: 84, col: N },
      ] },
      { at: "And NAR's 2026 profile found", items: [
        { k: "prop", kind: "will", x: 540, y: 560, s: 1.0 },
        { k: "tag", w: "more likely to rely", x: 540, y: 900, text: "first-time buyers: more likely to rely on", size: 38 },
        { k: "tag", w: "inheritance or financial gifts", x: 540, y: 990, text: "inheritance or family gifts (NAR 2026)", size: 38, bg: N },
      ] },
      { at: "Millennials didn't fail.", tone: "#eaf3e6", items: [
        { k: "stamp", x: 540, y: 400, text: "MILLENNIALS DIDN'T FAIL", size: 56, col: G },
        { k: "txt", w: "They followed the instructions,", x: 540, y: 640, text: "they followed the instructions", size: 52 },
        { k: "txt", w: "and the instructions were out", x: 540, y: 730, text: "...and the instructions were out of date", size: 40, col: R },
        { k: "tag", w: "and the instructions were out", plus: 14, x: 540, y: 810, text: "home prices: +54%, 2020 to early 2026", size: 36, bg: N },
        { k: "tag", w: "and the instructions were out", plus: 22, x: 540, y: 876, text: "price ÷ income: 3.1–3.4 (1980–99) → nearly 5 (2025)", size: 32, bg: N },
        { k: "tag", w: "and the instructions were out", plus: 22, x: 540, y: 934, text: "Harvard JCHS, 2026 report", size: 32 },
        { k: "guy", x: 540, y: 1295, s: 0.4, pose: "idle", expr: "deadpan" },
      ] },
    ] },

  // ── Age 40, 2: "we had 14% rates" ───────────────────────────────────────────────────────────────
  { id: "ShortAge40b", words: AGE40, src: "age40/narration.mp3", full: AGE40_T, hi: ["harder", "rate", "price", "refinance"],
    parts: [{ from: "Now the reply you've heard:", to: "can't refinance a price." }],
    specs: [
      { at: "Now the reply you've heard:", tone: "#eceaf3", items: [
        { k: "tag", x: 540, y: 185, text: "the claim: buying a first home is harder now. the reply:", size: 32 },
        { k: "bubble", x: 90, y: 250, wd: 900, lines: ["“We had 14% rates in the 80s", "and still bought houses.”"], tx: 250, ty: 660, size: 50 },
        { k: "prop", kind: "person", x: 240, y: 1060, s: 1.0, label: "boomer" },
        { k: "stamp", w: "That's true.", x: 760, y: 560, text: "TRUE", size: 70, col: G },
        { k: "num", w: "the average rate was 13.88%,", x: 680, y: 850, to: 1388, f: "dec", post: "%", size: 130, col: R, sub: "average 30-year rate, 1984" },
        { k: "num", w: "about $79,900.", x: 680, y: 1150, to: 79900, f: "money", size: 120, col: N, sub: "median new home, 1984" },
      ] },
      { at: "With 20% down, principal and interest took", items: [
        { k: "txt", x: 540, y: 230, text: "principal + interest, 20% down", size: 48 },
        { k: "txt", x: 540, y: 290, text: "as a share of median household income", size: 38, col: INK2 },
        { k: "txt", x: 540, y: 350, text: "1984: $79,900 new home · 13.88%", size: 34, font: "PatrickHand", col: INK2 },
        { k: "txt", x: 540, y: 392, text: "2026: $417,500 existing home (NAR, Sept) · 7.18%", size: 34, font: "PatrickHand", col: INK2 },
        { k: "txt", x: 540, y: 434, text: "our calculation · different price series", size: 34, font: "PatrickHand", col: INK2 },
        { k: "bars", x: 200, base: 1180, max: 45, h: 560, gap: 400, bw: 240, bars: [
          { w: "took about 40%", label: "1984", v: 40, text: "~40%", col: R },
          { w: "In 2026 it's about 31%.", label: "2026", v: 31, text: "~31%", col: N }] },
        { k: "stamp", w: "1984 was harder.", x: 540, y: 540, text: "1984 WAS HARDER", size: 52, col: G },
      ] },
      { at: "So why did it still work for buyers then?", tone: "#eef2f6", items: [
        { k: "tag", w: "rates can fall.", x: 540, y: 240, text: "rates can fall → refinance", size: 42, bg: G },
        { k: "line", w: "Because the expensive part was the rate,", x: 220, y: 800, wd: 640, h: 380, min: 5, max: 15, post: "%", col: G, ls: 44, points: [
          { label: "1984", v: 13.88, w: "Because the expensive part was the rate," }, { label: "1998", v: 6.94, w: "By 1998," }] },
        { k: "tag", w: "Today the expensive part is the price.", x: 700, y: 980, text: "today: the PRICE", size: 46, bg: R },
        { k: "prop", w: "Today the expensive part is the price.", kind: "house", x: 220, y: 1290, s: 0.6 },
        { k: "stamp", w: "you can't refinance a price.", x: 690, y: 1170, text: "CAN'T REFINANCE A PRICE", size: 40 },
      ] },
    ] },

  // ── America 1: two more years of work ──────────────────────────────────────────────────────────
  { id: "ShortAmerica1", words: AMERICA, src: "america/narration.mp3", full: AMERICA_T, hi: ["years", "house", "pay", "prices"],
    parts: [{ from: "In 1979, a new house cost", to: "you've been told." }, { from: "Put the three side by side.", to: "years of work come from." }],
    specs: [
      { at: "In 1979, a new house cost", items: [
        { k: "tag", x: 540, y: 180, text: "our math: Census, SSA + BLS data · same 40.2-hour week", size: 28 },
        { k: "tag", x: 540, y: 240, text: "2026: Sept. median new-house price, preliminary", size: 32 },
        { k: "num", w: "nearly four and a half years", x: 540, y: 420, to: 45, f: "tenth", post: " years", size: 120, col: N, sub: "of factory pay, 1979" },
        { k: "num", w: "about 6.3 years.", x: 540, y: 700, to: 63, f: "tenth", post: " years", size: 150, col: R, sub: "of factory pay, 2026" },
        { k: "stamp", w: "Nearly two more years", x: 600, y: 880, text: "NEARLY 2 MORE YEARS", size: 54 },
        { k: "prop", kind: "house", x: 640, y: 1290, s: 0.8 },
        { k: "guy", x: 170, y: 1295, s: 0.45, hat: "hard", poses: [["In 2026,", "shrug", "shock"]], expr: "deadpan" },
      ] },
      { at: "That's two extra years on the line", tone: "#f6efe6", items: [
        { k: "prop", kind: "factory", x: 540, y: 640, s: 1.0 },
        { k: "txt", w: "And the reason isn't", x: 540, y: 740, text: "the reason isn't the one", size: 56, col: R },
        { k: "txt", w: "And the reason isn't", x: 540, y: 810, text: "you've been told", size: 56, col: R },
        { k: "guy", x: 300, y: 1295, s: 0.6, hat: "hard", pose: "walk", expr: "defeated" },
        { k: "prop", w: "before the house is yours.", kind: "house", x: 790, y: 1290, s: 0.7 },
      ] },
      { at: "Put the three side by side.", tone: "#eef2f6", items: [
        { k: "tag", x: 540, y: 200, text: "how much each rose, 1979 → Sept 2026 (our math)", size: 32 },
        { k: "tag", x: 540, y: 262, text: "Sept. new-house price is one preliminary month", size: 32 },
        { k: "bars", x: 150, base: 1200, max: 8, h: 780, gap: 290, bw: 200, ls: 36, bars: [
          { w: "consumer prices rose", label: "prices", v: 4.6, text: "4.6x", col: GR },
          { w: "Factory pay rose", label: "factory pay", v: 4.5, text: "4.5x", col: N },
          { w: "The house rose nearly", label: "new house", v: 6.4, text: "6.4x", col: R }] },
        { k: "stamp", w: "That gap is where", x: 400, y: 440, text: "NEARLY 2 EXTRA YEARS", size: 46 },
      ] },
    ] },

  // ── America 2: the factory floor now pays below average ───────────────────────────────────────
  { id: "ShortAmerica2", words: AMERICA, src: "america/narration.mp3", full: AMERICA_T, hi: ["below", "average", "double", "factory"],
    parts: [{ from: "In October 2026, factory production workers", to: "rank-and-file private job." }, { from: "To be fair, it depends", to: "pull that number up." }],
    specs: [
      { at: "In October 2026, factory production workers", tone: "#f6efe6", items: [
        { k: "tag", x: 540, y: 190, text: "average hourly pay, Oct 2026 (preliminary) · BLS", size: 32 },
        { k: "bars", x: 200, base: 1120, max: 35, h: 660, gap: 400, bw: 240, ls: 36, bars: [
          { w: "averaged $30.43", label: "factory floor", v: 30.43, text: "$30.43", col: R },
          { w: "the average was $32.75.", label: "all private-sector*", v: 32.75, text: "$32.75", col: N }] },
        { k: "txt", w: "Across all private-sector", x: 540, y: 1260, text: "*production and nonsupervisory workers", size: 36, font: "PatrickHand", col: INK2 },
        { k: "stamp", w: "pays below that average.", x: 540, y: 320, text: "BELOW AVERAGE", size: 60 },
      ] },
      { at: "Think about that.", items: [
        { k: "tag", w: "once paid more than double", x: 540, y: 280, text: "1979: more than 2x the minimum wage", size: 42, bg: G },
        { k: "tag", w: "now pays less", x: 540, y: 400, text: "2026: below the average", size: 42, bg: R },
        { k: "tag", w: "now pays less", x: 540, y: 485, text: "rank-and-file private job", size: 42, bg: R },
        { k: "tag", w: "now pays less", plus: 40, x: 540, y: 575, text: "durable-goods floor pay fell below it in 2015 (BLS)", size: 32 },
        { k: "prop", kind: "hardhat", x: 540, y: 850, s: 1.4 },
        { k: "guy", w: "now pays less", x: 540, y: 1300, s: 0.7, pose: "shrug", expr: "defeated" },
      ] },
      { at: "To be fair, it depends where you stand.", tone: "#eceaf3", items: [
        { k: "num", x: 540, y: 380, to: 3043, f: "dec", pre: "$", size: 130, col: R, sub: "factory floor, Oct 2026" },
        { k: "num", w: "$37.24", x: 540, y: 720, to: 3724, f: "dec", pre: "$", size: 130, col: N, sub: "all manufacturing employees, Oct 2026" },
        { k: "tag", w: "Engineers, managers", x: 540, y: 870, text: "engineers, managers, technicians", size: 40 },
        { k: "guy", x: 260, y: 1295, s: 0.5, hat: "hard", pose: "idle", expr: "deadpan" },
        { k: "prop", w: "Across all manufacturing employees,", kind: "person", x: 800, y: 1290, s: 1.0 },
      ] },
    ] },

  // ── Paycheck 1: three bills, one receipt ───────────────────────────────────────────────────────
  { id: "ShortPaycheck1", words: PAY, src: "paycheck2/narration.mp3", full: PAY_T, hi: ["rent", "child", "care", "health", "gone", "receipt"],
    parts: [{ from: "If you're living paycheck to paycheck", to: "Before tax. Before food." }, { from: "Now put them on one receipt.", to: "the big bills can claim." }],
    specs: [
      { at: "If you're living paycheck to paycheck", items: [
        { k: "tag", x: 540, y: 175, text: "an illustration · our math from BLS, Census,", size: 28 },
        { k: "tag", x: 540, y: 228, text: "Child Care Aware and KFF data", size: 28 },
        { k: "prop", kind: "paycheck", x: 540, y: 450, s: 1.4, label: "$ $ $" },
        { k: "tag", w: "Rent,", x: 540, y: 700, text: "rent", size: 50, bg: R },
        { k: "tag", w: "child care", x: 540, y: 800, text: "child care", size: 50, bg: R },
        { k: "tag", w: "and health coverage", x: 540, y: 900, text: "health coverage", size: 50, bg: R },
        { k: "num", w: "about six dollars out of every ten", x: 560, y: 1160, to: 61, f: "raw", pre: "~", post: "%", size: 200, col: R, sub: "of the median paycheck, before tax" },
      ] },
      { at: "Now put them on one receipt.", items: [
        { k: "list", x: 90, y: 240, wd: 900, title: "ONE PAYCHECK", items: [
          { w: "Rent.", text: "rent + utilities: $1,557/mo", mark: "none", size: 46 },
          { w: "One child's care.", text: "one child's care: $13,184/yr", mark: "none", size: 46 },
          { w: "Your share of a family health plan.", text: "family premium share: $7,471/yr", mark: "none", size: 44 }] },
        { k: "num", w: "about thirty-nine thousand dollars a year.", x: 540, y: 960, to: 39339, f: "money", post: "/yr", size: 150, col: R, sub: "our math · Census, Child Care Aware, KFF" },
        { k: "prop", kind: "receipt", x: 540, y: 1200, s: 0.6 },
      ] },
      { at: "Against a sixty-four thousand dollar paycheck,", tone: "#f3ecec", items: [
        { k: "tag", x: 540, y: 190, text: "of a $64,064 median full-time paycheck · BLS", size: 32 },
        { k: "bars", x: 200, base: 1140, max: 100, h: 680, gap: 400, bw: 240, bars: [
          { w: "that's about 61 percent.", label: "three bills", v: 61, text: "~61%", col: R },
          { w: "Before tax, before food,", label: "everything else", v: 39, text: "~39%", col: GR }] },
        { k: "stamp", w: "Gone.", x: 540, y: 400, text: "GONE", size: 110 },
      ] },
      { at: "To be fair, many households", tone: "#eef2f6", items: [
        { k: "tag", x: 540, y: 270, text: "many households have two earners", size: 40 },
        { k: "tag", w: "This is an illustration,", x: 540, y: 470, text: "ILLUSTRATION, NOT A REAL BUDGET", size: 42, bg: N },
        { k: "txt", w: "how much of one paycheck", x: 540, y: 680, text: "...but it shows the size of the bite", size: 46 },
        { k: "prop", kind: "person", x: 440, y: 1290, s: 1.2 },
        { k: "prop", plus: 6, kind: "person", x: 640, y: 1290, s: 1.1 },
      ] },
    ] },

  // ── Paycheck 2: record income, thin cushion ────────────────────────────────────────────────────
  { id: "ShortPaycheck2", words: PAY, src: "paycheck2/narration.mp3", full: PAY_T, hi: ["record", "cushion", "emergency", "rent", "health"],
    parts: [{ from: "So here's the contradiction.", to: "The cushion hasn't rebuilt." }, { from: "So both things are true.", to: "priced somewhere else." }],
    specs: [
      { at: "So here's the contradiction.", tone: "#eaf3e6", items: [
        { k: "num", w: "About eighty-seven thousand dollars,", x: 540, y: 560, to: 87460, f: "money", size: 190, col: G, sub: "real median household income, 2025 · Census" },
        { k: "tag", w: "the highest on record,", x: 540, y: 860, text: "highest since records began in 1967", size: 40, bg: N },
        { k: "guy", x: 540, y: 1300, s: 0.6, pose: "idle", expr: "deadpan" },
      ] },
      { at: "Same year, the Federal Reserve asked", tone: "#eef2f6", items: [
        { k: "prop", kind: "fed", x: 540, y: 520, s: 1.0 },
        { k: "num", w: "a four hundred dollar emergency", x: 540, y: 860, to: 400, f: "money", size: 220, col: N, sub: "an emergency expense · Fed survey, 2025" },
        { k: "tag", w: "with cash,", x: 540, y: 1100, text: "paid with cash or its equivalent?", size: 40 },
      ] },
      { at: "About six in ten said yes.", items: [
        { k: "tag", x: 540, y: 190, text: "a $400 emergency · Fed survey, 2025", size: 32 },
        { k: "bars", x: 150, base: 1140, max: 70, h: 660, gap: 290, bw: 200, ls: 32, bars: [
          { label: "cash or equivalent", v: 63, text: "63%", col: G },
          { w: "Nearly four in ten said no.", label: "wouldn't", v: 37, text: "37%", col: R },
          { w: "about one in eight adults", label: "couldn't pay now", v: 12, text: "12%", col: R }] },
      ] },
      { at: "And that number isn't healing.", tone: "#f3ecec", items: [
        { k: "tag", x: 540, y: 190, text: "could cover $400 with cash or equivalent · Fed", size: 32 },
        { k: "line", x: 170, y: 1020, wd: 740, h: 520, min: 55, max: 72, post: "%", col: N, ls: 40, points: [
          { label: "2021", v: 68, w: "68 percent could cover it." }, { label: "2022", v: 63, w: "stuck at 63," }, { label: "2023", v: 63, w: "stuck at 63,", plus: 6 },
          { label: "2024", v: 63, w: "stuck at 63,", plus: 12 }, { label: "2025", v: 63, w: "four years running." }] },
        { k: "stamp", w: "The cushion hasn't rebuilt.", x: 620, y: 400, text: "NOT REBUILT", size: 60 },
      ] },
      { at: "So both things are true.", tone: "#eaf3e6", items: [
        { k: "tag", w: "Record income,", x: 540, y: 290, text: "record income", size: 60, bg: G },
        { k: "tag", w: "thin cushion.", x: 540, y: 420, text: "thin cushion", size: 60, bg: R },
        { k: "tag", w: "after three bills", plus: 10, x: 540, y: 1010, text: "three bills can take ~61% of one median", size: 34 },
        { k: "tag", w: "after three bills", plus: 10, x: 540, y: 1068, text: "full-time paycheck (our illustration)", size: 34 },
        { k: "tag", w: "priced somewhere else.", x: 540, y: 1170, text: "none of them priced by the worker", size: 38, bg: N },
        { k: "list", w: "A cushion is what's left,", x: 290, y: 540, wd: 500, h: 370, items: [
          { w: "A cushion is what's left,", text: "rent", mark: "x" }, { w: "after three bills", text: "child care", mark: "x" }, { w: "priced somewhere else.", text: "health", mark: "x" }] },
      ] },
    ] },

  // ── Shrinkflation 1: rare in the store, common in your cart ────────────────────────────────────
  { id: "ShortShrink1", words: SHRINK, src: "shrink/narration.mp3", full: SHRINK_T, hi: ["smaller", "popular", "cart", "bestsellers", "shrinkflation"],
    parts: [{ from: "Shrinkflation is real.", to: "that's exactly the problem." }, { from: "GAO also looked", to: "of paper towel dollar sales." },
      { from: "So shrinkflation is rare across the store,", to: "The bestsellers get trimmed." }],
    specs: [
      { at: "Shrinkflation is real.", tone: "#f6efe6", items: [
        { k: "stamp", x: 540, y: 360, text: "SHRINKFLATION IS REAL", size: 56 },
        { k: "txt", w: "really did get smaller.", x: 540, y: 560, text: "they really did get smaller", size: 50 },
        { k: "tag", w: "barely moves inflation.", x: 540, y: 690, text: "GAO: downsizing added 0.06 of a point", size: 36, bg: N },
        { k: "tag", w: "barely moves inflation.", x: 540, y: 752, text: "to 34.5% inflation, Dec 2019 to Dec 2024", size: 36, bg: N },
        { k: "prop", w: "Your cereal box,", kind: "pack", x: 300, y: 1260, s: 1.0, label: "CEREAL", ghost: true },
        { k: "prop", w: "your paper towels,", kind: "roll", x: 780, y: 1260, s: 1.0, label: "" },
      ] },
      { at: "GAO also looked", items: [
        { k: "prop", kind: "receipt", x: 540, y: 620, s: 1.4 },
        { k: "tag", w: "store scanner data", x: 540, y: 1000, text: "store scanner data, 2021–2023 · GAO", size: 42, bg: N },
        { k: "tag", x: 540, y: 1090, text: "GAO = U.S. Government Accountability Office", size: 34 },
      ] },
      { at: "Take cereal.", tone: "#f6efe6", items: [
        { k: "tag", x: 540, y: 190, text: "cereal, 2021–2023 · GAO, store scanner data", size: 32 },
        { k: "bars", x: 200, base: 1140, max: 10, h: 640, gap: 400, bw: 240, ls: 36, bars: [
          { w: "about 1.1 percent of cereal items", label: "items downsized", v: 1.1, text: "1.1%", col: GR },
          { w: "made up 8.6 percent", label: "their dollar sales", v: 8.6, text: "8.6%", col: R }] },
        { k: "stamp", w: "The boxes that shrank were the popular boxes.", x: 540, y: 380, text: "THE POPULAR BOXES", size: 54 },
      ] },
      { at: "In paper towels, it's even bigger.", items: [
        { k: "num", w: "were 38.6 percent", x: 540, y: 520, to: 386, f: "tenth", post: "%", size: 220, col: R },
        { k: "txt", w: "were 38.6 percent", x: 540, y: 660, text: "of paper-towel dollar sales", size: 48 },
        { k: "txt", w: "were 38.6 percent", x: 540, y: 730, text: "came from downsized products (GAO)", size: 40, col: INK2 },
        { k: "prop", kind: "roll", x: 520, y: 1290, s: 1.0, label: "" },
      ] },
      { at: "So shrinkflation is rare across the store,", tone: "#eef2f6", items: [
        { k: "txt", x: 540, y: 300, text: "rare across the store", size: 60, col: GR },
        { k: "txt", w: "but common in your cart.", x: 540, y: 420, text: "common in your cart", size: 66, col: R },
        { k: "stamp", w: "The bestsellers get trimmed.", x: 540, y: 640, text: "BESTSELLERS GET TRIMMED", size: 46 },
        { k: "prop", w: "but common in your cart.", kind: "cart", x: 540, y: 1220, s: 1.1 },
      ] },
    ] },

  // ── Shrinkflation 2: why shrink the box instead of raising the price ───────────────────────────
  { id: "ShortShrink2", words: SHRINK, src: "shrink/narration.mp3", full: SHRINK_T, hi: ["price", "size", "sticker", "ounces", "smaller"],
    parts: [{ from: "So why shrink the box", to: "responsive to the ounces." }, { from: "That's the business logic.", to: "the smaller box wins." }],
    specs: [
      { at: "So why shrink the box", tone: "#f6efe6", items: [
        { k: "tag", w: "Marketing Science", x: 540, y: 220, text: "journal Marketing Science, 2026", size: 40, bg: N },
        { k: "prop", kind: "pack", x: 290, y: 1020, s: 0.9, label: "BOX", ghost: true },
        { k: "txt", plus: 10, x: 540, y: 840, text: "vs", size: 80, col: GR },
        { k: "prop", w: "raising the price?", kind: "shelftag", x: 790, y: 860, s: 0.7, label: "+$", sub: "a higher sticker" },
      ] },
      { at: "Researchers Aljoscha Janssen", items: [
        { k: "tag", x: 540, y: 190, text: "Janssen & Kasinger · 10 years of scanner data", size: 32 },
        { k: "num", w: "about 1.92 percent", x: 540, y: 480, to: 192, f: "dec", post: "%", size: 170, col: N, sub: "of products downsized" },
        { k: "num", w: "more than five times", x: 540, y: 860, to: 5, f: "raw", pre: "> ", post: "×", size: 170, col: R, sub: "downsizing vs upsizing, by sales" },
        { k: "tag", w: "without the price coming down.", x: 540, y: 1120, text: "usually with no price cut", size: 42, bg: R },
      ] },
      { at: "The key finding:", tone: "#eceaf3", items: [
        { k: "prop", kind: "shelftag", x: 550, y: 540, s: 1.3, label: "PRICE", sub: "net wt: (tiny print)" },
        { k: "num", w: "only about half as responsive", x: 640, y: 920, to: 50, f: "raw", pre: "~", post: "%", size: 160, col: R, sub: "as responsive to size as to price" },
        { k: "guy", x: 210, y: 1295, s: 0.6, pose: "point", expr: "deadpan" },
      ] },
      { at: "That's the business logic.", items: [
        { k: "prop", kind: "factory", x: 540, y: 640, s: 0.9 },
        { k: "list", x: 160, y: 820, wd: 760, h: 300, items: [
          { w: "push back on a higher price", text: "raise the sticker", mark: "x" },
          { w: "the smaller box wins.", text: "shrink the box", mark: "v" }] },
      ] },
    ] },
];
