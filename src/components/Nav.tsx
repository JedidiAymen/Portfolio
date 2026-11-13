import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { useEggs } from "../eggs/EggContext";
import { ease } from "../lib";
import Magnetic from "./Magnetic";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ go }: { go: (id: string) => void }) {
  const { trigger } = useEggs();
  const clicks = useRef<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { if (!scrolled) setOpen(false); }, [scrolled]);

  const logo = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2200), now];
    if (clicks.current.length >= 5) { clicks.current = []; trigger("lights"); }
    else go("top");
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between gutter pt-[calc(28px+env(safe-area-inset-top,0px))] text-[var(--paper)]">
        <button onClick={logo} className="group flex items-center gap-1 text-[15px]" aria-label="Back to top">
          <span className="transition-transform duration-500 group-hover:rotate-[360deg]">©</span>
          <span className="relative ml-1 block h-[1.35em] overflow-hidden whitespace-nowrap leading-[1.35em]">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full">Built by {profile.first}</span>
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full">{profile.name}</span>
          </span>
        </button>
        <nav className="hidden items-center gap-2 sm:flex">
          {LINKS.map((l) => (
            <Magnetic key={l.id} strength={0.3}>
              <button onClick={() => go(l.id)} className="group relative flex flex-col items-center px-4 py-2 text-[15px]">
                {l.label}
                <span className="absolute bottom-0 h-[5px] w-[5px] scale-0 rounded-full bg-current transition-transform duration-300 group-hover:scale-100" />
              </button>
            </Magnetic>
          ))}
        </nav>
        <button onClick={() => setOpen(true)} className="text-[15px] sm:hidden">Menu</button>
      </header>

      <AnimatePresence>
        {(scrolled || open) && (
          <motion.div className="fixed z-[60]" style={{ right: "max(16px, env(safe-area-inset-right, 0px), 3vw)", top: "calc(20px + env(safe-area-inset-top, 0px))" }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.35, ease }}>
            <Magnetic strength={0.4}>
              <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-16 w-16 flex-col items-center justify-center gap-[7px] rounded-full shadow-xl sm:h-20 sm:w-20"
                style={{ background: open ? "var(--lime)" : "var(--ink)" }}>
                <span className="block h-[1.5px] w-6 transition-transform duration-300" style={{ background: open ? "var(--ink)" : "var(--paper)", transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
                <span className="block h-[1.5px] w-6 transition-transform duration-300" style={{ background: open ? "var(--ink)" : "var(--paper)", transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[55] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed bottom-0 right-0 top-0 z-[58] flex w-full max-w-[460px] flex-col justify-between overflow-y-auto pb-10 pt-[calc(120px+env(safe-area-inset-top,0px))]"
              style={{ background: "var(--graphite)", color: "var(--paper)", paddingLeft: "max(32px, 6vw)", paddingRight: "max(32px, env(safe-area-inset-right, 0px))" }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.7, ease }}>
              <div>
                <div className="label mb-8 border-b border-white/15 pb-6 text-white/50">Navigation</div>
                <ul className="flex flex-col gap-2">
                  {[{ id: "top", label: "Home" }, ...LINKS].map((l, i) => (
                    <motion.li key={l.id} initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease }}>
                      <button onClick={() => { setOpen(false); go(l.id); }} className="group flex items-center gap-4 text-[clamp(44px,6vw,64px)] font-normal leading-tight">
                        <span className="h-2.5 w-2.5 scale-0 rounded-full transition-transform group-hover:scale-100" style={{ background: "var(--lime)" }} />
                        {l.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <div className="label mb-4 text-white/50">Socials</div>
                <div className="flex flex-wrap gap-6 text-[15px]">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--lime)]">GitHub</a>
                  {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--lime)]">LinkedIn</a>}
                  <span className="select-all text-white/70">{profile.email}</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
