import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Camera, Pencil, RotateCcw, Sparkles as SparklesIcon, Wand2 } from "lucide-react";
import { useState } from "react";

import { Doll } from "@/components/doll/Doll";
import { GameButton } from "@/components/game/GameButton";
import { Sparkles } from "@/components/game/Sparkles";
import { LOOK_NAME_SUGGESTIONS, characterById } from "@/game/catalog";
import { wornItems } from "@/game/logic";
import type { Studio } from "@/game/useStudio";
import { cn } from "@/lib/utils";

type Mode = "runway" | "photo";

const FLASHES = [
  { x: 6, y: 30, d: 0.2 },
  { x: 14, y: 55, d: 1.1 },
  { x: 86, y: 34, d: 0.7 },
  { x: 92, y: 60, d: 1.7 },
  { x: 22, y: 76, d: 2.1 },
  { x: 78, y: 80, d: 1.4 },
];

function Runway({ studio, take }: { studio: Studio; take: number }) {
  return (
    <div className="runway-bg relative h-full min-h-[460px] overflow-hidden">
      {/* spotlights */}
      <div className="absolute -top-10 left-1/2 h-[120%] w-[70%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--primary-glow),transparent_65%)] opacity-50" aria-hidden />
      {/* runway floor */}
      <div
        className="absolute bottom-0 left-1/2 h-[55%] w-[90%] -translate-x-1/2 bg-chrome opacity-90 [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-1/2 h-[55%] w-[60%] -translate-x-1/2 bg-primary opacity-80 [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]"
        aria-hidden
      />
      {FLASHES.map((f, i) => (
        <div
          key={i}
          className="absolute size-16 animate-flash rounded-full bg-[radial-gradient(circle,var(--card),transparent_70%)]"
          style={{ left: `${f.x}%`, top: `${f.y}%`, animationDelay: `${f.d}s` }}
          aria-hidden
        />
      ))}
      <Sparkles tone="text-sun" />
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <div key={take} className="animate-runway origin-bottom">
          <div className="animate-step origin-bottom">
            <div className="animate-pose origin-bottom [animation-delay:4.2s]">
              <Doll composition={studio.composition} className="h-[min(70vh,620px)] w-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
      <p className="absolute left-4 top-4 rounded-full border-2 border-card px-3 py-1 font-pixel text-xs uppercase text-primary-foreground">
        ● ao vivo · desfile
      </p>
    </div>
  );
}

function PhotoShoot({ studio, name }: { studio: Studio; name: string }) {
  return (
    <div className="checker relative flex h-full min-h-[460px] items-center justify-center overflow-hidden bg-primary-glow p-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <div key={r} className="flex animate-marquee whitespace-nowrap font-display text-5xl text-card" style={{ animationDelay: `${-r * 3}s` }}>
            {"Vibe & Veste ★ ".repeat(12)}
          </div>
        ))}
      </div>
      <figure className="relative rotate-[-3deg] rounded-md border-[3px] border-primary-deep bg-card p-3 pb-14 pop-shadow">
        <div className="stage-bg overflow-hidden rounded-sm">
          <div className="animate-pose origin-bottom">
            <Doll composition={studio.composition} className="h-[min(58vh,520px)] w-auto" />
          </div>
        </div>
        <figcaption className="absolute inset-x-3 bottom-3 truncate text-center font-display text-2xl text-primary">{name}</figcaption>
        <span className="absolute -right-4 -top-4 rotate-12 rounded-full border-[3px] border-primary-deep bg-sun px-3 py-1 font-pixel text-xs text-primary-deep">
          capa!
        </span>
      </figure>
      <div className="pointer-events-none absolute inset-0 animate-flash bg-card" aria-hidden />
      <p className="absolute left-4 top-4 flex items-center gap-2 rounded-full border-2 border-primary-deep bg-card px-3 py-1 font-pixel text-xs uppercase text-primary-deep">
        <Camera className="size-4" /> sessão de fotos
      </p>
    </div>
  );
}

