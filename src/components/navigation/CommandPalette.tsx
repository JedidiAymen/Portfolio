import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { CommandIcon, SearchIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type PaletteAction = {
  label: string
  detail: string
  keywords: string
  run: () => void | Promise<void>
}

const majorSections = ["#top", "#selected-work", "#capabilities", "#now", "#reading-preview"]

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
}

function setRootMode(name: "focusMode" | "limeMode", active: boolean) {
  if (active) {
    document.documentElement.dataset[name] = "true"
  } else {
    delete document.documentElement.dataset[name]
  }
}

export function CommandPalette() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [night, setNight] = useState(() => document.documentElement.classList.contains("dark"))
  const [focusMode, setFocusMode] = useState(false)
  const [vimNavigation, setVimNavigation] = useState(false)
  const keySequence = useRef("")
  const sequenceTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
        return
      }

      if (open || isTyping(event.target) || event.ctrlKey || event.metaKey || event.altKey) return

      if (event.key === "G") {
        document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" })
        return
      }

      if (vimNavigation && (event.key === "j" || event.key === "k")) {
        const positions = majorSections
          .map((selector) => document.querySelector(selector))
          .filter((element): element is Element => Boolean(element))
        const current = positions.findIndex((element, index) => {
          const next = positions[index + 1]
          return element.getBoundingClientRect().top <= 120 && (!next || next.getBoundingClientRect().top > 120)
        })
        const nextIndex = event.key === "j"
          ? Math.min(positions.length - 1, Math.max(0, current + 1))
          : Math.max(0, current - 1)
        positions[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }

      if (event.key.length !== 1) return
      window.clearTimeout(sequenceTimer.current)
      keySequence.current = `${keySequence.current}${event.key}`.slice(-3)

      if (keySequence.current.endsWith("gg")) {
        document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })
        keySequence.current = ""
      } else if (keySequence.current.endsWith(":wq")) {
        toast("Portfolio saved. You may now exit.")
        keySequence.current = ""
      }

      sequenceTimer.current = window.setTimeout(() => {
        keySequence.current = ""
      }, 900)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.clearTimeout(sequenceTimer.current)
    }
  }, [open, vimNavigation])

  function go(path: string) {
    navigate(path)
    setOpen(false)
    setQuery("")
  }

  function toggleTheme() {
    const next = !night
    document.documentElement.classList.toggle("dark", next)
    window.localStorage.setItem("aymen-theme", next ? "night" : "light")
    setNight(next)
    toast(next ? "Night shift enabled." : "Day shift enabled.")
  }

  function toggleFocusMode() {
    const next = !focusMode
    setRootMode("focusMode", next)
    setFocusMode(next)
    toast(next ? "Focus mode enabled. Press ⌘K to exit." : "Focus mode disabled.")
  }

  function enableLimeMode() {
    setRootMode("limeMode", true)
    toast("Signal boosted.")
    window.setTimeout(() => {
      setRootMode("limeMode", false)
    }, 6000)
  }

  const actions: PaletteAction[] = [
    { label: "Go to selected work", detail: "Smart Capex + AnsibleGuard", keywords: "projects work", run: () => go("/#selected-work") },
    { label: "Best full-stack project", detail: "Open Smart Capex case study", keywords: "recruiter product backend data", run: () => go("/work/smart-capex") },
    { label: "Best infrastructure project", detail: "Open AnsibleGuard case study", keywords: "recruiter ansible research automation", run: () => go("/work/ansibleguard") },
    { label: "Open résumé", detail: "Recruiter-ready summary", keywords: "cv recruiter education", run: () => go("/resume") },
    { label: "Current reading", detail: "Open the reading shelf", keywords: "book reading data intensive system design", run: () => go("/reading") },
    { label: "About Aymen", detail: "Mindset, workflow, and current direction", keywords: "whoami about linux neovim", run: () => go("/about") },
    {
      label: "Copy email",
      detail: "aymen.jedidi@ensi-uma.tn",
      keywords: "contact hire email",
      run: async () => {
        await navigator.clipboard.writeText("aymen.jedidi@ensi-uma.tn")
        toast("Email copied.")
      },
    },
    {
      label: night ? "Switch to day shift" : "Switch to night shift",
      detail: "Change the portfolio theme",
      keywords: "theme dark light night",
      run: toggleTheme,
    },
    {
      label: focusMode ? "Disable Focus mode" : "Enable Focus mode",
      detail: "Remove the surrounding navigation",
      keywords: "focus minimal quiet",
      run: toggleFocusMode,
    },
    {
      label: vimNavigation ? "Vim navigation enabled" : "Enable Vim navigation",
      detail: "gg top · G footer · j/k sections · :wq",
      keywords: "vim keyboard shortcuts help neovim",
      run: () => {
        setVimNavigation(true)
        toast("Vim navigation enabled: gg · G · j · k · :wq")
      },
    },
    { label: "Lime mode", detail: "Temporarily boost the system signal", keywords: "lime signal easter egg", run: enableLimeMode },
    { label: "Open GitHub", detail: "Repositories and activity", keywords: "code github", run: () => window.open("https://github.com/JedidiAymen", "_blank", "noopener,noreferrer") },
  ]

  const normalizedQuery = query.trim().toLowerCase()
  const visibleActions = actions.filter((action) =>
    `${action.label} ${action.detail} ${action.keywords}`.toLowerCase().includes(normalizedQuery),
  )

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} aria-label="Open command palette">
        <CommandIcon data-icon="inline-start" aria-hidden="true" />
        <span className="hidden compact:inline">Navigate</span>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[0.58rem] text-ink-muted medium:inline">⌘K</kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl gap-0 overflow-hidden p-0" showCloseButton={false}>
          <DialogHeader className="border-b border-line p-5">
            <DialogTitle className="text-lg">Navigate the system</DialogTitle>
            <DialogDescription>Search work, current interests, and hidden controls.</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3 px-5 py-4">
            <SearchIcon className="size-4 text-ink-muted" aria-hidden="true" />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “reading”, “infrastructure”, or “lime”…"
              aria-label="Search commands"
            />
          </div>

          <div className="max-h-[min(55vh,420px)] overflow-y-auto border-t border-line p-2">
            {visibleActions.length ? visibleActions.map((action) => (
              <Button
                key={action.label}
                variant="ghost"
                onClick={() => {
                  void action.run()
                  setOpen(false)
                  setQuery("")
                }}
                className="h-auto w-full justify-between px-3 py-3 text-left"
              >
                <span className="flex min-w-0 flex-col items-start gap-1">
                  <span>{action.label}</span>
                  <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.07em] text-ink-muted">{action.detail}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </Button>
            )) : (
              <p className="px-3 py-10 text-center text-sm text-ink-muted">No matching signal.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
