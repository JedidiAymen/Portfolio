import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRightIcon } from "lucide-react"

const projects = [
  {
    index: "01",
    title: "SMART CAPEX",
    subtitle: "Full-stack · Geospatial · Systems",
    description:
      "A full-stack capex planning platform that connects product workflows, backend services, geospatial data, caching and ML-assisted analysis.",
    role: "Full-stack / system design",
    stack: ["React", "API", "PostGIS", "Redis", "ML"],
    status: "Active development",
    tone: "night" as const,
    evidence: ["FRONTEND", "API", "DATA", "CACHE", "ML"],
  },
  {
    index: "02",
    title: "ANSIBLEGUARD",
    subtitle: "Research · Automation · IaC",
    description:
      "Research tooling for discovering, validating and reporting infrastructure-as-code quality issues across real Ansible repositories.",
    role: "Research / automation",
    stack: ["Python", "Ansible", "Rules", "GitHub"],
    status: "Research tooling",
    tone: "moss" as const,
    evidence: ["DISCOVER", "PARSE", "RULES", "VALIDATE", "REPORT"],
  },
]

export function SelectedWork() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="selected-work" className="bg-surface">
      <div className="container-visual section-space">
        <div className="flex items-end justify-between border-b border-line pb-5">
          <div>
            <p className="text-meta text-ink-muted">/ SELECTED WORK</p>
            <h2 className="mt-3 text-[clamp(2.6rem,6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.075em] text-ink">
              Proof, not decoration.
            </h2>
          </div>

          <p className="hidden font-mono text-[9px] tracking-[0.12em] text-ink-muted medium:block">
            02 / FLAGSHIP SYSTEMS
          </p>
        </div>

        <div className="mt-12 space-y-20 medium:mt-16 wide:space-y-28">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.title}
              project={project}
              reverse={index % 2 === 1}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type Project = (typeof projects)[number]

function ProjectShowcase({
  project,
  reverse,
  reduceMotion,
}: {
  project: Project
  reverse: boolean
  reduceMotion: boolean
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid items-stretch gap-8 wide:grid-cols-12 wide:gap-10"
    >
      <div className={reverse ? "wide:order-2 wide:col-span-7" : "wide:col-span-7"}>
        <ProjectVisual project={project} reduceMotion={reduceMotion} />
      </div>

      <div
        className={
          reverse
            ? "wide:order-1 wide:col-span-5 wide:self-center"
            : "wide:col-span-5 wide:self-center"
        }
      >
        <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[9px] tracking-[0.11em] text-ink-muted">
          <span>/{project.index}</span>
          <span>{project.status.toUpperCase()}</span>
        </div>

        <p className="mt-7 font-mono text-[8px] tracking-[0.12em] text-ink-muted">
          / {project.subtitle.toUpperCase()}
        </p>

        <h3 className="mt-3 text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[0.84] tracking-[-0.075em] text-ink">
          {project.title}
        </h3>

        <p className="mt-6 max-w-[34rem] text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.6] text-ink-muted">
          {project.description}
        </p>

        <dl className="mt-8 space-y-3 border-y border-line py-5 font-mono text-[8px] tracking-[0.1em]">
          <MetaRow label="ROLE" value={project.role} />
          <MetaRow label="SYSTEM" value={project.stack.join(" · ")} />
          <MetaRow label="STATUS" value={project.status} />
        </dl>

        <a
          href="/work"
          className="group mt-7 inline-flex items-center gap-3 text-sm font-medium tracking-[-0.02em] text-ink"
        >
          VIEW CASE STUDY
          <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-4">
      <dt className="text-ink-muted">/{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  )
}

function ProjectVisual({
  project,
  reduceMotion,
}: {
  project: Project
  reduceMotion: boolean
}) {
  const isNight = project.tone === "night"

  return (
    <div
      className={
        isNight
          ? "relative min-h-[420px] overflow-hidden rounded-[24px] border border-night-surface bg-night p-6 text-night-text medium:min-h-[520px] medium:p-8"
          : "relative min-h-[420px] overflow-hidden rounded-[24px] border border-moss/30 bg-moss p-6 text-night-text medium:min-h-[520px] medium:p-8"
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,245,233,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(243,245,233,.35) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 flex items-center justify-between font-mono text-[8px] tracking-[0.12em] text-night-text/60">
        <span>/{project.index} SYSTEM VIEW</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-lime" />
          LIVE SIGNAL
        </span>
      </div>

      <div className="relative z-10 mt-12 flex min-h-[290px] items-center justify-center">
        <div className="w-full max-w-[520px]">
          {project.evidence.map((item, index) => (
            <div key={item}>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  index === 2
                    ? "flex items-center justify-between rounded-xl border border-lime/70 bg-lime/10 px-4 py-3 font-mono text-[10px] tracking-[0.1em] text-lime-bright"
                    : "flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.035] px-4 py-3 font-mono text-[10px] tracking-[0.1em] text-night-text/70"
                }
              >
                <span>0{index + 1}</span>
                <span>{item}</span>
                <span
                  className={
                    index === 2 ? "size-2 rounded-full bg-lime" : "size-1.5 rounded-full bg-white/25"
                  }
                />
              </motion.div>

              {index < project.evidence.length - 1 && (
                <div className="relative mx-auto h-7 w-px bg-white/15">
                  {index === 1 && !reduceMotion && (
                    <motion.span
                      className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-lime"
                      animate={{ y: [0, 21, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 font-mono text-[8px] tracking-[0.1em] text-night-text/45">
        {project.stack.map((item) => (
          <span key={item}>{item.toUpperCase()}</span>
        ))}
      </div>
    </div>
  )
}
