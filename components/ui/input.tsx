import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-rose/15 bg-white px-3 text-sm outline-none ring-gold/40 transition placeholder:text-charcoal/40 focus:border-gold focus:ring-4",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
