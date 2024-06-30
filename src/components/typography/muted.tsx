import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function Muted({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-xs xl:text-sm text-muted-foreground", className ?? "")}>
      {children}
    </p>
  );
}
