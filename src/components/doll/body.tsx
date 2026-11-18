import type { CharacterLook, HairColor, SkinTone } from "@/game/types";
import { Both, LEG_LEFT, Mirror, Star, TORSO } from "./shapes";

const INK = "var(--doll-ink)";
const LIGHT = "var(--doll-highlight)";
const FACE_SHAPE =
  "M113 91 Q113 53 150 53 Q187 53 187 91 L184 114 Q177 131 163 140 Q150 149 137 140 Q123 131 116 114 Z";

export function Body({ skin, uid }: { skin: SkinTone; uid: string }) {
  const shade = `${uid}-skin`;
  const glow = `${uid}-glow`;
  return (
    <g stroke={INK} strokeWidth="1.3" strokeLinejoin="round">
      <defs>
        <linearGradient id={shade} x1="0" x2="1">
          <stop offset="0" stopColor={skin.shade} />
          <stop offset="0.28" stopColor={skin.base} />
          <stop offset="0.62" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.shade} />
        </linearGradient>
        <radialGradient id={glow}>
          <stop stopColor={LIGHT} stopOpacity="0.48" />
          <stop offset="1" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Both>
        <path d={LEG_LEFT} fill={`url(#${shade})`} />
        <path
          d="M130 357 Q124 397 132 429 Q138 481 136 535"
          stroke={LIGHT}
          strokeOpacity="0.32"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M127 434 Q135 438 142 433" stroke={skin.shade} fill="none" strokeWidth="1" />
        <path
          d="M128 541 L142 541 L144 552 Q145 559 139 561 L128 560 Q124 557 126 550 Z"
          fill={skin.base}
        />
        <path
          d="M107 183 Q116 180 119 190 Q114 217 108 253 Q105 283 101 315 L92 315 Q92 286 96 253 Q99 218 103 193 Q103 186 107 183 Z"
          fill={`url(#${shade})`}
        />
        <path
          d="M92 312 L101 313 Q105 322 104 328 L101 336 Q100 339 98 336 L98 325 L96 342 Q94 346 93 342 L93 328 L92 339 Q89 340 90 335 L90 322 Z"
          fill={skin.base}
        />
        <path d="M98 317 Q101 323 101 327" stroke={skin.shade} fill="none" strokeWidth="0.8" />
      </Both>
      <path d={TORSO} fill={`url(#${shade})`} />
      <path
        d="M140 133 L160 133 Q158 155 163 172 Q150 179 137 172 Q142 155 140 133 Z"
        fill={skin.base}
        stroke="none"
      />
      <path
        d="M140 139 Q150 149 160 139 L158 151 Q150 156 142 151 Z"
        fill={skin.shade}
        stroke="none"
      />
      <path
        d="M121 180 Q135 184 145 179 M179 180 Q165 184 155 179"
        stroke={skin.shade}
        fill="none"
        strokeLinecap="round"
      />
      <path d="M150 250 L150 262" stroke={skin.shade} fill="none" strokeWidth="1" />
      <path d="M126 284 Q150 291 174 284" stroke={skin.shade} fill="none" strokeOpacity="0.5" />
      {/* Fitted two-piece base follows the new waist and hips without protruding through garments. */}
      <path
        d="M115 210 Q131 203 150 213 Q169 203 185 210 L181 242 Q165 250 150 246 Q135 250 119 242 Z"
        fill="var(--doll-basewear)"
      />
      <path
        d="M130 174 L125 209 M170 174 L175 209"
        stroke="var(--doll-basewear-edge)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M119 297 Q150 305 181 297 L183 318 Q167 325 156 340 L144 340 Q133 325 117 318 Z"
        fill="var(--doll-basewear)"
      />
      <path
        d="M119 301 Q150 309 181 301"
        stroke="var(--doll-basewear-edge)"
        fill="none"
        strokeWidth="2"
      />
      <Both>
        <ellipse cx="112" cy="105" rx="5" ry="8" fill={skin.base} />
        <path d="M112 101 Q109 105 112 109" stroke={skin.shade} fill="none" />
      </Both>
      <path d={FACE_SHAPE} fill={`url(#${shade})`} />
      <ellipse cx="150" cy="77" rx="22" ry="13" fill={`url(#${glow})`} stroke="none" />
    </g>
  );
}

