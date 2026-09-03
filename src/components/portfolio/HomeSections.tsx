import { Link } from "react-router"
import { ArrowRightIcon, BookOpenIcon, BracesIcon, DatabaseIcon, GitBranchIcon, SparklesIcon } from "lucide-react"

import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { ProjectCard } from "@/components/portfolio/ProjectCard"
import { buttonVariants } from "@/components/ui/button-variants"
import { books } from "@/content/reading"
import { now } from "@/content/now"
import { projects } from "@/content/projects"

const capabilities = [
  {
    number: "01",
    title: "Product engineering",
    description: "Interfaces, workflows, and interaction systems built around the task—not around the framework.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Motion", "GSAP"],
    evidence: "Portfolio interaction system and Smart Capex interface",
    href: "/work/smart-capex",
    icon: BracesIcon,
    state: "Used in projects",
  },
  {
    number: "02",
    title: "Backend and data",
    description: "Typed API contracts, validation, spatial data, queues, caching, and storage with explicit boundaries.",
    technologies: ["Node.js", "NestJS", "REST APIs", "PostgreSQL", "PostGIS", "Drizzle ORM", "Zod", "Redis", "BullMQ", "MinIO"],
    evidence: "Smart Capex service and data architecture",
    href: "/work/smart-capex",
    icon: DatabaseIcon,
    state: "Used in projects",
  },
  {
    number: "03",
    title: "Automation and systems",
    description: "Static analysis, reproducible pipelines, and practical tooling for infrastructure code and delivery workflows.",
    technologies: ["Python", "Ansible", "Docker", "Git/GitHub", "Linux", "Bash"],
    evidence: "AnsibleGuard research and daily engineering workflow",
    href: "/work/ansibleguard",
    icon: GitBranchIcon,
    state: "Used in projects",
  },
  {
    number: "04",
    title: "Applied AI / ML",
    description: "Learning to build and evaluate data-to-model pipelines with clear assumptions and honest limits.",
    technologies: ["NumPy", "OpenCV", "Computer vision", "ML pipelines", "Model evaluation", "LLM foundations"],
    evidence: "Current structured learning and applied experiments",
    href: "/about#now",
    icon: SparklesIcon,
    state: "Actively learning",
  },
  {
    number: "05",
    title: "Core languages",
    description: "A language toolkit spanning product code, systems foundations, data work, and automation.",
    technologies: ["TypeScript", "Python", "C", "C++", "SQL", "Bash"],
    evidence: "Projects, engineering study, and development tools",
    href: "/about",
    icon: BracesIcon,
    state: "Projects + study",
  },
]

export function SelectedWorkSection() {
  return (
    <Section id="selected-work" className="border-t border-line">
      <Container>
        <SectionHeading eyebrow="Selected work" title={<>Two systems, different layers of the <span className="font-serif font-normal italic">same craft.</span></>} description="Each project is presented through the problem, my contribution, architecture, and current state." />
        <div className="mt-12 grid gap-6 wide:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
        <div className="mt-8 flex justify-end">
          <Link to="/work" className={buttonVariants({ variant: "outline", size: "lg" })}>View the work index <ArrowRightIcon data-icon="inline-end" /></Link>
        </div>
      </Container>
    </Section>
  )
}

