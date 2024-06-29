import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function Large({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("text-lg font-semibold", className ?? "")}>
      {children}
    </div>
  );
}
