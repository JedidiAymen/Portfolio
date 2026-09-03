import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type SurfaceProps = {
  children: ReactNode
  className?: string
  variant?: "default" | "subtle" | "strong"
} & HTMLAttributes<HTMLDivElement>

export function Surface({
  children,
  className,
  variant = "default",
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border",
        variant === "default" && "border-line bg-surface",
        variant === "subtle" && "border-line/70 bg-surface",
        variant === "strong" && "border-line bg-surface-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
