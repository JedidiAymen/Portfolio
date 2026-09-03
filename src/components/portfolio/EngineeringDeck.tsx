import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { BoxesIcon, BrainCircuitIcon, GitBranchIcon, PanelsTopLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CardId = "interface" | "application" | "automation" | "learning"

type EngineeringCard = {
  id: CardId
  index: string
  title: string
  label: string
  statement: string
  evidence: string
  footer: string[]
  icon: typeof PanelsTopLeftIcon
}

const cards: EngineeringCard[] = [
  {
    id: "interface",
    index: "01",
    title: "Product interface",
    label: "Interface layer",
    statement: "Complex workflows made legible, responsive, and testable.",
    evidence: "Smart Capex · this portfolio",
    footer: ["React", "TypeScript", "Motion"],
    icon: PanelsTopLeftIcon,
  },
  {
    id: "application",
    index: "02",
    title: "Application systems",
    label: "Logic + data",
    statement: "Boundaries that keep requests, data, jobs, and storage understandable.",
    evidence: "Smart Capex",
    footer: ["NestJS", "PostGIS", "Redis"],
    icon: BoxesIcon,
  },
  {
    id: "automation",
    index: "03",
    title: "Automation systems",
    label: "Infrastructure layer",
    statement: "Developer tools that turn repeatable checks into trustworthy feedback.",
    evidence: "AnsibleGuard",
    footer: ["Python", "Ansible", "Docker"],
    icon: GitBranchIcon,
  },
  {
    id: "learning",
    index: "04",
    title: "Applied intelligence",
    label: "Active learning",
    statement: "Evaluation-first experiments across vision, ML pipelines, and LLM foundations.",
    evidence: "Learning track · not a shipped claim",
    footer: ["NumPy", "OpenCV", "Evaluation"],
    icon: BrainCircuitIcon,
  },
]

const transforms = [
  { x: 0, y: 0, rotate: -1, scale: 1 },
  { x: -22, y: 18, rotate: -4, scale: 0.97 },
  { x: 24, y: 35, rotate: 4, scale: 0.94 },
  { x: 1, y: 52, rotate: 1, scale: 0.91 },
]

export function EngineeringDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = Boolean(useReducedMotion())

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length)
    }, 7600)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const activeCard = cards[activeIndex]

  return (
    <div className="w-full max-w-[390px]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="medium:hidden">
        <CardFace card={activeCard} active reduceMotion={reduceMotion} />
      </div>

      <div className="relative hidden h-[510px] medium:block wide:h-[540px]" aria-label="Interactive engineering capability cards">
        {cards.map((card, index) => {
          const order = (index - activeIndex + cards.length) % cards.length
          const active = order === 0
          const position = transforms[order]

          return (
            <motion.button
              key={card.id}
              type="button"
              aria-pressed={active}
              aria-label={`${active ? "Active" : "Queued"}: ${card.title}. ${active ? "Show next card" : "Bring this card forward"}`}
              onClick={() => setActiveIndex(active ? (index + 1) % cards.length : index)}
              animate={reduceMotion ? undefined : position}
              initial={false}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: cards.length - order }}
              className="absolute inset-x-6 top-0 h-[452px] text-left wide:inset-x-4 wide:h-[480px]"
            >
              <CardFace card={card} active={active} reduceMotion={reduceMotion} />
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted">
        <span className="hidden compact:inline">Select a layer</span>
        <div className="flex items-center gap-1" role="group" aria-label="Choose engineering card">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${card.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className="grid size-9 place-items-center rounded-full"
            >
              <span className={cn("block rounded-full transition-[width,background-color]", activeIndex === index ? "h-1.5 w-5 bg-lime" : "size-1.5 bg-line")} />
            </button>
          ))}
        </div>
        <span>{activeCard.index} / 04</span>
      </div>
    </div>
  )
}

function CardFace({ card, active, reduceMotion }: { card: EngineeringCard; active: boolean; reduceMotion: boolean }) {
  const Icon = card.icon

  return (
    <div
      className={cn(
        "relative h-full min-h-[440px] w-full overflow-hidden rounded-[22px] border p-5 shadow-floating transition-[border-color,filter] duration-300 compact:p-6 medium:min-h-0",
        card.id === "learning" ? "border-line bg-surface text-ink" : "border-[#3c4433] bg-night text-night-text",
        !active && "brightness-[0.78]",
      )}
    >
      <div aria-hidden="true" className="card-grid absolute inset-0 opacity-45" />
      {active && <motion.span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-20 bg-lime" animate={reduceMotion ? undefined : { x: [-90, 390] }} transition={{ duration: 2.7, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }} />}

      <div className="relative flex items-start justify-between gap-5">
        <div>
          <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.13em]", card.id === "learning" ? "text-ink-muted" : "text-night-text/50")}>/{card.index} · {card.label}</p>
          <h2 className={cn("mt-3 max-w-[9ch] text-[2.15rem] font-medium leading-[0.95] tracking-[-0.06em]", card.id === "learning" ? "text-ink" : "text-night-text")}>{card.title}</h2>
        </div>
        <div className={cn("grid size-10 shrink-0 place-items-center rounded-full border", active ? "border-lime bg-lime text-moss" : "border-current/20")}>
          <Icon className="size-[18px]" strokeWidth={1.75} />
        </div>
      </div>

      <div className="relative mt-7 h-[172px] rounded-xl border border-current/15 bg-black/5 p-3 compact:h-[184px]">
        <CardDiagram id={card.id} active={active} reduceMotion={reduceMotion} />
      </div>

      <div className="absolute inset-x-5 bottom-5 compact:inset-x-6 compact:bottom-6">
        <p className={cn("max-w-[30ch] text-sm leading-relaxed", card.id === "learning" ? "text-ink-muted" : "text-night-text/70")}>{card.statement}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-current/15 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em]">
          <span className="truncate opacity-55">{card.evidence}</span>
          <span className="flex shrink-0 items-center gap-2">
            <span className={cn("size-1.5 rounded-full", active ? "bg-lime" : "bg-current opacity-30")} />
            {active ? "Active" : "Queued"}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.09em] opacity-45">
          {card.footer.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  )
}

