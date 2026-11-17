import type { CharacterLook, HairColor, SkinTone } from "@/game/types";

import { Both, LEG_LEFT, Mirror, Star, TORSO } from "./shapes";

const LASH = "#3A1C1E";

/** Tapered arm (shoulder → elbow → wrist) that stays inside the sleeve footprint. */
const ARM_SHAPE =
  "M106 184 Q118 180 120 192 Q114 222 108 254 Q104 284 101 314 L91 314 Q92 284 95 254 Q99 222 104 194 Q103 187 106 184 Z";
/** Slim hand with soft fingers. */
const HAND_SHAPE =
  "M91 312 L101 312 Q104 322 102 332 Q101 340 97 344 Q95 346 93 343 Q90 338 90 330 Q89 320 91 312 Z";
const FACE_SHAPE =
  "M112 94 Q112 52 150 52 Q188 52 188 94 Q188 116 178 130 Q164 147 150 149 Q136 147 122 130 Q112 116 112 94 Z";

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
        <path d={LEG_LEFT} fill={`url(#${gv})`} stroke="#7A3E3A" strokeOpacity="0.55" strokeWidth="1.1" />
        {/* knee + shin highlight */}
        <path d="M128 432 Q135 438 142 432" stroke={skin.shade} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="138" cy="470" rx="2.4" ry="22" fill={`url(#${hl})`} />
        <ellipse cx="135" cy="372" rx="4" ry="26" fill={`url(#${hl})`} opacity="0.7" />
        {/* pointed doll foot */}
        <path d="M127 540 L143 540 Q144 552 140 558 Q134 562 129 557 Q126 550 127 540 Z" fill={skin.base} stroke="#7A3E3A" strokeOpacity="0.55" strokeWidth="1.1" />
      </Both>

      {/* arms + hands */}
      <Both>
        <path d={ARM_SHAPE} fill={`url(#${gv})`} stroke="#7A3E3A" strokeOpacity="0.55" strokeWidth="1.1" />
        <path d="M100 254 Q103 257 106 254" stroke={skin.shade} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d={HAND_SHAPE} fill={skin.base} stroke="#7A3E3A" strokeOpacity="0.55" strokeWidth="1.1" />
        <path d="M94 326 Q95 336 96 341 M97.5 326 Q99 334 99 339" stroke={skin.shade} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.7" />
        {/* tiny pink nail */}
        <ellipse cx="96" cy="342.5" rx="1.4" ry="1.1" fill="#FF7FB0" />
      </Both>

      {/* torso */}
      <path d={TORSO} fill={`url(#${g})`} stroke="#7A3E3A" strokeOpacity="0.55" strokeWidth="1.1" />
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
      <path d={FACE_SHAPE} fill={skin.base} stroke="#7A3E3A" strokeOpacity="0.6" strokeWidth="1.2" />
      {/* jaw contour + forehead highlight */}
      <path d="M118 124 Q132 146 150 148 Q168 146 182 124 Q172 140 150 143 Q128 140 118 124 Z" fill={skin.shade} opacity="0.35" />
      <ellipse cx="150" cy="74" rx="18" ry="9" fill={`url(#${hl})`} />
    </g>
  );
}

const INK = "#4A2328";

