import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib";

const badgeVariants = cva("mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] transition-colors", {
  variants: {
    variant: {
      default: "border-transparent bg-lime text-ink",
      outline: "border-fg/12 bg-fg/[0.03] text-fg/70",
      award: "border-transparent bg-gradient-to-r from-[#FFD66B] to-[#FF9E3D] text-ink",
      muted: "border-transparent bg-fg/[0.06] text-fg/60",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
