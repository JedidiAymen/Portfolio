import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEggs } from "./EggContext";
import { profile } from "../data";
import { store } from "../lib";

/* ---------- toasts ---------- */
function Toasts() {
  const { toasts } = useEggs();
  return (
    <div className="pointer-events-none fixed z-[90] flex flex-col gap-2" style={{ left: "max(16px, env(safe-area-inset-left, 0px))", bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-[340px] rounded-xl px-4 py-3 shadow-2xl"
            style={{
              background: t.tone === "lime" ? "var(--lime)" : "var(--ink)",
              color: t.tone === "lime" ? "var(--ink)" : "var(--paper)",
              border: t.tone === "radio" ? "1px solid rgba(255,255,255,.12)" : "none",
            }}
          >
            {t.tone === "radio" && (
              <div className="label mb-2 flex items-center gap-2 opacity-70">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--kerb)" }} /> Team radio
              </div>
            )}
            <div className="font-medium">{t.title}</div>
            {t.body && <div className="mt-1 text-sm opacity-75">{t.body}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Lights out: F1 start reaction test ---------- */
type Phase = "idle" | "arming" | "hold" | "go" | "done" | "jump";
function LightsOut() {
  const { active, close } = useEggs();
  const open = !!active.lights;
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState<number | null>(() => store.get<number | null>("aj-best", null));
  const t0 = useRef(0);
  const timers = useRef<number[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const start = useCallback(() => {
    clear(); setLit(0); setPhase("arming");
    for (let i = 1; i <= 5; i++) timers.current.push(window.setTimeout(() => setLit(i), i * 900));
    const hold = 5 * 900 + 400 + Math.random() * 2400;
    timers.current.push(window.setTimeout(() => setPhase("hold"), 5 * 900));
    timers.current.push(window.setTimeout(() => { setLit(0); setPhase("go"); t0.current = performance.now(); }, hold));
  }, []);

  const press = useCallback(() => {
    if (phase === "idle" || phase === "done" || phase === "jump") return start();
    if (phase === "arming" || phase === "hold") { clear(); setLit(0); setPhase("jump"); return; }
    if (phase === "go") {
      const r = Math.round(performance.now() - t0.current);
      setMs(r); setPhase("done");
      if (best === null || r < best) { setBest(r); store.set("aj-best", r); }
    }
  }, [phase, start, best]);

  useEffect(() => {
    if (!open) { clear(); setPhase("idle"); setLit(0); return; }
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("lights");
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); press(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, press, close]);

  const verdict =
    phase === "done"
      ? ms < 200 ? "Faster than most of the grid. Suspiciously fast." : ms < 280 ? "Race-ready. F1 drivers sit around 200 ms." : ms < 400 ? "Solid. You'd hold position into turn one." : "You got swamped at the start. Try again."
      : "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex select-none items-center justify-center gutter"
          style={{ background: "rgba(10,11,13,.94)", color: "var(--paper)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onPointerDown={(e) => { if ((e.target as HTMLElement).dataset.close) return; press(); }}
          role="dialog" aria-label="Lights out reaction test"
        >
          <button data-close="1" onClick={() => close("lights")} className="label absolute bottom-[calc(28px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 rounded-full border border-white/20 px-4 py-2 hover:bg-white/10">Close · Esc</button>
          <div className="flex w-full max-w-2xl flex-col items-center gap-10 text-center">
            <div className="label opacity-60">Reaction test · click or press space</div>
            <div className="flex gap-3 sm:gap-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col gap-2 rounded-xl bg-[#0a0a0a] p-2 sm:gap-3 sm:p-3" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)" }}>
                  {[0, 1, 2].map((r) => {
                    const on = r > 0 && lit >= i;
                    return (
                      <div key={r} className="h-9 w-9 rounded-full sm:h-14 sm:w-14"
                        style={{ background: on ? "var(--kerb)" : "#26272b", boxShadow: on ? "0 0 28px 6px rgba(232,64,47,.55)" : "inset 0 2px 6px rgba(0,0,0,.6)", transition: "background .05s" }} />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="min-h-[120px]">
              {phase === "idle" && <p className="text-3xl font-medium sm:text-5xl">Ready when you are.</p>}
              {(phase === "arming" || phase === "hold") && <p className="text-3xl font-medium opacity-80 sm:text-5xl">Wait for it…</p>}
              {phase === "go" && <p className="text-3xl font-semibold sm:text-5xl" style={{ color: "var(--lime)" }}>Lights out and away we go!</p>}
              {phase === "jump" && (<><p className="text-3xl font-medium sm:text-5xl">Jump start.</p><p className="mt-3 opacity-60">That's a drive-through penalty. Click to try again.</p></>)}
              {phase === "done" && (
                <>
                  <p className="mono tnum text-6xl font-medium sm:text-8xl" style={{ color: "var(--lime)" }}>{ms}<span className="text-2xl opacity-60"> ms</span></p>
                  <p className="mt-3 opacity-70">{verdict}</p>
                </>
              )}
            </div>
            {best !== null && <div className="label opacity-50">Personal best · <span className="tnum">{best} ms</span></div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Box box: team radio + car pass ---------- */
function Car({ color = "#E8402F" }: { color?: string }) {
  return (
    <svg viewBox="0 0 220 60" width="220" height="60" aria-hidden="true">
      <rect x="6" y="34" width="34" height="6" rx="2" fill="#141619" />
      <rect x="176" y="26" width="38" height="8" rx="2" fill="#141619" />
      <path d="M30 40 L60 28 L120 24 L150 30 L196 34 L200 40 Z" fill={color} />
      <path d="M96 24 Q108 12 124 22 Z" fill="#141619" />
      <rect x="100" y="30" width="40" height="4" fill="#C7F464" />
      <circle cx="56" cy="44" r="12" fill="#141619" /><circle cx="56" cy="44" r="5" fill="#555" />
      <circle cx="166" cy="44" r="12" fill="#141619" /><circle cx="166" cy="44" r="5" fill="#555" />
    </svg>
  );
}
function BoxBox() {
  const { active, close, toast } = useEggs();
  useEffect(() => {
    if (!active.box) return;
    toast({ tone: "radio", title: "“Box box, box box.”", body: "Fresh softs are ready. Undercut is on. Push now." }, 4800);
    const t = window.setTimeout(() => close("box"), 2600);
    return () => clearTimeout(t);
  }, [active.box, close, toast]);
  return (
    <AnimatePresence>
      {active.box && (
        <motion.div className="pointer-events-none fixed bottom-[8vh] left-0 z-[85]"
          initial={{ x: "-260px" }} animate={{ x: "110vw" }} transition={{ duration: 1.6, ease: [0.5, 0, 0.2, 1] }}>
          <div className="relative">
            <div className="absolute right-full top-1/2 h-[2px] w-[40vw] -translate-y-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(232,64,47,.6))" }} />
            <Car />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- DRS ---------- */
function DRS() {
  const { active, close, toast } = useEggs();
  useEffect(() => {
    if (!active.drs) return;
    toast({ tone: "lime", title: "DRS enabled", body: "Rear wing open. Everything that scrolls is faster for a few seconds." }, 3800);
    const t = window.setTimeout(() => close("drs"), 6000);
    return () => clearTimeout(t);
  }, [active.drs, close, toast]);
  return (
    <AnimatePresence>
      {active.drs && (
        <motion.div className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-1 origin-left" style={{ background: "var(--lime)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ opacity: 0 }} transition={{ duration: 6, ease: "linear" }} />
      )}
    </AnimatePresence>
  );
}

/* ---------- Gomu (toast only; the stretch lives in the hero) ---------- */
function Gomu() {
  const { active, close, toast } = useEggs();
  useEffect(() => {
    if (!active.gomu) return;
    toast({ title: "Gomu Gomu no… headline!", body: "Rubber typography. Scroll back to the top if you missed it." });
    const t = window.setTimeout(() => close("gomu"), 1800);
    return () => clearTimeout(t);
  }, [active.gomu, close, toast]);
  return null;
}

/* ---------- Laymouna: lime rain ---------- */
function LimeSlice({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#7FB82E" />
      <circle cx="20" cy="20" r="16" fill="#E9F7B8" />
      <circle cx="20" cy="20" r="14" fill="#C7F464" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1="20" y1="20" x2={20 + Math.cos(a) * 14} y2={20 + Math.sin(a) * 14} stroke="#E9F7B8" strokeWidth="1.6" />;
      })}
      <circle cx="20" cy="20" r="2" fill="#E9F7B8" />
    </svg>
  );
}
function LimeRain() {
  const { active, close, toast } = useEggs();
  const [drops, setDrops] = useState<{ x: number; d: number; s: number; r: number; delay: number }[]>([]);
  useEffect(() => {
    if (!active.lime) return;
    setDrops(Array.from({ length: 42 }, () => ({ x: Math.random() * 100, d: 2.4 + Math.random() * 2.2, s: 22 + Math.random() * 34, r: Math.random() * 720 - 360, delay: Math.random() * 1.4 })));
    toast({ tone: "lime", title: "Small lime energy detected", body: "A friendly, slightly chaotic process is running in the background. Hi, Laymouna." }, 5200);
    const t = window.setTimeout(() => close("lime"), 5200);
    return () => clearTimeout(t);
  }, [active.lime, close, toast]);
  return (
    <AnimatePresence>
      {active.lime && (
        <motion.div className="pointer-events-none fixed inset-0 z-[84] overflow-hidden" exit={{ opacity: 0 }}>
          {drops.map((p, i) => (
            <motion.div key={i} className="absolute top-0" style={{ left: `${p.x}%` }}
              initial={{ y: -80, rotate: 0 }} animate={{ y: "110vh", rotate: p.r }} transition={{ duration: p.d, delay: p.delay, ease: "easeIn" }}>
              <LimeSlice size={p.s} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Bounty poster ---------- */
export function StrawHat({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 100 62" aria-hidden="true">
      <ellipse cx="50" cy="46" rx="48" ry="13" fill="#E9C46A" />
      <ellipse cx="50" cy="44" rx="40" ry="9" fill="#D9AF4E" />
      <path d="M24 44 C24 14, 76 14, 76 44 Z" fill="#E9C46A" />
      <path d="M25 38 C35 42, 65 42, 75 38 L76 44 C65 48, 35 48, 24 44 Z" fill="#C8372D" />
      <path d="M32 28 C40 22, 60 22, 68 28" stroke="#D9AF4E" strokeWidth="2" fill="none" />
    </svg>
  );
}
function Bounty() {
  const { active, close } = useEggs();
  useEffect(() => {
    if (!active.bounty) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close("bounty");
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active.bounty, close]);
  return (
    <AnimatePresence>
      {active.bounty && (
        <motion.div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto gutter py-10" style={{ background: "rgba(10,11,13,.86)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => close("bounty")} role="dialog" aria-label="Wanted poster">
          <motion.div
            initial={{ y: 60, rotate: -6, scale: 0.9 }} animate={{ y: 0, rotate: -1.5, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="relative w-full max-w-[380px] p-6 text-center"
            style={{ background: "linear-gradient(160deg,#EBD9B4,#DCC394 60%,#CDAF7B)", color: "#3B2A1A", boxShadow: "0 30px 80px rgba(0,0,0,.5), inset 0 0 60px rgba(120,80,30,.35)", fontFamily: "Georgia, 'Times New Roman', serif" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl font-black tracking-[.08em]" style={{ letterSpacing: ".1em" }}>WANTED</div>
            <div className="mx-auto mt-4 flex aspect-[4/3.4] w-full flex-col items-center justify-center border-[3px]" style={{ borderColor: "#3B2A1A", background: "linear-gradient(#cdb487,#bfa26f)" }}>
              <StrawHat size={150} />
              <div className="-mt-2 text-6xl font-black" style={{ color: "#3B2A1A" }}>AJ</div>
            </div>
            <div className="mt-3 text-sm font-bold tracking-[.3em]">ALIVE · PREFERABLY CAFFEINATED</div>
            <div className="mt-2 text-3xl font-black tracking-wide">{profile.name.toUpperCase()}</div>
            <div className="mt-1 flex items-baseline justify-center gap-2 text-3xl font-black tnum"><span className="text-2xl">฿</span>57,679,000<span className="text-base">-</span></div>
            <div className="mt-1 text-[11px] italic opacity-80">One thousand berries for every lap he forecast.</div>
            <div className="mt-4 border-t-2 pt-3 text-left text-[13px] leading-snug" style={{ borderColor: "#3B2A1A" }}>
              <div className="mb-1 font-bold tracking-[.2em]">WANTED FOR</div>
              <ul className="list-inside list-disc space-y-0.5">
                <li>Taking first place at IndabaX Tunisia 2026</li>
                <li>Cutting a model's accuracy in half, on purpose, to remove leakage</li>
                <li>Resolving 9.1 million data conflicts down to zero</li>
                <li>Running Arch, btw</li>
              </ul>
            </div>
            <div className="mt-4 text-[10px] tracking-[.3em] opacity-70">CLICK ANYWHERE TO SET SAIL</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Eggs() {
  return (<><Toasts /><LightsOut /><BoxBox /><DRS /><Gomu /><LimeRain /><Bounty /></>);
}
