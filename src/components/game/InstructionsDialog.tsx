import { GameModal } from "./GameModal";

const STEPS = [
  { t: "Escolha sua personagem", d: "Selecione uma das meninas e o tom de pele que mais combina com você." },
  { t: "Abra o closet", d: "Navegue pelas abas: cabelos, blusas, saias & calças, vestidos, sapatos e acessórios." },
  { t: "Clique para vestir", d: "Cada clique veste a peça na hora. Uma peça nova troca a anterior da mesma aba." },
  { t: "Vestido é peça única", d: "Vestir um vestido tira a blusa e a calça. Vestir uma blusa tira o vestido." },
  { t: "Acessórios se acumulam", d: "Use tiara, óculos, colar, brinco e bolsa juntos — só um de cada tipo." },
  { t: "Errou? Sem stress", d: "Use Desfazer para voltar um passo, o X para tirar uma peça, ou Reiniciar para recomeçar." },
  { t: "Finalize e desfile", d: "Dê um nome ao look e veja sua personagem na passarela ou numa sessão de fotos." },
];

export function InstructionsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <GameModal open={open} onOpenChange={onOpenChange} title="Como jogar" description="Instruções do jogo Vibe & Veste">
      <ol className="space-y-3">
        {STEPS.map((s, i) => (
          <li key={s.t} className="flex gap-3 rounded-2xl border-2 border-border bg-muted/60 p-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-primary-deep bg-jelly font-pixel text-xs text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <p className="font-bold leading-tight text-primary-deep">{s.t}</p>
              <p className="text-sm leading-snug text-muted-foreground">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-sm text-muted-foreground">Seu look fica salvo neste navegador automaticamente.</p>
    </GameModal>
  );
}
