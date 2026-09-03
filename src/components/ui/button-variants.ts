import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium transition-[background-color,color,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-ink bg-ink text-surface hover:bg-moss",
        ink: "border-ink bg-ink text-surface hover:bg-moss",
        signal: "border-lime bg-lime text-moss hover:bg-lime-bright",
        outline: "border-line bg-surface text-ink hover:bg-surface-strong",
        surface: "border-line bg-surface text-ink hover:bg-surface-strong",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "border-transparent bg-transparent text-ink hover:bg-surface-strong",
        destructive: "border-destructive bg-destructive text-white hover:bg-destructive/90",
        link: "border-transparent bg-transparent p-0 text-ink underline-offset-4 hover:underline",
        text: "border-transparent bg-transparent p-0 text-ink hover:text-moss",
      },
      size: {
        default: "h-11 px-5 text-sm",
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "size-11 p-0",
        "icon-xs": "size-7 rounded-md p-0",
        "icon-sm": "size-9 rounded-md p-0",
        "icon-lg": "size-12 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
