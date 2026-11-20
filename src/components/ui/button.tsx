import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-lime text-ink hover:bg-ink hover:text-paper",
        outline: "border border-fg/15 bg-fg/[0.03] text-fg backdrop-blur hover:border-lime/60 hover:bg-lime/10 hover:text-lime",
        ghost: "text-fg/80 hover:bg-fg/5 hover:text-fg",
        glow: "bg-gradient-to-r from-lime via-cyan to-violet text-ink hover:brightness-110",
      },
      size: { default: "h-11 px-5", sm: "h-9 px-4 text-[13px]", lg: "h-14 px-7 text-[15px]", icon: "h-11 w-11" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { buttonVariants };
