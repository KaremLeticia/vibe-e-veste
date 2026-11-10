import type { CategoryId } from "@/game/types";

const PATHS: Record<CategoryId, string> = {
  hair: "M12 2C6.5 2 4 6 4 11c0 4 0 8-1 10h4c1-2 1-5 1-8 1 2 3 3 4 3s3-1 4-3c0 3 0 6 1 8h4c-1-2-1-6-1-10 0-5-2.5-9-8-9Zm0 4c2.5 0 4 1.5 4.5 4-1.5 0-3-1-4.5-2.5C10.5 9 9 10 7.5 10 8 7.5 9.5 6 12 6Z",
  top: "M8 3 3 6l2 5 2-1v10h10V10l2 1 2-5-5-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z",
  bottom: "M7 3h10l4 17c-3 1-6 1-9 1s-6 0-9-1L7 3Zm1 3 .5 2h7L16 6H8Z",
  dress: "M9 2h2l1 3 1-3h2l-.5 5c1 1 1.5 2 1.2 3L20 21c-2.5 1-5 1.2-8 1.2S6.5 22 4 21l4.3-11c-.3-1 .2-2 1.2-3L9 2Z",
  shoes: "M3 13c2 0 4-1 5-3l2-4c1 2 3 3 5 3 2 1 4 3 5 6 0 2-1 3-3 3H8l-1 3H5l-.5-3H3c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1Z",
  accessory: "M12 8 4 3C2 5 2 11 4 13l8-5Zm0 0 8-5c2 2 2 8 0 10l-8-5Zm0 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3Zm-1.5 6L7 21h3l2-4 2 4h3l-3.5-7h-3Z",
};

export function CategoryIcon({ id, className }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d={PATHS[id]} />
    </svg>
  );
}
