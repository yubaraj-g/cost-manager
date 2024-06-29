import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function InlineCode({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className ?? ""
      )}
    >
      {children}
    </code>
  );
}
