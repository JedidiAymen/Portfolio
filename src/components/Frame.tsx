import type { Project } from "@/data";
import { cn } from "@/lib";
import type { Shot } from "@/stories";
import Cover from "./Covers";
import { CapexCity, CapexDecide, CapexMap } from "./SmartCapexArt";

const ILLUS = { "capex-city": CapexCity, "capex-map": CapexMap, "capex-decide": CapexDecide };
export type IllusKey = keyof typeof ILLUS;

/* A browser window around a real capture, an illustration, or the generated cover. */
export function Frame({ p, shot, className = "", live = false }: { p: Project; shot?: Shot; className?: string; live?: boolean }) {
  const Art = shot?.illus ? ILLUS[shot.illus] : null;
  return (
    <div className={cn("overflow-hidden rounded-xl border border-black/10 bg-[#0d0f15] shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)]", className)}>
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.04] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mono ml-3 truncate rounded-md bg-white/[0.06] px-3 py-0.5 text-[10.5px] text-white/50">{shot?.url ?? `${p.slug} · private`}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {Art ? <Art /> : shot?.video ? (
          <video src={shot.src} className="h-full w-full object-cover object-top" autoPlay={live} muted loop playsInline preload="metadata" />
        ) : shot?.src ? (
          <img src={shot.src} alt={shot.caption} loading="lazy" className="h-full w-full object-cover object-left-top" />
        ) : <Cover p={p} />}
      </div>
    </div>
  );
}
