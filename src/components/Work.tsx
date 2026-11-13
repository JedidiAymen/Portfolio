import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "../data";
import Cover from "./Covers";
import { RoundButton } from "./Magnetic";

export function Intro({ go }: { go: (id: string) => void }) {
  return (
    <section className="gutter pb-24 pt-28 md:pb-36 md:pt-40">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1.6fr_1fr] md:gap-20">
        <motion.p
          initial={{ y: 24 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }}
          className="text-[clamp(26px,3.2vw,44px)] leading-[1.22] tracking-[-0.01em]">
          I build data pipelines, ML models and LLM agents, and I spend just as much time proving they work. Every project here ships with its baseline, its numbers and its limits.
        </motion.p>
        <div className="relative flex flex-col gap-8">
          <p className="max-w-[34ch] text-[17px] leading-relaxed text-[var(--ink)]/70">
            Final-year computer science engineering student at ENSI, AI & software intern at Orange Digital Center, and first place at IndabaX Tunisia 2026.
          </p>
          <div className="md:absolute md:-bottom-36 md:left-0">
            <RoundButton onClick={() => go("about")} size={170}>About me</RoundButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Work({ open }: { open: (slug: string) => void }) {
  const [hover, setHover] = useState<{ i: number; on: boolean }>({ i: 0, on: false });
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 }), y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });
  const cx = useSpring(mx, { stiffness: 380, damping: 28 }), cy = useSpring(my, { stiffness: 380, damping: 28 });

  return (
    <section id="work" className="gutter pb-24 pt-10 md:pt-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="label mb-8 flex justify-between text-[var(--mist)]"><span>Selected work</span><span className="tnum">{String(projects.length).padStart(2, "0")} projects</span></div>

        {/* desktop list with cursor-following preview */}
        <ul className="hidden border-b border-[var(--line)] md:block" onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }} onMouseLeave={() => setHover((h) => ({ ...h, on: false }))}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button onClick={() => open(p.slug)} onMouseEnter={() => setHover({ i, on: true })}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-8 border-t border-[var(--line)] px-[3vw] py-[clamp(28px,4.4vw,56px)] text-left transition-[padding,opacity] duration-500 hover:px-[2vw]"
                style={{ opacity: hover.on && hover.i !== i ? 0.35 : 1 }}>
                <span className="flex items-baseline gap-5">
                  <span className="text-[clamp(40px,6vw,86px)] font-normal leading-none tracking-[-0.03em] transition-transform duration-500 group-hover:-translate-x-3">{p.title}</span>
                  {p.award && <span className="label rounded-full px-3 py-1.5" style={{ background: "var(--lime)", color: "var(--ink)" }}>{p.award}</span>}
                </span>
                <span className="text-right text-[15px] transition-transform duration-500 group-hover:translate-x-3">
                  <span className="block">{p.kind}</span>
                  <span className="mono mt-1 block text-[12px] text-[var(--mist)]">{p.context} · {p.year}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* mobile cards */}
        <ul className="grid gap-12 md:hidden">
          {projects.map((p) => (
            <li key={p.slug}>
              <button onClick={() => open(p.slug)} className="block w-full text-left">
                <div className="aspect-[4/3] w-full max-w-full overflow-hidden rounded-md"><Cover p={p} /></div>
                <div className="mt-5 flex items-center gap-3 border-b border-[var(--line)] pb-4">
                  <span className="text-[34px] leading-none tracking-[-0.02em]">{p.title}</span>
                  {p.award && <span className="label rounded-full px-2.5 py-1" style={{ background: "var(--lime)" }}>{p.award}</span>}
                </div>
                <div className="mt-3 flex justify-between gap-4 text-[14px]"><span>{p.kind}</span><span className="mono shrink-0 text-[12px] text-[var(--mist)]">{p.year}</span></div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* floating preview */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ x, y }}>
        <div className="-translate-x-1/2 -translate-y-1/2"><motion.div className="relative overflow-hidden"
          style={{ width: "min(440px, 32vw)", height: "min(340px, 25vw)" }}
          initial={false} animate={{ scale: hover.on ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div className="absolute left-0 w-full" style={{ height: `${projects.length * 100}%` }}
            animate={{ top: `${hover.i * -100}%` }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            {projects.map((p) => <div key={p.slug} style={{ height: `${100 / projects.length}%` }}><Cover p={p} /></div>)}
          </motion.div>
        </motion.div></div>
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ x: cx, y: cy }}>
        <div className="-translate-x-1/2 -translate-y-1/2"><motion.div className="flex h-20 w-20 items-center justify-center rounded-full text-[14px]"
          style={{ background: "var(--lime)", color: "var(--ink)" }} initial={false} animate={{ scale: hover.on ? 1 : 0 }} transition={{ duration: 0.35 }}>
          View
        </motion.div></div>
      </motion.div>
    </section>
  );
}

export function SlidingRows({ open, progress }: { open: (s: string) => void; progress: { r1: MotionValue<string>; r2: MotionValue<string> } }) {
  const a = projects.slice(0, 5), b = projects.slice(4).concat(projects.slice(0, 1));
  const Row = ({ list, x }: { list: Project[]; x: MotionValue<string> }) => (
    <motion.div style={{ x }} className="flex w-max gap-[2vw]">
      {list.map((p) => (
        <button key={p.slug} onClick={() => open(p.slug)} className="aspect-[4/3] w-[clamp(220px,23vw,360px)] shrink-0 overflow-hidden rounded-md transition-transform duration-500 hover:scale-[0.97]" aria-label={`Open ${p.title}`}>
          <Cover p={p} />
        </button>
      ))}
    </motion.div>
  );
  return (
    <div className="flex flex-col gap-[2vw] overflow-hidden py-10">
      <Row list={a} x={progress.r1} />
      <Row list={b} x={progress.r2} />
    </div>
  );
}

