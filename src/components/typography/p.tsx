import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function P({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className ?? "")}>
      {children}
    </p>
  );
}
