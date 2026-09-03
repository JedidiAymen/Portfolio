import { useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

type PosterId =
  | "smart-capex"
  | "ansibleguard"
  | "ai-ml"

type Poster = {
  id: PosterId
  index: string
  title: string
  kicker: string
  footer: string[]
}

const posters: Poster[] = [
  {
    id: "smart-capex",
    index: "01",
    title: "SMART CAPEX",
    kicker: "FULL-STACK · GEOSPATIAL SYSTEM",
    footer: ["REACT", "POSTGIS", "REDIS"],
  },
  {
    id: "ansibleguard",
    index: "02",
    title: "ANSIBLEGUARD",
    kicker: "IAC · RESEARCH · AUTOMATION",
    footer: ["ANSIBLE", "RULES", "ANALYSIS"],
  },
  {
    id: "ai-ml",
    index: "03",
    title: "APPLIED AI / ML",
    kicker: "LEARNING · EVALUATION · APPLICATION",
    footer: ["ML", "VISION", "LLMS"],
  },
]

export function KineticProjectStack() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const reduceMotion = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const tiltX = useSpring(rawX, {
    stiffness: 120,
    damping: 18,
    mass: 0.5,
  })

  const tiltY = useSpring(rawY, {
    stiffness: 120,
    damping: 18,
    mass: 0.5,
  })

  function next() {
    setActiveIndex(
      (current) => (current + 1) % posters.length,
    )
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (reduceMotion) return

    const bounds =
      event.currentTarget.getBoundingClientRect()

    const x =
      (event.clientX - bounds.left) /
      bounds.width -
      0.5

    const y =
      (event.clientY - bounds.top) /
      bounds.height -
      0.5

    rawX.set(x * 7)
    rawY.set(y * 5)
  }

  function resetPointer() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <div className="relative">
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={resetPointer}
        style={
          reduceMotion
            ? undefined
            : {
              x: tiltX,
              y: tiltY,
            }
        }
        className="
          relative

          h-[390px]
          w-[285px]

          medium:h-[440px]
          medium:w-[320px]

          wide:h-[470px]
          wide:w-[340px]
        "
      >
        {posters.map((poster, index) => {
          const order =
            (index -
              activeIndex +
              posters.length) %
            posters.length

          const front = order === 0

          const positions = hovered
            ? [
              {
                x: 0,
                y: 0,
                rotate: -1,
                scale: 1,
              },
              {
                x: -45,
                y: 32,
                rotate: -7,
                scale: 0.94,
              },
              {
                x: 48,
                y: 55,
                rotate: 7,
                scale: 0.9,
              },
            ]
            : [
              {
                x: 0,
                y: 0,
                rotate: -1,
                scale: 1,
              },
              {
                x: -24,
                y: 18,
                rotate: -4,
                scale: 0.96,
              },
              {
                x: 27,
                y: 35,
                rotate: 4,
                scale: 0.92,
              },
            ]

          const position = positions[order]

          return (
            <motion.div
              key={poster.id}
              animate={{
                x: position.x,
                y: position.y,
                rotate: position.rotate,
                scale: position.scale,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                zIndex:
                  posters.length - order,
              }}
              className="
                absolute
                inset-0
                origin-bottom-center
              "
            >
              <button
                type="button"
                onClick={
                  front
                    ? next
                    : () =>
                      setActiveIndex(index)
                }
                className="
                  block h-full w-full
                  text-left
                  outline-none
                "
                aria-label={
                  front
                    ? `Show next project after ${poster.title}`
                    : `Show ${poster.title}`
                }
              >
                <PosterCard
                  poster={poster}
                  front={front}
                />
              </button>
            </motion.div>
          )
        })}
      </motion.div>

      <div
        className="
          mt-5
          flex items-center
          justify-between

          font-mono
          text-[9px]
          tracking-[0.1em]
          text-ink-muted
        "
      >
        <span>CLICK / EXPLORE</span>

        <div className="flex items-center gap-2">
          {posters.map((poster, index) => (
            <button
              key={poster.id}
              type="button"
              onClick={() =>
                setActiveIndex(index)
              }
              className="
                grid size-5
                place-items-center
              "
              aria-label={`Show ${poster.title}`}
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",

                  activeIndex === index
                    ? "size-2 bg-lime"
                    : "size-1 bg-line",
                )}
              />
            </button>
          ))}
        </div>

        <span>
          0{activeIndex + 1} / 03
        </span>
      </div>
    </div>
  )
}

