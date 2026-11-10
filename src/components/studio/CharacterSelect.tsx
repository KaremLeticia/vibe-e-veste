import { ArrowRight, Check } from "lucide-react";

import { Doll } from "@/components/doll/Doll";
import { GameButton } from "@/components/game/GameButton";
import { GameWindow } from "@/components/game/GameWindow";
import { Sparkles } from "@/components/game/Sparkles";
import { CHARACTERS, SKIN_TONES, characterById } from "@/game/catalog";
import { createComposition } from "@/game/logic";
import type { Studio } from "@/game/useStudio";
import { cn } from "@/lib/utils";

export function CharacterSelect({ studio }: { studio: Studio }) {
  const { composition } = studio;
  const current = characterById(composition.characterId);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_minmax(320px,420px)]">
      <GameWindow title="escolha_sua_personagem.exe" bodyClassName="p-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CHARACTERS.map((c) => {
            const selected = c.id === composition.characterId;
            const preview = { ...createComposition(c.id), skinToneId: selected ? composition.skinToneId : c.defaultSkinToneId };
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => studio.pickCharacter(c.id)}
                aria-pressed={selected}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-3xl border-[3px] border-primary-deep bg-card p-2 pb-3 text-center transition-transform hover:-translate-y-1",
                  selected ? "glow-ring bg-muted" : "pop-shadow-sm",
                )}
              >
                {selected && (
                  <span className="absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full border-2 border-primary-deep bg-sun text-primary-deep">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                )}
                <div className="checker stage-bg w-full overflow-hidden rounded-2xl">
                  <Doll composition={preview} className="mx-auto -mb-[60%] h-auto w-full" />
                </div>
                <span className="mt-2 font-display text-xl text-primary">{c.name}</span>
                <span className="text-xs leading-tight text-muted-foreground">{c.vibe}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h3 className="font-pixel text-xs uppercase tracking-wider text-primary-deep">Tom de pele</h3>
          <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Tom de pele">
            {SKIN_TONES.map((s) => {
              const selected = s.id === composition.skinToneId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={s.name}
                  title={s.name}
                  onClick={() => studio.setSkin(s.id)}
                  className={cn(
                    "size-11 cursor-pointer rounded-full border-[3px] border-primary-deep transition-transform hover:scale-110",
                    selected ? "glow-ring scale-110" : "pop-shadow-sm",
                  )}
                  style={{ background: `radial-gradient(circle at 35% 30%, ${s.base}, ${s.shade})` }}
                />
              );
            })}
          </div>
        </div>
      </GameWindow>

      <GameWindow title={`perfil: ${current.name}`} bodyClassName="relative flex flex-col items-center p-5">
        <div className="checker stage-bg relative w-full overflow-hidden rounded-3xl border-[3px] border-primary-deep">
          <Sparkles />
          <Doll composition={composition} className="relative mx-auto h-[min(56vh,520px)] w-auto animate-float" />
        </div>
        <p className="mt-4 font-display text-3xl text-primary">{current.name}</p>
        <p className="text-sm text-muted-foreground">{current.vibe}</p>
        <GameButton size="lg" className="mt-4 w-full" onClick={() => studio.setPhase("dress")}>
          <span>Ir para o closet</span>
          <ArrowRight />
        </GameButton>
      </GameWindow>
    </div>
  );
}
