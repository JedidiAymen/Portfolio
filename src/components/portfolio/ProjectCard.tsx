import { Link } from "react-router"
import { ArrowUpRightIcon } from "lucide-react"
import { SiGithub } from "react-icons/si"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Project } from "@/content/projects"

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card className="project-card h-full border border-line bg-surface shadow-none [--card-spacing:--spacing(6)]">
      <CardHeader>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-muted">/0{index + 1} · {project.eyebrow}</p>
        <CardAction>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.09em] text-ink-muted">
            <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
            {project.status}
          </span>
        </CardAction>
        <CardTitle className="pt-5 text-[clamp(2rem,4vw,4.2rem)] leading-[0.95] tracking-[-0.06em]">{project.title}</CardTitle>
        <CardDescription className="max-w-[58ch] pt-2 text-base leading-relaxed">{project.purpose}</CardDescription>
      </CardHeader>

      <CardContent>
        <ProjectDiagram slug={project.slug} />
        <div className="mt-6 grid gap-5 medium:grid-cols-2">
          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.11em] text-ink-muted">My contribution</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{project.contribution}</p>
          </div>
          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.11em] text-ink-muted">Evidence in the work</p>
            <ul className="mt-2 flex flex-col gap-2 text-sm text-ink-muted">
              {project.evidence.slice(0, 2).map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-lime" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => <span key={item} className="rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[0.64rem] text-ink-muted">{item}</span>)}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between gap-3 border-line bg-surface-strong/55">
        <span className="text-xs text-ink-muted">{project.context}</span>
        <div className="flex items-center gap-4">
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
              <SiGithub aria-hidden="true" /> Repository
            </a>
          )}
          <Link to={`/work/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
            Open case study <ArrowUpRightIcon />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

function ProjectDiagram({ slug }: { slug: string }) {
  if (slug === "smart-capex") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-line bg-night p-5 text-night-text" aria-label="Smart Capex system flow: interface to API, then data, jobs, and model service">
        <div aria-hidden="true" className="card-grid absolute inset-0 opacity-30" />
        <div className="relative grid grid-cols-2 gap-3 medium:grid-cols-5">
          {["Interface", "REST API", "PostGIS", "Jobs + cache", "ML service"].map((item, index) => (
            <div key={item} className={index === 1 ? "rounded-lg border border-lime bg-lime/10 px-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-lime" : "rounded-lg border border-white/15 bg-white/5 px-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-night-text/65"}>
              <span className="mb-2 block opacity-50">0{index + 1}</span>{item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-moss p-5 text-night-text" aria-label="AnsibleGuard analysis flow: discover, parse, apply rules, validate, and report">
      <div aria-hidden="true" className="card-grid absolute inset-0 opacity-25" />
      <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 medium:grid-cols-5">
        {["Discover", "Parse", "Rules", "Validate", "Report"].map((item, index) => (
          <div key={item} className={index === 2 ? "bg-lime px-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-moss" : "bg-moss px-3 py-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-night-text/65"}>
            <span className="mb-2 block opacity-50">0{index + 1}</span>{item}
          </div>
        ))}
      </div>
    </div>
  )
}
