import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionProps<T extends ElementType = "section"> = {
  as?: T
  children: ReactNode
  className?: string
  spacing?: "none" | "sm" | "md" | "lg"
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  spacing = "md",
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section"

  return (
    <Component
      className={cn(
        spacing === "sm" && "section-space-sm",
        spacing === "md" && "section-space",
        spacing === "lg" && "section-space-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
