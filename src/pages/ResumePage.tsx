import { Link } from "react-router"

import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { projects } from "@/content/projects"

export function ResumePage() {
  return (
    <Section className="pt-36 medium:pt-44">
      <Container>
        <p className="text-meta text-ink-muted">/ WEB RÉSUMÉ</p>
        <div className="mt-5 grid gap-10 border-b border-line pb-12 wide:grid-cols-12">
          <h1 className="text-display-lg font-medium leading-[0.88] tracking-[-0.07em] wide:col-span-8">Aymen Jedidi</h1>
          <div className="wide:col-span-4">
            <p className="text-body-lg leading-relaxed text-ink-muted">Software engineering student at ENSI building reliable systems from interface to infrastructure.</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">Tunis, Tunisia · Open to relocation / remote</p>
          </div>
        </div>

        <div className="grid gap-12 py-12 wide:grid-cols-12">
          <div className="wide:col-span-4">
            <p className="text-meta text-ink-muted">/ EDUCATION + LEARNING</p>
            <h2 className="mt-5 text-heading-2 font-medium">ENSI</h2>
            <p className="mt-2 text-ink-muted">Computer-science engineering</p>
            <h2 className="mt-8 text-heading-3 font-medium">Samsung AI Campus</h2>
            <p className="mt-2 text-ink-muted">Applied AI training</p>
          </div>
          <div className="wide:col-span-8">
            <p className="text-meta text-ink-muted">/ SELECTED PROJECTS</p>
            <div className="mt-5 border-t border-line">
              {projects.map((project) => (
                <article key={project.slug} className="border-b border-line py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-heading-3 font-medium">{project.title}</h2>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-muted">{project.status}</span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-muted">{project.contribution}</p>
                  <Link to={`/work/${project.slug}`} className="mt-4 inline-block text-sm font-medium underline underline-offset-4">Read case study</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
