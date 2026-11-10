import type { CategoryId } from "@/game/types";

import { ACCESSORY_ART } from "./accessories";
import { BOTTOM_ART, DRESS_ART, SHOE_ART, TOP_ART } from "./clothes";
import { HAIR_ART } from "./hair";
import type { ArtEntry } from "./types";

export * from "./types";

/** Visual registry: item id -> drawing. Keep ids in sync with src/game/catalog.ts. */
export const ART: Record<string, ArtEntry> = {
  ...HAIR_ART,
  ...TOP_ART,
  ...BOTTOM_ART,
  ...DRESS_ART,
  ...SHOE_ART,
  ...ACCESSORY_ART,
};

/** Default thumbnail framing per category (SVG viewBox). */
export const CATEGORY_THUMB: Record<CategoryId, string> = {
  hair: "40 0 220 220",
  top: "70 140 160 190",
  bottom: "60 260 180 300",
  dress: "30 150 240 420",
  shoes: "95 425 110 150",
  accessory: "70 30 160 160",
};

/** Whether the thumbnail should include the face (hair & head accessories). */
export const THUMB_WITH_FACE: Record<CategoryId, boolean> = {
  hair: true,
  top: false,
  bottom: false,
  dress: false,
  shoes: false,
  accessory: true,
};
