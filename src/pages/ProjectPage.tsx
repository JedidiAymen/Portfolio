import { Link, useParams } from "react-router"
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react"

import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { buttonVariants } from "@/components/ui/button-variants"
import { getProject } from "@/content/projects"
import { NotFoundPage } from "@/pages/NotFoundPage"

const studyCopy = {
  "smart-capex": {
    problem:
      "Capital-planning decisions cross operational, technical, geospatial, and financial boundaries. The product needs to keep that path understandable while giving each role the right view and actions.",
    ownership:
      "My work spans the product interface and service boundaries: role-aware workflows, API contracts, validation, spatial data, background work, caching, and object storage integration.",
    constraints: [
      "Several roles participate in one decision path.",
      "Map and geospatial data need clear frontend-to-backend boundaries.",
      "Longer-running analysis should not block normal product workflows.",
    ],
    flow: ["Web interface", "NestJS API", "PostgreSQL + PostGIS", "Redis + BullMQ", "ML service"],
    decisions: [
      ["Role-aware workflow", "Keep access rules and available actions explicit at each product step."],
      ["Spatial data boundary", "Use PostGIS for geographic queries instead of treating location as ordinary text fields."],
      ["Background work", "Separate longer-running jobs from request-response paths through a queue boundary."],
    ],
    next: "Continue verification of the end-to-end role flows and document measured behavior as the system matures.",
  },
  ansibleguard: {
    problem:
      "Infrastructure-as-code repositories can accumulate maintainability, security, idempotency, and review problems that are difficult to study consistently across real projects.",
    ownership:
      "I am developing the parser and rule engine, repository-discovery pipeline, provider integrations, normalized reports, calibration workflow, and reproducibility controls.",
    constraints: [
      "Ansible syntax and repository layouts vary across real projects.",
      "A useful rule catalog must distinguish stable findings from experimental ones.",
      "Research results need reproducible inputs, manifests, and machine-readable outputs.",
    ],
    flow: ["Discover", "Parse", "Apply rules", "Validate", "Report"],
    decisions: [
      ["Versioned rule catalog", "Keep stable and experimental definitions visible instead of presenting every detector as equally mature."],
      ["Provider boundary", "Normalize external tools such as GitLeaks and ansible-lint behind a consistent analysis flow."],
      ["Multiple outputs", "Support human review and automation through text, JSON, CSV, and SARIF reporting."],
    ],
    next: "Expand validation evidence, calibrate rules against representative repositories, and document known limitations.",
  },
} as const

export function ProjectPage() {
  const { slug = "" } = useParams()
  const project = getProject(slug)
  const copy = studyCopy[slug as keyof typeof studyCopy]

  if (!project || !copy) return <NotFoundPage />

  return (
    <>
      <Section className="pb-12 pt-36 medium:pt-44">
        <Container>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
            <ArrowLeftIcon data-icon="inline-start" aria-hidden="true" /> Back to work
          </Link>
          <p className="mt-10 text-meta text-ink-muted">/ {project.eyebrow}</p>
          <h1 className="mt-5 text-display-xl font-medium leading-[0.82] tracking-[-0.08em]">{project.title}</h1>
          <p className="mt-7 max-w-[68ch] text-body-lg leading-relaxed text-ink-muted">{project.purpose}</p>

          <dl className="mt-10 grid border-l border-t border-line compact:grid-cols-2 wide:grid-cols-4">
            <Meta label="STATUS" value={project.status} />
            <Meta label="CONTEXT" value={project.context} />
            <Meta label="ROLE" value="Engineering / implementation" />
            <Meta label="STACK" value={project.stack.join(" · ")} />
          </dl>
        </Container>
      </Section>

      <Section className="border-y border-line bg-night text-night-text">
        <Container visual>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-night-text/45">/ SYSTEM OVERVIEW</p>
          <div className="mt-8 grid gap-3 wide:grid-cols-5">
            {copy.flow.map((node, index) => (
              <div key={node} className={index === 2 ? "rounded-xl border border-lime bg-lime/10 p-5 text-lime" : "rounded-xl border border-white/15 bg-white/5 p-5 text-night-text/70"}>
                <span className="font-mono text-[0.62rem] opacity-50">0{index + 1}</span>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.08em]">{node}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-14 wide:grid-cols-12">
            <article className="wide:col-span-6">
              <p className="text-meta text-ink-muted">/ THE PROBLEM</p>
              <h2 className="mt-5 text-heading-1 font-medium">Why the system exists.</h2>
              <p className="mt-6 max-w-[60ch] text-body-lg leading-relaxed text-ink-muted">{copy.problem}</p>
            </article>
            <article className="wide:col-span-6">
              <p className="text-meta text-ink-muted">/ SCOPE + OWNERSHIP</p>
              <h2 className="mt-5 text-heading-1 font-medium">What I am responsible for.</h2>
              <p className="mt-6 max-w-[60ch] text-body-lg leading-relaxed text-ink-muted">{copy.ownership}</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface-strong/45">
        <Container>
          <div className="grid gap-12 wide:grid-cols-12">
            <div className="wide:col-span-4">
              <p className="text-meta text-ink-muted">/ CONSTRAINTS</p>
              <h2 className="mt-5 text-heading-2 font-medium">The conditions shaping the work.</h2>
            </div>
            <ol className="border-t border-line wide:col-span-8">
              {copy.constraints.map((constraint, index) => (
                <li key={constraint} className="grid grid-cols-[3rem_1fr] gap-5 border-b border-line py-6">
                  <span className="font-mono text-xs text-ink-muted">0{index + 1}</span>
                  <span className="text-lg font-medium">{constraint}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="text-meta text-ink-muted">/ TECHNICAL DECISIONS</p>
          <h2 className="mt-5 max-w-[12ch] text-heading-1 font-medium">Choices made visible.</h2>
          <div className="mt-10 border-t border-line">
            {copy.decisions.map(([title, reason], index) => (
              <article key={title} className="grid gap-4 border-b border-line py-7 medium:grid-cols-[4rem_1fr_1.5fr]">
                <span className="font-mono text-xs text-ink-muted">0{index + 1}</span>
                <h3 className="text-heading-3 font-medium">{title}</h3>
                <p className="leading-relaxed text-ink-muted">{reason}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <div className="rounded-2xl border border-line bg-surface p-7 medium:p-10">
            <p className="text-meta text-ink-muted">/ CURRENT STATE + NEXT</p>
            <p className="mt-5 max-w-[65ch] text-heading-3 font-medium leading-relaxed">{copy.next}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repositoryUrl && (
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "signal", size: "lg" })}>
                  Inspect repository <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              )}
              <Link to="/work" className={buttonVariants({ variant: "outline", size: "lg" })}>Next project</Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-r border-line p-5">
      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-muted">/{label}</dt>
      <dd className="mt-3 text-sm leading-relaxed">{value}</dd>
    </div>
  )
}
