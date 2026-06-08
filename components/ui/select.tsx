"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-rose/15 bg-white px-3 text-sm font-medium text-charcoal outline-none ring-gold/40 transition focus:border-gold focus:ring-4",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
