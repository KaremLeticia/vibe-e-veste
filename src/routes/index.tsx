import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, Play } from "lucide-react";
import { useState } from "react";

import { Doll } from "@/components/doll/Doll";
import { GameButton } from "@/components/game/GameButton";
import { GameWindow } from "@/components/game/GameWindow";
import { InstructionsDialog } from "@/components/game/InstructionsDialog";
import { Sparkles } from "@/components/game/Sparkles";
import type { Composition } from "@/game/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vibe & Veste — Jogo de Vestir Y2K" },
      {
        name: "description",
        content: "Vista personagens, misture peças e crie looks com estética anos 2000 e muito rosa. Jogue direto no navegador!",
      },
      { property: "og:title", content: "Vibe & Veste — Jogo de Vestir Y2K" },
      {
        property: "og:description",
        content: "Vista personagens, misture peças e crie looks com estética anos 2000 e muito rosa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const SHOWCASE: Composition[] = [
  { characterId: "jade", skinToneId: "ebano", hairColorId: "preto", itemIds: ["hair-trancas", "top-corset", "bottom-flare", "shoes-tenis", "acc-argolas", "acc-oculos-shield"], lookName: "" },
  { characterId: "nina", skinToneId: "porcelana", hairColorId: "loiro", itemIds: ["hair-liso", "dress-baile", "shoes-cristal", "acc-tiara", "acc-perolas"], lookName: "" },
  { characterId: "bia", skinToneId: "caramelo", hairColorId: "mel", itemIds: ["hair-cacheado", "top-moletom", "bottom-veludo", "shoes-pelucia", "acc-flip", "acc-borboletas"], lookName: "" },
];

const TICKER = "★ nova coleção Y2K ★ closet infinito ★ glitter liberado ★ desfile ao vivo ★ moda é diversão ";

function Home() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <Sparkles className="opacity-90" />
      <main className="relative z-[1] mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 py-8 sm:py-12">
        <GameWindow title="vibe&veste.exe — estúdio de moda digital" className="w-full" bodyClassName="checker relative grid items-center gap-6 bg-muted p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-[2] text-center lg:text-left">
            <p className="inline-block rounded-full border-2 border-primary-deep bg-sun px-3 py-1 font-pixel text-[0.7rem] uppercase text-primary-deep">
              ✦ jogo de vestir ✦
            </p>
            <h1 className="chrome-text mt-4 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Vibe
              <br />& Veste
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg leading-snug text-primary-deep lg:mx-0">
              Escolha sua personagem, abra o closet dos sonhos e misture peças, cabelos e acessórios com aquele brilho dos anos 2000.
              No final, é passarela!
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <GameButton asChild size="xl">
                <Link to="/estudio">
                  <Play className="fill-current" /> <span>Começar a jogar</span>
                </Link>
              </GameButton>
              <GameButton variant="blue" size="lg" onClick={() => setHelpOpen(true)}>
                <BookOpen /> <span>Como jogar</span>
              </GameButton>
            </div>
          </div>

          <div className="relative flex items-end justify-center" aria-hidden>
            <div className="absolute bottom-2 h-12 w-[85%] rounded-[50%] border-[3px] border-primary-deep bg-chrome" />
            {SHOWCASE.map((c, i) => (
              <div
                key={c.characterId}
                className={i === 1 ? "relative z-[2] -mx-10 animate-float" : "relative z-[1] animate-float"}
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <Doll composition={c} className={i === 1 ? "h-[380px] w-auto sm:h-[440px]" : "h-[300px] w-auto sm:h-[360px]"} />
              </div>
            ))}
          </div>
        </GameWindow>
      </main>

      <div className="relative z-[1] overflow-hidden border-y-[3px] border-primary-deep bg-jelly py-2" aria-hidden>
        <div className="flex w-max animate-marquee whitespace-nowrap font-pixel text-sm uppercase text-primary-foreground">
          <span>{TICKER.repeat(4)}</span>
          <span>{TICKER.repeat(4)}</span>
        </div>
      </div>
      <InstructionsDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
}
