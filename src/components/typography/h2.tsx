import React from "react";

import { cn } from "@/lib/utils";

// ----------------------------------------------------------

export default function H2({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-2xl xl:text-3xl font-semibold tracking-tight first:mt-0",
        className ?? ""
      )}
    >
      {children}
    </h2>
  );
}
