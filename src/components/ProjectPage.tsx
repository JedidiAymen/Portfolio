import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data";
import { ease, reduced } from "@/lib";
import { gsap } from "@/scroll";
import { ROLE_ORDER, stackWhy } from "@/stackWhy";
import { stories } from "@/stories";
import { Frame } from "./Frame";

const CHAPTERS = [
  { id: "spark", label: "The spark" },
  { id: "problem", label: "The problem" },
  { id: "how", label: "How it works" },
  { id: "stack", label: "The stack, and why" },
  { id: "built", label: "What I built" },
  { id: "hard", label: "The hard part" },
  { id: "results", label: "Results" },
  { id: "stuck", label: "What stuck" },
];

function ChapterHead({ n, label, accent }: { n: number; label: string; accent: string }) {
  return (
    <div className="ch-head mb-10 flex items-center gap-4">
      <span className="mono tnum text-[13px]" style={{ color: accent }}>{String(n).padStart(2, "0")}</span>
      <span className="ch-line h-px w-16 origin-left" style={{ background: accent }} />
      <span className="label opacity-60">{label}</span>
    </div>
  );
}

/* "0.575 s" -> counts 0.000 → 0.575, keeps prefix and suffix */
function CountUp({ value, root }: { value: string; root: React.RefObject<HTMLDivElement> }) {
  const el = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const m = value.match(/-?\d[\d,]*\.?\d*/);
    if (!m || reduced() || !el.current) return;
    const raw = m[0], num = parseFloat(raw.replace(/,/g, "")), dec = (raw.split(".")[1] || "").length, comma = raw.includes(",");
    const pre = value.slice(0, m.index), post = value.slice((m.index ?? 0) + raw.length);
    const o = { v: 0 };
    const render = () => { if (el.current) el.current.textContent = pre + (comma ? Math.round(o.v).toLocaleString("en-US") : o.v.toFixed(dec)) + post; };
    render();
    gsap.to(o, { v: num, duration: 1.8, ease: "expo.out", onUpdate: render, onComplete: () => { if (el.current) el.current.textContent = value; },
      scrollTrigger: { trigger: el.current, scroller: root.current, start: "top 85%" } });
  }, [value]);
  return <span ref={el}>{value}</span>;
}

