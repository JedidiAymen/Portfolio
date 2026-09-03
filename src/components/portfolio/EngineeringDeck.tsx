import {
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

/* ========================================================================
   TYPES
   ======================================================================== */

type DeckId =
  | "architecture"
  | "ai-ml"
  | "automation"
  | "workflow"

type DeckCard = {
  id: DeckId
  index: string
  title: string
  kicker: string
  evidence: string
  footer: string[]
}

type VisualProps = {
  active: boolean
  reduceMotion: boolean
}

/* ========================================================================
   DATA
   ======================================================================== */

const cards: DeckCard[] = [
  {
    id: "architecture",
    index: "01",
    title: "SYSTEM\nARCHITECTURE",
    kicker: "DESIGN · DATA FLOW · BOUNDARIES",
    evidence: "EVIDENCE → SMART CAPEX",
    footer: ["API", "DATA", "CACHE", "JOBS"],
  },

  {
    id: "ai-ml",
    index: "02",
    title: "APPLIED\nAI / ML",
    kicker: "PIPELINES · MODELS · EVALUATION",
    evidence: "CURRENT FOCUS → ML + LLM FOUNDATIONS",
    footer: ["DATA", "MODEL", "EVAL", "APPLY"],
  },

  {
    id: "automation",
    index: "03",
    title: "AUTOMATE\n& SHIP",
    kicker: "GIT · CI/CD · INFRASTRUCTURE",
    evidence: "RESEARCH → ANSIBLEGUARD",
    footer: ["GIT", "CI", "DOCKER", "ANSIBLE"],
  },

  {
    id: "workflow",
    index: "04",
    title: "LINUX\nWORKFLOW",
    kicker: "TOOLS · FLOW · ENGINEERING",
    evidence: "ARCH · I3 · NEOVIM · TERMINAL",
    footer: ["ARCH", "NVIM", "GIT", "CLI"],
  },
]

/* ========================================================================
   CARD COLOR SYSTEM
   ======================================================================== */

function cardColors(id: DeckId): CSSProperties {
  const palettes = {
    architecture: {
      "--card-bg": "#11140E",
      "--card-panel": "#1A1F16",
      "--card-fg": "#F3F5E9",
      "--card-muted": "#A6AD9A",
      "--card-line": "#3C4433",
      "--card-grid": "rgba(243,245,233,0.075)",

      "--card-accent": "#B8F04A",
      "--card-accent-soft": "rgba(184,240,74,0.12)",
      "--card-accent-text": "#D2FF72",
    },

    "ai-ml": {
      "--card-bg": "#FBF8F1",
      "--card-panel": "#ECE5D8",
      "--card-fg": "#171A12",
      "--card-muted": "#676B5E",
      "--card-line": "#C9C2B5",
      "--card-grid": "rgba(23,26,18,0.075)",

      "--card-accent": "#B8F04A",
      "--card-accent-soft": "#EAF8C9",
      "--card-accent-text": "#28351C",
    },

    automation: {
      "--card-bg": "#28351C",
      "--card-panel": "#1D2815",
      "--card-fg": "#F3F5E9",
      "--card-muted": "#BAC5AC",
      "--card-line": "#536445",
      "--card-grid": "rgba(243,245,233,0.07)",

      "--card-accent": "#D2FF72",
      "--card-accent-soft": "rgba(210,255,114,0.11)",
      "--card-accent-text": "#D2FF72",
    },

    workflow: {
      "--card-bg": "#171A12",
      "--card-panel": "#10130D",
      "--card-fg": "#F4EEE1",
      "--card-muted": "#A8AA9E",
      "--card-line": "#3B3E35",
      "--card-grid": "rgba(244,238,225,0.065)",

      "--card-accent": "#B8F04A",
      "--card-accent-soft": "rgba(184,240,74,0.11)",
      "--card-accent-text": "#D2FF72",
    },
  }

  return palettes[id] as CSSProperties
}

/* ========================================================================
   MAIN DECK
   ======================================================================== */

export function EngineeringDeck() {
  const [activeIndex, setActiveIndex] = useState(0)

  const [paused, setPaused] = useState(false)

  const [fanned, setFanned] = useState(false)

  const reduceMotion = useReducedMotion()

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  const rotateX = useSpring(rawRotateX, {
    stiffness: 100,
    damping: 18,
    mass: 0.45,
  })

  const rotateY = useSpring(rawRotateY, {
    stiffness: 100,
    damping: 18,
    mass: 0.45,
  })

  /* ----------------------------------------------------------------------
     AUTO-CYCLE
     ---------------------------------------------------------------------- */

  useEffect(() => {
    if (paused || reduceMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % cards.length,
      )
    }, 7000)

    return () => {
      window.clearInterval(timer)
    }
  }, [paused, reduceMotion])

  function nextCard() {
    setActiveIndex(
      (current) => (current + 1) % cards.length,
    )
  }

  /* ----------------------------------------------------------------------
     SUBTLE POINTER TILT
     ---------------------------------------------------------------------- */

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (reduceMotion) {
      return
    }

    const rect =
      event.currentTarget.getBoundingClientRect()

    const x =
      (event.clientX - rect.left) / rect.width -
      0.5

    const y =
      (event.clientY - rect.top) / rect.height -
      0.5

    rawRotateY.set(x * 4)
    rawRotateX.set(y * -3)
  }

  function resetPointer() {
    rawRotateX.set(0)
    rawRotateY.set(0)

    setPaused(false)
    setFanned(false)
  }

  return (
    <div className="relative">
      <motion.div
        onPointerEnter={() => {
          setPaused(true)
          setFanned(true)
        }}
        onPointerLeave={resetPointer}
        onPointerMove={handlePointerMove}
        style={
          reduceMotion
            ? undefined
            : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
        }
        className="
          relative

          h-[500px]
          w-[360px]

          medium:h-[550px]
          medium:w-[430px]

          wide:h-[570px]
          wide:w-[450px]
        "
      >
        {cards.map((card, index) => {
          const order =
            (index -
              activeIndex +
              cards.length) %
            cards.length

          const isFront = order === 0

          /* --------------------------------------------------------------
             CLOSED STACK
             -------------------------------------------------------------- */

          const compactPositions = [
            {
              x: 0,
              y: 0,
              rotate: -1,
              scale: 1,
            },

            {
              x: -18,
              y: 20,
              rotate: -4,
              scale: 0.97,
            },

            {
              x: 22,
              y: 38,
              rotate: 4,
              scale: 0.94,
            },

            {
              x: -3,
              y: 56,
              rotate: 1,
              scale: 0.91,
            },
          ]

          /* --------------------------------------------------------------
             HOVER / FAN STACK
             -------------------------------------------------------------- */

          const fanPositions = [
            {
              x: 0,
              y: 0,
              rotate: -1,
              scale: 1,
            },

            {
              x: -52,
              y: 35,
              rotate: -8,
              scale: 0.95,
            },

            {
              x: 54,
              y: 57,
              rotate: 8,
              scale: 0.92,
            },

            {
              x: 0,
              y: 82,
              rotate: 2,
              scale: 0.89,
            },
          ]

          const position = (
            fanned
              ? fanPositions
              : compactPositions
          )[order]

          return (
            <div
              key={card.id}
              className="
                absolute
                inset-x-0
                top-0

                flex
                justify-center
              "
              style={{
                zIndex:
                  cards.length - order,
              }}
            >
              <motion.div
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

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  h-[420px]
                  w-[285px]

                  medium:h-[465px]
                  medium:w-[320px]

                  wide:h-[490px]
                  wide:w-[335px]
                "
              >
                <button
                  type="button"
                  className="
                    block
                    h-full
                    w-full

                    text-left

                    outline-none

                    focus-visible:ring-2
                    focus-visible:ring-lime
                    focus-visible:ring-offset-4
                    focus-visible:ring-offset-canvas
                  "
                  onClick={
                    isFront
                      ? nextCard
                      : () =>
                        setActiveIndex(
                          index,
                        )
                  }
                  aria-label={
                    isFront
                      ? `Show next engineering area after ${card.title}`
                      : `Show ${card.title}`
                  }
                >
                  <EngineeringCard
                    card={card}
                    active={isFront}
                    reduceMotion={Boolean(
                      reduceMotion,
                    )}
                  />
                </button>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* ----------------------------------------------------------------
          DECK CONTROLS
          ---------------------------------------------------------------- */}

      <div
        className="
          mx-auto

          flex
          max-w-[335px]

          items-center
          justify-between

          font-mono
          text-[9px]
          tracking-[0.1em]

          text-ink-muted
        "
      >
        <span>
          CLICK / EXPLORE
        </span>

        <div className="flex items-center gap-1">
          {cards.map(
            (card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() =>
                  setActiveIndex(
                    index,
                  )
                }
                className="
                  grid
                  size-6
                  place-items-center
                "
                aria-label={`Show ${card.title}`}
              >
                <span
                  className={cn(
                    `
                      block
                      rounded-full

                      transition-all
                      duration-300
                    `,

                    activeIndex ===
                      index
                      ? `
                        size-2
                        bg-lime
                      `
                      : `
                        size-1
                        bg-line
                      `,
                  )}
                />
              </button>
            ),
          )}
        </div>

        <span>
          0{activeIndex + 1}
          {" / "}
          0{cards.length}
        </span>
      </div>
    </div>
  )
}

/* ========================================================================
   GENERIC ENGINEERING CARD
   ======================================================================== */

function EngineeringCard({
  card,
  active,
  reduceMotion,
}: {
  card: DeckCard
  active: boolean
  reduceMotion: boolean
}) {
  return (
    <article
      style={cardColors(card.id)}
      className="
        relative

        h-full
        w-full

        overflow-hidden

        rounded-[14px]

        border
        border-[var(--card-line)]

        bg-[var(--card-bg)]
        text-[var(--card-fg)]

        shadow-floating
      "
    >
      {/* ----------------------------------------------------------------
          GRID
          ---------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          backgroundImage: `
            linear-gradient(
              var(--card-grid) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--card-grid) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "34px 34px",
        }}
      />

      {/* ----------------------------------------------------------------
          MOVING SIGNAL
          ---------------------------------------------------------------- */}

      <motion.span
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          z-30

          h-[2px]
          w-16

          bg-[var(--card-accent)]
        "
        animate={
          active &&
            !reduceMotion
            ? {
              x: [
                -70,
                390,
              ],
            }
            : undefined
        }
        transition={{
          duration: 2.3,
          repeat: Infinity,
          repeatDelay: 1.5,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      />

      {/* ----------------------------------------------------------------
          HEADER
          ---------------------------------------------------------------- */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-20

          flex
          items-start
          justify-between

          p-5
        "
      >
        <div>
          <p
            className="
              font-mono
              text-[8px]
              tracking-[0.12em]

              text-[var(--card-muted)]
            "
          >
            /{card.index}
          </p>

          <h3
            className="
              mt-2

              whitespace-pre-line

              text-[clamp(1.75rem,3vw,2.4rem)]

              font-medium

              leading-[0.88]

              tracking-[-0.065em]

              text-[var(--card-fg)]
            "
          >
            {card.title}
          </h3>
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            font-mono
            text-[8px]
            tracking-[0.1em]

            text-[var(--card-muted)]
          "
        >
          <motion.span
            animate={
              active &&
                !reduceMotion
                ? {
                  scale: [
                    1,
                    1.45,
                    1,
                  ],
                  opacity: [
                    0.65,
                    1,
                    0.65,
                  ],
                }
                : undefined
            }
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              size-1.5

              rounded-full

              bg-[var(--card-accent)]
            "
          />

          {active
            ? "ACTIVE"
            : "QUEUED"}
        </div>
      </div>

      {/* ----------------------------------------------------------------
          INTERNAL VISUAL
          ---------------------------------------------------------------- */}

      <div
        className="
          absolute

          inset-x-5
          bottom-[112px]
          top-[125px]
        "
      >
        {card.id ===
          "architecture" && (
            <ArchitectureVisual
              active={active}
              reduceMotion={
                reduceMotion
              }
            />
          )}

        {card.id ===
          "ai-ml" && (
            <MLPipelineVisual
              active={active}
              reduceMotion={
                reduceMotion
              }
            />
          )}

        {card.id ===
          "automation" && (
            <AutomationVisual
              active={active}
              reduceMotion={
                reduceMotion
              }
            />
          )}

        {card.id ===
          "workflow" && (
            <WorkflowVisual
              active={active}
              reduceMotion={
                reduceMotion
              }
            />
          )}
      </div>

      {/* ----------------------------------------------------------------
          FOOTER
          ---------------------------------------------------------------- */}

      <div
        className="
          absolute
          inset-x-5
          bottom-5
        "
      >
        <p
          className="
            font-mono
            text-[7px]
            tracking-[0.11em]

            text-[var(--card-muted)]
          "
        >
          /{card.kicker}
        </p>

        <p
          className="
            mt-2

            text-[10px]
            tracking-[-0.015em]

            text-[var(--card-muted)]
          "
        >
          {card.evidence}
        </p>

        <div
          className="
            mt-4

            flex
            justify-between

            border-t
            border-[var(--card-line)]

            pt-3

            font-mono
            text-[7px]
            tracking-[0.1em]

            text-[var(--card-muted)]
          "
        >
          {card.footer.map(
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

/* ========================================================================
   01 — SYSTEM ARCHITECTURE
   ======================================================================== */

function ArchitectureVisual({
  active,
  reduceMotion,
}: VisualProps) {
  return (
    <div className="relative h-full">
      <svg
        viewBox="0 0 260 200"
        className="
          h-full
          w-full
        "
        aria-hidden="true"
      >
        {/* rails */}

        <motion.path
          d="
            M130 40
            L130 72

            M130 102
            L60 132

            M130 102
            L130 132

            M130 102
            L200 132
          "
          fill="none"

          stroke="var(--card-line)"

          strokeWidth="1.4"

          initial={{
            pathLength: 0,
          }}

          animate={{
            pathLength: 1,
          }}

          transition={{
            duration:
              reduceMotion
                ? 0
                : 1.15,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />

        {/* boxes */}

        <ArchitectureBox
          x={87}
          y={10}
          width={86}
          label="CLIENT"
        />

        <ArchitectureBox
          x={87}
          y={72}
          width={86}
          label="API"
          active
        />

        <ArchitectureBox
          x={20}
          y={132}
          width={80}
          label="DATABASE"
        />

        <ArchitectureBox
          x={90}
          y={132}
          width={80}
          label="CACHE"
        />

        <ArchitectureBox
          x={160}
          y={132}
          width={80}
          label="JOBS"
        />

        {/* moving packet */}

        {active &&
          !reduceMotion && (
            <motion.circle
              r="4.5"

              fill="var(--card-accent)"

              animate={{
                cx: [
                  130,
                  130,
                  130,
                  60,
                  130,
                  200,
                ],

                cy: [
                  35,
                  86,
                  100,
                  145,
                  145,
                  145,
                ],
              }}

              transition={{
                duration: 3.6,

                repeat:
                  Infinity,

                repeatDelay:
                  1.1,

                ease:
                  "easeInOut",
              }}
            />
          )}
      </svg>

      {/* tiny architecture legend */}

      <div
        className="
          absolute
          bottom-0
          left-1/2

          flex
          -translate-x-1/2

          items-center
          gap-4

          whitespace-nowrap

          font-mono
          text-[7px]
          tracking-[0.1em]

          text-[var(--card-muted)]
        "
      >
        <span>
          REQUEST
        </span>

        <span className="text-[var(--card-accent)]">
          →
        </span>

        <span>
          PROCESS
        </span>

        <span className="text-[var(--card-accent)]">
          →
        </span>

        <span>
          DATA
        </span>
      </div>
    </div>
  )
}

function ArchitectureBox({
  x,
  y,
  width,
  label,
  active = false,
}: {
  x: number
  y: number
  width: number
  label: string
  active?: boolean
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}

        width={width}
        height="30"

        rx="6"

        fill={
          active
            ? "var(--card-accent-soft)"
            : "var(--card-panel)"
        }

        stroke={
          active
            ? "var(--card-accent)"
            : "var(--card-line)"
        }

        strokeWidth={
          active
            ? "1.4"
            : "1"
        }
      />

      <text
        x={x + width / 2}
        y={y + 19}

        textAnchor="middle"

        fill={
          active
            ? "var(--card-accent-text)"
            : "var(--card-muted)"
        }

        fontSize="8"

        fontFamily="monospace"

        letterSpacing="1"
      >
        {label}
      </text>

      {active && (
        <circle
          cx={x + width - 9}
          cy={y + 9}

          r="2.5"

          fill="var(--card-accent)"
        />
      )}
    </g>
  )
}

/* ========================================================================
   02 — APPLIED AI / ML
   ======================================================================== */

function MLPipelineVisual({
  active,
  reduceMotion,
}: VisualProps) {
  const stages = [
    "DATA",
    "PREPARE",
    "MODEL",
    "EVALUATE",
    "APPLY",
  ]

  return (
    <div
      className="
        flex
        h-full

        flex-col
        justify-center
      "
    >
      {stages.map(
        (stage, index) => {
          const highlighted =
            stage ===
            "EVALUATE"

          return (
            <div key={stage}>
              <div
                className={cn(
                  `
                    relative

                    flex
                    h-10

                    items-center
                    justify-between

                    rounded-[7px]

                    border

                    px-3

                    font-mono
                    text-[8px]
                    tracking-[0.1em]
                  `,

                  highlighted
                    ? `
                      border-[var(--card-accent)]

                      bg-[var(--card-accent-soft)]

                      text-[var(--card-accent-text)]
                    `
                    : `
                      border-[var(--card-line)]

                      bg-[var(--card-panel)]

                      text-[var(--card-muted)]
                    `,
                )}
              >
                <span>
                  0{index + 1}
                </span>

                <span>
                  {stage}
                </span>

                {highlighted ? (
                  <motion.span
                    animate={
                      active &&
                        !reduceMotion
                        ? {
                          scale: [
                            1,
                            1.5,
                            1,
                          ],
                        }
                        : undefined
                    }
                    transition={{
                      duration:
                        1.4,

                      repeat:
                        Infinity,
                    }}
                    className="
                      size-1.5

                      rounded-full

                      bg-[var(--card-accent)]
                    "
                  />
                ) : (
                  <span
                    className="
                      size-1
                      rounded-full

                      bg-[var(--card-line)]
                    "
                  />
                )}
              </div>

              {index <
                stages.length -
                1 && (
                  <div
                    className="
                    relative

                    mx-auto
                    h-5
                    w-px

                    bg-[var(--card-line)]
                  "
                  >
                    {active &&
                      !reduceMotion &&
                      index === 1 && (
                        <motion.span
                          className="
                          absolute

                          left-1/2
                          top-0

                          size-1.5

                          -translate-x-1/2

                          rounded-full

                          bg-[var(--card-accent)]
                        "
                          animate={{
                            y: [
                              0,
                              15,
                              0,
                            ],
                          }}
                          transition={{
                            duration:
                              1.5,

                            repeat:
                              Infinity,

                            ease:
                              "easeInOut",
                          }}
                        />
                      )}
                  </div>
                )}
            </div>
          )
        },
      )}

      <div
        className="
          mt-4

          flex
          items-center
          justify-between

          font-mono
          text-[7px]
          tracking-[0.09em]

          text-[var(--card-muted)]
        "
      >
        <span>
          INPUT
        </span>

        <span className="text-[var(--card-accent-text)]">
          LEARN
        </span>

        <span>
          VALIDATE
        </span>

        <span>
          USE
        </span>
      </div>
    </div>
  )
}

/* ========================================================================
   03 — AUTOMATE & SHIP
   ======================================================================== */

function AutomationVisual({
  active,
  reduceMotion,
}: VisualProps) {
  return (
    <div className="relative h-full">
      <svg
        viewBox="0 0 260 190"

        className="
          h-[65%]
          w-full
        "

        aria-hidden="true"
      >
        {/* main branch */}

        <motion.path
          d="M50 20 L50 165"

          fill="none"

          stroke="var(--card-line)"

          strokeWidth="2"

          initial={{
            pathLength: 0,
          }}

          animate={{
            pathLength: 1,
          }}

          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.9,
          }}
        />

        {/* feature branch */}

        <motion.path
          d="
            M50 62
            C90 62
            90 100
            135 100

            L180 100

            C210 100
            210 130
            210 150

            C210 165
            180 165
            50 165
          "

          fill="none"

          stroke="var(--card-accent)"

          strokeWidth="2"

          initial={{
            pathLength: 0,
          }}

          animate={{
            pathLength: 1,
          }}

          transition={{
            duration:
              reduceMotion
                ? 0
                : 1.25,

            delay:
              reduceMotion
                ? 0
                : 0.2,
          }}
        />

        {/* commit nodes */}

        {[
          [50, 30],
          [50, 62],
          [135, 100],
          [210, 150],
          [50, 165],
        ].map(
          ([cx, cy], index) => (
            <circle
              key={`${cx}-${cy}`}

              cx={cx}
              cy={cy}

              r={
                index === 2
                  ? 5
                  : 4
              }

              fill={
                index === 2
                  ? "var(--card-accent)"
                  : "var(--card-muted)"
              }

              opacity={
                index === 2
                  ? 1
                  : 0.65
              }
            />
          ),
        )}

        {/* moving commit */}

        {active &&
          !reduceMotion && (
            <motion.circle
              r="4"

              fill="var(--card-accent)"

              animate={{
                cx: [
                  50,
                  86,
                  135,
                  180,
                  210,
                ],

                cy: [
                  62,
                  72,
                  100,
                  100,
                  150,
                ],
              }}

              transition={{
                duration: 2.8,

                repeat:
                  Infinity,

                repeatDelay:
                  1.2,

                ease:
                  "easeInOut",
              }}
            />
          )}

        <text
          x="68"
          y="27"

          fill="var(--card-muted)"

          fontSize="8"
          fontFamily="monospace"

          letterSpacing="1"
        >
          main
        </text>

        <text
          x="145"
          y="91"

          fill="var(--card-accent)"

          fontSize="8"
          fontFamily="monospace"

          letterSpacing="1"
        >
          feature
        </text>
      </svg>

      {/* pipeline */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          grid
          grid-cols-3
          gap-px

          overflow-hidden

          rounded-[7px]

          border
          border-[var(--card-line)]

          bg-[var(--card-line)]
        "
      >
        <AutomationStage
          label="CI"
          value="CHECK"
        />

        <AutomationStage
          label="TEST"
          value="VERIFY"
          active
        />

        <AutomationStage
          label="SHIP"
          value="DEPLOY"
        />
      </div>
    </div>
  )
}

function AutomationStage({
  label,
  value,
  active = false,
}: {
  label: string
  value: string
  active?: boolean
}) {
  return (
    <div
      className="
        bg-[var(--card-panel)]

        px-3
        py-3
      "
    >
      <p
        className={cn(
          `
            font-mono

            text-[7px]

            tracking-[0.1em]
          `,

          active
            ? `
              text-[var(--card-accent)]
            `
            : `
              text-[var(--card-muted)]
            `,
        )}
      >
        /{label}
      </p>

      <div
        className="
          mt-1

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[9px]

            text-[var(--card-fg)]
          "
        >
          {value}
        </p>

        {active && (
          <span
            className="
              size-1.5

              rounded-full

              bg-[var(--card-accent)]
            "
          />
        )}
      </div>
    </div>
  )
}

/* ========================================================================
   04 — ARCH / I3 / NEOVIM WORKFLOW
   ======================================================================== */

function WorkflowVisual({
  active,
  reduceMotion,
}: VisualProps) {
  const [modeIndex, setModeIndex] =
    useState(0)

  const modes = [
    "NORMAL",
    "INSERT",
    "NORMAL",
    "COMMAND",
  ]

  useEffect(() => {
    if (
      !active ||
      reduceMotion
    ) {
      return
    }

    const timer =
      window.setInterval(() => {
        setModeIndex(
          (current) =>
            (current + 1) %
            modes.length,
        )
      }, 1500)

    return () => {
      window.clearInterval(timer)
    }
  }, [
    active,
    reduceMotion,
    modes.length,
  ])

  return (
    <div
      className="
        flex
        h-full
        flex-col

        overflow-hidden

        rounded-[8px]

        border
        border-[var(--card-line)]

        bg-[var(--card-panel)]
      "
    >
      {/* --------------------------------------------------------------
          TERMINAL TITLE
          -------------------------------------------------------------- */}

      <div
        className="
          flex
          h-7

          items-center
          justify-between

          border-b
          border-[var(--card-line)]

          px-3

          font-mono
          text-[7px]
          tracking-[0.08em]

          text-[var(--card-muted)]
        "
      >
        <span>
          ~/portfolio
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

              bg-[var(--card-accent)]
            "
          />

          main +2
        </span>
      </div>

      {/* --------------------------------------------------------------
          EDITOR AREA
          -------------------------------------------------------------- */}

      <div
        className="
          flex
          min-h-0
          flex-1
        "
      >
        {/* files */}

        <div
          className="
            w-[36%]

            border-r
            border-[var(--card-line)]

            p-3

            font-mono
            text-[7px]

            leading-5

            text-[var(--card-muted)]
          "
        >
          <p className="text-[var(--card-fg)]">
            app/
          </p>

          <p>
            ├ components/
          </p>

          <p>
            ├ routes/
          </p>

          <p>
            ├ content/
          </p>

          <p>
            └ lib/
          </p>

          <p
            className="
              mt-2

              text-[var(--card-accent-text)]
            "
          >
            hero.tsx
          </p>
        </div>

        {/* fake code editor */}

        <div
          className="
            relative

            flex-1

            p-3
          "
        >
          <CodeLine width="72%" />

          <CodeLine width="88%" />

          <CodeLine
            width="55%"
            active
          />

          <CodeLine width="81%" />

          <CodeLine width="63%" />

          <CodeLine width="92%" />

          <CodeLine width="48%" />

          <CodeLine width="76%" />

          {active &&
            !reduceMotion && (
              <motion.span
                className="
                  absolute

                  left-[38%]
                  top-[67px]

                  h-[12px]
                  w-[2px]

                  bg-[var(--card-accent)]
                "
                animate={{
                  opacity: [
                    1,
                    0,
                    1,
                  ],
                }}
                transition={{
                  duration: 0.8,

                  repeat:
                    Infinity,
                }}
              />
            )}

          {/* tiny command */}

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={
                  modes[
                  modeIndex
                  ]
                }
                initial={{
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                className="
                  absolute

                  bottom-2
                  left-3

                  font-mono
                  text-[7px]

                  text-[var(--card-muted)]
                "
              >
                {modes[
                  modeIndex
                ] ===
                  "COMMAND"
                  ? ":w"
                  : "src/components/hero.tsx"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --------------------------------------------------------------
          NVIM STATUS BAR
          -------------------------------------------------------------- */}

      <div
        className="
          flex
          h-7

          items-center
          justify-between

          bg-[var(--card-accent)]

          px-3

          font-mono
          text-[7px]
          font-semibold

          tracking-[0.06em]

          text-[#11140E]
        "
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={
              modes[
              modeIndex
              ]
            }
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {
              modes[
              modeIndex
              ]
            }
          </motion.span>
        </AnimatePresence>

        <span>
          UTF-8 · TSX · 42:17
        </span>
      </div>
    </div>
  )
}

function CodeLine({
  width,
  active = false,
}: {
  width: string
  active?: boolean
}) {
  return (
    <motion.div
      initial={{
        scaleX: 0,
      }}
      animate={{
        scaleX: 1,
      }}
      transition={{
        duration: 0.55,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={cn(
        `
          mb-2

          h-[3px]

          origin-left

          rounded-full
        `,

        active
          ? `
            bg-[var(--card-accent)]
          `
          : `
            bg-[var(--card-line)]
          `,
      )}
      style={{
        width,
      }}
    />
  )
}
