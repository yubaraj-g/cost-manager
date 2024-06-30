import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function H3({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg xl:text-2xl font-semibold tracking-tight",
        className ?? ""
      )}
    >
      {children}
    </h3>
  );
}
