import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { CommandPalette } from "@/components/navigation/CommandPalette"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const primaryLinks = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "About", href: "/about" },
  { label: "Reading", href: "/reading" },
  { label: "Lab", href: "/lab" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-300",
        scrolled && "border-line/70 bg-canvas/90 backdrop-blur-xl",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-5">
        <Link to="/" className="group flex min-h-11 items-center gap-3" aria-label="Aymen Jedidi, home">
          <span className="grid size-9 place-items-center rounded-full border border-ink bg-ink font-mono text-xs text-surface transition-transform duration-200 group-hover:-rotate-6">
            AJ
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.03em] compact:block">
            Aymen Jedidi
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 wide:flex">
          {primaryLinks.map((item) =>
            item.href.includes("#") ? (
              <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface hover:text-ink">
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-ink",
                  isActive ? "text-ink" : "text-ink-muted",
                )}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <CommandPalette />

        <div className="hidden items-center gap-2 wide:flex">
          <span className="mr-1 flex items-center gap-2 text-xs text-ink-muted">
            <span className="signal-dot" aria-hidden="true" />
            Available for internships
          </span>
          <Link to="/resume" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Résumé
          </Link>
          <a href="mailto:aymen.jedidi@ensi-uma.tn" className={buttonVariants({ variant: "signal", size: "sm" })}>
            Contact
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </div>

        <div className="flex items-center gap-2 wide:hidden">
          <Link to="/resume" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Résumé
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<button type="button" className={buttonVariants({ variant: "ink", size: "icon-sm" })} aria-label="Open navigation" />}
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="w-[min(90vw,380px)] border-line bg-surface p-0" side="right">
              <SheetHeader className="border-b border-line p-6">
                <SheetTitle className="text-xl tracking-[-0.04em]">Navigate the system</SheetTitle>
                <SheetDescription>Work, current learning, and ways to get in touch.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4">
                {primaryLinks.map((item) => {
                  const shared = "rounded-xl px-4 py-3 text-lg font-medium tracking-[-0.03em] transition-colors hover:bg-lime-soft"
                  return item.href.includes("#") ? (
                    <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={shared}>
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className={shared}>
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-auto border-t border-line p-6">
                <p className="mb-4 flex items-center gap-2 text-sm text-ink-muted">
                  <span className="signal-dot" aria-hidden="true" />
                  Open to international internships
                </p>
                <a href="mailto:aymen.jedidi@ensi-uma.tn" className={cn(buttonVariants({ variant: "signal", size: "lg" }), "w-full")}>
                  Start a conversation
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
