import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { useEggs } from "../eggs/EggContext";
import { reduced } from "../lib";

/* An original circuit, drawn with a Catmull-Rom spline through these points. */
const TRACK = [
  [0.12, 0.62], [0.2, 0.3], [0.38, 0.18], [0.52, 0.3], [0.6, 0.22], [0.82, 0.16], [0.9, 0.34],
  [0.74, 0.46], [0.86, 0.66], [0.72, 0.84], [0.48, 0.74], [0.36, 0.86], [0.2, 0.84],
];
function sample(n: number) {
  const P = TRACK, out: [number, number][] = [];
  for (let i = 0; i < P.length; i++) {
    const p0 = P[(i - 1 + P.length) % P.length], p1 = P[i], p2 = P[(i + 1) % P.length], p3 = P[(i + 2) % P.length];
    for (let t = 0; t < 1; t += 1 / n) {
      const t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}
const PTS = sample(48);
const LAP_S = 9; // seconds per animated lap
const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toFixed(3).padStart(6, "0")}`;
const SECTOR_COLORS = ["#B36BFF", "#4ADE80", "#FACC15"];

function TrackCanvas({ fast }: { fast: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const prog = useRef(0);
  const fastRef = useRef(fast);
  fastRef.current = fast;
  const [hud, setHud] = useState({ lap: 1, time: 0, last: "1:21.904", sectors: [0, 0, 0] as number[] });

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0, last = performance.now(), lap = 1, hudT = 0;
    const still = reduced();
    let sectors = [0, 0, 0];
    const resize = () => {
      const r = c.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      c.width = r.width * d; c.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const draw = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
      if (!still) prog.current += (dt / LAP_S) * (fastRef.current ? 2.6 : 1);
      if (prog.current >= 1) {
        prog.current -= 1; lap++;
        const lt = 81.2 + Math.random() * 1.6;
        sectors = [0, 1, 2].map(() => Math.floor(Math.random() * 3));
        setHud((h) => ({ ...h, lap, last: fmt(lt), sectors }));
      }
      const r = c.getBoundingClientRect(), W = r.width, H = r.height;
      const s = Math.min(W, H * 1.5), ox = (W - s) / 2, oy = (H - s / 1.5) / 2;
      const X = (p: [number, number]) => ox + p[0] * s, Y = (p: [number, number]) => oy + p[1] * (s / 1.5);
      ctx.clearRect(0, 0, W, H);
      // tarmac
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); PTS.forEach((p, i) => (i ? ctx.lineTo(X(p), Y(p)) : ctx.moveTo(X(p), Y(p)))); ctx.closePath();
      ctx.strokeStyle = "rgba(236,237,239,0.07)"; ctx.lineWidth = Math.max(10, s * 0.026); ctx.stroke();
      // sectors
      const n = PTS.length;
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let i = Math.floor((k * n) / 3); i <= Math.floor(((k + 1) * n) / 3); i++) { const p = PTS[i % n]; i === Math.floor((k * n) / 3) ? ctx.moveTo(X(p), Y(p)) : ctx.lineTo(X(p), Y(p)); }
        ctx.strokeStyle = "rgba(236,237,239,0.28)"; ctx.lineWidth = 1; ctx.setLineDash([2, 6]); ctx.stroke(); ctx.setLineDash([]);
      }
      // start line
      const a = PTS[0], b = PTS[1], ang = Math.atan2(Y(b) - Y(a), X(b) - X(a)) + Math.PI / 2, L = s * 0.02;
      ctx.beginPath(); ctx.moveTo(X(a) - Math.cos(ang) * L, Y(a) - Math.sin(ang) * L); ctx.lineTo(X(a) + Math.cos(ang) * L, Y(a) + Math.sin(ang) * L);
      ctx.strokeStyle = "#ECEDEF"; ctx.lineWidth = 3; ctx.stroke();
      // trail + car
      const idx = prog.current * n, TR = 70;
      for (let j = TR; j > 0; j--) {
        const p1 = PTS[Math.floor(idx - j + n) % n], p2 = PTS[Math.floor(idx - j + 1 + n) % n];
        ctx.beginPath(); ctx.moveTo(X(p1), Y(p1)); ctx.lineTo(X(p2), Y(p2));
        ctx.strokeStyle = `rgba(199,244,100,${(1 - j / TR) * 0.9})`; ctx.lineWidth = 3; ctx.stroke();
      }
      const cp = PTS[((Math.floor(idx) % n) + n) % n];
      ctx.beginPath(); ctx.arc(X(cp), Y(cp), 6, 0, Math.PI * 2); ctx.fillStyle = "#C7F464"; ctx.shadowColor = "#C7F464"; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;
      if (now - hudT > 50) { hudT = now; setHud((h) => ({ ...h, time: prog.current * 81.904 })); }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={ref} className="h-full w-full" aria-hidden="true" />
      <div className="mono tnum absolute right-[max(16px,4vw)] top-[22%] hidden flex-col gap-1 text-right text-[12px] text-[var(--paper)]/70 md:flex" aria-hidden="true">
        <div className="label text-[var(--paper)]/50">Lap {String(hud.lap).padStart(2, "0")}</div>
        <div className="text-2xl text-[var(--paper)]">{fmt(hud.time)}</div>
        <div>last {hud.last}</div>
        <div className="mt-1 flex justify-end gap-1">{hud.sectors.map((s, i) => <span key={i} className="h-1.5 w-6 rounded-full" style={{ background: SECTOR_COLORS[s] }} />)}</div>
      </div>
    </div>
  );
}

function Marquee({ fast, stretch }: { fast: boolean; stretch: boolean }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(-1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduced()) return;
    let move = dir.current * 2.2 * (delta / 1000) * (fast ? 5 : 1);
    const f = factor.get();
    if (f < 0) dir.current = 1; else if (f > 0) dir.current = -1;
    move += dir.current * Math.abs(f) * (delta / 1000) * 2;
    x.set(x.get() + move);
  });
  const text = `${profile.name} — `;
  return (
    <motion.div
      className="origin-left"
      animate={stretch ? { scaleX: [1, 1.7, 0.75, 1.25, 0.92, 1], scaleY: [1, 0.7, 1.2, 0.9, 1.05, 1] } : { scaleX: 1, scaleY: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <motion.div style={{ x: pos }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="pr-[0.25em] text-[clamp(84px,15vw,230px)] font-medium leading-[1.05] tracking-[-0.035em]" aria-hidden={k > 0}>{text}</span>
        ))}
      </motion.div>
    </motion.div>
  );
}

function Globe() {
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11" aria-hidden="true">
      <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 20h30M20 5c-6 5-6 25 0 30M20 5c6 5 6 25 0 30" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <motion.ellipse cx="20" cy="20" ry="15" fill="none" stroke="currentColor" strokeWidth="1.4"
        animate={{ rx: [15, 0.5, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
    </svg>
  );
}

export default function Hero() {
  const { active } = useEggs();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <motion.div style={{ y }} className="absolute inset-0 opacity-90">
        <TrackCanvas fast={!!active.drs} />
      </motion.div>
      <motion.div style={{ y }} className="relative z-10 flex flex-col gap-10 pb-6 pt-32 gutter md:flex-row md:items-end md:justify-between">
        <div className="flex w-fit items-center gap-4 rounded-full py-3 pl-6 pr-3" style={{ background: "rgba(28,31,36,.9)", border: "1px solid rgba(255,255,255,.08)" }}>
          <span className="text-[15px] leading-tight">Located<br />in {profile.location}</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--graphite)", color: "var(--lime)" }}><Globe /></span>
        </div>
        <div className="max-w-md">
          <svg width="22" height="22" viewBox="0 0 22 22" className="mb-6" aria-hidden="true"><path d="M2 2 L20 20 M20 6 V20 H6" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
          <p className="text-[clamp(26px,3vw,40px)] font-normal leading-[1.15]">{profile.role}</p>
          <p className="mt-1 text-[clamp(26px,3vw,40px)] leading-[1.15] text-[var(--paper)]/45">{profile.focus}</p>
        </div>
      </motion.div>
      <h1 className="sr-only">{profile.name}, {profile.role}</h1>
      <div className="relative z-10 pb-[max(24px,4vh)]">
        <Marquee fast={!!active.drs} stretch={!!active.gomu} />
      </div>
    </section>
  );
}
