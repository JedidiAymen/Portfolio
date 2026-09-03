import { useRef } from "react"
import { Link } from "react-router"
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { Container } from "@/components/foundation/Container"
import { EngineeringDeck } from "@/components/portfolio/EngineeringDeck"
import { buttonVariants } from "@/components/ui/button-variants"

export function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      timeline
        .from("[data-hero-meta]", { opacity: 0, y: 10, duration: 0.45 })
        .from("[data-hero-line]", { opacity: 0, yPercent: 105, stagger: 0.09, duration: 0.82 }, "-=0.2")
        .from("[data-hero-copy]", { opacity: 0, y: 18, duration: 0.55 }, "-=0.38")
        .from("[data-engineering-deck]", { opacity: 0, y: 28, rotate: 1.5, duration: 0.7 }, "-=0.42")
        .from("[data-hero-foot]", { opacity: 0, duration: 0.4 }, "-=0.2")
    })
    return () => media.revert()
  }, { scope: root })

  return (
    <section ref={root} className="relative overflow-hidden pb-14 pt-28 medium:pb-20 medium:pt-32 wide:min-h-svh">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-16 size-[34rem] rounded-full bg-lime/10 blur-[150px]" />
      <Container visual className="relative">
        <div data-hero-meta className="flex items-center justify-between border-b border-line pb-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-muted">
          <span>Aymen Jedidi · ENSI</span>
          <span className="hidden compact:inline">Tunis, Tunisia</span>
          <span>Systems in motion</span>
        </div>

        <div className="grid items-center gap-16 py-12 medium:py-16 wide:grid-cols-12 wide:gap-8 wide:py-20">
          <div className="wide:col-span-7">
            <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-ink-muted">
              / Software engineering student · interface to infrastructure
            </p>
            <h1 className="max-w-[12ch] text-[clamp(3.35rem,7.4vw,7.6rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              <span className="block overflow-hidden"><span data-hero-line className="block">I build reliable</span></span>
              <span className="block overflow-hidden"><span data-hero-line className="block font-serif font-normal italic tracking-[-0.045em]">systems</span></span>
              <span className="block overflow-hidden"><span data-hero-line className="block">in motion.</span></span>
            </h1>

            <div data-hero-copy className="mt-8 max-w-[620px]">
              <p className="text-body-lg leading-[1.55] tracking-[-0.025em] text-ink-muted">
                Software engineer building reliable systems from interface to infrastructure—full-stack products, developer tooling, automation, and applied AI foundations.
              </p>
              <div className="mt-7 flex flex-col gap-3 compact:flex-row">
                <Link to="/work" className={buttonVariants({ variant: "ink", size: "lg" })}>
                  Explore selected work
                  <ArrowDownRightIcon data-icon="inline-end" />
                </Link>
                <Link to="/resume" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  View résumé
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Link>
              </div>
              <div className="mt-8 flex flex-col gap-2 border-l-2 border-lime pl-4 text-sm text-ink-muted compact:flex-row compact:items-center compact:gap-3">
                <span className="font-medium text-ink">Open to international internships</span>
                <span aria-hidden="true" className="hidden text-line compact:inline">/</span>
                <span>Relocation or remote</span>
              </div>
            </div>
          </div>

          <div data-engineering-deck className="mx-auto w-full wide:col-span-5 wide:ml-auto">
            <EngineeringDeck />
          </div>
        </div>

        <div data-hero-foot className="grid gap-3 border-t border-line pt-4 font-mono text-[0.63rem] uppercase tracking-[0.11em] text-ink-muted compact:grid-cols-3 compact:items-center">
          <span>01 / Product systems</span>
          <span className="compact:text-center">Build · analyze · automate · learn</span>
          <span className="flex items-center gap-2 compact:justify-end"><span className="signal-dot" aria-hidden="true" />Signal active</span>
        </div>
      </Container>
    </section>
  )
}
