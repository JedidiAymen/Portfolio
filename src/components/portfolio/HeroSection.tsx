import { useRef } from "react"
import { ArrowDownRightIcon } from "lucide-react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { Container } from "@/components/foundation/Container"
import { EngineeringDeck } from "@/components/portfolio/EngineeringDeck"
export function HeroSection() {
  const hero = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          })

          tl.from("[data-hero-meta]", {
            opacity: 0,
            y: 10,
            duration: 0.55,
          })

            .from(
              "[data-title-line]",
              {
                yPercent: 115,
                opacity: 0,
                stagger: 0.1,
                duration: 0.95,
              },
              "-=0.2",
            )

            .from(
              "[data-positioning]",
              {
                opacity: 0,
                y: 22,
                duration: 0.65,
              },
              "-=0.35",
            )

            .from(
              "[data-project-stack]",
              {
                opacity: 0,
                y: 65,
                rotate: 3,
                scale: 0.94,
                duration: 0.9,
              },
              "-=0.5",
            )

            .from(
              "[data-bottom-meta]",
              {
                opacity: 0,
                y: 12,
                duration: 0.5,
              },
              "-=0.25",
            )
        },
      )

      return () => mm.revert()
    },
    {
      scope: hero,
    },
  )

  return (
    <section
      ref={hero}
      className="
        relative
        min-h-svh
        overflow-hidden
        bg-canvas

        pt-28
        pb-8

        medium:pt-32
      "
    >
      <Container
        visual
        className="
          relative
          min-h-[calc(100svh-9rem)]
        "
      >
        {/* top metadata */}

        <div
          data-hero-meta
          className="
            flex
            items-center
            justify-between

            font-mono
            text-[10px]
            tracking-[0.08em]
            text-ink-muted
          "
        >
          <span>
            / SOFTWARE ENGINEERING
          </span>

          <span className="hidden medium:block">
            AYMEN JEDIDI · ENSI
          </span>

          <span>©2026</span>
        </div>

        {/* giant title */}

        <div
          className="
            mt-[11vh]

            wide:max-w-[72%]
          "
        >
          <h1
            className="
              text-[clamp(5.5rem,11.5vw,11rem)]
              font-medium

              leading-[0.76]
              tracking-[-0.09em]

              text-ink
            "
          >
            <span className="block overflow-hidden">
              <span
                data-title-line
                className="block"
              >
                SOFTWARE
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                data-title-line
                className="block"
              >
                ENGINEER
              </span>
            </span>
          </h1>

          <div
            data-positioning
            className="
              mt-8
              max-w-[520px]
            "
          >
            <p
              className="
                text-[clamp(1.15rem,1.55vw,1.45rem)]
                leading-[1.45]
                tracking-[-0.025em]
                text-ink-muted
              "
            >
              I build reliable systems from interface
              to infrastructure.
            </p>

            <div
              className="
    mt-5
    flex flex-wrap
    gap-x-3 gap-y-2

    font-mono
    text-[9px]
    tracking-[0.1em]
    text-ink-muted
  "
            >
              <span>/ FULL-STACK</span>
              <span>·</span>

              <span>SYSTEM DESIGN</span>
              <span>·</span>

              <span>INFRASTRUCTURE</span>
              <span>·</span>

              <span>APPLIED AI / ML</span>
            </div>            <a
              href="#selected-work"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-3

                text-sm
                font-medium
                tracking-[-0.02em]
              "
            >
              VIEW SELECTED WORK

              <ArrowDownRightIcon
                className="
                  size-4
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                  group-hover:translate-y-1
                "
              />
            </a>
          </div>
        </div>

        {/* kinetic work stack */}

        <div
          data-project-stack
          className="
            mt-20
            flex justify-center

            wide:absolute
            wide:right-[7%]
            wide:top-[49%]
            wide:mt-0
            wide:-translate-y-1/2
          "
        >
          <EngineeringDeck />
        </div>

        {/* bottom metadata */}

        <div
          data-bottom-meta
          className="
            mt-24

            flex
            flex-col
            gap-3

            border-t
            border-line

            pt-4

            font-mono
            text-[9px]
            tracking-[0.1em]
            text-ink-muted

            medium:flex-row
            medium:items-center
            medium:justify-between

            wide:absolute
            wide:bottom-0
            wide:left-0
            wide:right-0
            wide:mt-0
          "
        >
          <span>
            TUNIS, TN
          </span>

          <span>
            / ARCHITECT · BUILD · AUTOMATE · LEARN
          </span>

          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime" />

            OPEN TO INTERNATIONAL INTERNSHIPS
          </span>
        </div>
      </Container>
    </section>
  )
}