export function FinalLook({
  studio,
  open,
  onClose,
}: {
  studio: Studio;
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>("runway");
  const [take, setTake] = useState(0);
  const { composition } = studio;
  const character = characterById(composition.characterId);
  const name = composition.lookName.trim() || "Look sem nome";
  const pieces = wornItems(composition).filter((i) => i.category !== "hair").length;

  const suggest = () => {
    const options = LOOK_NAME_SUGGESTIONS.filter((s) => s !== composition.lookName);
    studio.rename(options[(take + options.length + pieces) % options.length]);
    setTake((t) => t + 1);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-primary-deep/70 backdrop-blur-sm" />
        <DialogPrimitive.Content className="window-panel fixed inset-2 z-50 flex flex-col sm:inset-6 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0">
          <div className="window-titlebar flex h-10 shrink-0 items-center px-4">
            <DialogPrimitive.Title className="font-pixel text-sm uppercase tracking-wider">look_finalizado.exe</DialogPrimitive.Title>
          </div>
          <DialogPrimitive.Description className="sr-only">Sua personagem com a composição final do look.</DialogPrimitive.Description>
          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_380px]">
            <div className="relative min-h-[460px]">
              {mode === "runway" ? <Runway studio={studio} take={take} /> : <PhotoShoot studio={studio} name={name} />}
            </div>
            <aside className="flex flex-col gap-4 border-t-[3px] border-primary-deep bg-card p-5 lg:border-l-[3px] lg:border-t-0">
              <div className="flex gap-2 rounded-full border-[3px] border-primary-deep bg-muted p-1" role="tablist" aria-label="Modo de apresentação">
                {(
                  [
                    ["runway", "Desfile", SparklesIcon],
                    ["photo", "Sessão de fotos", Camera],
                  ] as const
                ).map(([m, label, Icon]) => (
                  <button
                    key={m}
                    role="tab"
                    type="button"
                    aria-selected={mode === m}
                    onClick={() => {
                      setMode(m);
                      setTake((t) => t + 1);
                    }}
                    className={cn(
                      "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold",
                      mode === m ? "bg-jelly text-primary-foreground" : "text-primary-deep",
                    )}
                  >
                    <Icon className="size-4" /> {label}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="look-name" className="font-pixel text-[0.65rem] uppercase text-primary-deep">
                  Nome do look
                </label>
                <div className="mt-1.5 flex gap-2">
                  <div className="relative flex-1">
                    <Pencil className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="look-name"
                      value={composition.lookName}
                      onChange={(e) => studio.rename(e.target.value)}
                      placeholder="Dê um nome ao seu look"
                      maxLength={40}
                      className="h-11 w-full rounded-full border-[3px] border-primary-deep bg-background pl-9 pr-3 font-bold text-primary-deep placeholder:font-normal placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary-glow"
                    />
                  </div>
                  <GameButton variant="blue" size="icon" className="size-11" onClick={suggest} aria-label="Sugerir nome" title="Sugerir nome">
                    <Wand2 />
                  </GameButton>
                </div>
              </div>

              <div className="rounded-3xl border-[3px] border-primary-deep bg-muted p-4 text-center">
                <p className="font-pixel text-[0.65rem] uppercase text-muted-foreground">apresentando</p>
                <p className="pink-text mt-1 break-words font-display text-3xl leading-tight">{name}</p>
                <p className="mt-3 text-sm leading-snug text-primary-deep">
                  Arrasou! {character.name} está pronta para brilhar com {pieces} {pieces === 1 ? "peça escolhida" : "peças escolhidas"} por você. Esse
                  look é a cara da passarela!
                </p>
              </div>

              <div className="mt-auto grid gap-2">
                <GameButton variant="chrome" onClick={() => setTake((t) => t + 1)}>
                  <RotateCcw /> <span>{mode === "runway" ? "Desfilar de novo" : "Nova pose"}</span>
                </GameButton>
                <GameButton variant="blue" onClick={onClose}>
                  <Pencil /> <span>Voltar à edição</span>
                </GameButton>
                <GameButton
                  onClick={() => {
                    studio.newLook();
                    onClose();
                  }}
                >
                  <SparklesIcon /> <span>Criar novo look</span>
                </GameButton>
              </div>
            </aside>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
