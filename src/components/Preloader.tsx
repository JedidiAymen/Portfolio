import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "../lib";

const WORDS = ["Hello", "Bonjour", "مرحبا", "Ciao", "Hola", "こんにちは", "Lights out"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [h, setH] = useState(800);
  useEffect(() => { setH(window.innerHeight); }, []);
  useEffect(() => {
    if (i === WORDS.length - 1) { const t = setTimeout(onDone, 700); return () => clearTimeout(t); }
    const t = setTimeout(() => setI(i + 1), i === 0 ? 650 : 170);
    return () => clearTimeout(t);
  }, [i, onDone]);
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
  const curve = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 260} 0 ${h} L0 0`;
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ color: "var(--paper)" }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease, delay: 0.1 } }}>
      <svg className="absolute left-0 top-0 h-[calc(100%+300px)] w-full" aria-hidden="true">
        <motion.path fill="var(--ink)" initial={{ d: flat }} animate={{ d: flat }} exit={{ d: curve, transition: { duration: 0.8, ease } }} />
      </svg>
      <motion.p key={i} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="relative z-10 flex items-center gap-3 text-[clamp(36px,6vw,64px)] font-medium">
        <span className="h-3 w-3 rounded-full" style={{ background: i === WORDS.length - 1 ? "var(--kerb)" : "var(--lime)" }} />
        {WORDS[i]}
      </motion.p>
    </motion.div>
  );
}
