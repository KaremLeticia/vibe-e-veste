import type { Category, Character, HairColor, Item, SkinTone } from "./types";

/*
 * Game data. Visuals for each item live in src/components/doll/art and are looked up by item id,
 * so adding a new piece = one entry here + one drawing in the art registry.
 */

export const CATEGORIES: Category[] = [
  { id: "hair", name: "Cabelos", short: "Cabelo", icon: "hair" },
  { id: "top", name: "Partes de cima", short: "Blusas", icon: "top", excludes: ["dress"] },
  { id: "bottom", name: "Partes de baixo", short: "Saias & calças", icon: "bottom", excludes: ["dress"] },
  { id: "dress", name: "Vestidos & peças únicas", short: "Vestidos", icon: "dress", excludes: ["top", "bottom"] },
  { id: "shoes", name: "Calçados", short: "Sapatos", icon: "shoes" },
  { id: "accessory", name: "Acessórios", short: "Acessórios", icon: "accessory", cumulative: true },
];

export const ITEMS: Item[] = [
  // Cabelos
  { id: "hair-liso", category: "hair", name: "Liso longo", tag: "liso" },
  { id: "hair-ondulado", category: "hair", name: "Ondulado sereia", tag: "ondulado" },
  { id: "hair-cacheado", category: "hair", name: "Cacheado volumoso", tag: "cacheado" },
  { id: "hair-blackpower", category: "hair", name: "Black power", tag: "crespo" },
  { id: "hair-trancas", category: "hair", name: "Box braids", tag: "tranças" },
  { id: "hair-puffs", category: "hair", name: "Afro puffs", tag: "crespo" },
  { id: "hair-chanel", category: "hair", name: "Chanel com franja", tag: "liso curto" },
  { id: "hair-rabo", category: "hair", name: "Rabo de cavalo", tag: "preso" },
  { id: "hair-coque", category: "hair", name: "Coque Y2K com mechas", tag: "preso" },

  // Partes de cima
  { id: "top-babytee", category: "top", name: "Baby tee Princess", tag: "cropped" },
  { id: "top-corset", category: "top", name: "Corset de cetim", tag: "tomara que caia" },
  { id: "top-halter", category: "top", name: "Frente única metalizada", tag: "brilho" },
  { id: "top-regata", category: "top", name: "Regata canelada", tag: "básica" },
  { id: "top-cardigan", category: "top", name: "Cardigan fofinho", tag: "manga longa" },
  { id: "top-jaqueta", category: "top", name: "Jaqueta jeans cropped", tag: "manga longa" },
  { id: "top-moletom", category: "top", name: "Moletom de veludo", tag: "conjuntinho" },

  // Partes de baixo
  { id: "bottom-plissada", category: "bottom", name: "Minissaia xadrez", tag: "plissada" },
  { id: "bottom-flare", category: "bottom", name: "Jeans flare cintura baixa", tag: "calça" },
  { id: "bottom-cargo", category: "bottom", name: "Calça cargo", tag: "calça" },
  { id: "bottom-midi", category: "bottom", name: "Saia midi de cetim", tag: "saia" },
  { id: "bottom-shorts", category: "bottom", name: "Shorts jeans", tag: "shorts" },
  { id: "bottom-veludo", category: "bottom", name: "Calça de veludo", tag: "conjuntinho" },
  { id: "bottom-saiajeans", category: "bottom", name: "Saia jeans mini", tag: "saia" },

  // Vestidos e peças únicas
  { id: "dress-slip", category: "dress", name: "Slip dress acetinado", tag: "mini" },
  { id: "dress-baile", category: "dress", name: "Vestido de baile", tag: "princesa" },
  { id: "dress-xadrez", category: "dress", name: "Vestido vichy rosa", tag: "frente única" },
  { id: "dress-paete", category: "dress", name: "Mini de paetê", tag: "festa" },
  { id: "dress-macacao", category: "dress", name: "Macacão pantalona", tag: "peça única" },
  { id: "dress-babydoll", category: "dress", name: "Babydoll de babados", tag: "fofo" },
  { id: "dress-sereia", category: "dress", name: "Longo sereia", tag: "tapete vermelho" },

  // Calçados
  { id: "shoes-tenis", category: "shoes", name: "Tênis plataforma", tag: "chunky" },
  { id: "shoes-salto", category: "shoes", name: "Scarpin rosa", tag: "salto" },
  { id: "shoes-gogo", category: "shoes", name: "Bota go-go", tag: "cano alto" },
  { id: "shoes-boneca", category: "shoes", name: "Sapatilha boneca", tag: "com meinha" },
  { id: "shoes-sandalia", category: "shoes", name: "Sandália de tiras", tag: "dourada" },
  { id: "shoes-pelucia", category: "shoes", name: "Bota de pelúcia", tag: "quentinha" },
  { id: "shoes-cristal", category: "shoes", name: "Plataforma cristal", tag: "transparente" },

  // Acessórios (cumulativos: um por posição)
  { id: "acc-tiara", category: "accessory", name: "Tiara de strass", slot: "cabeça", tag: "cabeça" },
  { id: "acc-laco", category: "accessory", name: "Laço gigante", slot: "cabeça", tag: "cabeça" },
  { id: "acc-borboletas", category: "accessory", name: "Presilhas borboleta", slot: "presilhas", tag: "cabelo" },
  { id: "acc-oculos-coracao", category: "accessory", name: "Óculos de coração", slot: "olhos", tag: "olhos" },
  { id: "acc-oculos-shield", category: "accessory", name: "Óculos futurista", slot: "olhos", tag: "olhos" },
  { id: "acc-choker", category: "accessory", name: "Choker de coração", slot: "pescoço", tag: "pescoço" },
  { id: "acc-perolas", category: "accessory", name: "Colar de pérolas", slot: "pescoço", tag: "pescoço" },
  { id: "acc-argolas", category: "accessory", name: "Argolas douradas", slot: "orelhas", tag: "orelhas" },
  { id: "acc-baguete", category: "accessory", name: "Bolsa baguete", slot: "bolsa", tag: "bolsa" },
  { id: "acc-bolsa-coracao", category: "accessory", name: "Bolsa coração", slot: "bolsa", tag: "bolsa" },
  { id: "acc-flip", category: "accessory", name: "Celular flip", slot: "mão", tag: "mão" },
];

