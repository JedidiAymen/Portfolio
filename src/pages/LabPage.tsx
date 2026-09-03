import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"

export function LabPage() {
  return (
    <Section className="min-h-[70svh] pt-36 medium:pt-44">
      <Container>
        <p className="text-meta text-ink-muted">/ LAB</p>
        <h1 className="mt-5 max-w-[11ch] text-display-lg font-medium leading-[0.88] tracking-[-0.07em]">Smaller experiments, honestly framed.</h1>
        <p className="mt-7 max-w-[62ch] text-body-lg leading-relaxed text-ink-muted">
          This shelf is being curated. Only experiments with a useful technical note, reproducible code, or a clear lesson will appear here.
        </p>
      </Container>
    </Section>
  )
}
