import { useCallback, useEffect, useReducer, useRef } from "react";

import { CHARACTERS, HAIR_COLORS, ITEMS, SKIN_TONES, characterById, itemById } from "./catalog";
import {
  canUndo,
  commit,
  createComposition,
  createHistory,
  removeItem,
  resetComposition,
  selectItem,
  undo,
  wornItems,
} from "./logic";
import type { Composition, History } from "./types";

export type Phase = "select" | "dress";

export interface Feedback {
  message: string;
  ids: string[];
  nonce: number;
}

interface State {
  history: History;
  phase: Phase;
  feedback: Feedback | null;
}

type Action =
  | { type: "hydrate"; composition: Composition; phase: Phase }
  | { type: "pickCharacter"; id: string }
  | { type: "setSkin"; id: string }
  | { type: "setPhase"; phase: Phase }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "hairColor"; id: string }
  | { type: "undo" }
  | { type: "reset" }
  | { type: "newLook" }
  | { type: "rename"; name: string };

const STORAGE_KEY = "vibe-veste:v1";

function fb(state: State, message: string, ids: string[] = []): Feedback {
  return { message, ids, nonce: (state.feedback?.nonce ?? 0) + 1 };
}

function reducer(state: State, action: Action): State {
  const present = state.history.present;
  switch (action.type) {
    case "hydrate":
      return { ...state, history: createHistory(action.composition), phase: action.phase };
    case "pickCharacter": {
      if (action.id === present.characterId) return state;
      const fresh = createComposition(action.id);
      const keep = present.itemIds.filter((id) => itemById(id)?.category !== "hair");
      const next = { ...fresh, itemIds: [...fresh.itemIds, ...keep], lookName: present.lookName };
      const c = characterById(action.id);
      return { ...state, history: commit(state.history, next), feedback: fb(state, `Oi, eu sou a ${c.name}!`, fresh.itemIds) };
    }
    case "setSkin":
      return {
        ...state,
        history: commit(state.history, { ...present, skinToneId: action.id }),
        feedback: fb(state, `Tom de pele: ${SKIN_TONES.find((s) => s.id === action.id)?.name ?? ""}`),
      };
    case "setPhase":
      return { ...state, phase: action.phase };
    case "toggle": {
      const item = itemById(action.id);
      if (!item) return state;
      const wasWorn = present.itemIds.includes(action.id);
      const { composition, removed } = selectItem(present, action.id);
      const swapped = removed.filter((r) => r.id !== action.id);
      let message = wasWorn ? `${item.name} saiu do look` : `${item.name} no look!`;
      if (!wasWorn && swapped.length) message += ` (substituiu ${swapped.map((r) => r.name).join(" e ")})`;
      return {
        ...state,
        history: commit(state.history, composition),
        feedback: fb(state, message, wasWorn ? [] : [action.id]),
      };
    }
    case "remove": {
      const item = itemById(action.id);
      const { composition } = removeItem(present, action.id);
      return { ...state, history: commit(state.history, composition), feedback: fb(state, `${item?.name ?? "Peça"} removida`) };
    }
    case "hairColor": {
      const color = HAIR_COLORS.find((h) => h.id === action.id);
      const hairIds = wornItems(present).filter((i) => i.category === "hair").map((i) => i.id);
      return {
        ...state,
        history: commit(state.history, { ...present, hairColorId: action.id }),
        feedback: fb(state, `Cabelo ${color?.name.toLowerCase() ?? ""}!`, hairIds),
      };
    }
    case "undo": {
      if (!canUndo(state.history)) return state;
      const history = undo(state.history);
      return { ...state, history, feedback: fb(state, "Última alteração desfeita", history.present.itemIds) };
    }
    case "reset": {
      const next = resetComposition(present);
      return { ...state, history: commit(state.history, next), feedback: fb(state, "Look reiniciado! (dá pra desfazer)", next.itemIds) };
    }
    case "newLook": {
      const next = { ...resetComposition(present), lookName: "" };
      return { ...state, history: createHistory(next), phase: "dress", feedback: fb(state, "Novo look! Bora criar?", next.itemIds) };
    }
    case "rename":
      // Naming the look is not a styling change, so it does not enter the undo history.
      return { ...state, history: { ...state.history, present: { ...present, lookName: action.name.slice(0, 40) } } };
  }
}

function sanitize(raw: unknown): { composition: Composition; phase: Phase } | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as { composition?: Partial<Composition>; phase?: string };
  const c = r.composition;
  if (!c || !CHARACTERS.some((ch) => ch.id === c.characterId)) return null;
  const known = new Set(ITEMS.map((i) => i.id));
  return {
    composition: {
      characterId: c.characterId as string,
      skinToneId: SKIN_TONES.some((s) => s.id === c.skinToneId) ? (c.skinToneId as string) : SKIN_TONES[0].id,
      hairColorId: HAIR_COLORS.some((h) => h.id === c.hairColorId) ? (c.hairColorId as string) : HAIR_COLORS[0].id,
      itemIds: Array.isArray(c.itemIds) ? c.itemIds.filter((id): id is string => typeof id === "string" && known.has(id)) : [],
      lookName: typeof c.lookName === "string" ? c.lookName.slice(0, 40) : "",
    },
    phase: r.phase === "dress" ? "dress" : "select",
  };
}

export function useStudio() {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    history: createHistory(createComposition(CHARACTERS[0].id)),
    phase: "select" as Phase,
    feedback: null,
  }));
  const hydrated = useRef(false);

  // Restore saved work after mount (browser storage is unavailable during SSR).
  useEffect(() => {
    try {
      const saved = sanitize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
      if (saved) dispatch({ type: "hydrate", ...saved });
    } catch {
      /* ignore corrupted storage */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ composition: state.history.present, phase: state.phase }));
    } catch {
      /* storage full or blocked */
    }
  }, [state.history.present, state.phase]);

  const act = useCallback((a: Action) => dispatch(a), []);

  return {
    composition: state.history.present,
    phase: state.phase,
    feedback: state.feedback,
    canUndo: canUndo(state.history),
    pickCharacter: (id: string) => act({ type: "pickCharacter", id }),
    setSkin: (id: string) => act({ type: "setSkin", id }),
    setPhase: (phase: Phase) => act({ type: "setPhase", phase }),
    toggle: (id: string) => act({ type: "toggle", id }),
    remove: (id: string) => act({ type: "remove", id }),
    setHairColor: (id: string) => act({ type: "hairColor", id }),
    undo: () => act({ type: "undo" }),
    reset: () => act({ type: "reset" }),
    newLook: () => act({ type: "newLook" }),
    rename: (name: string) => act({ type: "rename", name }),
  };
}

export type Studio = ReturnType<typeof useStudio>;
