import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { ProjectCard } from "@/components/portfolio/ProjectCard"
import { projects } from "@/content/projects"

export function WorkPage() {
  return (
    <>
      <Section className="pb-12 pt-36 medium:pt-44">
        <Container>
          <p className="text-meta text-ink-muted">/ WORK INDEX</p>
          <h1 className="mt-5 max-w-[11ch] text-display-lg font-medium leading-[0.88] tracking-[-0.07em]">
            Systems built across boundaries.
          </h1>
          <p className="mt-7 max-w-[62ch] text-body-lg leading-relaxed text-ink-muted">
            Flagship work selected for engineering depth, ownership, and relevance—not for filling a grid.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-line pt-12">
        <Container>
          <div className="grid gap-6 wide:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
