import type { HairColor } from "@/game/types";

import { Both } from "../shapes";
import type { ArtCtx, ArtEntry } from "./types";

const shine = (h: HairColor, d = "M118 68 Q132 53 152 52") => (
  <path d={d} stroke={h.shine} strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.75" />
);

function Curl({ x, y, r, h }: { x: number; y: number; r: number; h: HairColor }) {
  const s = r * 0.42;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={h.base} stroke={h.shade} strokeWidth="1.4" />
      <path d={`M${x - s} ${y} a${s} ${s} 0 1 1 ${s} ${s}`} stroke={h.shade} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d={`M${x - r * 0.5} ${y - r * 0.55} q${r * 0.3} ${-r * 0.25} ${r * 0.6} ${-r * 0.1}`} stroke={h.shine} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function Kinky({ id, h }: { id: string; h: HairColor }) {
  return (
    <defs>
      <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.3" fill={h.shade} opacity="0.55" />
        <circle cx="6.5" cy="6" r="1.1" fill={h.shine} opacity="0.35" />
        <path d="M5 1.5 q1.5 1 0 2.2" stroke={h.shade} strokeWidth="0.8" fill="none" opacity="0.6" />
      </pattern>
    </defs>
  );
}

function bumpRing(cx: number, cy: number, R: number, n: number, r: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R, r] as const;
  });
}

