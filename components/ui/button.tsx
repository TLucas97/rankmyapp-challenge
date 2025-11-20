import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium uppercase tracking-wide transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2 border-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 aria-invalid:border-destructive relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.3)] active:shadow-[0px_0px_0_0_rgba(0,0,0,0.8)] dark:active:shadow-[0px_0px_0_0_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
        destructive:
          "bg-destructive text-white border-destructive shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.3)] active:shadow-[0px_0px_0_0_rgba(0,0,0,0.8)] dark:active:shadow-[0px_0px_0_0_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
        outline:
          "border-border bg-background shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] hover:bg-accent hover:text-accent-foreground hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.3)] active:shadow-[0px_0px_0_0_rgba(0,0,0,0.8)] dark:active:shadow-[0px_0px_0_0_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] hover:shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.3)] active:shadow-[0px_0px_0_0_rgba(0,0,0,0.8)] dark:active:shadow-[0px_0px_0_0_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
        ghost:
          "border-transparent shadow-none hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] active:shadow-[0px_0px_0_0_rgba(0,0,0,0.8)] dark:active:shadow-[0px_0px_0_0_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
        link: "border-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
