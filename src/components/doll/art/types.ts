import type { ReactNode } from "react";

import type { HairColor, SkinTone } from "@/game/types";

/** Paint order of the doll, back to front. */
export const LAYERS = [
  "hairBack",
  "body",
  "shoes",
  "bottom",
  "top",
  "dress",
  "neck",
  "ears",
  "hairFront",
  "head",
  "clips",
  "eyes",
  "hand",
] as const;

export type Layer = (typeof LAYERS)[number];

export interface ArtCtx {
  skin: SkinTone;
  hair: HairColor;
  /** Unique prefix for gradient / pattern ids inside one SVG */
  uid: string;
}

export interface ArtPart {
  layer: Layer;
  render: (ctx: ArtCtx) => ReactNode;
}

export interface ArtEntry {
  parts: ArtPart[];
  /** Thumbnail framing (SVG viewBox); falls back to the category framing */
  thumb?: string;
}
