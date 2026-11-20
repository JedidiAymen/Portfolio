import { AnimatePresence, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import About, { Footer } from "./components/About";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import ProjectPage from "./components/ProjectPage";
import Work, { Intro, SlidingRows } from "./components/Work";
import { projects } from "./data";
import { EggProvider } from "./eggs/EggContext";
import Eggs from "./eggs/Eggs";
import { reduced } from "./lib";

const slugFromHash = () => {
  const h = location.hash.replace("#", "");
  return h.startsWith("work-") && projects.some((p) => p.slug === h.slice(5)) ? h.slice(5) : null;
};

function Site() {
  const [loading, setLoading] = useState(() => {
    try { return !sessionStorage.getItem("aj-seen") && !reduced(); } catch { return !reduced(); }
  });
  const [slug, setSlug] = useState<string | null>(slugFromHash);
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced()) return;
    const l = new Lenis({ lerp: 0.1 });
    lenis.current = l;
    let raf = 0;
    const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);

  useEffect(() => {
    if (slug || loading) lenis.current?.stop(); else lenis.current?.start();
    document.documentElement.style.overflow = slug ? "hidden" : "";
  }, [slug, loading]);

  useEffect(() => {
    const on = () => setSlug(slugFromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const open = useCallback((s: string) => { history.replaceState(null, "", `#work-${s}`); setSlug(s); }, []);
  const close = useCallback(() => { history.replaceState(null, "", location.pathname + location.search); setSlug(null); }, []);
  const go = useCallback((id: string) => {
    const el = id === "top" ? document.body : document.getElementById(id);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(id === "top" ? 0 : el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);
  const done = useCallback(() => { try { sessionStorage.setItem("aj-seen", "1"); } catch { /* blocked */ } setLoading(false); }, []);

  const rowsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowsRef, offset: ["start end", "end start"] });
  const r1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const r2 = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Nav go={go} />
      <main>
        <Hero ready={!loading} />
        <Intro go={go} />
        <Work open={open} />
        <About />
        <div ref={rowsRef}><SlidingRows open={open} progress={{ r1, r2 }} /></div>
      </main>
      <Footer />
      <AnimatePresence>{slug && <ProjectPage key="case" slug={slug} onClose={close} onOpen={open} />}</AnimatePresence>
      <Eggs />
    </>
  );
}

export default function App() {
  return <EggProvider><Site /></EggProvider>;
}
