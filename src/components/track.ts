// Lap physics for the hero circuit: corner speed from curvature, then acceleration and braking passes.
const CTRL: [number, number][] = [
  [0.12, 0.62], [0.2, 0.3], [0.38, 0.18], [0.52, 0.3], [0.6, 0.22], [0.82, 0.16], [0.9, 0.34],
  [0.74, 0.46], [0.86, 0.66], [0.72, 0.84], [0.48, 0.74], [0.36, 0.86], [0.2, 0.84],
];
export const N = 720;               // samples along the lap
export const LAP_M = 5200;          // lap length in metres
export const SIM = 6;               // simulated seconds per real second
const VMAX = 92, VMIN = 22;  // m/s (≈ 330 and 80 km/h)
const A_LAT = 44, A_ACC = 10.5, A_BRK = 38;

type V2 = [number, number];
const wrapA = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

function buildTrack() {
  // dense Catmull-Rom
  const dense: V2[] = [];
  for (let i = 0; i < CTRL.length; i++) {
    const p0 = CTRL[(i - 1 + CTRL.length) % CTRL.length], p1 = CTRL[i], p2 = CTRL[(i + 1) % CTRL.length], p3 = CTRL[(i + 2) % CTRL.length];
    for (let k = 0; k < 80; k++) {
      const t = k / 80, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      dense.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  // resample uniformly by arc length
  const cum = [0];
  for (let i = 1; i <= dense.length; i++) {
    const a = dense[i - 1], b = dense[i % dense.length];
    cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  const L = cum[cum.length - 1];
  const pts: V2[] = [];
  let j = 0;
  for (let i = 0; i < N; i++) {
    const target = (i / N) * L;
    while (cum[j + 1] < target) j++;
    const a = dense[j], b = dense[(j + 1) % dense.length], u = (target - cum[j]) / (cum[j + 1] - cum[j] || 1);
    pts.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]);
  }
  const ds = LAP_M / N;
  const head = pts.map((p, i) => { const q = pts[(i + 1) % N]; return Math.atan2(q[1] - p[1], q[0] - p[0]); });
  let kap = head.map((_, i) => wrapA(head[i] - head[(i - 1 + N) % N]) / ds);
  for (let pass = 0; pass < 3; pass++) kap = kap.map((_, i) => (kap[(i - 2 + N) % N] + kap[(i - 1 + N) % N] + kap[i] + kap[(i + 1) % N] + kap[(i + 2) % N]) / 5);
  const v = kap.map((k) => Math.max(VMIN, Math.min(VMAX, Math.sqrt(A_LAT / Math.max(1e-6, Math.abs(k))))));
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < N; i++) { const p = (i - 1 + N) % N; v[i] = Math.min(v[i], Math.sqrt(v[p] ** 2 + 2 * A_ACC * ds)); }
    for (let i = N - 1; i >= 0; i--) { const n = (i + 1) % N; v[i] = Math.min(v[i], Math.sqrt(v[n] ** 2 + 2 * A_BRK * ds)); }
  }
  const brake = v.map((x, i) => v[(i + 1) % N] < x - 0.05);
  // normals in track space
  const nor = head.map((h) => [-Math.sin(h), Math.cos(h)] as V2);
  // longest flat-out stretch is the DRS zone
  let best = [0, 0], run = 0;
  for (let i = 0; i < 2 * N; i++) { if (v[i % N] > VMAX * 0.97) { run++; if (run > best[1]) best = [i - run + 1, run]; } else run = 0; }
  const drs = new Set<number>(); for (let k = 0; k < best[1]; k++) drs.add((best[0] + k) % N);
  const lapTime = v.reduce((t, x) => t + ds / x, 0);
  return { pts, v, kap, brake, nor, drs, lapTime, ds };
}
export const T = buildTrack();

export const vAt = (s: number) => { const f = ((s % LAP_M) + LAP_M) % LAP_M / (LAP_M / N); const i = Math.floor(f), u = f - i; return T.v[i % N] * (1 - u) + T.v[(i + 1) % N] * u; };
export const idxAt = (s: number) => Math.floor((((s % LAP_M) + LAP_M) % LAP_M) / (LAP_M / N)) % N;
export const fmt = (s: number) => (s <= 0 || !isFinite(s) ? "–:––.–––" : `${Math.floor(s / 60)}:${(s % 60).toFixed(3).padStart(6, "0")}`);
