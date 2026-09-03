import { useState, type FormEvent } from "react"
import { ArrowUpRightIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const responses: Record<string, string> = {
  help: "help · whoami · projects · stack · currently-learning · reading · recruiter-mode · theme night · sudo hire aymen",
  whoami: "Aymen Jedidi — software engineering student at ENSI, building from interface to infrastructure.",
  projects: "Smart Capex / full-stack systems · AnsibleGuard / infrastructure research.",
  stack: "TypeScript · React · NestJS · PostgreSQL/PostGIS · Redis · Python · Ansible · Docker.",
  "currently-learning": "System design · model evaluation · applied ML · LLM foundations.",
  reading: "Designing Data-Intensive Applications · System Design Interview volumes 1 and 2.",
  "recruiter-mode": "Best full-stack evidence: Smart Capex. Best infrastructure evidence: AnsibleGuard. Status: open to international internships.",
  "theme night": "Night shift enabled.",
  "sudo hire aymen": "Permission granted. Start with aymen.jedidi@ensi-uma.tn or inspect the project evidence.",
}

export function TerminalDialog() {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([
    { command: "system", response: "Aymen OS ready. Type help to inspect available commands." },
  ])

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = command.trim().toLowerCase()
    if (!normalized) return

    if (normalized === "clear") {
      setHistory([])
      setCommand("")
      return
    }

    if (normalized === "theme night") {
      document.documentElement.classList.add("dark")
      window.localStorage.setItem("aymen-theme", "night")
    }

    setHistory((current) => [
      ...current,
      {
        command: normalized,
        response: responses[normalized] ?? `Command not found: ${normalized}. Try help.`,
      },
    ])
    setCommand("")
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm">
            <TerminalIcon data-icon="inline-start" aria-hidden="true" />
            / DEV/ENVIRONMENT.STATUS
          </Button>
        }
      />
      <DialogContent className="max-w-2xl gap-0 overflow-hidden border-white/15 bg-night p-0 text-night-text">
        <DialogHeader className="border-b border-white/15 p-5">
          <DialogTitle className="font-mono text-sm text-night-text">AYMEN OS / LIMITED SHELL</DialogTitle>
          <DialogDescription className="font-mono text-xs text-night-text/45">
            A small, safe command set about the engineer behind the interface.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-64 max-h-[50vh] overflow-y-auto p-5 font-mono text-xs leading-relaxed" aria-live="polite">
          {history.map((entry, index) => (
            <div key={`${entry.command}-${index}`} className="mb-5">
              <p className="text-lime">aymen@portfolio:~$ {entry.command}</p>
              <p className="mt-1 text-night-text/65">{entry.response}</p>
              {entry.command === "sudo hire aymen" && (
                <div className="mt-3 flex flex-wrap gap-3">
                  <a className="inline-flex items-center gap-2 text-lime hover:underline" href="mailto:aymen.jedidi@ensi-uma.tn">
                    Email Aymen <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
                  </a>
                  <a className="inline-flex items-center gap-2 text-lime hover:underline" href="https://github.com/JedidiAymen" target="_blank" rel="noreferrer">
                    GitHub <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={runCommand} className="border-t border-white/15 p-5">
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="terminal-command" className="sr-only">Terminal command</FieldLabel>
              <span className="font-mono text-xs text-lime" aria-hidden="true">$</span>
              <Input
                id="terminal-command"
                autoComplete="off"
                spellCheck={false}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="help"
                className="border-white/15 bg-white/5 font-mono text-night-text placeholder:text-night-text/30"
              />
              <Button type="submit" variant="signal" size="sm">Run</Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
