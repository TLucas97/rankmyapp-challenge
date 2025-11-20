import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
    "flex w-full rounded-none border-2 border-border bg-background text-sm transition-all duration-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.3)] focus-visible:shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] dark:focus-visible:shadow-[1px_1px_0_0_rgba(255,255,255,0.3)]",
    {
        variants: {
            inputSize: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3 text-xs",
                lg: "h-10 px-6",
            },
        },
        defaultVariants: {
            inputSize: "default",
        },
    }
)

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, inputSize, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ inputSize, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input, inputVariants }

