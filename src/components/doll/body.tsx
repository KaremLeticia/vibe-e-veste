import type { CharacterLook, HairColor, SkinTone } from "@/game/types";

import { Both, LEG_LEFT, Mirror, Star, TORSO } from "./shapes";

const LASH = "#24101A";

/** Tapered arm (shoulder → elbow → wrist) that stays inside the sleeve footprint. */
const ARM_SHAPE =
  "M106 184 Q118 180 120 192 Q114 222 108 254 Q104 284 101 314 L91 314 Q92 284 95 254 Q99 222 104 194 Q103 187 106 184 Z";
/** Slim hand with soft fingers. */
const HAND_SHAPE =
  "M91 312 L101 312 Q104 322 102 332 Q101 340 97 344 Q95 346 93 343 Q90 338 90 330 Q89 320 91 312 Z";
const FACE_SHAPE =
  "M110 96 Q110 52 150 52 Q190 52 190 96 Q190 122 176 136 Q163 148 150 148 Q137 148 124 136 Q110 122 110 96 Z";

export function Body({ skin, uid }: { skin: SkinTone; uid: string }) {
  const clip = `${uid}-bodyclip`;
  const g = `${uid}-skin`;
  const gv = `${uid}-skinv`;
  const hl = `${uid}-glow`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={TORSO} />
          <path d={LEG_LEFT} />
          <path d={LEG_LEFT} transform="translate(300 0) scale(-1 1)" />
        </clipPath>
        {/* soft side-to-side shading for a rounded, polished look */}
        <linearGradient id={g} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={skin.shade} />
          <stop offset="0.28" stopColor={skin.base} />
          <stop offset="0.72" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.shade} />
        </linearGradient>
        <linearGradient id={gv} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={skin.shade} stopOpacity="0.9" />
          <stop offset="0.45" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.base} />
        </linearGradient>
        <radialGradient id={hl} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* legs */}
      <Both>
        <path d={LEG_LEFT} fill={`url(#${gv})`} />
        {/* knee + shin highlight */}
        <path d="M128 432 Q135 438 142 432" stroke={skin.shade} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="138" cy="470" rx="2.4" ry="22" fill={`url(#${hl})`} />
        <ellipse cx="135" cy="372" rx="4" ry="26" fill={`url(#${hl})`} opacity="0.7" />
        {/* pointed doll foot */}
        <path d="M127 540 L143 540 Q144 552 140 558 Q134 562 129 557 Q126 550 127 540 Z" fill={skin.base} />
      </Both>

      {/* arms + hands */}
      <Both>
        <path d={ARM_SHAPE} fill={`url(#${gv})`} />
        <path d="M100 254 Q103 257 106 254" stroke={skin.shade} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d={HAND_SHAPE} fill={skin.base} />
        <path d="M94 326 Q95 336 96 341 M97.5 326 Q99 334 99 339" stroke={skin.shade} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
        {/* tiny pink nail */}
        <ellipse cx="96" cy="342.5" rx="1.4" ry="1.1" fill="#FF7FB0" />
      </Both>

      {/* torso */}
      <path d={TORSO} fill={`url(#${g})`} />
      {/* neck */}
      <path d="M140 130 L160 130 Q159 150 162 172 L138 172 Q141 150 140 130 Z" fill={skin.base} />
      <path d="M140 136 Q150 156 160 136 L160 130 L140 130 Z" fill={skin.shade} opacity="0.85" />
      {/* collarbones + shoulder glow */}
      <path d="M126 180 Q137 184 146 181 M174 180 Q163 184 154 181" stroke={skin.shade} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.75" />
      <Both>
        <ellipse cx="120" cy="188" rx="7" ry="4" fill={`url(#${hl})`} />
      </Both>

      {/* base leotard so the doll is always dressed */}
      <g clipPath={`url(#${clip})`}>
        <path d="M100 208 Q150 216 200 208 L200 318 Q172 322 156 342 L144 342 Q128 322 100 318 Z" fill="#FFE4F0" />
        <path d="M120 214 Q150 220 180 214 L176 300 Q150 306 124 300 Z" fill="#FFFFFF" opacity="0.35" />
        <path d="M100 208 Q150 216 200 208" stroke="#FF9CC6" strokeWidth="2.6" fill="none" />
        <path d="M100 318 Q128 322 144 342 M200 318 Q172 322 156 342" stroke="#FF9CC6" strokeWidth="2" fill="none" />
      </g>
      <path d="M131 171 Q129 190 128 210 M169 171 Q171 190 172 210" stroke="#FF9CC6" strokeWidth="1.8" fill="none" />

      {/* ears + head */}
      <Both>
        <ellipse cx="111" cy="104" rx="6" ry="9" fill={skin.base} />
        <path d="M110 99 Q107.5 104 110 109" stroke={skin.shade} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </Both>
      <path d={FACE_SHAPE} fill={skin.base} />
      {/* jaw contour + forehead highlight */}
      <path d="M118 124 Q132 146 150 148 Q168 146 182 124 Q172 140 150 143 Q128 140 118 124 Z" fill={skin.shade} opacity="0.35" />
      <ellipse cx="150" cy="74" rx="18" ry="9" fill={`url(#${hl})`} />
    </g>
  );
}