function PosterCard({
  poster,
  front,
}: {
  poster: Poster
  front: boolean
}) {
  return (
    <article
      className={cn(
        `
          relative
          h-full w-full
          overflow-hidden

          rounded-[12px]
          border

          shadow-floating
        `,

        poster.id === "smart-capex" &&
        "border-[#d99d38]/30 bg-[#171812] text-[#f4eee1]",

        poster.id === "ansibleguard" &&
        "border-lime/30 bg-[#10140d] text-[#f4eee1]",

        poster.id === "ai-ml" &&
        "border-line bg-surface text-ink",
      )}
    >
      {poster.id === "smart-capex" && (
        <SmartCapexVisual />
      )}

      {poster.id === "ansibleguard" && (
        <AnsibleGuardVisual />
      )}

      {poster.id === "ai-ml" && (
        <AppliedAIVisual />
      )}

      <div
        className="
          absolute
          inset-x-0 top-0

          flex
          items-start
          justify-between

          p-5

          font-mono
          text-[9px]
          tracking-[0.1em]
        "
      >
        <span
          className={cn(
            poster.id === "ai-ml"
              ? "text-ink-muted"
              : "text-white/35",
          )}
        >
          /{poster.index}
        </span>

        <span
          className="
            flex items-center gap-2
          "
        >
          <span className="size-1.5 rounded-full bg-lime" />

          <span
            className={cn(
              poster.id === "ai-ml"
                ? "text-ink-muted"
                : "text-white/35",
            )}
          >
            {front
              ? "ACTIVE"
              : "QUEUED"}
          </span>
        </span>
      </div>

      <div
        className="
          absolute
          inset-x-0 bottom-0
          p-5
        "
      >
        <p
          className={cn(
            `
              font-mono
              text-[8px]
              tracking-[0.11em]
            `,
            poster.id === "ai-ml"
              ? "text-ink-muted"
              : "text-white/35",
          )}
        >
          /{poster.kicker}
        </p>

        <h3
          className="
            mt-2
            text-[clamp(1.7rem,3vw,2.35rem)]
            font-medium
            leading-none
            tracking-[-0.06em]
          "
        >
          {poster.title}
        </h3>

        <div
          className={cn(
            `
              mt-4
              flex
              justify-between
              border-t
              pt-3

              font-mono
              text-[8px]
              tracking-[0.1em]
            `,
            poster.id === "ai-ml"
              ? "border-line text-ink-muted"
              : "border-white/10 text-white/30",
          )}
        >
          {poster.footer.map(
            (item) => (
              <span key={item}>
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </article>
  )
}
function SmartCapexVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="
          absolute inset-0
          opacity-[0.12]

          [background-image:
          linear-gradient(#ffffff_1px,transparent_1px),
          linear-gradient(90deg,#ffffff_1px,transparent_1px)]

          [background-size:42px_42px]
        "
      />

      <div className="absolute left-[18%] top-[25%] size-2 rounded-full bg-[#eaa83e]" />
      <div className="absolute right-[21%] top-[40%] size-2 rounded-full bg-lime" />
      <div className="absolute left-[38%] top-[57%] size-2 rounded-full bg-white/50" />

      <div className="absolute left-[18%] top-[26%] h-px w-[59%] rotate-[15deg] bg-white/20" />
      <div className="absolute left-[38%] top-[46%] h-px w-[42%] -rotate-[32deg] bg-white/20" />

      <div
        className="
          absolute
          left-1/2 top-[38%]
          -translate-x-1/2

          rounded-[6px]
          border border-white/15
          bg-black/20

          px-3 py-2

          font-mono
          text-[8px]
          tracking-[0.1em]
          text-white/50
        "
      >
        API / DATA / MAP
      </div>

      <motion.span
        className="
          absolute
          left-[18%]
          top-[25%]

          size-2
          rounded-full
          bg-lime

          shadow-[0_0_0_6px_rgb(184_240_74_/_0.14)]
        "
        animate={{
          x: [0, 105, 185],
          y: [0, 50, 110],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

function AnsibleGuardVisual() {
  const steps = [
    "DISCOVER",
    "PARSE",
    "RULES",
    "VALIDATE",
    "REPORT",
  ]

  return (
    <div
      className="
        absolute
        left-5 right-5
        top-[24%]
      "
    >
      {steps.map((step, index) => (
        <div
          key={step}
          className="
            relative
            flex
            items-center
            border-b
            border-white/10
            py-3

            font-mono
            text-[9px]
            tracking-[0.1em]
            text-white/45
          "
        >
          <span className="w-8 text-white/20">
            0{index + 1}
          </span>

          <span
            className={
              step === "RULES"
                ? "text-lime"
                : ""
            }
          >
            {step}
          </span>

          {step === "RULES" && (
            <motion.span
              className="
                ml-auto
                size-1.5
                rounded-full
                bg-lime
              "
              animate={{
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function AppliedAIVisual() {
  return (
    <div className="absolute inset-x-6 top-[23%]">
      <div
        className="
          relative
          h-[175px]
        "
      >
        <AILayer
          index="01"
          label="DATA"
          className="left-0 top-0"
        />

        <AILayer
          index="02"
          label="MODEL"
          active
          className="right-0 top-[48px]"
        />

        <AILayer
          index="03"
          label="EVALUATE"
          className="left-[18px] top-[102px]"
        />

        <div className="absolute left-[29%] top-[34px] h-px w-[48%] rotate-[24deg] bg-line" />
        <div className="absolute left-[27%] top-[92px] h-px w-[48%] -rotate-[21deg] bg-line" />

        <motion.span
          className="
            absolute
            left-[28%]
            top-[31px]

            size-2
            rounded-full
            bg-lime
          "
          animate={{
            x: [0, 78, 7],
            y: [0, 35, 92],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

function AILayer({
  index,
  label,
  active = false,
  className,
}: {
  index: string
  label: string
  active?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        `
          absolute
          w-[120px]

          rounded-[7px]
          border

          px-3 py-3

          font-mono
          text-[8px]
          tracking-[0.1em]
        `,

        active
          ? "border-lime bg-lime-soft text-moss"
          : "border-line bg-canvas text-ink-muted",

        className,
      )}
    >
      <span className="opacity-50">
        /{index}
      </span>

      <span className="mt-1 block">
        {label}
      </span>
    </div>
  )
}
