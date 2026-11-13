import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

type RBProps = { children: ReactNode; onClick?: () => void; href?: string; size?: number; bg?: string; fg?: string; fill?: string; fillText?: string; label?: string };
export function RoundButton({ children, onClick, href, size = 160, bg = "var(--ink)", fg = "var(--paper)", fill = "var(--lime)", fillText = "var(--ink)", label }: RBProps) {
  const style = { width: size, height: size, background: bg, color: fg, ["--fill" as string]: fill, ["--fill-text" as string]: fillText } as React.CSSProperties;
  const cls = "fill-btn flex items-center justify-center rounded-full text-center text-[15px] font-medium";
  return (
    <Magnetic strength={0.4}>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} style={style} aria-label={label}><span>{children}</span></a>
      ) : (
        <button type="button" onClick={onClick} className={cls} style={style} aria-label={label}><span>{children}</span></button>
      )}
    </Magnetic>
  );
}

export function Pill({ children, onClick, href, dark = false }: { children: ReactNode; onClick?: () => void; href?: string; dark?: boolean }) {
  const cls = `fill-btn inline-flex items-center gap-2 rounded-full border px-6 py-4 text-[15px] ${dark ? "border-white/20 text-[var(--paper)]" : "border-[var(--line)]"}`;
  const style = { ["--fill" as string]: dark ? "var(--lime)" : "var(--ink)", ["--fill-text" as string]: dark ? "var(--ink)" : "var(--paper)" } as React.CSSProperties;
  return (
    <Magnetic strength={0.25}>
      {href ? <a className={cls} style={style} href={href} target="_blank" rel="noreferrer"><span>{children}</span></a>
        : <button type="button" className={cls} style={style} onClick={onClick}><span>{children}</span></button>}
    </Magnetic>
  );
}