function Eye({ look, skin, uid }: { look: CharacterLook; skin: SkinTone; uid: string }) {
  const clip = `${uid}-eyeclip`;
  const iris = `${uid}-iris`;
  const white =
    look.eyeShape === "almond"
      ? "M120 106 Q128 95 145 100 Q142 112 131 113 Q123 112 120 106 Z"
      : look.eyeShape === "sleepy"
        ? "M121 106 Q132 100 145 104 Q142 115 132 115 Q124 114 121 106 Z"
        : "M121 105 Q127 94 136 94.5 Q144 96 145.5 104 Q143 114 132 114.5 Q123 113 121 105 Z";
  const lid =
    look.eyeShape === "almond"
      ? "M119 106.5 Q127 93.5 146 99.5 L152 95.5 Q146 102.5 145 101.5 Q128 96 120.5 107.5 Z"
      : look.eyeShape === "sleepy"
        ? "M120 106.5 Q132 98.5 146 103.5 L150 101 Q146 106 145 105 Q132 101 121.5 107.5 Z"
        : "M120 105.5 Q126 92 136 92.8 Q145 94 147 102 L151 99.5 Q147 105 145.5 104.5 Q143 96.5 136 96 Q127 95.5 121.5 106.5 Z";
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={white} />
        </clipPath>
        <radialGradient id={iris} cx="0.5" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="0.35" stopColor={look.eyeColor} />
          <stop offset="1" stopColor={LASH} />
        </radialGradient>
      </defs>
      {/* eyeshadow, swept outwards */}
      <path d="M118 104 Q126 84 142 90 Q150 94 152 99 Q140 90 128 94 Q121 98 118 104 Z" fill={look.shadowColor} opacity="0.5" />
      <path d={white} fill="#FFFFFF" />
      <g clipPath={`url(#${clip})`}>
        <circle cx="133.5" cy="106" r="7.6" fill={`url(#${iris})`} />
        <circle cx="133.5" cy="106" r="3.3" fill="#120609" />
        <circle cx="136.4" cy="102.8" r="2.3" fill="#FFFFFF" />
        <circle cx="130.8" cy="109.4" r="1.1" fill="#FFFFFF" />
        {look.eyeShape === "sleepy" && <path d="M118 92 L150 92 L150 104 Q132 99 118 107 Z" fill={skin.base} />}
      </g>
      {/* winged liner + lashes */}
      <path d={lid} fill={LASH} />
      <path d="M124 100 L120.5 96.5 M127.5 97.6 L125 93.2 M131.5 96 L130.5 91.4" stroke={LASH} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

const BROWS = {
  soft: "M123 86 Q131 81 142 84 Q131 83.5 123 86 Z",
  arched: "M122 88 Q129 78 143 83.5 Q129 81.5 122 88 Z",
  straight: "M123 85.5 Q132 83 142 85 Q132 85.5 123 85.5 Z",
};

export function Face({ look, skin, hair, uid }: { look: CharacterLook; skin: SkinTone; hair: HairColor; uid: string }) {
  const blush = `${uid}-blush`;
  return (
    <g>
      <defs>
        <radialGradient id={blush} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF6F9F" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FF6F9F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Both>
        <ellipse cx="124" cy="122" rx="12" ry="7" fill={`url(#${blush})`} />
        {/* cheekbone highlighter */}
        <ellipse cx="127" cy="117" rx="5" ry="1.6" fill="#FFFFFF" opacity="0.35" />
      </Both>
      <Eye look={look} skin={skin} uid={`${uid}-l`} />
      <Mirror>
        <Eye look={look} skin={skin} uid={`${uid}-r`} />
      </Mirror>
      <Both>
        <path d={BROWS[look.brow]} stroke={hair.shade} strokeWidth="2.6" fill={hair.shade} strokeLinecap="round" strokeLinejoin="round" />
      </Both>
      {/* nose: soft shadow + highlight */}
      <path d="M146.5 119 Q150 122.5 153.5 119" stroke={skin.shade} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M150 104 L150 115" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.35" strokeLinecap="round" />
      {/* glossy lips */}
      <path d="M139 131 Q144.5 125 150 128 Q155.5 125 161 131 Q150 133 139 131 Z" fill={look.lipColor} />
      <path d="M139 131 Q150 142.5 161 131 Q150 133 139 131 Z" fill={look.lipColor} />
      <path d="M139 131 Q150 142.5 161 131 Q150 139 139 131 Z" fill="#000000" opacity="0.12" />
      <path d="M139.5 131 Q150 133.6 160.5 131" stroke="#00000045" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M145 135.4 Q150 137.6 155 135.4" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity="0.75" strokeLinecap="round" />
      <circle cx="147" cy="128.6" r="0.9" fill="#FFFFFF" opacity="0.7" />
      {look.freckles && (
        <g fill={skin.shade}>
          {[
            [124, 116],
            [129, 119],
            [121, 120],
            [133, 117.5],
            [176, 116],
            [171, 119],
            [179, 120],
            [167, 117.5],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />
          ))}
        </g>
      )}
      {look.beautyMark && <circle cx="167" cy="129" r="1.5" fill="#3A2226" />}
      {look.cheekSparkles && (
        <Both>
          <Star x={120} y={120} r={3.6} fill="#FFF6C7" />
          <Star x={126.5} y={126} r={2} fill="#FFFFFF" />
        </Both>
      )}
    </g>
  );
}
