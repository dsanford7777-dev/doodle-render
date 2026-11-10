// @ts-nocheck
// Simple Money Co mascot ("Quarter-Zip", square-head hybrid) as pure SVG strings.
// Built to drop into a Remotion kit later: everything is a function of (pose, expression, seed).
// Hand-drawn look = seeded wobble on every stroke; re-seed every few frames for "boil".

export const COL = {
  ink: "#1c1c1e", cream: "#fbf6e9", skin: "#f0c7a0", skinShade: "#d9a77f",
  hair: "#4a3326", navy: "#1f345c", navyDark: "#152542", amber: "#f5a524",
  green: "#2fbf71", white: "#ffffff", red: "#d23b3b", paper: "#fffdf3",
};

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// wobbly path through points (Catmull-Rom smoothing + seeded jitter)
export function wob(points, { closed = false, amp = 1.6, seed = 1 } = {}) {
  const r = rng(seed);
  const dens = [];
  const pts = closed ? [...points, points[0]] : points;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / 14));
    for (let k = 0; k < n; k++) dens.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n]);
  }
  if (!closed) dens.push(pts[pts.length - 1]);
  const p1 = r() * 6.28, p2 = r() * 6.28;
  const j = dens.map(([x, y], i) => {
    const t = i / Math.max(1, dens.length - 1);
    return [x + amp * (Math.sin(t * 9 + p1) * 0.6 + Math.sin(t * 21 + p2) * 0.4),
            y + amp * (Math.cos(t * 11 + p2) * 0.6 + Math.sin(t * 17 + p1) * 0.4)];
  });
  let d = `M${j[0][0].toFixed(1)} ${j[0][1].toFixed(1)}`;
  for (let i = 0; i < j.length - 1; i++) {
    const p0 = j[Math.max(0, i - 1)], a = j[i], b = j[i + 1], p3 = j[Math.min(j.length - 1, i + 2)];
    const c1 = [a[0] + (b[0] - p0[0]) / 6, a[1] + (b[1] - p0[1]) / 6];
    const c2 = [b[0] - (p3[0] - a[0]) / 6, b[1] - (p3[1] - a[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return closed ? d + " Z" : d;
}

export const ell = (cx, cy, rx, ry, n = 28, a0 = 0, a1 = 360) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });

export const rrect = (x, y, w, h, r) => {
  const pts = [];
  const corner = (cx, cy, a0) => ell(cx, cy, r, r, 6, a0, a0 + 90).forEach((p) => pts.push(p));
  corner(x + w - r, y + r, 270); corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, 90); corner(x + r, y + r, 180);
  return pts;
};

