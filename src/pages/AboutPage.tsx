import { Link } from "react-router"
import { ArrowRightIcon } from "lucide-react"

import { Container } from "@/components/foundation/Container"
import { Section } from "@/components/foundation/Section"
import { buttonVariants } from "@/components/ui/button-variants"
import { TerminalDialog } from "@/components/portfolio/TerminalDialog"

const principles = [
  "Understand the problem before choosing tools.",
  "Make system boundaries and trade-offs visible.",
  "Build a small working path, verify it, then deepen it.",
  "Document what another engineer needs to continue.",
] as const

export function AboutPage() {
  return (
    <>
      <Section className="pb-12 pt-36 medium:pt-44">
        <Container>
          <p className="text-meta text-ink-muted">/ ABOUT</p>
          <h1 className="mt-5 max-w-[12ch] text-display-lg font-medium leading-[0.88] tracking-[-0.07em]">
            Curious about the whole system.
          </h1>
          <div className="mt-9 grid gap-8 text-body-lg leading-relaxed text-ink-muted wide:grid-cols-2">
            <p>
              I’m a computer-science engineering student at ENSI, drawn to the places where interface decisions meet APIs, data models, automation, and infrastructure.
            </p>
            <p>
              I want to understand how software behaves end to end: what people need, where boundaries belong, how failure appears, and what makes a system easier for the next engineer to change.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface-strong/45">
        <Container>
          <div className="grid gap-12 wide:grid-cols-12">
            <div className="wide:col-span-4">
              <p className="text-meta text-ink-muted">/ HOW I WORK</p>
              <h2 className="mt-5 text-heading-1 font-medium">A repeatable way through unfamiliar problems.</h2>
            </div>
            <ol className="border-t border-line wide:col-span-8">
              {principles.map((principle, index) => (
                <li key={principle} className="grid grid-cols-[3rem_1fr] gap-5 border-b border-line py-6">
                  <span className="font-mono text-xs text-ink-muted">0{index + 1}</span>
                  <span className="text-heading-3 font-medium">{principle}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 wide:grid-cols-2">
            <article className="rounded-2xl border border-line bg-night p-8 text-night-text">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-night-text/45">/ WORKING ENVIRONMENT</p>
              <h2 className="mt-5 text-heading-2 font-medium">Tools chosen for flow, not theatre.</h2>
              <p className="mt-5 leading-relaxed text-night-text/65">
                Arch Linux, i3, Neovim, Git, and the terminal form a deliberate daily workflow: fast navigation, visible state, and tools that stay out of the way.
              </p>
              <div className="mt-7">
                <TerminalDialog />
              </div>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-8">
              <p className="text-meta text-ink-muted">/ CURRENT DIRECTION</p>
              <h2 className="mt-5 text-heading-2 font-medium">Building depth across product, systems, and applied intelligence.</h2>
              <p className="mt-5 leading-relaxed text-ink-muted">
                Current work centers on AnsibleGuard, system design, model evaluation, and LLM foundations—always tied back to concrete engineering evidence.
              </p>
              <Link to="/work" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-7" })}>
                Explore the work <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </article>
          </div>
        </Container>
      </Section>
    </>
  )
}
