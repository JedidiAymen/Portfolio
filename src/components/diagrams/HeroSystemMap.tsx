import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { cn } from "@/lib/utils"

type NodeId = "build" | "analyze" | "automate" | "learn"

const nodes = {
  build: {
    number: "01",
    label: "Build",
    meta: "PRODUCT",
    detail: "Smart Capex · React · APIs",
  },

  analyze: {
    number: "02",
    label: "Analyze",
    meta: "SYSTEMS",
    detail: "Architecture · Data · Research",
  },

  automate: {
    number: "03",
    label: "Automate",
    meta: "INFRA",
    detail: "AnsibleGuard · Docker · CI/CD",
  },

  learn: {
    number: "04",
    label: "Learn",
    meta: "INTELLIGENCE",
    detail: "ML · LLMs · System design",
  },
}

export function HeroSystemMap() {
  const root = useRef<HTMLDivElement>(null)

  const [active, setActive] =
    useState<NodeId>("build")

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

          tl.from("[data-system-shell]", {
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
          })

            .from(
              "[data-system-line]",
              {
                scaleX: 0,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                transformOrigin: "left center",
              },
              "-=0.45",
            )

            .from(
              "[data-system-line-vertical]",
              {
                scaleY: 0,
                opacity: 0,
                duration: 0.7,
                transformOrigin: "top center",
              },
              "-=0.7",
            )

            .from(
              "[data-system-center]",
              {
                opacity: 0,
                scale: 0.7,
                duration: 0.6,
              },
              "-=0.35",
            )

            .from(
              "[data-system-node]",
              {
                opacity: 0,
                y: 14,
                scale: 0.94,
                stagger: 0.08,
                duration: 0.5,
              },
              "-=0.25",
            )

          const packet =
            root.current?.querySelector(
              "[data-system-packet]",
            )

          if (packet) {
            gsap.to(packet, {
              motionPath: undefined,
            })

            gsap.to(packet, {
              x: 170,
              duration: 1.55,
              ease: "power2.inOut",
              repeat: -1,
              repeatDelay: 1.6,
              yoyo: true,
            })
          }
        },
      )

      return () => mm.revert()
    },
    {
      scope: root,
    },
  )

  const current = nodes[active]

  return (
    <div
      ref={root}
      className="relative w-full max-w-[560px]"
    >
      <div
        data-system-shell
        className="
          relative
          aspect-[0.95/1]
          overflow-hidden

          rounded-[32px]
          border border-line

          bg-surface
          p-6

          shadow-soft

          medium:p-8
        "
      >
        {/* subtle technical grid */}

        <div
          className="
            pointer-events-none
            absolute inset-0

            opacity-[0.16]

            [background-image:
            linear-gradient(var(--line)_1px,transparent_1px),
            linear-gradient(90deg,var(--line)_1px,transparent_1px)]

            [background-size:48px_48px]
          "
          aria-hidden="true"
        />

        {/* top metadata */}

        <div
          className="
            relative z-10
            flex items-center
            justify-between

            text-meta
            text-ink-muted
          "
        >
          <span>/SYSTEM MAP</span>

          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-lime" />
            ACTIVE
          </span>
        </div>

        {/* ---------------------------------------------------------
            MAP AREA
        --------------------------------------------------------- */}

        <div
          className="
            relative
            mt-8
            h-[340px]

            medium:h-[390px]
          "
        >
          {/* horizontal rails */}

          <div
            data-system-line
            className="
              absolute
              left-[8%]
              right-[8%]
              top-[32%]

              h-px
              bg-line
            "
          />

          <div
            data-system-line
            className="
              absolute
              left-[8%]
              right-[8%]
              top-[68%]

              h-px
              bg-line
            "
          />

          {/* vertical rail */}

          <div
            data-system-line-vertical
            className="
              absolute
              bottom-[8%]
              left-1/2
              top-[8%]

              w-px
              -translate-x-1/2

              bg-line
            "
          />

          {/* center identity */}

          <div
            data-system-center
            className="
              absolute
              left-1/2 top-1/2

              z-20

              flex size-36
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center

              rounded-full

              bg-ink
              text-surface

              shadow-floating

              medium:size-40
            "
          >
            <span className="text-meta text-surface/40">
              SYSTEM
            </span>

            <span
              className="
                mt-1
                text-6xl
                font-medium
                leading-none
                tracking-[-0.08em]
              "
            >
              A
            </span>

            <span className="mt-2 text-[10px] text-surface/35">
              AYMEN / 2026
            </span>
          </div>

          {/* animated signal */}

          <span
            data-system-packet
            className="
              absolute
              left-[18%]
              top-[32%]

              z-30

              size-2.5

              -translate-x-1/2
              -translate-y-1/2

              rounded-full
              bg-lime

              shadow-[0_0_0_7px_color-mix(in_srgb,var(--lime)_18%,transparent)]
            "
          />

          {/* ---------------------------------------------------------
              NODES
          --------------------------------------------------------- */}

          <SystemNode
            id="build"
            active={active}
            setActive={setActive}
            className="
              absolute
              left-[5%]
              top-[18%]
            "
          />

          <SystemNode
            id="analyze"
            active={active}
            setActive={setActive}
            className="
              absolute
              right-[5%]
              top-[18%]
            "
          />

          <SystemNode
            id="automate"
            active={active}
            setActive={setActive}
            className="
              absolute
              bottom-[5%]
              left-[5%]
            "
          />

          <SystemNode
            id="learn"
            active={active}
            setActive={setActive}
            className="
              absolute
              bottom-[5%]
              right-[5%]
            "
          />
        </div>

        {/* ---------------------------------------------------------
            ACTIVE PREVIEW
        --------------------------------------------------------- */}

        <div
          className="
            relative z-10

            flex flex-col gap-2

            border-t border-line
            pt-5

            medium:flex-row
            medium:items-end
            medium:justify-between
          "
        >
          <div>
            <p className="text-meta text-ink-muted">
              /ACTIVE SIGNAL
            </p>

            <p
              key={active}
              className="
                mt-1
                text-xl
                font-medium
                tracking-[-0.035em]
              "
            >
              {current.label}
            </p>
          </div>

          <p
            key={`${active}-detail`}
            className="
              max-w-[240px]
              text-sm
              leading-relaxed
              text-ink-muted

              medium:text-right
            "
          >
            {current.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

type SystemNodeProps = {
  id: NodeId
  active: NodeId
  setActive: (id: NodeId) => void
  className?: string
}

function SystemNode({
  id,
  active,
  setActive,
  className,
}: SystemNodeProps) {
  const node = nodes[id]
  const selected = active === id

  return (
    <button
      data-system-node
      type="button"

      onMouseEnter={() => setActive(id)}
      onFocus={() => setActive(id)}
      onClick={() => setActive(id)}

      className={cn(
        `
          group
          z-30

          min-w-[130px]

          rounded-[14px]
          border

          px-4 py-3

          text-left

          shadow-soft

          transition-all
          duration-300

          hover:-translate-y-1
        `,

        selected
          ? "border-lime bg-lime-soft"
          : "border-line bg-canvas",

        className,
      )}
    >
      <div
        className="
          flex items-center
          justify-between gap-4
        "
      >
        <span className="text-meta text-ink-muted">
          /{node.number}
        </span>

        <span
          className={cn(
            "size-2 rounded-full transition-colors",
            selected
              ? "bg-lime"
              : "bg-line group-hover:bg-lime",
          )}
        />
      </div>

      <span
        className="
          mt-2
          block
          font-medium
          tracking-[-0.025em]
        "
      >
        {node.label}
      </span>

      <span
        className="
          mt-1
          block
          text-[10px]
          font-mono
          text-ink-muted
        "
      >
        {node.meta}
      </span>
    </button>
  )
}
