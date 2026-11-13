import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { awards, capabilities, experience, profile } from "../data";
import { EGGS, useEggs } from "../eggs/EggContext";
import { StrawHat } from "../eggs/Eggs";
import { ease } from "../lib";
import { Pill, RoundButton } from "./Magnetic";

const reveal = { initial: { y: 36 }, whileInView: { y: 0 }, viewport: { once: true, margin: "-8%" }, transition: { duration: 0.8, ease } } as const;

export default function About() {
  return (
    <section id="about" className="gutter py-24 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="label mb-10 text-[var(--mist)]">About</div>
        <motion.h2 {...reveal} className="max-w-[18ch] text-[clamp(40px,6.2vw,92px)] font-normal leading-[1.0] tracking-[-0.035em]">
          Under every abstraction, there's a reason it works. I like finding it.
        </motion.h2>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <motion.div {...reveal} className="space-y-5 text-[17px] leading-relaxed text-[var(--ink)]/80">
            <p>
              I'm {profile.first}, a final-year computer science engineering student at ENSI in Tunisia. I build software end to end: data pipelines, ML models, LLM agents, APIs, and the interface someone ends up clicking.
            </p>
            <p>
              What I care about most is evidence. A forecast should beat a simple baseline before it ships. An agent should be attacked before it gets real tools. A validation score that looks too good probably has a leak. My projects keep their failures visible, because that's where I learn the most.
            </p>
            <p>
              Away from the keyboard I'm usually watching a race with the timing screen open, reading <em>Designing Data-Intensive Applications</em>, or waiting for the next One Piece chapter. I work on Arch Linux with Hyprland and Neovim.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)]">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-[var(--paper)] p-7">
                <h3 className="text-[24px] font-normal tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink)]/70">{c.body}</p>
                <div className="mono mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[var(--mist)]">{c.tools.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <div className="label mb-6 text-[var(--mist)]">Experience</div>
            <ol className="border-b border-[var(--line)]">
              {experience.map((e) => (
                <motion.li {...reveal} key={e.title} className="grid gap-2 border-t border-[var(--line)] py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <span className="mono tnum pt-1 text-[12px] text-[var(--mist)]">{e.when}</span>
                  <div className="min-w-0">
                    <div className="text-[19px]">{e.title} <span className="text-[var(--mist)]">· {e.where}</span></div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--ink)]/70">{e.what}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
          <div>
            <div className="label mb-6 text-[var(--mist)]">Podiums & results</div>
            <ul className="border-b border-[var(--line)]">
              {awards.map((a) => (
                <motion.li {...reveal} key={a.what} className="grid grid-cols-[110px_1fr] items-baseline gap-6 border-t border-[var(--line)] py-6">
                  <span className="tnum text-[28px] leading-none tracking-[-0.02em]">{a.place}</span>
                  <div className="min-w-0"><div className="text-[17px]">{a.what}</div><div className="text-[14px] text-[var(--mist)]">{a.detail}</div></div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 text-[15px] text-[var(--ink)]/70">Languages: Arabic (native), French (fluent), English (fluent).</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => {
      const d = new Date();
      const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Tunis" }).format(d);
      const day = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "Africa/Tunis" }).format(d);
      setT(`${time} GMT+1${day === "Sunday" ? " · race day" : ""}`);
    };
    f(); const id = setInterval(f, 15000); return () => clearInterval(id);
  }, []);
  return <span className="tnum">{t}</span>;
}

export function Footer() {
  const { found, trigger } = useEggs();
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const curve = useTransform(scrollYProgress, [0, 0.9], [120, 0]);
  const btnX = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    navigator.clipboard?.writeText(profile.email).then(done).catch(() => {
      const r = document.createRange(); const el = document.getElementById("email-text");
      if (el) { r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); }
    });
  };

  return (
    <div ref={ref} id="contact" className="relative" style={{ overflowX: "clip" }}>
      <motion.div className="relative z-10 h-0" aria-hidden="true">
        <motion.div className="absolute left-[-10%] w-[120%] rounded-b-[50%]" style={{ height: curve, background: "var(--paper)", boxShadow: "0 40px 60px rgba(0,0,0,.08)" }} />
      </motion.div>
      <footer className="gutter pb-[calc(28px+env(safe-area-inset-bottom,0px))] pt-40" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-center gap-5">
            <div className="flex h-[clamp(64px,7vw,100px)] w-[clamp(64px,7vw,100px)] shrink-0 items-center justify-center overflow-hidden rounded-full text-[clamp(22px,2.4vw,32px)] font-medium" style={{ background: "var(--lime)", color: "var(--ink)" }}>
              {profile.photo ? <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" /> : "AJ"}
            </div>
            <h2 className="text-[clamp(44px,7.4vw,108px)] font-normal leading-[1] tracking-[-0.04em]">Let's work<br />together</h2>
          </div>

          <div className="relative mt-20 border-t border-white/15">
            <motion.div style={{ x: btnX }} className="absolute right-[4%] top-0 hidden -translate-y-1/2 md:block">
              <RoundButton href={`mailto:${profile.email}`} size={180} bg="var(--lime)" fg="var(--ink)" fill="var(--paper)" label="Email Aymen">Get in touch</RoundButton>
            </motion.div>
          </div>

          <div className="mt-10 md:hidden"><RoundButton href={`mailto:${profile.email}`} size={150} bg="var(--lime)" fg="var(--ink)" fill="var(--paper)" label="Email Aymen">Get in touch</RoundButton></div>
          <div className="mt-10 flex flex-wrap gap-3 md:mt-28">
            <Pill dark onClick={copy}><span id="email-text">{copied ? "Copied to clipboard" : profile.email}</span></Pill>
            <Pill dark href={profile.github}>GitHub ↗</Pill>
          </div>
          <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-white/60">{profile.status}</p>

          <div className="mt-24 flex flex-wrap items-end justify-between gap-8 text-[14px]">
            <div className="flex flex-wrap gap-10">
              <div><div className="label mb-2 text-white/40">Version</div>2026 © Edition</div>
              <div><div className="label mb-2 text-white/40">Local time</div><Clock /></div>
            </div>
            <div className="relative flex items-end gap-6">
              <button onClick={() => trigger("bounty")} className="transition-transform hover:-rotate-12 hover:scale-110" aria-label="A straw hat. Click it.">
                <StrawHat size={44} />
              </button>
              <button onClick={() => setHint((h) => !h)} className="text-left" aria-expanded={hint}>
                <div className="label mb-2 text-white/40">Easter eggs</div>
                <span className="tnum">{found.length} / {EGGS.length} found</span>
              </button>
              {hint && (
                <div className="absolute bottom-full right-0 mb-4 w-[min(340px,80vw)] rounded-xl p-5 text-[13px] leading-relaxed shadow-2xl" style={{ background: "var(--graphite)" }}>
                  <div className="label mb-3 text-white/40">Hints, for racers and pirates</div>
                  <ul className="space-y-2">
                    {EGGS.map((e) => (
                      <li key={e.id} className="flex gap-3"><span style={{ color: found.includes(e.id) ? "var(--lime)" : "rgba(255,255,255,.3)" }}>{found.includes(e.id) ? "●" : "○"}</span><span className="text-white/75">{e.hint}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--lime)]">GitHub</a>
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--lime)]">LinkedIn</a>}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
