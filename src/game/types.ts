export type CategoryId = "hair" | "top" | "bottom" | "dress" | "shoes" | "accessory";

export interface Category {
  id: CategoryId;
  name: string;
  /** Short label used on the tabs */
  short: string;
  /** Emoji-free icon key resolved by the UI */
  icon: string;
  /** When true, several items can be worn at once (limited to one per slot). */
  cumulative?: boolean;
  /** Categories that cannot be worn together with this one (e.g. dress vs top/bottom). */
  excludes?: CategoryId[];
}

export interface Item {
  id: string;
  category: CategoryId;
  name: string;
  /** For cumulative categories: items sharing a slot replace each other. */
  slot?: string;
  /** Short flavour text shown on the card */
  tag?: string;
}

export interface SkinTone {
  id: string;
  name: string;
  base: string;
  shade: string;
}

export interface HairColor {
  id: string;
  name: string;
  base: string;
  shade: string;
  shine: string;
}

export type EyeShape = "round" | "almond" | "sleepy";

export interface CharacterLook {
  eyeShape: EyeShape;
  eyeColor: string;
  lipColor: string;
  shadowColor: string;
  brow: "soft" | "arched" | "straight";
  freckles?: boolean;
  beautyMark?: boolean;
  cheekSparkles?: boolean;
}

export interface Character {
  id: string;
  name: string;
  vibe: string;
  look: CharacterLook;
  /** Initial appearance */
  defaultSkinToneId: string;
  defaultHairId: string;
  defaultHairColorId: string;
}

export interface Composition {
  characterId: string;
  skinToneId: string;
  hairColorId: string;
  /** Ids of every worn item (hair included). */
  itemIds: string[];
  lookName: string;
}

export interface History {
  past: Composition[];
  present: Composition;
}