function Eye({ look, uid }: { look: CharacterLook; uid: string }) {
  const white = "M119 103 Q129 94 142 101 Q140 112 131 112 Q124 111 119 103 Z";
  const iris = `${uid}-iris`;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-eye`}>
          <path d={white} />
        </clipPath>
        <radialGradient id={iris} cx="0.5" cy="0.75">
          <stop stopColor={look.eyeColor} />
          <stop offset="0.62" stopColor={look.eyeColor} />
          <stop offset="1" stopColor={INK} />
        </radialGradient>
      </defs>
      <path
        d="M117 100 Q126 89 142 96 L143 101 Q131 95 119 104 Z"
        fill={look.shadowColor}
        opacity="0.5"
      />
      <path d={white} fill={LIGHT} stroke={INK} strokeWidth="0.65" />
      <g clipPath={`url(#${uid}-eye)`}>
        <ellipse cx="133" cy="104" rx="5.2" ry="6.6" fill={`url(#${iris})`} />
        <ellipse cx="133" cy="104" rx="2.6" ry="4.8" fill={INK} />
        <circle cx="134.7" cy="101" r="1.7" fill={LIGHT} />
        <circle cx="131" cy="107" r="0.7" fill={LIGHT} />
      </g>
      <path d="M114 97 L119 102 Q130 93 142 100 L143 102 Q129 96 119 104 Z" fill={INK} />
      <path
        d="M120 100 L117 95 M124 98 L122 93 M128 97 L127 93"
        stroke={INK}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M120 105 Q129 113 139 109" stroke={INK} strokeWidth="0.7" fill="none" />
    </g>
  );
}

export function Face({
  look,
  skin,
  hair,
  uid,
}: {
  look: CharacterLook;
  skin: SkinTone;
  hair: HairColor;
  uid: string;
}) {
  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-blush`}>
          <stop stopColor="var(--doll-blush)" stopOpacity="0.42" />
          <stop offset="1" stopColor="var(--doll-blush)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-lips`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor={look.lipColor} />
          <stop offset="0.48" stopColor={look.lipColor} />
          <stop offset="1" stopColor="var(--doll-lip-shade)" />
        </linearGradient>
      </defs>
      <Both>
        <ellipse cx="125" cy="119" rx="11" ry="7" fill={`url(#${uid}-blush)`} />
        <path
          d="M120 116 Q125 114 131 116"
          stroke={LIGHT}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={
            look.brow === "straight"
              ? "M119 89 Q130 84 141 87 L141 89 Q130 87 119 91 Z"
              : "M118 91 Q126 80 141 86 L141 89 Q128 85 120 93 Z"
          }
          fill={hair.shade}
        />
      </Both>
      <Eye look={look} uid={`${uid}-left`} />
      <Mirror>
        <Eye look={look} uid={`${uid}-right`} />
      </Mirror>
      <path
        d="M150 103 Q148 113 146 118 Q149 121 153 118"
        stroke={skin.shade}
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M147 119 Q150 121 153 119"
        stroke={INK}
        strokeWidth="0.7"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M150 108 L150 114"
        stroke={LIGHT}
        strokeWidth="1.2"
        opacity="0.45"
        strokeLinecap="round"
      />
      <path
        d="M141 129 Q146 123 150 126 Q154 123 159 129 Q155 137 150 137 Q145 137 141 129 Z"
        fill={`url(#${uid}-lips)`}
        stroke="var(--doll-lip-shade)"
        strokeWidth="0.8"
      />
      <path
        d="M142 129 Q150 132 158 129"
        stroke="var(--doll-lip-shade)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M146 133 Q150 135 154 133"
        stroke={LIGHT}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M145 127 L148 126"
        stroke={LIGHT}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.75"
      />
      {look.freckles && (
        <Both>
          {[
            [125, 117],
            [130, 119],
            [135, 117],
            [137, 120],
            [128, 122],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.65" fill={skin.shade} />
          ))}
        </Both>
      )}
      {look.beautyMark && <circle cx="165" cy="125" r="0.9" fill={INK} />}
      {look.cheekSparkles && (
        <Both>
          <Star x={121} y={121} r={2.5} fill={LIGHT} />
        </Both>
      )}
    </g>
  );
}
