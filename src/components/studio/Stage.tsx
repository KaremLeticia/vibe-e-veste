import { X } from "lucide-react";

import { Doll } from "@/components/doll/Doll";
import { CategoryIcon } from "@/components/game/CategoryIcon";
import { GameWindow } from "@/components/game/GameWindow";
import { SparkleBurst, Sparkles } from "@/components/game/Sparkles";
import { CATEGORIES, characterById } from "@/game/catalog";
import { wornItems } from "@/game/logic";
import type { Studio } from "@/game/useStudio";

export function Stage({ studio }: { studio: Studio }) {
  const { composition, feedback } = studio;
  const character = characterById(composition.characterId);
  const worn = wornItems(composition).sort(
    (a, b) => CATEGORIES.findIndex((c) => c.id === a.category) - CATEGORIES.findIndex((c) => c.id === b.category),
  );

  return (
    <GameWindow title={`estúdio · ${character.name}`} className="h-full" bodyClassName="flex flex-col">
      <div className="checker stage-bg relative flex min-h-[420px] flex-1 items-end justify-center overflow-hidden">
        <Sparkles />
        <div className="absolute bottom-4 left-1/2 h-10 w-[58%] max-w-[300px] -translate-x-1/2 rounded-[50%] border-[3px] border-primary-deep bg-primary-glow" aria-hidden />
        <div className="absolute bottom-8 left-1/2 h-10 w-[54%] max-w-[280px] -translate-x-1/2 rounded-[50%] border-[3px] border-primary-deep bg-chrome" aria-hidden />
        <SparkleBurst burstKey={feedback?.nonce ?? 0} />
        <Doll
          composition={composition}
          animateIds={feedback?.ids ?? []}
          className="relative z-[1] mb-6 h-[min(68vh,640px)] w-auto drop-shadow-xl"
        />
        <div aria-live="polite" className="absolute left-3 right-3 top-3 z-20 flex justify-center">
          {feedback && (
            <p
              key={feedback.nonce}
              className="animate-bubble max-w-full rounded-full border-[3px] border-primary-deep bg-card px-4 py-1.5 text-center text-sm font-bold text-primary-deep pop-shadow-sm"
            >
              {feedback.message}
            </p>
          )}
        </div>
      </div>

      <div className="border-t-[3px] border-primary-deep bg-muted/70 p-3">
        <p className="mb-2 font-pixel text-[0.65rem] uppercase text-primary-deep">No look agora</p>
        {worn.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma peça ainda — abra o closet e escolha!</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {worn.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-1.5 rounded-full border-2 border-primary-deep bg-card py-0.5 pl-2 pr-0.5 text-sm font-semibold text-primary-deep"
              >
                <CategoryIcon id={item.category} className="size-4 text-primary" />
                {item.name}
                <button
                  type="button"
                  onClick={() => studio.remove(item.id)}
                  aria-label={`Remover ${item.name}`}
                  className="grid size-6 cursor-pointer place-items-center rounded-full bg-muted text-primary-deep hover:bg-primary hover:text-primary-foreground"
                >
                  <X className="size-3.5" strokeWidth={3} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </GameWindow>
  );
}
