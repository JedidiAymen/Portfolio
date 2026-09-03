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

          /*
           * ----------------------------------------------------------
           * PAGE ENTRANCE
           * ----------------------------------------------------------
           */

          tl.from("[data-hero-meta]", {
            opacity: 0,
            y: 10,
            duration: 0.5,
          })

            .from(
              "[data-hero-title-line]",
              {
                yPercent: 120,
                opacity: 0,
                stagger: 0.1,
                duration: 0.95,
              },
              "-=0.15",
            )

            .from(
              "[data-hero-support]",
              {
                opacity: 0,
                y: 22,
                duration: 0.65,
              },
              "-=0.38",
            )

            /*
             * Systems in Motion field
             */

            .from(
              "[data-signal-horizontal]",
              {
                scaleX: 0,
                opacity: 0,
                transformOrigin: "left center",
                stagger: 0.08,
                duration: 0.75,
              },
              "-=0.45",
            )

            .from(
              "[data-signal-vertical]",
              {
                scaleY: 0,
                opacity: 0,
                transformOrigin: "top center",
                duration: 0.75,
              },
              "<",
            )

            .from(
              "[data-signal-node]",
              {
                scale: 0,
                opacity: 0,
                stagger: 0.055,
                duration: 0.35,
              },
              "-=0.3",
            )

            /*
             * Engineering deck
             */

            .from(
              "[data-engineering-deck]",
              {
                opacity: 0,
                y: 65,
                rotate: 3,
                scale: 0.94,
                duration: 0.9,
              },
              "-=0.45",
            )

            .from(
              "[data-hero-bottom]",
              {
                opacity: 0,
                y: 12,
                duration: 0.5,
              },
              "-=0.3",
            )

          /*
           * ----------------------------------------------------------
           * AMBIENT SIGNAL
           *
           * GSAP owns this hero-only information flow.
           * EngineeringDeck keeps its own Motion interactions.
           * ----------------------------------------------------------
           */

          gsap.set("[data-hero-packet]", {
            x: 0,
            y: 0,
            opacity: 1,
          })

          const signal = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.5,
          })

          signal
            .to("[data-hero-packet]", {
              x: 135,
              duration: 0.9,
              ease: "power2.inOut",
            })
            .to("[data-hero-packet]", {
              x: 240,
              y: 70,
              duration: 0.75,
              ease: "power2.inOut",
            })
            .to("[data-hero-packet]", {
              x: 330,
              y: 70,
              duration: 0.7,
              ease: "power2.inOut",
            })
            .to("[data-hero-packet]", {
              opacity: 0,
              duration: 0.2,
            })
            .set("[data-hero-packet]", {
              x: 0,
              y: 0,
            })
            .to("[data-hero-packet]", {
              opacity: 1,
              duration: 0.15,
            })
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

        pb-8
        pt-28

        medium:pt-32
      "
    >
      {/* ============================================================
          VERY SUBTLE AMBIENT LIME
          ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[-8rem]
          top-[18%]

          size-[34rem]

          rounded-full

          bg-lime/10

          blur-[150px]
        "
      />

      <Container
        visual
        className="
          relative

          min-h-[calc(100svh-9rem)]
        "
      >
        {/* ==========================================================
            TOP META
            ========================================================== */}

        <div
          data-hero-meta
          className="
            relative
            z-20

            flex
            items-center
            justify-between

            font-mono
            text-[9px]
            tracking-[0.1em]

            text-ink-muted
          "
        >
          <span>
            / SOFTWARE ENGINEERING
          </span>

          <span className="hidden medium:block">
            AYMEN JEDIDI · ENSI
          </span>

          <span>
            ©2026
          </span>
        </div>

        {/* ==========================================================
            SYSTEMS-IN-MOTION BACKGROUND FIELD

            Not a literal diagram.
            This is visual grammar behind the deck.
            ========================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute

            right-[1%]
            top-[18%]

            hidden

            h-[610px]
            w-[600px]

            wide:block
          "
        >
          {/* ----------------------------------------
              rails
              ---------------------------------------- */}

          <span
            data-signal-horizontal
            className="
              absolute

              left-[4%]
              right-[5%]
              top-[22%]

              h-px

              bg-line
            "
          />

          <span
            data-signal-horizontal
            className="
              absolute

              left-[19%]
              right-[2%]
              top-[48%]

              h-px

              bg-line
            "
          />

          <span
            data-signal-horizontal
            className="
              absolute

              left-[7%]
              right-[19%]
              top-[75%]

              h-px

              bg-line
            "
          />

          <span
            data-signal-vertical
            className="
              absolute

              bottom-[10%]
              left-[44%]
              top-[10%]

              w-px

              bg-line
            "
          />

          {/* ----------------------------------------
              nodes
              ---------------------------------------- */}

          <SignalNode
            className="
              left-[20%]
              top-[21.4%]
            "
          />

          <SignalNode
            active
            className="
              left-[43.5%]
              top-[21.4%]
            "
          />

          <SignalNode
            className="
              right-[12%]
              top-[21.4%]
            "
          />

          <SignalNode
            className="
              left-[43.5%]
              top-[47.4%]
            "
          />

          <SignalNode
            className="
              right-[21%]
              top-[47.4%]
            "
          />

          <SignalNode
            active
            className="
              left-[43.5%]
              top-[74.4%]
            "
          />

          <SignalNode
            className="
              left-[18%]
              top-[74.4%]
            "
          />

          {/* ----------------------------------------
              tiny labels
              ---------------------------------------- */}

          <SignalLabel
            className="
              left-[7%]
              top-[17%]
            "
          >
            UI
          </SignalLabel>

          <SignalLabel
            className="
              left-[47%]
              top-[43%]
            "
          >
            APPLICATION
          </SignalLabel>

          <SignalLabel
            className="
              right-[6%]
              top-[43%]
            "
          >
            INTELLIGENCE
          </SignalLabel>

          <SignalLabel
            className="
              left-[47%]
              top-[78%]
            "
          >
            INFRA
          </SignalLabel>

          {/* ----------------------------------------
              travelling packet
              ---------------------------------------- */}

          <span
            data-hero-packet
            className="
              absolute

              left-[20%]
              top-[21.4%]

              z-30

              size-2.5

              rounded-full

              bg-lime

              shadow-[0_0_0_6px_rgb(184_240_74_/_0.15)]
            "
          />

          {/* ----------------------------------------
              system metadata
              ---------------------------------------- */}

          <div
            className="
              absolute

              bottom-[3%]
              right-[4%]

              font-mono
              text-[7px]
              tracking-[0.14em]

              text-ink-muted/50
            "
          >
            SYS / SIGNAL FLOW / 01
          </div>
        </div>

        {/* ==========================================================
            GIANT POSITIONING
            ========================================================== */}

        <div
          className="
            relative
            z-10

            mt-[10vh]

            wide:mt-[9vh]
            wide:max-w-[72%]
          "
        >
          <h1
            className="
              text-[clamp(5rem,11vw,10.8rem)]

              font-medium

              leading-[0.76]

              tracking-[-0.09em]

              text-ink
            "
          >
            <span className="block overflow-hidden">
              <span
                data-hero-title-line
                className="block"
              >
                SOFTWARE
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                data-hero-title-line
                className="block"
              >
                ENGINEER
              </span>
            </span>
          </h1>

          {/* ========================================================
              SUPPORTING POSITIONING
              ======================================================== */}

          <div
            data-hero-support
            className="
              mt-8

              max-w-[560px]
            "
          >
            <p
              className="
                text-[clamp(1.08rem,1.5vw,1.4rem)]

                leading-[1.48]

                tracking-[-0.025em]

                text-ink-muted
              "
            >
              I build reliable systems from interface to
              infrastructure, with a growing focus on system
              design and applied AI / ML.
            </p>

            {/* ------------------------------------------------------
                capability metadata
                ------------------------------------------------------ */}

            <div
              className="
                mt-5

                flex
                flex-wrap

                gap-x-3
                gap-y-2

                font-mono
                text-[8px]
                tracking-[0.11em]

                text-ink-muted
              "
            >
              <span>
                / FULL-STACK
              </span>

              <span className="text-lime">
                ●
              </span>

              <span>
                SYSTEM DESIGN
              </span>

              <span className="text-lime">
                ●
              </span>

              <span>
                INFRASTRUCTURE
              </span>

              <span className="text-lime">
                ●
              </span>

              <span>
                APPLIED AI / ML
              </span>
            </div>

            {/* ------------------------------------------------------
                editorial CTA
                ------------------------------------------------------ */}

            <a
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

                text-ink
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

        {/* ==========================================================
            ENGINEERING DECK
            ========================================================== */}

        <div
          data-engineering-deck
          className="
            relative
            z-20

            mt-16

            flex
            justify-center

            medium:mt-20

            wide:absolute
            wide:right-[4%]
            wide:top-[52%]
            wide:mt-0
            wide:-translate-y-1/2
          "
        >
          <EngineeringDeck />
        </div>

        {/* ==========================================================
            BOTTOM IDENTITY BAR
            ========================================================== */}

        <div
          data-hero-bottom
          className="
            relative
            z-20

            mt-20

            flex
            flex-col

            gap-3

            border-t
            border-line

            pt-4

            font-mono
            text-[8px]
            tracking-[0.11em]

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

          <span
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                size-1.5

                rounded-full

                bg-lime
              "
            />

            OPEN TO INTERNATIONAL INTERNSHIPS
          </span>
        </div>
      </Container>
    </section>
  )
}

/* ========================================================================
   HERO SIGNAL HELPERS
   ======================================================================== */

function SignalNode({
  active = false,
  className = "",
}: {
  active?: boolean
  className?: string
}) {
  return (
    <span
      data-signal-node
      className={`
        absolute

        z-10

        rounded-full

        ${active
          ? `
              size-2.5

              bg-lime

              shadow-[0_0_0_5px_rgb(184_240_74_/_0.13)]
            `
          : `
              size-1.5

              border
              border-line

              bg-canvas
            `
        }

        ${className}
      `}
    />
  )
}

function SignalLabel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`
        absolute

        font-mono
        text-[7px]

        tracking-[0.13em]

        text-ink-muted/45

        ${className}
      `}
    >
      /{children}
    </span>
  )
}