// a filled shape with cream halo + ink outline (halo only when `halo`)
export function shape(points, fill, { seed = 1, sw = 7, halo = false, closed = true } = {}) {
  const d = wob(points, { closed, seed });
  return (halo ? `<path d="${d}" fill="none" stroke="${COL.cream}" stroke-width="${sw + 16}" stroke-linejoin="round"/>` : "")
    + `<path d="${d}" fill="${fill}" stroke="${COL.ink}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
}
export function line(points, { seed = 1, sw = 7, col = COL.ink, halo = false } = {}) {
  const d = wob(points, { seed });
  return (halo ? `<path d="${d}" fill="none" stroke="${COL.cream}" stroke-width="${sw + 16}" stroke-linecap="round"/>` : "")
    + `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// ── expressions: brows (angle/offset), lids (0 open .. 1 closed), pupils, mouth ──────────────
export const EXPRESSIONS = {
  deadpan:   { lid: 0.45, look: [0, 2],  brow: [0, 0],    browY: 0,   mouth: "flat" },
  sideeye:   { lid: 0.5,  look: [12, 2], brow: [-10, 6],  browY: 4,   mouth: "smirkL" },
  shock:     { lid: 0,    look: [0, 0],  brow: [-8, 8],   browY: -26, mouth: "o", pupil: 6 },
  fakesmile: { lid: 0.2,  look: [0, -2], brow: [-6, 6],   browY: -10, mouth: "grin" },
  defeated:  { lid: 0.62, look: [0, 8],  brow: [14, -14], browY: 6,   mouth: "frown" },
  smug:      { lid: 0.55, look: [-4, 0], brow: [10, -4],  browY: 2,   mouth: "smirkR" },
  angry:     { lid: 0.3,  look: [0, 2],  brow: [-18, 18], browY: 10,  mouth: "grit" },
  thinking:  { lid: 0.25, look: [-10, -10], brow: [0, -10], browY: -6, mouth: "pucker" },
};

function face(cx, cy, ex, seed) {
  const E = EXPRESSIONS[ex];
  let s = "";
  const lens = 36, gap = 46;
  for (const [i, side] of [[0, -1], [1, 1]]) {
    const x = cx + side * gap;
    s += shape(ell(x, cy, lens, lens), COL.white, { seed: seed + i, sw: 6 });
    // pupil
    const pr = E.pupil ?? 9;
    s += `<circle cx="${x + E.look[0]}" cy="${cy + E.look[1]}" r="${pr}" fill="${COL.ink}"/>`;
    // eyelid: skin-coloured cap down to `lid`, with one ink line
    if (E.lid > 0) {
      const ly = cy - lens + 2 * lens * E.lid;
      const cap = ell(x, cy, lens - 3, lens - 3, 24, 180, 360).filter(([, y]) => y <= ly).concat([[x + lens - 3, ly], [x - lens + 3, ly]]);
      s += `<path d="${wob(ell(x, cy, lens - 3, lens - 3, 24, 180, 360).map(([px, py]) => [px, Math.min(py, ly)]), { closed: true, seed: seed + 7, amp: 0.6 })}" fill="${COL.skin}"/>`;
      s += line([[x - lens + 4, ly], [x + lens - 4, ly]], { seed: seed + 9 + i, sw: 5 });
    }
    // brow
    const by = cy - lens - 24 + E.browY;
    const tilt = side < 0 ? E.brow[0] : E.brow[1];
    s += line([[x - 30, by + (side < 0 ? tilt : -tilt) * 0.5], [x + 30, by - (side < 0 ? tilt : -tilt) * 0.5]], { seed: seed + 20 + i, sw: 9 });
  }
  // bridge of the glasses
  s += line([[cx - gap + lens, cy - 4], [cx + gap - lens, cy - 4]], { seed: seed + 30, sw: 6 });
  // mouth
  const my = cy + 70;
  const M = {
    flat: [[cx - 26, my], [cx + 26, my + 1]],
    smirkL: [[cx - 28, my - 6], [cx - 6, my + 2], [cx + 24, my + 2]],
    smirkR: [[cx - 24, my + 2], [cx + 6, my + 2], [cx + 30, my - 8]],
    frown: [[cx - 28, my + 8], [cx, my - 4], [cx + 28, my + 8]],
    grin: [[cx - 34, my - 8], [cx, my + 12], [cx + 34, my - 8]],
    grit: [[cx - 28, my], [cx + 28, my]],
    pucker: [[cx + 6, my - 2], [cx + 14, my + 4]],
  }[E.mouth];
  if (E.mouth === "o") {
    s += shape(ell(cx, my + 4, 15, 20), COL.ink, { seed: seed + 40, sw: 5 });
  } else if (E.mouth === "grit") {
    s += shape(rrect(cx - 30, my - 10, 60, 22, 6), COL.white, { seed: seed + 41, sw: 5 });
    s += line([[cx - 30, my + 1], [cx + 30, my + 1]], { seed: seed + 42, sw: 3 });
  } else if (E.mouth === "grin") {
    const up = ell(cx, my - 12, 38, 26, 16, 10, 170);
    s += shape([[cx - 38, my - 10], ...up, [cx + 38, my - 10]], COL.white, { seed: seed + 43, sw: 5 });
    s += line([[cx - 30, my - 4], [cx + 30, my - 4]], { seed: seed + 45, sw: 3 });
  } else {
    s += line(M, { seed: seed + 44, sw: 6 });
  }
  return s;
}

// ── poses: arm/leg end points relative to the hips/shoulders ────────────────────────────────
export const POSES = {
  idle:    { armL: [[-62, 40], [-70, 120]], armR: [[62, 40], [70, 120]], legs: "stand" },
  point:   { armL: [[-62, 40], [-70, 120]], armR: [[100, 10], [170, -20]], legs: "stand", mitten: "point" },
  hold:    { armL: [[-62, 40], [-70, 120]], armR: [[95, 30], [130, -10]], legs: "stand", prop: "receipt" },
  shrug:   { armL: [[-100, 50], [-140, 10]], armR: [[100, 50], [140, 10]], legs: "stand" },
  facepalm:{ armL: [[-62, 40], [-70, 120]], armR: [[60, -10], [10, -125]], legs: "stand" },
  walk:    { armL: [[-50, 60], [-20, 130]], armR: [[50, 60], [95, 110]], legs: "walk" },
};

// full character; (x, y) = point between the feet; s = scale
export function character({ x = 0, y = 0, s = 1, pose = "idle", expr = "deadpan", seed = 3, bob = 0, sign = "-$1,270" } = {}) {
  const P = POSES[pose];
  let g = "";
  const hipY = -150, shY = -330, headCy = -480;
  // legs (short, thick)
  const legs = P.legs === "walk"
    ? [[[-22, hipY], [-48, 0]], [[22, hipY], [40, 0]]]
    : [[[-24, hipY], [-28, 0]], [[24, hipY], [30, 0]]];
  legs.forEach((l, i) => { g += line(l, { seed: seed + 50 + i, sw: 16, halo: true, col: COL.navyDark }); });
  legs.forEach((l, i) => { g += shape(ell(l[1][0] + (i ? 12 : -12), 4, 26, 12), COL.ink, { seed: seed + 55 + i, sw: 4 }); });
  // torso: short trapezoid, quarter-zip
  const torso = [[-70, hipY + 6], [-60, shY], [60, shY], [70, hipY + 6]];
  g += shape(torso, COL.navy, { seed: seed + 60, sw: 7, halo: true });
  g += shape([[-66, -235], [66, -235], [67, -212], [-67, -212]], COL.amber, { seed: seed + 61, sw: 5 });
  g += line([[0, shY + 4], [2, shY + 62]], { seed: seed + 62, sw: 4, col: "#c9ced8" });
  g += shape([[-26, shY + 2], [0, shY + 26], [26, shY + 2]], COL.navyDark, { seed: seed + 63, sw: 5 }); // collar
  // arms (thick) + mittens
  const shL = [-56, shY + 22], shR = [56, shY + 22];
  const arm = (sh, pts, i) => {
    const a = [sh, [sh[0] + pts[0][0], shY + pts[0][1] + 22], [sh[0] + pts[1][0], shY + pts[1][1] + 22]];
    g += line(a, { seed: seed + 70 + i, sw: 18, halo: true, col: COL.navy });
    const h = a[2];
    g += shape(ell(h[0], h[1], 17, 15), COL.skin, { seed: seed + 75 + i, sw: 5 });
    return h;
  };
  const hl = arm(shL, P.armL, 0);
  const hr = arm(shR, P.armR, 1);
  if (P.prop === "receipt") {
    g += `<g transform="translate(${hr[0] + 30} ${hr[1] - 70}) rotate(-8)">`
      + shape(rrect(-55, -75, 110, 150, 6), COL.paper, { seed: seed + 80, sw: 5, halo: true })
      + [0, 1, 2, 3].map((k) => line([[-38, -48 + k * 18], [30 - k * 9, -46 + k * 18]], { seed: seed + 81 + k, sw: 3, col: "#9a9a9a" })).join("")
      + `<text x="0" y="34" text-anchor="middle" font-family="Kalam" font-weight="700" font-size="30" fill="${COL.red}">${sign}</text></g>`;
    g += shape(ell(hr[0], hr[1], 17, 15), COL.skin, { seed: seed + 76, sw: 5 });
  }
  // neck
  g += shape(rrect(-20, shY - 30, 40, 40, 8), COL.skinShade, { seed: seed + 89, sw: 6 });
  // head: big rounded square (~40% of height)
  const hw = 230, hh = 220;
  g += `<g transform="translate(0 ${bob})">`;
  g += shape(rrect(-hw / 2, headCy - hh / 2, hw, hh, 34), COL.skin, { seed: seed + 90, sw: 8, halo: true });
  // hair: 4 wavy tufts breaking the top edge
  const top = headCy - hh / 2;
  [[-80, 0], [-30, -12], [20, -8], [70, 2]].forEach(([dx, dy], i) => {
    g += shape([[dx - 36, top + 24], [dx - 34, top - 6 + dy], [dx - 18, top - 30 + dy], [dx + 6, top - 34 + dy],
                [dx + 22, top - 22 + dy], [dx + 14, top - 8 + dy], [dx + 30, top + 2 + dy], [dx + 34, top + 24]],
      COL.hair, { seed: seed + 95 + i, sw: 6 });
  });
  g += shape([[-hw / 2 + 4, top + 30], [-hw / 2 + 10, top + 4], [hw / 2 - 10, top + 4], [hw / 2 - 4, top + 30], [-hw / 2 + 4, top + 30]],
    COL.hair, { seed: seed + 99, sw: 0 });
  g += face(0, headCy + 5, expr, seed + 100);
  if (pose === "facepalm") g += shape(ell(hr[0], hr[1] + 30, 30, 26), COL.skin, { seed: seed + 77, sw: 6 });
  g += `</g>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`;
}
