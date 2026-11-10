import { useId, type ReactNode } from "react";

import { characterById, hairColorById, itemById, skinToneById } from "@/game/catalog";
import type { Composition } from "@/game/types";

import { ART, CATEGORY_THUMB, LAYERS, THUMB_WITH_FACE, type ArtCtx, type Layer } from "./art";
import { Body, Face } from "./body";

interface DollProps {
  composition: Composition;
  className?: string;
  /** Item ids to animate in (recently changed) */
  animateIds?: string[];
  title?: string;
}

function buildLayers(itemIds: string[], ctx: ArtCtx, animateIds: string[] = []) {
  const layers = Object.fromEntries(LAYERS.map((l) => [l, [] as ReactNode[]])) as Record<Layer, ReactNode[]>;
  for (const id of itemIds) {
    const art = ART[id];
    if (!art) continue;
    art.parts.forEach((part, i) => {
      layers[part.layer].push(
        <g key={`${id}-${i}`} className={animateIds.includes(id) ? "animate-layer-pop" : undefined}>
          {part.render(ctx)}
        </g>,
      );
    });
  }
  return layers;
}

export function Doll({ composition, className, animateIds, title }: DollProps) {
  const uid = `d${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const character = characterById(composition.characterId);
  const skin = skinToneById(composition.skinToneId);
  const hair = hairColorById(composition.hairColorId);
  const ctx: ArtCtx = { skin, hair, uid };
  const layers = buildLayers(composition.itemIds, ctx, animateIds);

  return (
    <svg viewBox="0 0 300 600" className={className} role="img" aria-label={title ?? `Personagem ${character.name}`}>
      {LAYERS.map((layer) =>
        layer === "body" ? (
          <g key="body">
            <Body skin={skin} uid={uid} />
            <Face look={character.look} skin={skin} hair={hair} uid={uid} />
          </g>
        ) : (
          <g key={layer}>{layers[layer]}</g>
        ),
      )}
    </svg>
  );
}

/** Small preview of one item on a bare doll of the current character. */
export function ItemThumb({ itemId, composition, className }: { itemId: string; composition: Composition; className?: string }) {
  const uid = `t${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const item = itemById(itemId);
  if (!item) return null;
  const character = characterById(composition.characterId);
  const skin = skinToneById(composition.skinToneId);
  const hair = hairColorById(composition.hairColorId);
  const ctx: ArtCtx = { skin, hair, uid };
  const layers = buildLayers([itemId], ctx);
  const viewBox = ART[itemId]?.thumb ?? CATEGORY_THUMB[item.category];
  const withFace = THUMB_WITH_FACE[item.category];

  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      {LAYERS.map((layer) =>
        layer === "body" ? (
          <g key="body" opacity={withFace ? 1 : 0.55}>
            <Body skin={skin} uid={uid} />
            {withFace && <Face look={character.look} skin={skin} hair={hair} uid={uid} />}
          </g>
        ) : (
          <g key={layer}>{layers[layer]}</g>
        ),
      )}
    </svg>
  );
}
