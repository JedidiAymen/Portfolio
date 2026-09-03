import { useState } from "react"
import { Link } from "react-router"

import { Container } from "@/components/foundation/Container"
import { buttonVariants } from "@/components/ui/button-variants"

export function NotFoundPage() {
  const [connected, setConnected] = useState(false)

  return (
    <section className="grid min-h-svh place-items-center bg-canvas pb-20 pt-28">
      <Container className="text-center">
        <button
          type="button"
          onClick={() => setConnected(true)}
          className="group relative mx-auto grid size-36 place-items-center rounded-full border border-line bg-surface shadow-soft"
          aria-label="Reconnect the missing route"
        >
          <span className={connected ? "size-5 rounded-full bg-lime shadow-[0_0_0_12px_var(--lime-soft)]" : "size-5 rounded-full border-2 border-line bg-canvas"} />
          <span className={connected ? "absolute left-1/2 top-1/2 h-px w-36 origin-left bg-lime" : "absolute left-1/2 top-1/2 h-px w-20 origin-left border-t border-dashed border-line"} />
        </button>
        <p className="mt-10 text-meta text-ink-muted">/ ERROR 404</p>
        <h1 className="mx-auto mt-5 max-w-[12ch] text-heading-1 font-medium">
          Route not found. The system is healthy; this path is not.
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-ink-muted">
          {connected ? "Signal restored. The homepage is ready." : "Activate the disconnected node to restore the signal."}
        </p>
        <Link to="/" className={buttonVariants({ variant: "signal", size: "lg", className: "mt-8" })}>
          Return home
        </Link>
      </Container>
    </section>
  )
}
