import { describe, expect, it } from "vitest";

import { CATEGORIES, itemsByCategory } from "@/game/catalog";
import {
  canUndo,
  commit,
  createComposition,
  createHistory,
  removeItem,
  resetComposition,
  selectItem,
  undo,
} from "@/game/logic";

const base = () => ({ ...createComposition("nina"), itemIds: [] as string[] });

describe("Vibe & Veste rules", () => {
  it("every category offers at least six options", () => {
    for (const c of CATEGORIES) expect(itemsByCategory(c.id).length).toBeGreaterThanOrEqual(6);
  });

  it("only one item per non-cumulative category: a new top replaces the old one", () => {
    let c = selectItem(base(), "top-babytee").composition;
    c = selectItem(c, "top-corset").composition;
    expect(c.itemIds).toEqual(["top-corset"]);
  });

  it("items from different categories combine", () => {
    let c = selectItem(base(), "top-babytee").composition;
    c = selectItem(c, "bottom-flare").composition;
    c = selectItem(c, "shoes-tenis").composition;
    expect(c.itemIds).toEqual(["top-babytee", "bottom-flare", "shoes-tenis"]);
  });

  it("a dress removes top and bottom, and a top removes the dress", () => {
    let c = selectItem(base(), "top-babytee").composition;
    c = selectItem(c, "bottom-flare").composition;
    const withDress = selectItem(c, "dress-baile");
    expect(withDress.composition.itemIds).toEqual(["dress-baile"]);
    expect(withDress.removed.map((i) => i.id).sort()).toEqual(["bottom-flare", "top-babytee"]);
    const back = selectItem(withDress.composition, "top-regata").composition;
    expect(back.itemIds).toEqual(["top-regata"]);
  });

  it("accessories accumulate, but only one per slot", () => {
    let c = selectItem(base(), "acc-tiara").composition;
    c = selectItem(c, "acc-choker").composition;
    c = selectItem(c, "acc-argolas").composition;
    expect(c.itemIds).toEqual(["acc-tiara", "acc-choker", "acc-argolas"]);
    c = selectItem(c, "acc-laco").composition; // same "cabeça" slot as the tiara
    expect(c.itemIds).toEqual(["acc-choker", "acc-argolas", "acc-laco"]);
  });

  it("removing an item leaves the other categories untouched", () => {
    let c = selectItem(base(), "top-babytee").composition;
    c = selectItem(c, "bottom-flare").composition;
    c = removeItem(c, "top-babytee").composition;
    expect(c.itemIds).toEqual(["bottom-flare"]);
  });

  it("undo restores exactly the previous state", () => {
    let h = createHistory(base());
    h = commit(h, selectItem(h.present, "top-babytee").composition);
    h = commit(h, selectItem(h.present, "top-corset").composition);
    h = undo(h);
    expect(h.present.itemIds).toEqual(["top-babytee"]);
    h = undo(h);
    expect(h.present.itemIds).toEqual([]);
    expect(canUndo(h)).toBe(false);
  });

  it("reset restores the character's initial appearance and can be undone", () => {
    const start = createComposition("bia");
    let h = createHistory(start);
    h = commit(h, selectItem(h.present, "dress-slip").composition);
    h = commit(h, { ...h.present, hairColorId: "rosa" });
    h = commit(h, resetComposition(h.present));
    expect(h.present.itemIds).toEqual(["hair-cacheado"]);
    expect(h.present.hairColorId).toBe("mel");
    expect(h.present.characterId).toBe("bia");
    h = undo(h);
    expect(h.present.itemIds).toContain("dress-slip");
  });
});
