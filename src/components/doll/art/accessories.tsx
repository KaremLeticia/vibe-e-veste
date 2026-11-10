import { Both, Mirror, Star, heartPath, qPoint } from "../shapes";
import type { ArtEntry } from "./types";

function Butterfly({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 Q-9 -10 -10 -2 Q-10 4 0 1 Z M0 0 Q9 -10 10 -2 Q10 4 0 1 Z" fill={fill} stroke="#FFFFFF" strokeWidth="0.8" />
      <path d="M0 1 Q-7 8 -4 9 Q-1 8 0 2 Z M0 1 Q7 8 4 9 Q1 8 0 2 Z" fill={fill} opacity="0.85" stroke="#FFFFFF" strokeWidth="0.8" />
      <ellipse cx="0" cy="1" rx="1.2" ry="4" fill="#5A2B3C" />
    </g>
  );
}

const pearls = Array.from({ length: 9 }, (_, i) => qPoint([139, 164], [139, 196], [150, 199], i / 8));

export const ACCESSORY_ART: Record<string, ArtEntry> = {
  "acc-tiara": {
    thumb: "90 10 120 80",
    parts: [
      {
        layer: "head",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-tiara`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.5" stopColor="#C9C3E6" />
                <stop offset="1" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <path d="M114 62 Q150 40 186 62" stroke="#C9C3E6" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M126 52 L132 36 L140 46 L150 24 L160 46 L168 36 L174 52 Q150 42 126 52 Z" fill={`url(#${uid}-tiara)`} stroke="#9A92C2" strokeWidth="1.2" strokeLinejoin="round" />
            <path d={heartPath(150, 41, 4)} fill="#FF3D94" />
            <circle cx="132" cy="38" r="2.2" fill="#8FD3FF" />
            <circle cx="168" cy="38" r="2.2" fill="#8FD3FF" />
            <Star x={150} y={22} r={4} fill="#FFF6C7" />
          </g>
        ),
      },
    ],
  },
  "acc-laco": {
    thumb: "85 10 130 90",
    parts: [
      {
        layer: "head",
        render: () => (
          <g>
            <path d="M110 74 Q114 46 150 44 Q186 46 190 74" stroke="#FF5FA2" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <g transform="translate(124 48) rotate(-18)">
              <path d="M0 0 L-24 -14 Q-30 0 -24 14 Z M0 0 L24 -14 Q30 0 24 14 Z" fill="#FF5FA2" stroke="#C21868" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M-20 -8 L-8 -2 M20 -8 L8 -2" stroke="#FFC4DE" strokeWidth="2" strokeLinecap="round" />
              <path d="M-3 3 L-10 22 L-4 19 L0 24 L3 5 Z M3 3 L10 22 L4 19 Z" fill="#E0408A" />
              <circle r="6" fill="#E0408A" stroke="#C21868" />
            </g>
          </g>
        ),
      },
    ],
  },
  "acc-borboletas": {
    thumb: "92 40 116 80",
    parts: [
      {
        layer: "clips",
        render: () => (
          <g>
            <Butterfly x={116} y={74} fill="#8FD3FF" />
            <Butterfly x={128} y={60} s={0.8} fill="#FF8FC4" />
            <Butterfly x={184} y={74} fill="#FFE27A" />
            <Butterfly x={172} y={60} s={0.8} fill="#C7A4FF" />
          </g>
        ),
      },
    ],
  },
  "acc-oculos-coracao": {
    thumb: "100 70 100 70",
    parts: [
      {
        layer: "eyes",
        render: () => (
          <g>
            <path d="M144 102 Q150 98 156 102" stroke="#E0217A" strokeWidth="2.4" fill="none" />
            <Both>
              <path d={heartPath(133, 106, 14)} fill="#FF3D94" fillOpacity="0.55" stroke="#E0217A" strokeWidth="2.6" strokeLinejoin="round" />
              <path d="M124 100 Q127 96 131 98" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M119 101 L110 100" stroke="#E0217A" strokeWidth="2.4" strokeLinecap="round" />
            </Both>
          </g>
        ),
      },
    ],
  },
  "acc-oculos-shield": {
    thumb: "100 70 100 70",
    parts: [
      {
        layer: "eyes",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-shield`} x1="0" x2="1">
                <stop offset="0" stopColor="#8FD3FF" />
                <stop offset="0.5" stopColor="#E6C8FF" />
                <stop offset="1" stopColor="#FF8FC4" />
              </linearGradient>
            </defs>
            <path d="M110 96 Q150 84 190 96 Q192 112 178 117 Q162 120 150 110 Q138 120 122 117 Q108 112 110 96 Z" fill={`url(#${uid}-shield)`} fillOpacity="0.92" stroke="#C9C3E6" strokeWidth="2" />
            <path d="M118 98 Q140 91 160 93" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
          </g>
        ),
      },
    ],
  },
  "acc-choker": {
    thumb: "112 130 76 56",
    parts: [
      {
        layer: "neck",
        render: () => (
          <g>
            <path d="M139.5 153 Q150 158 160.5 153 L160.8 159 Q150 164 139.2 159 Z" fill="#2B1B24" />
            <path d="M150 161 L150 166" stroke="#C9C3E6" strokeWidth="1.4" />
            <path d={heartPath(150, 171, 5.5)} fill="#FF3D94" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        ),
      },
    ],
  },
  "acc-perolas": {
    thumb: "112 140 76 76",
    parts: [
      {
        layer: "neck",
        render: () => (
          <Both>
            {pearls.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="3" fill="#FFF8F0" stroke="#E6D7CC" strokeWidth="0.8" />
                <circle cx={x - 0.9} cy={y - 1} r="0.9" fill="#FFFFFF" />
              </g>
            ))}
          </Both>
        ),
      },
    ],
  },
  "acc-argolas": {
    thumb: "88 80 124 70",
    parts: [
      {
        layer: "ears",
        render: () => (
          <Both>
            <circle cx="110" cy="124" r="9" fill="none" stroke="#E7B93E" strokeWidth="2.4" />
            <path d="M103 120 Q104 116 107 115" stroke="#FFF0B8" strokeWidth="1.2" fill="none" />
          </Both>
        ),
      },
    ],
  },
  "acc-baguete": {
    thumb: "60 296 76 80",
    parts: [
      {
        layer: "hand",
        render: () => (
          <g>
            <path d="M84 340 Q95 316 106 340" stroke="#E0408A" strokeWidth="3" fill="none" />
            <rect x="74" y="337" width="42" height="22" rx="7" fill="#FF77B5" stroke="#C21868" strokeWidth="1.2" />
            <path d="M74 344 Q95 352 116 344" stroke="#C21868" strokeWidth="1.2" fill="none" />
            <rect x="91" y="344" width="8" height="6" rx="1.5" fill="#E7B93E" />
            {[80, 86, 104, 110].map((x) => (
              <circle key={x} cx={x} cy={354} r="1.3" fill="#FFC4DE" />
            ))}
            <ellipse cx="95" cy="330" rx="7.5" ry="5" fill="none" />
          </g>
        ),
      },
    ],
  },
  "acc-bolsa-coracao": {
    thumb: "60 300 76 84",
    parts: [
      {
        layer: "hand",
        render: () => (
          <g>
            <path d="M85 344 Q95 318 105 344" stroke="#E7B93E" strokeWidth="2.4" fill="none" />
            <path d={heartPath(95, 356, 15)} fill="#F23C6B" stroke="#A80F3D" strokeWidth="1.4" />
            <path d="M84 348 Q86 343 91 344" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
            <circle cx="95" cy="352" r="2" fill="#E7B93E" />
          </g>
        ),
      },
    ],
  },
  "acc-flip": {
    thumb: "184 290 50 80",
    parts: [
      {
        layer: "hand",
        render: () => (
          <Mirror>
            <g transform="rotate(-8 95 325)">
              <line x1="99" y1="306" x2="101" y2="296" stroke="#9A92C2" strokeWidth="2" strokeLinecap="round" />
              <rect x="88" y="306" width="14" height="26" rx="3" fill="#E6C8FF" stroke="#9A92C2" strokeWidth="1.2" />
              <rect x="90.5" y="309" width="9" height="7" rx="1" fill="#8FD3FF" />
              <path d="M88 319 L102 319" stroke="#9A92C2" />
              <path d="M91 334 L89 344" stroke="#FF7EB9" strokeWidth="1.2" />
              <Star x={89} y={346} r={3.5} fill="#FF7EB9" />
            </g>
            <ellipse cx="95" cy="331" rx="7.5" ry="6" fill="none" />
          </Mirror>
        ),
      },
    ],
  },
};
