import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { store } from "../lib";

export const EGGS = [
  { id: "lights", hint: "The © in the corner hates being clicked five times. Or type “lights”." },
  { id: "box", hint: "Pit walls talk on the radio. Type “box”." },
  { id: "drs", hint: "Up, up, down, down… or just “drs”." },
  { id: "bounty", hint: "Every pirate has a poster. The straw hat below knows. Or type “luffy”." },
  { id: "gomu", hint: "Some names stretch. Type “gomu”." },
  { id: "lime", hint: "Something small and green runs in the background. Type its name." },
] as const;
export type EggId = (typeof EGGS)[number]["id"];

type Toast = { id: number; title: string; body?: string; tone?: "radio" | "lime" | "plain" };

type Ctx = {
  found: EggId[];
  active: Partial<Record<EggId, boolean>>;
  trigger: (id: EggId) => void;
  close: (id: EggId) => void;
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">, ms?: number) => void;
};

const EggCtx = createContext<Ctx | null>(null);
export const useEggs = () => useContext(EggCtx)!;

const SEQUENCES: [string, EggId][] = [
  ["lights", "lights"],
  ["box", "box"],
  ["drs", "drs"],
  ["luffy", "bounty"],
  ["wanted", "bounty"],
  ["gomu", "gomu"],
  ["laymouna", "lime"],
];
const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

export function EggProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<EggId[]>(() => store.get<EggId[]>("aj-eggs", []));
  const [active, setActive] = useState<Partial<Record<EggId, boolean>>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<number[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">, ms = 4200) => {
    const id = Date.now() + Math.random();
    setToasts((x) => [...x.slice(-2), { ...t, id }]);
    timers.current.push(window.setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), ms));
  }, []);

  const trigger = useCallback(
    (id: EggId) => {
      setActive((a) => ({ ...a, [id]: true }));
      setFound((f) => {
        if (f.includes(id)) return f;
        const next = [...f, id];
        store.set("aj-eggs", next);
        window.setTimeout(
          () =>
            toast(
              { title: `Easter egg ${next.length}/${EGGS.length} found`, body: next.length === EGGS.length ? "All of them. You're nakama now." : undefined, tone: "plain" },
              3000,
            ),
          1600,
        );
        return next;
      });
    },
    [toast],
  );
  const close = useCallback((id: EggId) => setActive((a) => ({ ...a, [id]: false })), []);

  // global typed-sequence listener
  useEffect(() => {
    let buf = "";
    let keys: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      keys = [...keys, k].slice(-KONAMI.length);
      if (keys.join() === KONAMI.join()) { trigger("drs"); keys = []; }
      if (k.length !== 1) return;
      buf = (buf + k).slice(-12);
      for (const [seq, id] of SEQUENCES) {
        if (buf.endsWith(seq)) { trigger(id); buf = ""; break; }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  useEffect(() => {
    console.log(
      "%c AJ %c Hey, you opened the console. Respect.",
      "background:#C7F464;color:#141619;font-weight:700;padding:4px 6px;border-radius:4px",
      "color:inherit",
    );
    console.log("There are 6 easter eggs on this site. Try typing: lights · box · drs · luffy · gomu · and the name of a small green process.");
    const ts = timers.current;
    return () => ts.forEach(clearTimeout);
  }, []);

  return <EggCtx.Provider value={{ found, active, trigger, close, toasts, toast }}>{children}</EggCtx.Provider>;
}
