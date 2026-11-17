import { useId, type ReactNode } from "react";

/** One continuous fashion-figure coordinate system, shared by every wearable. */
export const DOLL_VIEWBOX = "0 0 300 680";

const BANDS = [
  { from: -20, to: 150, scale: 0.8, offset: 12 },
  { from: 150, to: 320, scale: 0.95, offset: -10.5 },
  { from: 320, to: 620, scale: 1.32, offset: -128.9 },
] as const;

/** Adjacent source bands meet exactly; garments and anatomy use identical mapping. */
export function FashionFigure({ children }: { children: ReactNode }) {
  const uid = `figure${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <g>
      <defs>
        {BANDS.map(({ from, to }, i) => (
          <clipPath key={i} id={`${uid}-${i}`}>
            <rect x="-100" y={from} width="500" height={to - from} />
          </clipPath>
        ))}
      </defs>
      {BANDS.map(({ scale, offset }, i) => (
        <g key={i} transform={`translate(21 ${offset}) scale(0.86 ${scale})`}>
          <g clipPath={`url(#${uid}-${i})`}>{children}</g>
        </g>
      ))}
    </g>
  );
}

export function fashionThumb(viewBox: string): string {
  const [x = 0, y = 0, width = 300, height = 600] = viewBox.split(" ").map(Number);
  const mapY = (value: number) => {
    const band = BANDS.find(({ to }) => value <= to) ?? BANDS[2];
    return value * band.scale + band.offset;
  };
  return `${21 + x * 0.86} ${mapY(y)} ${width * 0.86} ${mapY(y + height) - mapY(y)}`;
}