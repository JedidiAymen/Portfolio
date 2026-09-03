import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

type ContainerProps<T extends ElementType = "div"> = {
  as?: T
  visual?: boolean
  children?: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

export function Container<T extends ElementType = "div">({
  as,
  visual = false,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      className={cn(visual ? "container-visual" : "container-page", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
