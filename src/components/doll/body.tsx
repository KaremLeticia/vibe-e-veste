import type { CharacterLook, HairColor, SkinTone } from "@/game/types";

import { ARM_LEFT, Both, LEG_LEFT, Mirror, Star, TORSO } from "./shapes";

const LASH = "#2A1418";

export function Body({ skin, uid }: { skin: SkinTone; uid: string }) {
  const clip = `${uid}-bodyclip`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={TORSO} />
          <path d={LEG_LEFT} />
          <path d={LEG_LEFT} transform="translate(300 0) scale(-1 1)" />
        </clipPath>
      </defs>
      {/* legs */}
      <Both>
        <path d={LEG_LEFT} fill={skin.base} />
        <path d="M127 440 Q135 446 143 440" stroke={skin.shade} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="135" cy="550" rx="10" ry="6" fill={skin.base} />
      </Both>
      {/* arms */}
      <Both>
        <polyline points={ARM_LEFT} fill="none" stroke={skin.base} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="95" cy="330" rx="7.5" ry="10" fill={skin.base} />
        <path d="M90 332 Q91 338 94 339" stroke={skin.shade} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </Both>
      {/* torso + neck */}
      <path d={TORSO} fill={skin.base} />
      <path d="M141 132 L159 132 L161 172 L139 172 Z" fill={skin.base} />
      <path d="M141 138 Q150 154 159 138 L159 132 L141 132 Z" fill={skin.shade} />
      <path d="M131 176 Q140 182 146 180 M169 176 Q160 182 154 180" stroke={skin.shade} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* base leotard so the doll is always dressed */}
      <g clipPath={`url(#${clip})`}>
        <path d="M100 208 Q150 216 200 208 L200 318 Q172 322 156 342 L144 342 Q128 322 100 318 Z" fill="#FFE1EE" />
        <path d="M100 208 Q150 216 200 208" stroke="#FFB6D3" strokeWidth="3" fill="none" />
      </g>
      <line x1="131" y1="171" x2="128" y2="210" stroke="#FFB6D3" strokeWidth="2" />
      <line x1="169" y1="171" x2="172" y2="210" stroke="#FFB6D3" strokeWidth="2" />
      {/* ears + head */}
      <Both>
        <ellipse cx="111" cy="106" rx="6.5" ry="9.5" fill={skin.base} />
        <path d="M110 101 Q107 106 110 111" stroke={skin.shade} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </Both>
      <ellipse cx="150" cy="100" rx="40" ry="47" fill={skin.base} />
    </g>
  );
}

function Eye({ look, skin, uid }: { look: CharacterLook; skin: SkinTone; uid: string }) {
  const clip = `${uid}-eyeclip`;
  if (look.eyeShape === "almond") {
    const white = "M122 106 Q129 95 144 101 Q141 112 131 112 Q124 111 122 106 Z";
    return (
      <g>
        <defs>
          <clipPath id={clip}>
            <path d={white} />
          </clipPath>
        </defs>
        <path d="M121 101 Q133 88 146 99 Q133 94 121 101 Z" fill={look.shadowColor} opacity="0.85" />
        <path d={white} fill="#FFFFFF" />
        <g clipPath={`url(#${clip})`}>
          <circle cx="133.5" cy="105" r="6.6" fill={look.eyeColor} />
          <circle cx="133.5" cy="105" r="3.2" fill="#140A0D" />
          <circle cx="136" cy="102.5" r="2" fill="#FFFFFF" />
        </g>
        <path d="M145.5 101.5 Q131 92 121 105.5 L112.5 98.5 Q118 104.5 121.5 108 Q131 97.5 145.5 103 Z" fill={LASH} />
      </g>
    );
  }
  if (look.eyeShape === "sleepy") {
    return (
      <g>
        <ellipse cx="133" cy="105" rx="9.5" ry="10" fill="#FFFFFF" />
        <circle cx="133" cy="107" r="6.8" fill={look.eyeColor} />
        <circle cx="133" cy="107" r="3.3" fill="#140A0D" />
        <circle cx="135.5" cy="109" r="1.8" fill="#FFFFFF" />
        <path d="M121 104 Q133 98 145 104 L146 92 L120 92 Z" fill={skin.base} />
        <path d="M121 104 Q133 98 145 104 L145 99 Q133 90 121 99 Z" fill={look.shadowColor} opacity="0.9" />
        <path d="M122 104 Q133 98.5 144.5 104" stroke={LASH} strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M123 103.5 L118.5 106 M125.5 102 L121.5 103" stroke={LASH} strokeWidth="1.7" strokeLinecap="round" />
        <Star x={124} y={94} r={2.4} fill="#FFFFFF" />
      </g>
    );
  }
  return (
    <g>
      <path d="M121.5 102 Q133 87 145.5 100 Q133 93 121.5 102 Z" fill={look.shadowColor} opacity="0.85" />
      <ellipse cx="133" cy="105" rx="9.5" ry="10.5" fill="#FFFFFF" />
      <circle cx="133" cy="106" r="7" fill={look.eyeColor} />
      <circle cx="133" cy="106" r="3.4" fill="#140A0D" />
      <circle cx="135.8" cy="102.6" r="2.4" fill="#FFFFFF" />
      <circle cx="130.6" cy="109.2" r="1.2" fill="#FFFFFF" />
      <path d="M122.5 103 Q126 94 133.5 94 Q141 94.5 144 100.5" stroke={LASH} strokeWidth="2.7" fill="none" strokeLinecap="round" />
      <path d="M123.4 101.5 L118.5 98.5 M125 98 L121.5 94.2 M128 95.6 L126.5 91.5" stroke={LASH} strokeWidth="1.7" strokeLinecap="round" />
    </g>
  );
}

const BROWS = {
  soft: "M124 87 Q131 82.5 141 85",
  arched: "M123 88.5 Q129 79.5 142 84.5",
  straight: "M124 86 Q132 84.5 141 85.5",
};

export function Face({ look, skin, hair, uid }: { look: CharacterLook; skin: SkinTone; hair: HairColor; uid: string }) {
  return (
    <g>
      <Eye look={look} skin={skin} uid={`${uid}-l`} />
      <Mirror>
        <Eye look={look} skin={skin} uid={`${uid}-r`} />
      </Mirror>
      <Both>
        <path d={BROWS[look.brow]} stroke={hair.shade} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <ellipse cx="123" cy="122" rx="8.5" ry="4.8" fill="#FF6F9F" opacity="0.33" />
      </Both>
      <path d="M147.5 118.5 Q150 122 152.5 118.5" stroke={skin.shade} strokeWidth="1.9" fill="none" strokeLinecap="round" />
      {/* heart lips */}
      <path d="M140 131 Q145 125.5 150 128.5 Q155 125.5 160 131 Q150 133.5 140 131 Z" fill={look.lipColor} />
      <path d="M140.5 131 Q150 141 159.5 131 Q150 133.5 140.5 131 Z" fill={look.lipColor} />
      <path d="M140.5 131 Q150 134 159.5 131" stroke="#00000030" strokeWidth="0.9" fill="none" />
      <ellipse cx="152.5" cy="134.6" rx="3" ry="1.2" fill="#FFFFFF" opacity="0.65" />
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
          <Star x={121} y={121} r={3.6} fill="#FFF6C7" />
          <Star x={127.5} y={126.5} r={2} fill="#FFFFFF" />
        </Both>
      )}
    </g>
  );
}