function Braid({ x, y0, y1, h, bead }: { x: number; y0: number; y1: number; h: HairColor; bead: string }) {
  const segs = [];
  for (let y = y0; y < y1; y += 8) {
    segs.push(<ellipse key={y} cx={x} cy={y} rx="4.8" ry="5.4" fill={h.base} stroke={h.shade} strokeWidth="1.1" />);
  }
  return (
    <g>
      {segs}
      <rect x={x - 3.5} y={y1 - 2} width="7" height="6" rx="2" fill={bead} />
      <path d={`M${x - 2} ${y1 + 4} L${x - 3} ${y1 + 10} M${x + 2} ${y1 + 4} L${x + 3} ${y1 + 10} M${x} ${y1 + 4} L${x} ${y1 + 11}`} stroke={h.base} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

const CAP_SLICK = "M108 104 Q104 50 150 47 Q196 50 192 104 Q188 76 166 69 Q150 64 134 69 Q112 76 108 104 Z";

export const HAIR_ART: Record<string, ArtEntry> = {
  "hair-liso": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <path d="M104 100 Q100 42 150 41 Q200 42 196 100 L203 252 Q176 263 150 259 Q124 263 97 252 Z" fill={h.base} />
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d="M106 110 Q101 45 150 43 Q199 45 194 110 Q190 80 172 68 Q160 61 152 63 L150 70 L148 63 Q128 65 116 79 Q108 92 106 110 Z" fill={h.base} />
            <Both>
              <path d="M108 94 Q101 170 109 238 L123 233 Q115 170 117 101 Z" fill={h.base} />
              <path d="M112 120 Q109 180 114 228" stroke={h.shade} strokeWidth="1.5" fill="none" opacity="0.6" />
            </Both>
            <path d="M150 63 L150 46" stroke={h.shade} strokeWidth="1.4" />
            {shine(h)}
            {shine(h, "M160 52 Q176 55 186 68")}
          </g>
        ),
      },
    ],
  },
  "hair-ondulado": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <path
            d="M104 100 Q98 42 150 41 Q202 42 196 100 Q212 140 198 170 Q213 200 199 230 Q209 252 192 264 Q150 272 108 264 Q91 252 101 230 Q87 200 102 170 Q88 140 104 100 Z"
            fill={h.base}
          />
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d="M106 112 Q100 45 150 43 Q200 45 194 112 Q191 78 167 66 Q140 70 119 91 Q110 100 106 112 Z" fill={h.base} />
            <Both>
              <path d="M108 98 Q97 140 110 170 Q97 202 112 238 L125 232 Q112 202 123 170 Q111 140 118 104 Z" fill={h.base} />
              <path d="M112 128 Q106 150 115 168 Q106 196 116 224" stroke={h.shade} strokeWidth="1.5" fill="none" opacity="0.6" />
            </Both>
            <path d="M167 66 Q140 72 121 90" stroke={h.shade} strokeWidth="1.6" fill="none" opacity="0.7" />
            {shine(h, "M122 66 Q138 52 158 52")}
          </g>
        ),
      },
    ],
  },
  "hair-cacheado": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <g>
            <ellipse cx="150" cy="122" rx="62" ry="82" fill={h.base} />
            {bumpRing(150, 122, 64, 18, 18).map(([x, y, r]) => (
              <Curl key={`${x}`} x={x} y={y} r={r} h={h} />
            ))}
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            {[
              [104, 150, 11],
              [196, 150, 11],
              [104, 130, 11],
              [196, 130, 11],
              [107, 111, 12],
              [193, 111, 12],
              [106, 91, 13],
              [194, 91, 13],
              [113, 72, 13],
              [187, 72, 13],
              [126, 58, 13],
              [174, 58, 13],
              [142, 51, 13],
              [158, 51, 13],
              [128, 71, 10],
              [172, 71, 10],
              [143, 66, 10],
              [158, 66, 10],
            ].map(([x, y, r]) => (
              <Curl key={`${x}-${y}`} x={x} y={y} r={r} h={h} />
            ))}
          </g>
        ),
      },
    ],
  },
  "hair-blackpower": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h, uid }) => (
          <g>
            <Kinky id={`${uid}-kbp`} h={h} />
            {bumpRing(150, 90, 72, 26, 12).map(([x, y, r]) => (
              <circle key={`${x}`} cx={x} cy={y} r={r} fill={h.base} />
            ))}
            <circle cx="150" cy="90" r="74" fill={h.base} />
            <circle cx="150" cy="90" r="82" fill={`url(#${uid}-kbp)`} />
            <path d="M96 52 Q118 26 150 22" stroke={h.shine} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.35" />
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h, uid }) => (
          <g>
            <path d={CAP_SLICK} fill={h.base} />
            <path d={CAP_SLICK} fill={`url(#${uid}-kbp)`} />
          </g>
        ),
      },
    ],
  },
  "hair-trancas": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <g>
            <path d="M104 100 Q100 42 150 41 Q200 42 196 100 L196 122 L104 122 Z" fill={h.base} />
            {Array.from({ length: 12 }, (_, i) => (
              <Braid key={i} x={100 + i * 9} y0={92} y1={262 + ((i * 37) % 22)} h={h} bead={i % 2 ? "#F5C542" : "#FF7EB9"} />
            ))}
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d="M106 108 Q102 45 150 43 Q198 45 194 108 Q190 78 166 68 L150 65 L134 68 Q110 78 106 108 Z" fill={h.base} />
            <path d="M150 45 L150 65 M128 50 L132 70 M172 50 L168 70 M112 70 L120 84 M188 70 L180 84" stroke={h.shade} strokeWidth="1.3" />
            <Braid x={107} y0={100} y1={258} h={h} bead="#F5C542" />
            <Braid x={115} y0={104} y1={244} h={h} bead="#FF7EB9" />
            <Braid x={193} y0={100} y1={258} h={h} bead="#F5C542" />
            <Braid x={185} y0={104} y1={244} h={h} bead="#FF7EB9" />
            {shine(h)}
          </g>
        ),
      },
    ],
  },
  "hair-puffs": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h, uid }) => (
          <g>
            <Kinky id={`${uid}-kpf`} h={h} />
            {[
              [101, 52],
              [199, 52],
            ].map(([cx, cy]) => (
              <g key={cx}>
                {bumpRing(cx, cy, 30, 14, 8).map(([x, y, r]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={h.base} />
                ))}
                <circle cx={cx} cy={cy} r="31" fill={h.base} />
                <circle cx={cx} cy={cy} r="37" fill={`url(#${uid}-kpf)`} />
              </g>
            ))}
            <path d="M104 100 Q100 50 150 46 Q200 50 196 100 L196 112 L104 112 Z" fill={h.base} />
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d="M109 104 Q106 52 150 49 Q194 52 191 104 Q186 76 150 68 Q114 76 109 104 Z" fill={h.base} />
            <path d="M150 50 L150 68" stroke={h.shade} strokeWidth="1.3" />
            <Both>
              <ellipse cx="120" cy="64" rx="9" ry="7" fill="#FF5FA2" transform="rotate(-35 120 64)" />
              <path d="M114 61 Q120 58 126 64" stroke="#FFC4DE" strokeWidth="1.6" fill="none" />
              <path d="M112 97 q3 -7 8 -3 q-4 3 -2 7" stroke={h.shade} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </Both>
            {shine(h, "M126 60 Q140 52 158 52")}
          </g>
        ),
      },
    ],
  },
  "hair-chanel": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <path d="M104 100 Q100 42 150 41 Q200 42 196 100 L199 152 Q176 160 150 158 Q124 160 101 152 Z" fill={h.base} />
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d="M104 152 Q97 44 150 43 Q203 44 196 152 L184 152 Q187 112 182 82 L170 83 L160 81 L150 83 L140 81 L130 83 L118 82 Q113 112 116 152 Z" fill={h.base} />
            <path d="M130 60 L130 81 M150 58 L150 82 M170 60 L170 81" stroke={h.shade} strokeWidth="1.3" opacity="0.6" />
            {shine(h, "M116 70 Q130 52 150 50")}
          </g>
        ),
      },
    ],
  },
  "hair-rabo": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <g>
            <path d="M156 52 Q208 28 218 84 Q228 142 210 218 Q198 202 197 170 Q192 122 186 98 Q176 66 156 60 Z" fill={h.base} />
            <path d="M200 70 Q214 120 206 196" stroke={h.shade} strokeWidth="1.8" fill="none" opacity="0.7" />
            <path d="M188 58 Q206 64 210 90" stroke={h.shine} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.6" />
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d={CAP_SLICK} fill={h.base} />
            <path d="M120 72 Q150 58 172 56 M128 86 Q150 64 176 60" stroke={h.shade} strokeWidth="1.3" fill="none" opacity="0.55" />
            <circle cx="172" cy="55" r="9" fill="#FF5FA2" />
            <circle cx="172" cy="55" r="4" fill="#FFC4DE" />
            <Both>
              <path d="M112 90 Q105 118 114 146" stroke={h.base} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            </Both>
            {shine(h, "M118 70 Q130 56 148 52")}
          </g>
        ),
      },
    ],
  },
  "hair-coque": {
    parts: [
      {
        layer: "hairBack",
        render: ({ hair: h }) => (
          <g>
            <circle cx="150" cy="38" r="25" fill={h.base} />
            <path d="M130 28 Q120 14 128 8 M168 22 Q182 10 178 4 M150 14 Q148 2 156 0 M172 40 Q188 38 190 28" stroke={h.base} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M136 36 Q150 24 164 36" stroke={h.shade} strokeWidth="2" fill="none" />
            <path d="M104 100 Q100 50 150 46 Q200 50 196 100 L196 112 L104 112 Z" fill={h.base} />
          </g>
        ),
      },
      {
        layer: "hairFront",
        render: ({ hair: h }) => (
          <g>
            <path d={CAP_SLICK} fill={h.base} />
            <Both>
              <path d="M150 48 Q118 52 110 90 Q105 124 116 152 L125 149 Q116 122 122 94 Q130 68 150 62 Z" fill={h.shine} />
              <path d="M146 54 Q124 62 117 96 Q113 124 119 146" stroke={h.base} strokeWidth="1.2" fill="none" opacity="0.5" />
            </Both>
            <path d="M150 48 L150 62" stroke={h.shade} strokeWidth="1.3" />
          </g>
        ),
      },
    ],
  },
};

export type { ArtCtx };