function CardDiagram({ id, active, reduceMotion }: { id: CardId; active: boolean; reduceMotion: boolean }) {
  if (id === "interface") return <InterfaceDiagram active={active} reduceMotion={reduceMotion} />
  if (id === "application") return <ApplicationDiagram active={active} reduceMotion={reduceMotion} />
  if (id === "automation") return <AutomationDiagram active={active} reduceMotion={reduceMotion} />
  return <LearningDiagram active={active} reduceMotion={reduceMotion} />
}

function InterfaceDiagram({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <div className="grid h-full grid-cols-[0.42fr_1fr] gap-2" aria-hidden="true">
      <div className="flex flex-col gap-2 rounded-lg border border-current/15 p-2">
        <span className="h-2 w-10 rounded-full bg-current/15" />
        {[0, 1, 2, 3].map((item) => <span key={item} className={cn("h-6 rounded-md border border-current/10", item === 1 && "border-lime/60 bg-lime/10")} />)}
      </div>
      <div className="relative rounded-lg border border-current/15 p-3">
        <div className="flex justify-between"><span className="h-2 w-14 rounded-full bg-current/15" /><span className="size-2 rounded-full bg-lime" /></div>
        <div className="mt-5 grid grid-cols-2 gap-2"><span className="h-12 rounded-md bg-current/10" /><span className="h-12 rounded-md border border-lime/50 bg-lime/10" /></div>
        <span className="mt-3 block h-2 w-2/3 rounded-full bg-current/10" />
        <motion.span className="absolute bottom-3 left-3 h-0.5 w-8 bg-lime" animate={active && !reduceMotion ? { width: [32, 110, 32] } : undefined} transition={{ duration: 2.4, repeat: Infinity }} />
      </div>
    </div>
  )
}

function ApplicationDiagram({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const boxes = ["Client", "API", "Data", "Jobs"]
  return (
    <div className="relative flex h-full items-center justify-between gap-2" aria-hidden="true">
      <span className="absolute left-[12%] right-[12%] top-1/2 h-px bg-current/20" />
      {boxes.map((box, index) => <div key={box} className={cn("relative grid h-14 min-w-0 flex-1 place-items-center rounded-lg border bg-night px-1 font-mono text-[0.54rem] uppercase tracking-[0.08em]", index === 1 ? "border-lime text-lime" : "border-current/20 text-current/55")}>{box}</div>)}
      <motion.span className="absolute left-[8%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-lime" animate={active && !reduceMotion ? { x: [0, 210, 0] } : undefined} transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1 }} />
    </div>
  )
}

function AutomationDiagram({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const steps = ["Discover", "Parse", "Rules", "Report"]
  return (
    <div className="flex h-full flex-col justify-center gap-2" aria-hidden="true">
      {steps.map((step, index) => <div key={step} className={cn("flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em]", index === 2 ? "border-lime bg-lime/10 text-lime" : "border-current/15 text-current/55")}><span>0{index + 1}</span><span>{step}</span><motion.span className={cn("size-1.5 rounded-full", index === 2 ? "bg-lime" : "bg-current/20")} animate={index === 2 && active && !reduceMotion ? { opacity: [0.35, 1, 0.35] } : undefined} transition={{ duration: 1.5, repeat: Infinity }} /></div>)}
    </div>
  )
}

function LearningDiagram({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const nodes = ["Data", "Model", "Evaluate"]
  return (
    <div className="relative flex h-full items-center justify-between gap-2" aria-hidden="true">
      <span className="absolute left-[12%] right-[12%] top-1/2 h-px bg-line" />
      {nodes.map((node, index) => <div key={node} className={cn("relative grid h-16 min-w-0 flex-1 place-items-center rounded-lg border bg-surface px-1 font-mono text-[0.53rem] uppercase tracking-[0.08em]", index === 2 ? "border-lime bg-lime-soft text-moss" : "border-line text-ink-muted")}>{node}</div>)}
      <motion.span className="absolute left-[10%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-lime" animate={active && !reduceMotion ? { x: [0, 190] } : undefined} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.2 }} />
    </div>
  )
}