export function CapabilitiesSection() {
  return (
    <Section id="capabilities" className="bg-surface-strong/45">
      <Container>
        <SectionHeading eyebrow="Capabilities" title={<>Tools follow the <span className="font-serif font-normal italic">responsibility.</span></>} description="No confidence bars or logo wall. Every group is tied to shipped work, research, coursework, or a clearly labelled learning track." />
        <div className="mt-12 border-t border-line">
          {capabilities.map((capability) => {
            const Icon = capability.icon
            return (
              <article key={capability.title} className="grid gap-5 border-b border-line py-8 medium:grid-cols-[4rem_1fr] wide:grid-cols-[4rem_1.1fr_1.5fr] wide:gap-8">
                <div className="flex items-start justify-between medium:block">
                  <span className="font-mono text-xs text-ink-muted">/{capability.number}</span>
                  <Icon className="mt-4 hidden size-5 text-ink-muted medium:block" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-heading-3 font-medium">{capability.title}</h3>
                    <span className={capability.state === "Actively learning" ? "rounded-full border border-lime bg-lime-soft px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-moss" : "rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-muted"}>{capability.state}</span>
                  </div>
                  <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-ink-muted">{capability.description}</p>
                  <Link to={capability.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline">Evidence: {capability.evidence} <ArrowRightIcon /></Link>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {capability.technologies.map((technology) => <span key={technology} className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink-muted">{technology}</span>)}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export function AboutNowSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 wide:grid-cols-12 wide:gap-16">
          <div className="wide:col-span-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-ink-muted">/ About + now</p>
            <h2 className="mt-5 max-w-[13ch] text-heading-1 font-medium">Learning to see the whole system.</h2>
            <div className="mt-7 flex max-w-[64ch] flex-col gap-4 text-body-lg leading-relaxed text-ink-muted">
              <p>I’m a computer-science engineering student at ENSI, drawn to the points where interface decisions meet APIs, data models, automation, and infrastructure.</p>
              <p>Systems thinking shapes how I work: make boundaries visible, build a small end-to-end path, verify it, and document what the next engineer needs. I’m currently developing AnsibleGuard while deepening system design, applied ML, and LLM foundations.</p>
              <p>I’m looking for an international internship where I can contribute across the stack and learn inside a thoughtful engineering team.</p>
            </div>
            <Link to="/about" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8" })}>More about how I work <ArrowRightIcon data-icon="inline-end" /></Link>
          </div>
          <aside id="now" className="rounded-2xl border border-line bg-night p-6 text-night-text wide:col-span-5 wide:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-night-text/50">/ Now snapshot</p>
              <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-night-text/50"><span className="size-1.5 rounded-full bg-lime" />Live</span>
            </div>
            <dl className="mt-3">
              <NowRow label="Building" value={now.building.label} href={now.building.href} />
              <NowRow label="Learning" value={now.learning.label} href={now.learning.href} />
              <NowRow label="Reading" value={books.find((book) => book.slug === now.reading.bookSlug)?.title ?? ""} href="/reading" />
            </dl>
            <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-night-text/35">Last meaningfully updated · {now.updatedAt}</p>
          </aside>
        </div>
      </Container>
    </Section>
  )
}

export function ReadingSection() {
  return (
    <Section id="reading-preview" className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 medium:flex-row medium:items-end medium:justify-between">
          <SectionHeading eyebrow="Reading" title={<>Ideas under <span className="font-serif font-normal italic">construction.</span></>} description="A small, honest shelf focused on systems and architecture. All three books are currently ongoing; no invented ratings or progress percentages." />
          <Link to="/reading" className={buttonVariants({ variant: "outline", size: "lg" })}>Open the reading shelf <ArrowRightIcon data-icon="inline-end" /></Link>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line wide:grid-cols-3">
          {books.map((book, index) => (
            <article key={book.slug} className="flex min-h-[270px] flex-col bg-surface p-6">
              <div className="flex items-center justify-between"><BookOpenIcon className="size-5 text-ink-muted" strokeWidth={1.75} /><span className="rounded-full border border-lime bg-lime-soft px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.09em] text-moss">{book.status}</span></div>
              <p className="mt-10 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-ink-muted">Reading track 0{index + 1}</p>
              <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.035em]">{book.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{book.author}</p>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-ink-muted">{book.connection}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <div className="max-w-[760px]">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-ink-muted">/ {eyebrow}</p>
      <h2 className="mt-5 text-heading-1 font-medium">{title}</h2>
      <p className="mt-5 max-w-[62ch] text-body-lg leading-relaxed text-ink-muted">{description}</p>
    </div>
  )
}

function NowRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="grid gap-2 border-b border-white/15 py-5 compact:grid-cols-[6rem_1fr]">
      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-night-text/40">{label}</dt>
      <dd><Link to={href} className="text-sm leading-relaxed text-night-text/80 hover:text-lime">{value}</Link></dd>
    </div>
  )
}
