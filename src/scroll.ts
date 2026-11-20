import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// One smooth scroller for the whole page, shared by nav, hero and the work rail.
export const scroller = {
  lenis: null as Lenis | null,
  to(target: number | HTMLElement, duration = 1.4) {
    if (this.lenis) this.lenis.scrollTo(target, { duration });
    else typeof target === "number" ? scrollTo({ top: target, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" });
  },
};
export { gsap, ScrollTrigger };
