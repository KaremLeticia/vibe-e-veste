import { categoryById, characterById, itemById } from "./catalog";
import type { Composition, History, Item } from "./types";

export const HISTORY_LIMIT = 60;

/** Initial appearance of a character: its default hair and no clothes. */
export function createComposition(characterId: string, skinToneId?: string): Composition {
  const character = characterById(characterId);
  return {
    characterId: character.id,
    skinToneId: skinToneId ?? character.defaultSkinToneId,
    hairColorId: character.defaultHairColorId,
    itemIds: [character.defaultHairId],
    lookName: "",
  };
}

export interface ChangeResult {
  composition: Composition;
  /** Items that were taken off because of this change */
  removed: Item[];
}

/** Items that conflict with `item` and must leave the composition when it is worn. */
function conflictsWith(item: Item, other: Item): boolean {
  if (other.id === item.id) return false;
  const category = categoryById(item.category);
  if (other.category === item.category) {
    if (category?.cumulative) return !!item.slot && other.slot === item.slot;
    return true;
  }
  return !!category?.excludes?.includes(other.category);
}

/** Wear an item. Clicking an item that is already worn takes it off (toggle). */
export function selectItem(comp: Composition, itemId: string): ChangeResult {
  const item = itemById(itemId);
  if (!item) return { composition: comp, removed: [] };
  if (comp.itemIds.includes(itemId)) return removeItem(comp, itemId);

  const removed: Item[] = [];
  const kept: string[] = [];
  for (const id of comp.itemIds) {
    const other = itemById(id);
    if (other && conflictsWith(item, other)) removed.push(other);
    else kept.push(id);
  }
  return { composition: { ...comp, itemIds: [...kept, itemId] }, removed };
}

/** Take one item off; every other category stays untouched. */
export function removeItem(comp: Composition, itemId: string): ChangeResult {
  const item = itemById(itemId);
  if (!item || !comp.itemIds.includes(itemId)) return { composition: comp, removed: [] };
  return {
    composition: { ...comp, itemIds: comp.itemIds.filter((id) => id !== itemId) },
    removed: [item],
  };
}

/** Back to the character's initial appearance, keeping character, skin tone and look name. */
export function resetComposition(comp: Composition): Composition {
  const fresh = createComposition(comp.characterId, comp.skinToneId);
  return { ...fresh, lookName: comp.lookName };
}

export function wornItems(comp: Composition): Item[] {
  return comp.itemIds.map((id) => itemById(id)).filter((i): i is Item => !!i);
}

export function wornInCategory(comp: Composition, categoryId: string): Item[] {
  return wornItems(comp).filter((i) => i.category === categoryId);
}

function sameComposition(a: Composition, b: Composition): boolean {
  return (
    a.characterId === b.characterId &&
    a.skinToneId === b.skinToneId &&
    a.hairColorId === b.hairColorId &&
    a.lookName === b.lookName &&
    a.itemIds.length === b.itemIds.length &&
    a.itemIds.every((id, i) => id === b.itemIds[i])
  );
}

// History (undo)

export function createHistory(present: Composition): History {
  return { past: [], present };
}

/** Record a change; no-op changes are not recorded so undo always reverts something visible. */
export function commit(history: History, next: Composition): History {
  if (sameComposition(history.present, next)) return history;
  const past = [...history.past, history.present].slice(-HISTORY_LIMIT);
  return { past, present: next };
}

export function undo(history: History): History {
  if (history.past.length === 0) return history;
  const past = history.past.slice(0, -1);
  return { past, present: history.past[history.past.length - 1] };
}

export function canUndo(history: History): boolean {
  return history.past.length > 0;
}
