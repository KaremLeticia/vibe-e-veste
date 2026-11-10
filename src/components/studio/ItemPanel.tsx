import { Check, X } from "lucide-react";

import { ItemThumb } from "@/components/doll/Doll";
import { CategoryIcon } from "@/components/game/CategoryIcon";
import { GameWindow } from "@/components/game/GameWindow";
import { CATEGORIES, HAIR_COLORS, categoryById, itemsByCategory } from "@/game/catalog";
import type { CategoryId, Composition, Item } from "@/game/types";
import type { Studio } from "@/game/useStudio";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  active,
  onChange,
  composition,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
  composition: Composition;
}) {
  return (
    <div role="tablist" aria-label="Categorias" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {CATEGORIES.map((c) => {
        const selected = c.id === active;
        const count = composition.itemIds.filter((id) => itemsByCategory(c.id).some((i) => i.id === id)).length;
        return (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(c.id)}
            className={cn(
              "relative flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border-[3px] border-primary-deep px-1 py-2 text-[0.7rem] font-bold leading-tight transition-transform hover:-translate-y-0.5",
              selected ? "jelly bg-jelly text-primary-foreground pop-shadow-sm" : "bg-card text-primary-deep",
            )}
          >
            <CategoryIcon id={c.id} className="relative z-[2] size-6" />
            <span className="relative z-[2]">{c.short}</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 z-[3] grid size-5 place-items-center rounded-full border-2 border-primary-deep bg-sun font-pixel text-[0.6rem] text-primary-deep">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ItemCard({
  item,
  composition,
  worn,
  onToggle,
  onRemove,
}: {
  item: Item;
  composition: Composition;
  worn: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={worn}
        aria-label={`${worn ? "Tirar" : "Vestir"} ${item.name}`}
        className={cn(
          "group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[3px] border-primary-deep bg-card text-left transition-transform hover:-translate-y-1",
          worn ? "glow-ring" : "pop-shadow-sm",
        )}
      >
        <div className={cn("checker aspect-square w-full", worn ? "bg-primary-glow" : "bg-muted")}>
          <ItemThumb itemId={item.id} composition={composition} className="h-full w-full transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="border-t-2 border-border px-2 py-1.5">
          <p className="truncate text-sm font-bold leading-tight text-primary-deep">{item.name}</p>
          {item.tag && <p className="truncate font-pixel text-[0.6rem] uppercase text-muted-foreground">{item.tag}</p>}
        </div>
      </button>
      {worn && (
        <>
          <span className="pointer-events-none absolute left-2 top-2 grid size-6 place-items-center rounded-full border-2 border-primary-deep bg-sun text-primary-deep">
            <Check className="size-3.5" strokeWidth={3.5} />
          </span>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remover ${item.name}`}
            title="Remover peça"
            className="absolute right-2 top-2 grid size-7 cursor-pointer place-items-center rounded-full border-2 border-primary-deep bg-card text-primary-deep transition-transform hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          >
            <X className="size-4" strokeWidth={3} />
          </button>
        </>
      )}
    </div>
  );
}

const CATEGORY_HINT: Partial<Record<CategoryId, string>> = {
  dress: "Peça única: tira a blusa e a parte de baixo.",
  top: "Trocar por uma blusa tira o vestido.",
  bottom: "Trocar por saia ou calça tira o vestido.",
  accessory: "Combine vários! Só um por posição (cabeça, olhos, pescoço...).",
  hair: "Escolha o corte e depois a cor.",
};

export function ItemPanel({ studio, active, onChange }: { studio: Studio; active: CategoryId; onChange: (id: CategoryId) => void }) {
  const { composition } = studio;
  const category = categoryById(active)!;
  const items = itemsByCategory(active);

  return (
    <GameWindow title="closet_dos_sonhos" className="h-full" bodyClassName="flex flex-col gap-4 p-4">
      <CategoryTabs active={active} onChange={onChange} composition={composition} />
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl text-primary">{category.name}</h3>
        <span className="font-pixel text-[0.65rem] uppercase text-muted-foreground">{items.length} opções</span>
      </div>
      {CATEGORY_HINT[active] && <p className="-mt-3 text-sm text-muted-foreground">{CATEGORY_HINT[active]}</p>}

      {active === "hair" && (
        <div>
          <p className="mb-2 font-pixel text-[0.65rem] uppercase text-primary-deep">Cor do cabelo</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Cor do cabelo">
            {HAIR_COLORS.map((h) => {
              const selected = h.id === composition.hairColorId;
              return (
                <button
                  key={h.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={h.name}
                  title={h.name}
                  onClick={() => studio.setHairColor(h.id)}
                  className={cn(
                    "size-9 cursor-pointer rounded-full border-[3px] border-primary-deep transition-transform hover:scale-110",
                    selected ? "glow-ring scale-110" : "pop-shadow-sm",
                  )}
                  style={{ background: `linear-gradient(135deg, ${h.shine}, ${h.base} 45%, ${h.shade})` }}
                />
              );
            })}
          </div>
        </div>
      )}

      <div role="tabpanel" aria-label={category.name} className="grid min-h-0 grid-cols-2 gap-3 overflow-y-auto p-1.5 sm:grid-cols-3">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            composition={composition}
            worn={composition.itemIds.includes(item.id)}
            onToggle={() => studio.toggle(item.id)}
            onRemove={() => studio.remove(item.id)}
          />
        ))}
      </div>
    </GameWindow>
  );
}