export const SKIN_TONES: SkinTone[] = [
  { id: "porcelana", name: "Porcelana", base: "#FBE4D8", shade: "#EDC5B2" },
  { id: "marfim", name: "Marfim", base: "#F5D0B5", shade: "#E2B091" },
  { id: "pessego", name: "Pêssego", base: "#EDBA93", shade: "#D49870" },
  { id: "dourado", name: "Dourado", base: "#DBA171", shade: "#BE8053" },
  { id: "caramelo", name: "Caramelo", base: "#C4844F", shade: "#A5673A" },
  { id: "canela", name: "Canela", base: "#A56A3E", shade: "#87522C" },
  { id: "cacau", name: "Cacau", base: "#7D4A2B", shade: "#603620" },
  { id: "ebano", name: "Ébano", base: "#573322", shade: "#3E2217" },
];

export const HAIR_COLORS: HairColor[] = [
  { id: "preto", name: "Preto", base: "#231719", shade: "#0F0A0B", shine: "#5A4248" },
  { id: "castanho", name: "Castanho", base: "#4E2E1F", shade: "#2E1A11", shine: "#86563C" },
  { id: "mel", name: "Mel", base: "#A86A3A", shade: "#7A4824", shine: "#D59A62" },
  { id: "loiro", name: "Loiro", base: "#EBC56E", shade: "#C99A3F", shine: "#FFF0B8" },
  { id: "ruivo", name: "Ruivo", base: "#C4521F", shade: "#913814", shine: "#F08A52" },
  { id: "rosa", name: "Rosa chiclete", base: "#FF7EB9", shade: "#E04E93", shine: "#FFC4DE" },
  { id: "azul", name: "Azul Y2K", base: "#6EC3FF", shade: "#3A90D6", shine: "#C8E9FF" },
  { id: "lilas", name: "Lilás", base: "#C7A4FF", shade: "#9873DA", shine: "#EADDFF" },
];

export const CHARACTERS: Character[] = [
  {
    id: "bia",
    name: "Bia",
    vibe: "Fã de glitter e sardinhas",
    defaultSkinToneId: "caramelo",
    defaultHairId: "hair-cacheado",
    defaultHairColorId: "mel",
    look: {
      eyeShape: "round",
      eyeColor: "#6B3E1F",
      lipColor: "#F06A9B",
      shadowColor: "#FFB3D1",
      brow: "soft",
      freckles: true,
    },
  },
  {
    id: "jade",
    name: "Jade",
    vibe: "Rainha do delineado gatinho",
    defaultSkinToneId: "ebano",
    defaultHairId: "hair-trancas",
    defaultHairColorId: "preto",
    look: {
      eyeShape: "almond",
      eyeColor: "#3B2216",
      lipColor: "#B8336A",
      shadowColor: "#FFC857",
      brow: "arched",
    },
  },
  {
    id: "nina",
    name: "Nina",
    vibe: "Princesa pop dos anos 2000",
    defaultSkinToneId: "porcelana",
    defaultHairId: "hair-liso",
    defaultHairColorId: "loiro",
    look: {
      eyeShape: "round",
      eyeColor: "#3F8FD8",
      lipColor: "#FF8FB8",
      shadowColor: "#B8E2FF",
      brow: "straight",
      beautyMark: true,
    },
  },
  {
    id: "luna",
    name: "Luna",
    vibe: "Sonhadora com brilho no rosto",
    defaultSkinToneId: "canela",
    defaultHairId: "hair-blackpower",
    defaultHairColorId: "preto",
    look: {
      eyeShape: "sleepy",
      eyeColor: "#4A2B18",
      lipColor: "#D9577F",
      shadowColor: "#D6B8FF",
      brow: "soft",
      cheekSparkles: true,
    },
  },
];

export const LOOK_NAME_SUGGESTIONS = [
  "Barbie Mood",
  "Diva do Shopping",
  "Glitter Total",
  "Rosa Choque Chic",
  "Princesa Pop",
  "Y2K Dreams",
  "Passarela Fashion",
  "Brilho de Estrela",
];

export const itemById = (id: string): Item | undefined => ITEMS.find((i) => i.id === id);
export const categoryById = (id: string): Category | undefined => CATEGORIES.find((c) => c.id === id);
export const characterById = (id: string): Character =>
  CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]!;
export const skinToneById = (id: string): SkinTone =>
  SKIN_TONES.find((s) => s.id === id) ?? SKIN_TONES[0]!;
export const hairColorById = (id: string): HairColor =>
  HAIR_COLORS.find((h) => h.id === id) ?? HAIR_COLORS[0]!;
export const itemsByCategory = (categoryId: string): Item[] =>
  ITEMS.filter((i) => i.category === categoryId);
