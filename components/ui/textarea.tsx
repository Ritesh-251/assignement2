import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-36 w-full rounded-md border border-rose/15 bg-white px-3 py-3 text-sm outline-none ring-gold/40 transition placeholder:text-charcoal/40 focus:border-gold focus:ring-4",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
