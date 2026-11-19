import { ArrowRight, Check, RotateCcw, Undo2 } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Doll } from "@/components/doll/Doll";
import { GameButton } from "@/components/game/GameButton";
import { GameWindow } from "@/components/game/GameWindow";
import { Sparkles } from "@/components/game/Sparkles";
import {
  BROW_STYLES,
  EYE_COLORS,
  EYE_SHAPES,
  HAIR_COLORS,
  LIP_COLORS,
  SHADOW_COLORS,
  SKIN_TONES,
  characterById,
  itemsByCategory,
} from "@/game/catalog";
import type { Studio } from "@/game/useStudio";
import { cn } from "@/lib/utils";

type Tab = "pele" | "cabelo" | "olhos" | "boca" | "detalhes";
const TABS: { id: Tab; label: string }[] = [
  { id: "pele", label: "Pele" },
  { id: "cabelo", label: "Cabelo" },
  { id: "olhos", label: "Olhos" },
  { id: "boca", label: "Boca" },
  { id: "detalhes", label: "Detalhes" },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="mb-3 font-pixel text-xs uppercase tracking-wider text-primary-deep">{title}</h3>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function Swatch({ color, name, selected, onClick }: { color: string; name: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={name}
      title={name}
      onClick={onClick}
      className={cn(
        "size-11 cursor-pointer rounded-full border-[3px] border-primary-deep transition-transform hover:scale-110",
        selected ? "glow-ring scale-110" : "pop-shadow-sm",
      )}
      style={{ background: color }}
    />
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-1 rounded-full border-[3px] border-primary-deep px-4 py-2 font-display text-base transition-transform hover:-translate-y-0.5",
        selected ? "glow-ring bg-primary text-primary-foreground" : "pop-shadow-sm bg-card text-primary",
      )}
    >
      {selected && <Check className="size-4" strokeWidth={3} />}
      {label}
    </button>
  );
}

export function DollCreator({ studio }: { studio: Studio }) {
  const { composition } = studio;
  const [tab, setTab] = useState<Tab>("pele");
  const look = composition.look ?? characterById(composition.characterId).look;
  const hairId = composition.itemIds.find((id) => id.startsWith("hair-"));

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
      <GameWindow title="etapa_1: crie_sua_boneca.exe" bodyClassName="relative flex flex-col items-center p-5">
        <div className="checker stage-bg relative w-full overflow-hidden rounded-3xl border-[3px] border-primary-deep">
          <Sparkles />
          <Doll composition={composition} title="Sua boneca" className="relative mx-auto h-[min(62vh,560px)] w-auto animate-float" />
        </div>
        {studio.feedback && (
          <p key={studio.feedback.nonce} className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            {studio.feedback.message}
          </p>
        )}
      </GameWindow>

      <GameWindow title="beleza & traços" bodyClassName="flex flex-col p-5">
        <div className="mb-5 flex flex-wrap gap-2" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "cursor-pointer rounded-xl border-[3px] border-primary-deep px-3 py-1.5 font-pixel text-[0.7rem] uppercase",
                tab === t.id ? "bg-sun text-primary-deep" : "bg-card text-primary",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="min-h-[300px] flex-1">
          {tab === "pele" && (
            <Section title="Tom de pele">
              {SKIN_TONES.map((s) => (
                <Swatch key={s.id} name={s.name} selected={s.id === composition.skinToneId} onClick={() => studio.setSkin(s.id)}
                  color={`radial-gradient(circle at 35% 30%, ${s.base}, ${s.shade})`} />
              ))}
            </Section>
          )}
          {tab === "cabelo" && (
            <>
              <Section title="Estilo">
                {itemsByCategory("hair").map((h) => (
                  <Chip key={h.id} label={h.name} selected={h.id === hairId} onClick={() => h.id !== hairId && studio.toggle(h.id)} />
                ))}
              </Section>
              <Section title="Cor">
                {HAIR_COLORS.map((c) => (
                  <Swatch key={c.id} name={c.name} selected={c.id === composition.hairColorId} onClick={() => studio.setHairColor(c.id)}
                    color={`linear-gradient(135deg, ${c.shine}, ${c.base} 45%, ${c.shade})`} />
                ))}
              </Section>
            </>
          )}
          {tab === "olhos" && (
            <>
              <Section title="Formato">
                {EYE_SHAPES.map((e) => (
                  <Chip key={e.id} label={e.name} selected={look.eyeShape === e.id} onClick={() => studio.setLook({ eyeShape: e.id })} />
                ))}
              </Section>
              <Section title="Cor dos olhos">
                {EYE_COLORS.map((c) => (
                  <Swatch key={c.id} name={c.name} color={c.value} selected={look.eyeColor === c.value} onClick={() => studio.setLook({ eyeColor: c.value })} />
                ))}
              </Section>
              <Section title="Sombra">
                {SHADOW_COLORS.map((c) => (
                  <Swatch key={c.id} name={c.name} color={c.value} selected={look.shadowColor === c.value} onClick={() => studio.setLook({ shadowColor: c.value })} />
                ))}
              </Section>
              <Section title="Sobrancelhas">
                {BROW_STYLES.map((b) => (
                  <Chip key={b.id} label={b.name} selected={look.brow === b.id} onClick={() => studio.setLook({ brow: b.id })} />
                ))}
              </Section>
            </>
          )}
          {tab === "boca" && (
            <Section title="Batom & gloss">
              {LIP_COLORS.map((c) => (
                <Swatch key={c.id} name={c.name} color={c.value} selected={look.lipColor === c.value} onClick={() => studio.setLook({ lipColor: c.value })} />
              ))}
            </Section>
          )}
          {tab === "detalhes" && (
            <Section title="Charminhos">
              <Chip label="Sardinhas" selected={!!look.freckles} onClick={() => studio.setLook({ freckles: !look.freckles })} />
              <Chip label="Pintinha" selected={!!look.beautyMark} onClick={() => studio.setLook({ beautyMark: !look.beautyMark })} />
              <Chip label="Brilho no rosto" selected={!!look.cheekSparkles} onClick={() => studio.setLook({ cheekSparkles: !look.cheekSparkles })} />
            </Section>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <GameButton variant="blue" size="sm" onClick={studio.undo} disabled={!studio.canUndo}>
            <Undo2 /> <span>Desfazer</span>
          </GameButton>
          <GameButton variant="chrome" size="sm" onClick={studio.resetBeauty}>
            <RotateCcw /> <span>Recomeçar boneca</span>
          </GameButton>
        </div>
        <GameButton size="lg" className="mt-4 w-full" onClick={() => studio.setPhase("dress")}>
          <span>Ir para o Closet</span>
          <ArrowRight />
        </GameButton>
      </GameWindow>
    </div>
  );
}
