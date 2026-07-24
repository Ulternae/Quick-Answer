import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string
  errorOverlayClassName?: string
  isInvalid?: boolean
  showErrorLabel?: boolean
}

function Input({
  className,
  containerClassName,
  errorOverlayClassName,
  isInvalid,
  showErrorLabel = false,
  type,
  ...props
}: InputProps) {
  return (
    <div className={cn("group relative", containerClassName)}>
      <input
        {...props}
        type={type}
        data-slot="input"
        aria-invalid={isInvalid || props["aria-invalid"] || undefined}
        className={cn(
          "relative h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs outline-none transition-all duration-300 selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          isInvalid &&
            "border-destructive/70 focus-visible:border-destructive/50 focus-visible:ring-destructive/50",
          className
        )}
      />
      {showErrorLabel && isInvalid ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 bg-background pl-2 text-xs leading-none text-destructive uppercase transition-all duration-300 group-focus-within:opacity-0",
            errorOverlayClassName
          )}
        >
          {props.placeholder}
        </span>
      ) : null}
    </div>
  )
}

export { Input }
export type { InputProps }
