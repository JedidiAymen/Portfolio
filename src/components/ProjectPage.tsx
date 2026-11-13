import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects } from "../data";
import { ease } from "../lib";
import Cover from "./Covers";
import Magnetic, { Pill, RoundButton } from "./Magnetic";

const reveal = { initial: { y: 40 }, whileInView: { y: 0 }, viewport: { once: true, margin: "-8%" }, transition: { duration: 0.8, ease } } as const;

export default function ProjectPage({ slug, onClose, onOpen }: { slug: string; onClose: () => void; onOpen: (s: string) => void }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [slug]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  if (!p) return null;

  return (
    <motion.div
      ref={scroller}
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.9, ease }}
      role="dialog" aria-label={`${p.title} case study`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gutter py-5 pt-[calc(20px+env(safe-area-inset-top,0px))]" style={{ background: "linear-gradient(var(--paper) 60%, transparent)" }}>
        <Magnetic strength={0.3}>
          <button onClick={onClose} className="group flex items-center gap-3 text-[15px]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] transition-colors group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]">←</span>
            All work
          </button>
        </Magnetic>
        <span className="label text-[var(--mist)] tnum">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>

      <header className="gutter pb-14 pt-10 md:pt-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...reveal} className="flex flex-wrap items-center gap-3">
            <span className="label text-[var(--mist)]">{p.kind}</span>
            {p.award && <span className="label rounded-full px-3 py-1.5" style={{ background: "var(--lime)" }}>{p.award} · {p.context}</span>}
          </motion.div>
          <motion.h2 {...reveal} className="mt-6 text-[clamp(56px,11vw,168px)] font-normal leading-[0.92] tracking-[-0.045em]">{p.title}</motion.h2>
          <motion.p {...reveal} className="mt-10 max-w-[48ch] text-[clamp(20px,2.1vw,28px)] leading-[1.35]">{p.lead}</motion.p>
          <motion.dl {...reveal} className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--line)] pt-8 md:grid-cols-4">
            {[["Role", p.role], ["Context", p.context], ["Year", p.year]].map(([k, v]) => (
              <div key={k} className="min-w-0"><dt className="label mb-2 text-[var(--mist)]">{k}</dt><dd className="text-[15px] leading-snug">{v}</dd></div>
            ))}
            <div className="col-span-2 min-w-0 md:col-span-1"><dt className="label mb-2 text-[var(--mist)]">Stack</dt><dd className="text-[15px] leading-snug">{p.stack.join(", ")}</dd></div>
          </motion.dl>
        </div>
      </header>

      <div className="gutter">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease }}
          className="mx-auto aspect-[16/10] max-w-[1400px] overflow-hidden rounded-lg md:aspect-[16/8]">
          <Cover p={p} />
        </motion.div>
      </div>

      <article className="gutter py-24 md:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-20">
          <Section label="The problem"><p className="text-[clamp(22px,2.4vw,32px)] leading-[1.3]">{p.problem}</p></Section>

          <Section label="What I built">
            <ul className="grid gap-0">
              {p.built.map((b, k) => (
                <motion.li key={k} {...reveal} transition={{ ...reveal.transition, delay: k * 0.04 }}
                  className="grid grid-cols-[28px_1fr] gap-4 border-t border-[var(--line)] py-5 text-[17px] leading-relaxed">
                  <span className="mt-[9px] h-2 w-2 rounded-full" style={{ background: p.tone.accent === "#F4F4F0" ? p.tone.bg : p.tone.accent }} />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </Section>

          <motion.div {...reveal} className="rounded-xl p-8 md:p-12" style={{ background: p.tone.bg, color: p.tone.fg }}>
            <div className="label mb-4 opacity-60">The hard part</div>
            <h3 className="text-[clamp(28px,3.4vw,48px)] font-normal leading-[1.08] tracking-[-0.02em]">{p.hard.title}</h3>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed opacity-85">{p.hard.body}</p>
          </motion.div>

          <Section label="Results">
            <div className={`grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 ${p.results.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {p.results.map((r) => (
                <div key={r.label} className="min-w-0 bg-[var(--paper)] p-7">
                  <div className="tnum text-[clamp(34px,3.6vw,52px)] font-normal leading-none tracking-[-0.03em]">{r.value}</div>
                  <div className="mt-4 text-[15px]">{r.label}</div>
                  {r.note && <div className="mono mt-1 text-[12px] text-[var(--mist)]">{r.note}</div>}
                </div>
              ))}
            </div>
          </Section>

          {p.limits && (
            <Section label="Limits, stated plainly">
              <p className="max-w-[62ch] border-l-2 pl-6 text-[17px] leading-relaxed text-[var(--ink)]/80" style={{ borderColor: "var(--ink)" }}>{p.limits}</p>
            </Section>
          )}

          {p.links.length > 0 && (
            <div className="flex flex-wrap gap-3">{p.links.map((l) => <Pill key={l.href} href={l.href}>{l.label} ↗</Pill>)}</div>
          )}
        </div>
      </article>

      <footer className="gutter pb-[calc(80px+env(safe-area-inset-bottom,0px))] pt-20" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label mb-4 text-white/50">Next case</div>
            <button onClick={() => onOpen(next.slug)} className="text-left text-[clamp(48px,8vw,120px)] leading-[0.95] tracking-[-0.04em] transition-colors hover:text-[var(--lime)]">{next.title}</button>
            <div className="mt-3 text-white/50">{next.kind}</div>
          </div>
          <RoundButton onClick={() => onOpen(next.slug)} bg="var(--lime)" fg="var(--ink)" fill="var(--paper)">Next →</RoundButton>
        </div>
      </footer>
    </motion.div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
      <div className="label pt-2 text-[var(--mist)]">{label}</div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
