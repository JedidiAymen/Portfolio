import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { useEggs } from "../eggs/EggContext";
import { reduced } from "../lib";
import { fmt, idxAt, LAP_M, N, SIM, T, vAt } from "./track";

/* An original circuit, kept minimal: one line, numbered corners, one car and the ghost of its best lap.
   Speed comes from the track's curvature, so the car really brakes into corners and its trail
   stretches on the straights. */
const SECTOR_COLORS = ["#B36BFF", "#4ADE80", "#FACC15"];
// corners are where braking starts
const CORNERS = T.brake.map((b, i) => (b && !T.brake[(i - 1 + N) % N] ? i : -1)).filter((i) => i >= 0);

function TrackCanvas({ fast, ready }: { fast: boolean; ready: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const live = useRef({ fast, ready }); live.current = { fast, ready };
  const [hud, setHud] = useState({ lap: 1, time: 0, last: 0, best: 0, kmh: 0, delta: null as number | null, lights: 0, racing: false, sectors: [-1, -1, -1] });

  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const still = reduced();
    let raf = 0, last = performance.now(), hudT = 0, W = 0, H = 0, visible = true;
    const resize = () => { const r = c.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(c);

    let drawn = still ? 1 : 0, phase: "wait" | "lights" | "race" = still ? "race" : "wait", lightsT = 0, outAt = 0;
    let dist = still ? LAP_M * 0.2 : 0, simT = 0, lapStart = 0, lap = 0, lastLap = 0, bestLap = 0, launch = still ? 1 : 0;
    let cur: number[] = [], best: number[] | null = null;
    let sec = 0, secStart = 0; const bestSec = [Infinity, Infinity, Infinity]; let secCol = [-1, -1, -1];

    const loop = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const o = live.current;
      if (!still) {
        drawn = Math.min(1, drawn + dt / 1.8);
        if (phase === "wait" && o.ready && drawn > 0.6) { phase = "lights"; lightsT = 0; outAt = 2.7 + Math.random() * 0.6; }
        if (phase === "lights") { lightsT += dt; if (lightsT > outAt) phase = "race"; }
        if (phase === "race") {
          launch = Math.min(1, launch + dt * 0.8);
          const sdt = dt * SIM * (o.fast ? 2.6 : 1);
          simT += sdt;
          dist += vAt(dist) * (0.2 + 0.8 * launch) * sdt;
          const tl = simT - lapStart, s = dist % LAP_M;
          while (cur.length < tl / 0.1) cur.push(s);
          const sn = Math.floor(s / (LAP_M / 3));
          if (sn !== sec) {
            const t = simT - secStart; secStart = simT;
            secCol[sec] = t < bestSec[sec] ? 0 : t < bestSec[sec] * 1.003 ? 1 : 2; bestSec[sec] = Math.min(bestSec[sec], t);
            sec = sn; secCol = [...secCol];
          }
          if (Math.floor(dist / LAP_M) > lap) {
            lap++; lastLap = simT - lapStart; lapStart = simT;
            if (!bestLap || lastLap < bestLap) { bestLap = lastLap; best = cur; }
            cur = []; secCol = [-1, -1, -1];
          }
        }
      }

      const s = Math.min(W, H * 1.5), ox = (W - s) / 2 + W * 0.04, oy = (H - s / 1.5) / 2;
      const X = (i: number) => ox + T.pts[i][0] * s, Y = (i: number) => oy + T.pts[i][1] * (s / 1.5);
      ctx.clearRect(0, 0, W, H);
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      // the line, drawing itself on load
      const upto = Math.floor(N * drawn);
      ctx.beginPath(); for (let i = 0; i <= upto; i++) { const k = i % N; i ? ctx.lineTo(X(k), Y(k)) : ctx.moveTo(X(k), Y(k)); }
      ctx.strokeStyle = "rgba(236,237,239,0.18)"; ctx.lineWidth = 1.5; ctx.stroke();
      if (drawn >= 1) {
        // start line + numbered corners
        const a = T.nor[0]; ctx.beginPath(); ctx.moveTo(X(0) - a[0] * 9, Y(0) - a[1] * 9); ctx.lineTo(X(0) + a[0] * 9, Y(0) + a[1] * 9);
        ctx.strokeStyle = "#ECEDEF"; ctx.lineWidth = 2; ctx.stroke();
        ctx.font = "10px 'JetBrains Mono', monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        CORNERS.forEach((i, k) => {
          const side = T.kap[i] > 0 ? -1 : 1, n = T.nor[i];
          ctx.fillStyle = "rgba(236,237,239,0.35)"; ctx.beginPath(); ctx.arc(X(i), Y(i), 1.6, 0, 7); ctx.fill();
          ctx.fillStyle = "rgba(236,237,239,0.3)"; ctx.fillText(`T${k + 1}`, X(i) + n[0] * side * 18, Y(i) + n[1] * side * 18);
        });
      }
      if (phase === "race" || still) {
        // ghost of the best lap
        if (best) { const g = best[Math.min(best.length - 1, Math.floor((simT - lapStart) / 0.1))]; const gi = idxAt(g);
          ctx.beginPath(); ctx.arc(X(gi), Y(gi), 4, 0, 7); ctx.strokeStyle = "rgba(236,237,239,0.45)"; ctx.lineWidth = 1.2; ctx.stroke(); }
        // the car: trail length follows speed
        const v = vAt(dist), trail = v * 1.5 * (0.2 + 0.8 * launch), seg = 48, i0 = idxAt(dist);
        for (let k = seg; k > 0; k--) {
          const a = idxAt(dist - (trail * k) / seg), b = idxAt(dist - (trail * (k - 1)) / seg);
          ctx.beginPath(); ctx.moveTo(X(a), Y(a)); ctx.lineTo(X(b), Y(b));
          ctx.strokeStyle = `rgba(199,244,100,${(1 - k / seg) * 0.9})`; ctx.lineWidth = 2.5; ctx.stroke();
        }
        const braking = T.brake[i0] && !still;
        if (braking) { ctx.beginPath(); ctx.arc(X(i0), Y(i0), 10, 0, 7); ctx.strokeStyle = "rgba(232,64,47,0.7)"; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.beginPath(); ctx.arc(X(i0), Y(i0), 5, 0, 7); ctx.fillStyle = "#C7F464"; ctx.shadowColor = "#C7F464"; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;
      }
      if (now - hudT > 80) {
        hudT = now;
        let delta: number | null = null;
        if (best && phase === "race") { const sNow = dist % LAP_M; let lo = 0, hi = best.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (best[m] < sNow) lo = m + 1; else hi = m; } delta = simT - lapStart - lo * 0.1; }
        setHud({ lap: lap + 1, time: phase === "race" ? simT - lapStart : 0, last: lastLap, best: bestLap, kmh: phase === "race" ? Math.round(vAt(dist) * 3.6 * (0.2 + 0.8 * launch)) : 0,
          delta, lights: phase === "lights" ? Math.min(5, Math.floor(lightsT / 0.5) + 1) : 0, racing: phase === "race", sectors: secCol });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={ref} className="h-full w-full" aria-hidden="true" />
      <div className="mono tnum absolute right-[max(16px,4vw)] top-[22%] hidden flex-col gap-1 text-right text-[12px] text-[var(--paper)]/70 md:flex" aria-hidden="true">
        <div className="label flex items-center justify-end gap-2 text-[var(--paper)]/50">
          {hud.racing ? <>Lap {String(hud.lap).padStart(2, "0")}</> : (
            <span className="flex gap-1">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < hud.lights ? "#E8402F" : "rgba(236,237,239,.15)", boxShadow: i < hud.lights ? "0 0 8px #E8402F" : "none" }} />)}</span>
          )}
        </div>
        <div className="text-2xl text-[var(--paper)]">{fmt(hud.time)}</div>
        <div>{hud.kmh} km/h</div>
        <div>last {fmt(hud.last)}</div>
        <div style={{ color: hud.delta === null ? "transparent" : hud.delta <= 0 ? "#4ADE80" : "#E8402F" }}>{hud.delta === null ? "·" : `${hud.delta <= 0 ? "−" : "+"}${Math.abs(hud.delta).toFixed(3)} best`}</div>
        <div className="mt-1 flex justify-end gap-1">{hud.sectors.map((s, i) => <span key={i} className="h-1.5 w-6 rounded-full transition-colors" style={{ background: s < 0 ? "rgba(236,237,239,.12)" : SECTOR_COLORS[s] }} />)}</div>
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

export default function Hero({ ready = true }: { ready?: boolean }) {
  const { active } = useEggs();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <motion.div style={{ y }} className="absolute inset-0 opacity-90">
        <TrackCanvas fast={!!active.drs} ready={ready} />
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
