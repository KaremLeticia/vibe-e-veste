import { starPath } from "@/components/doll/shapes";
import { cn } from "@/lib/utils";

const DEFAULT = [
  { x: 8, y: 12, s: 22, d: 0 },
  { x: 88, y: 8, s: 16, d: 0.6 },
  { x: 92, y: 62, s: 26, d: 1.2 },
  { x: 4, y: 72, s: 18, d: 1.8 },
  { x: 50, y: 4, s: 12, d: 0.9 },
  { x: 70, y: 90, s: 14, d: 1.5 },
];

/** Decorative twinkling stars positioned in % over their parent. */
export function Sparkles({ className, items = DEFAULT, tone = "text-card" }: { className?: string; items?: typeof DEFAULT; tone?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {items.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("absolute animate-twinkle drop-shadow", tone)}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
        >
          <path d={starPath(10, 10, 10)} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

/** One-shot burst of stars, re-triggered by changing `burstKey`. */
export function SparkleBurst({ burstKey }: { burstKey: number }) {
  if (!burstKey) return null;
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return { dx: Math.cos(a) * 130, dy: Math.sin(a) * 160, s: 10 + (i % 3) * 6 };
  });
  return (
    <div key={burstKey} className="pointer-events-none absolute left-1/2 top-[38%] z-10" aria-hidden>
      {rays.map((r, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("absolute animate-burst", i % 2 ? "text-sun" : "text-card")}
          style={{ width: r.s, height: r.s, ["--dx" as string]: `${r.dx}px`, ["--dy" as string]: `${r.dy}px` }}
        >
          <path d={starPath(10, 10, 10)} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
