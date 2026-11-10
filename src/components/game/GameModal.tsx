import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function GameModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-primary-deep/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "window-panel fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0",
            className,
          )}
        >
          <div className="window-titlebar flex h-10 items-center px-4">
            <DialogPrimitive.Title className="font-pixel text-sm uppercase tracking-wider">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="relative z-10 ml-auto grid size-7 cursor-pointer place-items-center rounded-full border-2 border-primary-deep bg-card text-primary-deep hover:bg-sun"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          {description && <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>}
          <div className="max-h-[calc(90vh-2.5rem)] overflow-y-auto p-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