export default function ProjectPage({ slug, onClose, onOpen }: { slug: string; onClose: () => void; onOpen: (s: string) => void }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i] as Project | undefined;
  const next = projects[(i + 1) % projects.length];
  const st = p ? stories[p.slug] : undefined;
  const scroller = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(-1);
  const [curtain, setCurtain] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({ container: scroller });
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); setChapter(-1); }, [slug]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [onClose]);

  useGSAP(() => {
    if (!p) return;
    const sc = scroller.current!;
    const still = reduced();
    // opening title
    if (!still) gsap.from(".op-char", { yPercent: 110, duration: 1.2, stagger: 0.03, ease: "expo.out", delay: 0.35 });
    // chapter tracking
    CHAPTERS.forEach((c, k) => {
      gsap.timeline({ scrollTrigger: { trigger: `#ch-${c.id}`, scroller: sc, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setChapter(k) } });
    });
    if (still) return;
    // chapter heads: line grows, title rises
    gsap.utils.toArray<HTMLElement>(".ch-head", sc).forEach((h) => {
      gsap.from(h.querySelector(".ch-line"), { scaleX: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: h, scroller: sc, start: "top 85%" } });
    });
    gsap.utils.toArray<HTMLElement>(".rise", sc).forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, scroller: sc, start: "top 88%" } });
    });
    // words light up as you read
    gsap.utils.toArray<HTMLElement>(".read", sc).forEach((el) => {
      gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, scroller: sc, start: "top 80%", end: "bottom 45%", scrub: true } });
    });
    // how-it-works: line draws, steps light up
    gsap.fromTo(".flow-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".flow", scroller: sc, start: "top 60%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".flow-step", sc).forEach((el) => {
      gsap.fromTo(el, { opacity: 0.25, x: 30 }, { opacity: 1, x: 0, ease: "power2.out", scrollTrigger: { trigger: el, scroller: sc, start: "top 75%", end: "top 50%", scrub: true } });
      gsap.fromTo(el.querySelector(".flow-dot"), { scale: 0.4, backgroundColor: "#d4d6da" }, { scale: 1, backgroundColor: p.tone.accent === "#F4F4F0" ? p.tone.bg : p.tone.accent, scrollTrigger: { trigger: el, scroller: sc, start: "top 60%", toggleActions: "play none none reverse" }, duration: 0.4 });
    });
    // captures: wipe in, then parallax
    gsap.utils.toArray<HTMLElement>(".shot", sc).forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(18% 10% 18% 10% round 24px)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0% round 16px)", scale: 1, ease: "none", scrollTrigger: { trigger: el, scroller: sc, start: "top 95%", end: "top 35%", scrub: true } });
    });
    // the page itself changes colour for the hard part, then returns
    gsap.timeline({ scrollTrigger: { trigger: "#ch-hard", scroller: sc, start: "top 70%", end: "bottom 30%", toggleActions: "play reverse play reverse" } })
      .to(sc, { backgroundColor: p.tone.bg, duration: 0.8, ease: "power2.inOut" });
  }, { scope: scroller, dependencies: [slug], revertOnUpdate: true });

  if (!p || !st) return null;
  const accent = p.tone.accent === "#F4F4F0" ? p.tone.bg : p.tone.accent;

  const goNext = () => {
    if (reduced()) return onOpen(next.slug);
    setCurtain(next);
    setTimeout(() => { onOpen(next.slug); setTimeout(() => setCurtain(null), 120); }, 750);
  };
  const jump = (id: string) => { const el = scroller.current?.querySelector(`#ch-${id}`) as HTMLElement | null; el && scroller.current?.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" }); };
  const words = (t: string) => t.split(" ").map((w, k) => <span key={k} className="w">{w} </span>);
  const shots = st.shots;

  return (
    <motion.div
      ref={scroller}
      data-lenis-prevent
      className="fixed inset-0 z-[65] overflow-y-auto overflow-x-hidden overscroll-contain bg-bg text-fg"
      initial={{ clipPath: "circle(0% at 50% 100%)" }} animate={{ clipPath: "circle(150% at 50% 100%)" }} exit={{ clipPath: "circle(0% at 50% 100%)" }}
      transition={{ duration: 1, ease }}
      role="dialog" aria-label={`${p.title} story`}
    >
      {/* reading progress */}
      <motion.div className="fixed inset-x-0 top-0 z-[61] h-[3px] origin-left" style={{ scaleX: bar, background: accent }} />

      {/* top bar */}
      <div className="sticky top-0 z-[60] flex items-center justify-between gutter py-4 backdrop-blur-md" style={{ background: "linear-gradient(rgb(var(--c-paper) / .92), rgb(var(--c-paper) / 0))" }}>
        <Button variant="outline" size="sm" onClick={onClose}><ArrowLeft /> All work</Button>
        <span className="label hidden text-fg/60 sm:block">{chapter >= 0 ? `${String(chapter + 1).padStart(2, "0")} · ${CHAPTERS[chapter].label}` : p.kind}</span>
        <span className="label tnum text-fg/50">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>

      {/* chapter rail */}
      <nav className="fixed left-[max(16px,2vw)] top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-3 min-[1560px]:flex" aria-label="Chapters">
        {CHAPTERS.map((c, k) => (
          <button key={c.id} onClick={() => jump(c.id)} className="group flex items-center gap-3 text-left">
            <span className="h-px transition-all duration-500" style={{ width: k === chapter ? 36 : 14, background: k === chapter ? accent : "rgba(255,255,255,.25)" }} />
            <span className="mono text-[11px] transition-colors" style={{ color: k === chapter ? "var(--ink)" : "rgba(20,22,25,.35)" }}>{c.label}</span>
          </button>
        ))}
      </nav>

      <div key={slug}>
        {/* opening */}
        <header className="relative overflow-hidden gutter pb-16 pt-10 md:pt-16">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: `${accent}26` }} />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="flex flex-wrap items-center gap-2">
              {p.award && <Badge variant="award">{p.award} · {p.context}</Badge>}
              <Badge variant="outline">{p.kind}</Badge>
            </div>
            <h2 className="mt-6 text-[clamp(60px,12vw,190px)] font-normal leading-[0.9] tracking-[-0.05em]">
              <span className="inline-block overflow-hidden pb-[0.06em]">{[...p.title].map((ch, k) => <span key={k} className="op-char inline-block whitespace-pre">{ch}</span>)}</span>
            </h2>
            <p className="rise mt-8 max-w-[34ch] text-[clamp(22px,2.4vw,34px)] leading-[1.2] text-fg/85">{st.tagline}</p>
            <dl className="rise mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-fg/10 pt-8 md:grid-cols-4">
              {[["Role", p.role], ["Context", p.context], ["Year", p.year]].map(([k, v]) => (
                <div key={k} className="min-w-0"><dt className="label mb-2 text-fg/40">{k}</dt><dd className="text-[15px] leading-snug text-fg/85">{v}</dd></div>
              ))}
              <div className="col-span-2 min-w-0 md:col-span-1"><dt className="label mb-2 text-fg/40">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">{p.stack.slice(0, 8).map((s) => <Badge key={s} variant="muted" className="normal-case tracking-normal">{s}</Badge>)}</dd></div>
            </dl>
          </div>
        </header>
        <div className="gutter">
          <motion.div initial={{ opacity: 0, y: 80, rotateX: 18 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.2, delay: 0.5, ease }} className="mx-auto max-w-[1300px] [perspective:1400px]">
            <Frame p={p} shot={shots.find((s) => !s.video) ?? shots[0]} live />
          </motion.div>
        </div>

        <article className="mx-auto max-w-[1200px] gutter">
          {/* 01 spark */}
          <section id="ch-spark" className="pt-32 md:pt-44">
            <ChapterHead n={1} label="The spark" accent={accent} />
            <p className="read max-w-[30ch] text-[clamp(28px,3.4vw,52px)] leading-[1.12] tracking-[-0.02em]">{words(st.spark)}</p>
            <div className="rise mt-14 flex max-w-[720px] gap-4 rounded-2xl border border-fg/10 bg-fg/[0.03] p-6 md:p-8">
              <Lightbulb className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} />
              <div><div className="label mb-2 text-fg/50">In plain words</div><p className="text-[18px] leading-relaxed text-fg/85">{st.analogy}</p></div>
            </div>
          </section>

          {/* 02 problem */}
          <section id="ch-problem" className="pt-32 md:pt-44">
            <ChapterHead n={2} label="The problem" accent={accent} />
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
              <p className="read text-[clamp(24px,2.6vw,38px)] leading-[1.25] tracking-[-0.01em]">{words(p.problem)}</p>
              <p className="rise self-end border-l-2 pl-6 text-[17px] leading-relaxed text-fg/65" style={{ borderColor: accent }}>{p.lead}</p>
            </div>
          </section>

          {/* 03 how it works */}
          <section id="ch-how" className="pt-32 md:pt-44">
            <ChapterHead n={3} label="How it works" accent={accent} />
            <div className="grid gap-12 md:grid-cols-[0.8fr_1.4fr]">
              <div className="md:sticky md:top-32 md:self-start">
                <h3 className="rise text-[clamp(34px,4vw,60px)] font-medium leading-[1] tracking-[-0.035em]">{st.flow.length} steps, <span className="serif" style={{ color: accent }}>start to finish.</span></h3>
                <p className="rise mt-5 max-w-[34ch] text-[16px] leading-relaxed text-fg/60">Follow the line. Each step hands its output to the next one.</p>
              </div>
              <ol className="flow relative">
                <span className="absolute bottom-6 left-[15px] top-6 w-px bg-fg/10" />
                <span className="flow-line absolute bottom-6 left-[15px] top-6 w-px origin-top" style={{ background: `linear-gradient(${accent}, ${accent}55)` }} />
                {st.flow.map((s, k) => (
                  <li key={s.title} className="flow-step relative grid grid-cols-[32px_1fr] gap-6 pb-12 last:pb-0">
                    <span className="flow-dot relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-fg/15 bg-[#d4d6da]">
                      <span className="mono text-[11px] font-semibold text-ink">{k + 1}</span>
                    </span>
                    <div className="rounded-2xl border border-fg/10 bg-fg/[0.025] p-6 transition-colors hover:border-fg/20">
                      <div className="text-[24px] font-medium tracking-[-0.01em]">{s.title}</div>
                      <p className="mt-2 text-[16px] leading-relaxed text-fg/70">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 04 stack, and why */}
          <section id="ch-stack" className="pt-32 md:pt-44">
            <ChapterHead n={4} label="The stack, and why" accent={accent} />
            <h3 className="rise max-w-[22ch] text-[clamp(34px,4vw,60px)] font-normal leading-[1] tracking-[-0.035em]">
              {p.stack.length} tools, <span className="serif" style={{ color: accent }}>each with a reason to be there.</span>
            </h3>
            <div className="mt-14 grid gap-12">
              {ROLE_ORDER.map((role) => {
                const items = (stackWhy[p.slug] ?? []).filter((x) => x.role === role);
                if (!items.length) return null;
                return (
                  <div key={role} className="grid gap-5 border-t border-fg/10 pt-6 md:grid-cols-[200px_1fr] md:gap-10">
                    <div className="label pt-1 text-fg/50">{role}</div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {items.map((x) => (
                        <li key={x.tool} className="rise group rounded-2xl border border-fg/10 bg-white/50 p-5 transition-colors duration-300 hover:border-[var(--acc)]" style={{ ["--acc" as string]: accent } as React.CSSProperties}>
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: accent }} />
                            <span className="text-[19px] tracking-[-0.01em]">{x.tool}</span>
                          </div>
                          <p className="mt-2 text-[15px] leading-relaxed text-fg/65">{x.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 05 built + captures */}
          <section id="ch-built" className="pt-32 md:pt-44">
            <ChapterHead n={5} label="What I built" accent={accent} />
            <ul className="grid gap-3 md:grid-cols-2">
              {p.built.map((b, k) => (
                <li key={k} className="rise flex gap-4 rounded-2xl border border-fg/10 bg-fg/[0.02] p-6 text-[16px] leading-relaxed text-fg/80">
                  <span className="mono tnum text-[12px]" style={{ color: accent }}>{String(k + 1).padStart(2, "0")}</span><span>{b}</span>
                </li>
              ))}
            </ul>
            {shots.length > 0 && (
              <div className="mt-24 grid gap-20">
                <div className="label text-fg/50">{shots[0].illus ? "Illustrated, because the real dashboards hold private data" : "Real captures from the running project"}</div>
                {shots.map((s, k) => (
                  <figure key={s.src ?? s.illus} className={k % 2 ? "md:pl-[8%]" : "md:pr-[8%]"}>
                    <div className="shot"><Frame p={p} shot={s} live /></div>
                    <figcaption className="mt-4 flex gap-3 text-[15px] leading-relaxed text-fg/65">
                      <span className="mono tnum text-[12px]" style={{ color: accent }}>{String(k + 1).padStart(2, "0")}</span>{s.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        </article>

        {/* 06 hard part, the page turns to the project colour here */}
        <section id="ch-hard" className="mt-32 py-32 md:mt-44 md:py-44" style={{ color: p.tone.fg }}>
          <div className="mx-auto max-w-[1200px] gutter">
            <ChapterHead n={6} label="The hard part" accent={accent} />
            <h3 className="rise max-w-[18ch] text-[clamp(40px,5.6vw,92px)] font-medium leading-[0.98] tracking-[-0.04em]">{p.hard.title}</h3>
            <p className="read mt-10 max-w-[46ch] text-[clamp(20px,1.9vw,27px)] leading-[1.4] opacity-90">{words(p.hard.body)}</p>
          </div>
        </section>

        <article className="mx-auto max-w-[1200px] gutter">
          {/* 07 results */}
          <section id="ch-results" className="pt-32 md:pt-44">
            <ChapterHead n={7} label="Results" accent={accent} />
            <div className={`grid gap-3 sm:grid-cols-2 ${p.results.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {p.results.map((r) => (
                <div key={r.label} className="rise min-w-0 rounded-2xl border border-fg/10 bg-fg/[0.02] p-7">
                  <div className="tnum text-[clamp(36px,3.8vw,58px)] font-medium leading-none tracking-[-0.03em]" style={{ color: accent }}><CountUp value={r.value} root={scroller} /></div>
                  <div className="mt-4 text-[15px] text-fg/85">{r.label}</div>
                  {r.note && <div className="mono mt-1 text-[12px] text-fg/45">{r.note}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* 08 limits + learned */}
          <section id="ch-stuck" className="pb-32 pt-32 md:pb-44 md:pt-44">
            <ChapterHead n={8} label="What stuck" accent={accent} />
            <p className="read max-w-[32ch] text-[clamp(26px,3vw,46px)] leading-[1.15] tracking-[-0.02em]">{words(st.learned)}</p>
            {p.limits && (
              <div className="rise mt-14 max-w-[720px] rounded-2xl border border-fg/10 p-6 md:p-8">
                <div className="label mb-3 text-fg/50">Limits, stated plainly</div>
                <p className="text-[16px] leading-relaxed text-fg/70">{p.limits}</p>
              </div>
            )}
            {p.links.length > 0 && (
              <div className="rise mt-10 flex flex-wrap gap-3">
                {p.links.map((l) => <Button key={l.href} asChild variant="outline" size="lg"><a href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowUpRight /></a></Button>)}
              </div>
            )}
          </section>
        </article>

        {/* next story */}
        <button onClick={goNext} className="group relative block w-full overflow-hidden border-t border-fg/10 text-left" style={{ ["--next-fg" as string]: next.tone.fg } as React.CSSProperties}>
          <div className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0" style={{ background: next.tone.bg }} />
          <div className="relative mx-auto flex max-w-[1200px] flex-col gap-6 gutter py-24 md:flex-row md:items-end md:justify-between md:py-32">
            <div>
              <div className="label mb-4 text-fg/50 group-hover:text-[var(--next-fg)]">Next story</div>
              <div className="text-[clamp(52px,9vw,140px)] font-medium leading-[0.9] tracking-[-0.05em] transition-colors duration-500 group-hover:text-[var(--next-fg)]">{next.title}</div>
              <div className="mt-4 max-w-[48ch] text-fg/60 transition-colors duration-500 group-hover:text-[var(--next-fg)]">{stories[next.slug]?.tagline}</div>
            </div>
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110" style={{ background: next.tone.accent, color: "#06070A" }}><ArrowRight className="h-7 w-7" /></span>
          </div>
        </button>
      </div>

      {/* curtain between stories */}
      <AnimatePresence>
        {curtain && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center" style={{ background: curtain.tone.bg }}
            initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-center">
              <div className="label mb-4" style={{ color: curtain.tone.accent }}>Next story</div>
              <div className="text-[clamp(48px,9vw,130px)] font-medium leading-none tracking-[-0.05em]" style={{ color: curtain.tone.fg }}>{curtain.title}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
