import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const gameButtonVariants = cva(
  "jelly inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-[3px] border-primary-deep font-extrabold tracking-wide cursor-pointer select-none transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-glow disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0 [&>*]:relative [&>*]:z-[2]",
  {
    variants: {
      variant: {
        jelly: "bg-jelly text-primary-foreground pop-shadow [text-shadow:1px_1px_0_var(--primary-deep)]",
        blue: "bg-jelly-blue text-secondary-foreground pop-shadow",
        chrome: "bg-chrome text-primary-deep pop-shadow",
        soft: "bg-card text-primary-deep pop-shadow-sm",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "jelly", size: "md" },
  },
);

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gameButtonVariants> {
  asChild?: boolean;
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(gameButtonVariants({ variant, size }), className)} {...props} />;
  },
);
GameButton.displayName = "GameButton";
