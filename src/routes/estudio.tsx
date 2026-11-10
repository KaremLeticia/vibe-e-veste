import { Link, createFileRoute } from "@tanstack/react-router";
import { Crown, HelpCircle, RotateCcw, Undo2, Users } from "lucide-react";
import { useState } from "react";

import { GameButton } from "@/components/game/GameButton";
import { InstructionsDialog } from "@/components/game/InstructionsDialog";
import { CharacterSelect } from "@/components/studio/CharacterSelect";
import { FinalLook } from "@/components/studio/FinalLook";
import { ItemPanel } from "@/components/studio/ItemPanel";
import { Stage } from "@/components/studio/Stage";
import type { CategoryId } from "@/game/types";
import { useStudio } from "@/game/useStudio";

export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "Estúdio — Vibe & Veste" },
      { name: "description", content: "Escolha sua personagem e monte o look perfeito no closet Y2K do Vibe & Veste." },
      { property: "og:title", content: "Estúdio — Vibe & Veste" },
      { property: "og:description", content: "Escolha sua personagem e monte o look perfeito no closet Y2K do Vibe & Veste." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  const studio = useStudio();
  const [category, setCategory] = useState<CategoryId>("hair");
  const [finalOpen, setFinalOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const dressing = studio.phase === "dress";

  return (
    <div className="min-h-screen px-3 pb-8 pt-3 sm:px-6">
      <header className="mx-auto mb-4 flex max-w-[1400px] flex-wrap items-center gap-3">
        <Link to="/" className="chrome-text mr-auto font-display text-3xl sm:text-4xl" aria-label="Vibe & Veste — início">
          Vibe &amp; Veste
        </Link>
        <GameButton variant="soft" size="sm" onClick={() => setHelpOpen(true)}>
          <HelpCircle /> <span className="hidden sm:inline">Como jogar</span>
        </GameButton>
        {dressing && (
          <>
            <GameButton variant="soft" size="sm" onClick={() => studio.setPhase("select")}>
              <Users /> <span>Trocar personagem</span>
            </GameButton>
            <GameButton variant="blue" size="sm" onClick={studio.undo} disabled={!studio.canUndo} title="Desfazer a última alteração">
              <Undo2 /> <span>Desfazer</span>
            </GameButton>
            <GameButton variant="chrome" size="sm" onClick={studio.reset} title="Voltar a personagem ao visual inicial">
              <RotateCcw /> <span>Reiniciar</span>
            </GameButton>
            <GameButton size="md" onClick={() => setFinalOpen(true)}>
              <Crown /> <span>Finalizar look</span>
            </GameButton>
          </>
        )}
      </header>

      <main className="mx-auto max-w-[1400px]">
        {dressing ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(400px,520px)]">
            <Stage studio={studio} />
            <div className="lg:max-h-[calc(100vh-6rem)]">
              <ItemPanel studio={studio} active={category} onChange={setCategory} />
            </div>
          </div>
        ) : (
          <CharacterSelect studio={studio} />
        )}
      </main>

      <FinalLook studio={studio} open={finalOpen} onClose={() => setFinalOpen(false)} />
      <InstructionsDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  );
}
