import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** 2000s-style app window with a glossy title bar. */
export function GameWindow({
  title,
  children,
  className,
  bodyClassName,
  right,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  right?: ReactNode;
}) {
  return (
    <section className={cn("window-panel flex flex-col", className)}>
      <header className="window-titlebar flex h-9 shrink-0 items-center gap-2 px-3 text-xs">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full border-2 border-primary-deep bg-sun" />
          <span className="size-3 rounded-full border-2 border-primary-deep bg-accent" />
          <span className="size-3 rounded-full border-2 border-primary-deep bg-card" />
        </span>
        <h2 className="truncate font-pixel text-xs uppercase tracking-wider">{title}</h2>
        <div className="ml-auto flex items-center gap-1">{right}</div>
      </header>
      <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}
