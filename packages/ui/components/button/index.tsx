import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "border-blueprint bg-blueprint text-paper-raised hover:bg-ink",
        outline: "border-grid bg-paper-raised text-ink hover:border-blueprint hover:text-blueprint",
        ghost: "border-transparent bg-transparent text-ink-soft hover:text-blueprint",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: false
  }

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
export type { ButtonProps }