function Eye({ look, skin, uid }: { look: CharacterLook; skin: SkinTone; uid: string }) {
  const clip = `${uid}-eyeclip`;
  const iris = `${uid}-iris`;
  const white = "M118 103.5 Q126 94 138.5 95.5 Q146 97.5 148.5 107 Q140 116 129 114.5 Q121 112 118 103.5 Z";
  const lid =
    "M148.5 106 Q145 94.5 136.5 94 Q124 94 113 97 Q116 99.5 118 103.5 Q126 96 138.5 97 Q145 98.5 148.5 106 Z";
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={white} />
        </clipPath>
        <radialGradient id={iris} cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor={look.eyeColor} />
          <stop offset="0.55" stopColor={look.eyeColor} />
          <stop offset="1" stopColor={LASH} />
        </radialGradient>
      </defs>
      {/* soft smoky shadow on the lid */}
      <path d="M116 100 Q124 84 140 86.5 Q149 89 151 100 Q142 91 130 92 Q121 94 116 100 Z" fill={look.shadowColor} opacity="0.3" />
      <path d={white} fill="#FFFFFF" />
      <g clipPath={`url(#${clip})`}>
        <circle cx="134" cy="105.5" r="8.8" fill={`url(#${iris})`} />
        <circle cx="134" cy="105.5" r="4" fill="#120609" />
        <circle cx="137.2" cy="101.8" r="2.6" fill="#FFFFFF" />
        <circle cx="130.8" cy="109.2" r="1.2" fill="#FFFFFF" />
        {look.eyeShape === "sleepy" && <path d="M114 90 L152 90 L152 101 Q134 97 114 104 Z" fill={skin.shade} />}
      </g>
      {/* bold winged liner + lashes */}
      <path d={lid} fill={LASH} />
      <path d="M119.5 98.5 L115 94 M124 96 L121 91.5 M129 95 L127.5 90.5" stroke={LASH} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M119.5 106 Q127 115.5 140.5 114.3" stroke={LASH} strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
    </g>
  );
}

const BROWS = {
  soft: "M119 89 Q127 80 145 83 L145.5 86.5 Q130 84 120.5 91 Z",
  arched: "M118 90 Q126 76.5 145 82 L145.5 86 Q129 81 119.5 92 Z",
  straight: "M120 87.5 Q131 83 145.5 84 L145.5 87.5 Q131 86.5 120.5 89.5 Z",
};

export function Face({ look, skin, hair, uid }: { look: CharacterLook; skin: SkinTone; hair: HairColor; uid: string }) {
  const blush = `${uid}-blush`;
  return (
    <g>
      <defs>
        <radialGradient id={blush} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#E8506F" stopOpacity="0.45" />
          <stop offset="1" stopColor="#E8506F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Both>
        <ellipse cx="125" cy="123" rx="12" ry="7" fill={`url(#${blush})`} />
        <ellipse cx="127" cy="118" rx="5" ry="1.6" fill="#FFFFFF" opacity="0.3" />
      </Both>
      <Eye look={look} skin={skin} uid={`${uid}-l`} />
      <Mirror>
        <Eye look={look} skin={skin} uid={`${uid}-r`} />
      </Mirror>
      <Both>
        <path d={BROWS[look.brow]} fill={hair.shade} stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />
      </Both>
      {/* nose */}
      <path d="M150 106 Q148.5 113 147 118" stroke={skin.shade} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M146 120 Q150 123 154 120" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M151.5 107 L151.5 115" stroke="#FFFFFF" strokeWidth="1.3" opacity="0.4" strokeLinecap="round" />
      {/* full glossy lips with ink outline */}
      <path d="M137.5 131.5 Q143 124 150 127.5 Q157 124 162.5 131.5 Q150 134 137.5 131.5 Z" fill={look.lipColor} stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M137.5 131.5 Q150 146 162.5 131.5 Q150 134 137.5 131.5 Z" fill={look.lipColor} stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M140 132.5 Q150 143 160 132.5 Q150 140 140 132.5 Z" fill="#000000" opacity="0.15" />
      <path d="M138 131.6 Q150 134.6 162 131.6" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M145 137 Q150 139.4 155 137" stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M143.5 128.6 Q145.5 127.4 147.5 128.4" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round" />
      {look.freckles && (
        <g fill={skin.shade === skin.base ? INK : INK} opacity="0.4">
          {[
            [140, 117], [143, 120], [138, 121], [124, 117], [129, 120], [121, 121], [133, 118],
            [160, 117], [157, 120], [162, 121], [176, 117], [171, 120], [179, 121], [167, 118],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.95" />
          ))}
        </g>
      )}
      {look.beautyMark && <circle cx="167" cy="130" r="1.5" fill="#3A2226" />}
      {look.cheekSparkles && (
        <Both>
          <Star x={119} y={124} r={3.4} fill="#FFF6C7" />
          <Star x={125} y={129.5} r={1.9} fill="#FFFFFF" />
        </Both>
      )}
    </g>
  );
}
