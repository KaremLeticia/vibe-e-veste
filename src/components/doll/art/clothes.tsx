import { Both, LongSleeve, SHIRT_CROP, SHIRT_HIP, STRAPLESS, ShortSleeve, Star, heartPath } from "../shapes";
import type { ArtEntry } from "./types";

const OUT = "#00000022";

export const TOP_ART: Record<string, ArtEntry> = {
  "top-babytee": {
    parts: [
      {
        layer: "top",
        render: () => (
          <g>
            <ShortSleeve fill="#FFB6D5" stroke={OUT} />
            <Both>
              <path d="M98 214 L118 210" stroke="#FF5FA2" strokeWidth="3.5" strokeLinecap="round" />
            </Both>
            <path d={SHIRT_CROP} fill="#FFB6D5" stroke={OUT} strokeWidth="1.2" />
            <path d="M138 166 Q150 178 162 166" stroke="#FF5FA2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M116 249 Q150 255 184 249" stroke="#FF5FA2" strokeWidth="3" fill="none" />
            <text x="150" y="216" textAnchor="middle" fontFamily="Shrikhand, serif" fontSize="13" fill="#E0217A">Princess</text>
            <path d={heartPath(150, 230, 6)} fill="#E0217A" />
          </g>
        ),
      },
    ],
  },
  "top-corset": {
    parts: [
      {
        layer: "top",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-satin`} x1="0" x2="1">
                <stop offset="0" stopColor="#E0217A" />
                <stop offset="0.45" stopColor="#FF6FB0" />
                <stop offset="0.55" stopColor="#FF9CCB" />
                <stop offset="1" stopColor="#E0217A" />
              </linearGradient>
            </defs>
            <path d={STRAPLESS} fill={`url(#${uid}-satin)`} stroke={OUT} />
            <path d="M107 206 Q128 199 150 209 Q172 199 193 206" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeDasharray="2 2.5" />
            <path d="M126 214 Q128 240 124 262 M174 214 Q172 240 176 262" stroke="#B0105C" strokeWidth="1.4" fill="none" />
            <path d="M146 214 L154 222 L146 230 L154 238 L146 246 L154 254 M154 214 L146 222 L154 230 L146 238 L154 246 L146 254" stroke="#FFFFFF" strokeWidth="1.3" fill="none" />
            <path d="M147 258 q-6 6 -8 10 M153 258 q6 6 8 10" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ),
      },
    ],
  },
  "top-halter": {
    parts: [
      {
        layer: "top",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-metal`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#F4F1FF" />
                <stop offset="0.35" stopColor="#B9B3D6" />
                <stop offset="0.5" stopColor="#FFFFFF" />
                <stop offset="0.7" stopColor="#C7C1E6" />
                <stop offset="1" stopColor="#F2B8DA" />
              </linearGradient>
            </defs>
            <path d="M141 160 L159 160 L176 210 Q187 222 187 240 Q150 248 113 240 Q113 222 124 210 Z" fill={`url(#${uid}-metal)`} stroke="#8F86B8" strokeWidth="1.2" />
            <path d="M150 166 L150 236" stroke="#8F86B8" strokeWidth="1" opacity="0.6" />
            <path d="M113 240 Q150 248 187 240" stroke="#FF6FB0" strokeWidth="2.5" fill="none" />
            <Star x={132} y={222} r={4} />
            <Star x={166} y={206} r={3} />
            <Star x={160} y={230} r={2.4} fill="#FF9CCB" />
          </g>
        ),
      },
    ],
  },
  "top-regata": {
    parts: [
      {
        layer: "top",
        render: () => (
          <g>
            <path d="M127 169 L138 169 Q150 186 162 169 L173 169 Q178 200 190 214 Q186 240 184 264 Q150 270 116 264 Q114 240 110 214 Q122 200 127 169 Z" fill="#FFFFFF" stroke="#E6D3DD" strokeWidth="1.4" />
            {[124, 132, 140, 148, 156, 164, 172].map((x) => (
              <path key={x} d={`M${x + 3} 210 L${x + 3} 262`} stroke="#EFDDE6" strokeWidth="1.3" />
            ))}
            <path d="M138 169 Q150 186 162 169" stroke="#FF9CCB" strokeWidth="2" fill="none" />
            <path d={heartPath(150, 196, 4)} fill="#FF5FA2" />
          </g>
        ),
      },
    ],
  },
  "top-cardigan": {
    parts: [
      {
        layer: "top",
        render: () => (
          <g>
            <LongSleeve fill="#D5C4FF" stroke={OUT} />
            <Both>
              <path d="M88 307 L104 309" stroke="#B9A2F2" strokeWidth="5" strokeLinecap="round" />
            </Both>
            <path d="M136 166 Q116 170 106 184 Q102 202 110 228 Q114 244 116 256 Q150 262 184 256 Q186 244 190 228 Q198 202 194 184 Q184 170 164 166 L150 214 Z" fill="#D5C4FF" stroke={OUT} />
            <path d="M136 166 L150 214 L164 166" stroke="#B9A2F2" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <path d="M116 254 Q150 260 184 254" stroke="#B9A2F2" strokeWidth="5" fill="none" />
            {[224, 238].map((y) => (
              <circle key={y} cx="150" cy={y} r="3.4" fill="#FF7EB9" stroke="#FFFFFF" strokeWidth="1" />
            ))}
            <path d="M150 216 L150 256" stroke="#B9A2F2" strokeWidth="1.3" />
            {[
              [124, 200],
              [176, 196],
              [130, 236],
              [172, 232],
            ].map(([x, y]) => (
              <path key={`${x}${y}`} d={heartPath(x, y, 3)} fill="#FFFFFF" opacity="0.85" />
            ))}
          </g>
        ),
      },
    ],
  },
  "top-jaqueta": {
    parts: [
      {
        layer: "top",
        render: () => (
          <g>
            <LongSleeve fill="#7FA6DD" stroke="#4E77B3" width={20} />
            <Both>
              <path d="M88 306 L104 308.5" stroke="#5F88C6" strokeWidth="6" strokeLinecap="round" />
              <path d="M110 192 L103 254" stroke="#F5D27A" strokeWidth="1" strokeDasharray="3 2" />
            </Both>
            <path d={SHIRT_CROP} fill="#7FA6DD" stroke="#4E77B3" strokeWidth="1.4" />
            <path d="M116 242 Q150 250 184 242 L184 250 Q150 256 116 250 Z" fill="#5F88C6" />
            <path d="M150 178 L150 252" stroke="#4E77B3" strokeWidth="1.5" />
            <path d="M152 180 L152 250 M118 244 Q150 252 182 244" stroke="#F5D27A" strokeWidth="1" strokeDasharray="3 2" fill="none" />
            <Both>
              <path d="M137 165 L150 192 L124 184 Q120 172 137 165 Z" fill="#5F88C6" stroke="#4E77B3" />
              <rect x="124" y="200" width="16" height="13" rx="2" fill="none" stroke="#F5D27A" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="132" cy="203" r="1.6" fill="#E7B93E" />
            </Both>
          </g>
        ),
      },
    ],
  },
  "top-moletom": {
    parts: [
      {
        layer: "top",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-velvet`} x1="0" x2="1">
                <stop offset="0" stopColor="#F04F98" />
                <stop offset="0.5" stopColor="#FF7FB8" />
                <stop offset="1" stopColor="#F04F98" />
              </linearGradient>
            </defs>
            <LongSleeve fill="#FF6FB0" stroke={OUT} width={21} />
            <Both>
              <path d="M87 306 L105 309" stroke="#E0408A" strokeWidth="7" strokeLinecap="round" />
            </Both>
            <path d={SHIRT_HIP} fill={`url(#${uid}-velvet)`} stroke={OUT} />
            <path d="M126 168 Q150 196 174 168 Q166 160 160 162 Q150 174 140 162 Q134 160 126 168 Z" fill="#E0408A" />
            <path d="M150 180 L150 304" stroke="#C9C9D6" strokeWidth="2" />
            <path d="M150 180 L150 304" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            <path d="M144 180 L142 214 M156 180 L158 214" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M126 262 Q150 258 174 262 L170 290 L130 290 Z" fill="none" stroke="#E0408A" strokeWidth="1.5" />
            <path d="M113 298 Q150 304 187 298 L187 304 Q150 310 113 304 Z" fill="#E0408A" />
            {[128, 134, 140, 160, 166, 172].map((x, i) => (
              <circle key={x} cx={x} cy={214 + (i % 3) * -2} r="1.5" fill="#FFF6C7" />
            ))}
          </g>
        ),
      },
    ],
  },
};

const DENIM = "#86AEE6";
const DENIM_D = "#5A86C6";
const STITCH = "#F5D27A";

function PantsHip({ fill, stroke, top = 288 }: { fill: string; stroke: string; top?: number }) {
  return <path d={`M117 ${top} L183 ${top} Q188 310 187 330 L150 348 L113 330 Q112 310 117 ${top} Z`} fill={fill} stroke={stroke} strokeWidth="1.2" />;
}

export const BOTTOM_ART: Record<string, ArtEntry> = {
  "bottom-plissada": {
    parts: [
      {
        layer: "bottom",
        render: ({ uid }) => (
          <g>
            <defs>
              <pattern id={`${uid}-plaid`} width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="#FF8FC4" />
                <rect width="16" height="5" y="5" fill="#FFFFFF" opacity="0.45" />
                <rect width="5" height="16" x="5" fill="#FFFFFF" opacity="0.45" />
                <path d="M0 13 H16 M13 0 V16" stroke="#E0217A" strokeWidth="1" />
              </pattern>
            </defs>
            <path d="M118 284 L182 284 L197 351 Q150 358 103 351 Z" fill={`url(#${uid}-plaid)`} stroke="#E0217A" strokeWidth="1.2" />
            {[-26, -14, -4, 4, 14, 26].map((dx) => (
              <path key={dx} d={`M${150 + dx * 0.8} 292 L${150 + dx * 1.45} 354`} stroke="#C21868" strokeWidth="1" opacity="0.7" />
            ))}
            <rect x="117" y="281" width="66" height="9" rx="3" fill="#E0217A" />
          </g>
        ),
      },
    ],
  },
  "bottom-flare": {
    parts: [
      {
        layer: "bottom",
        render: () => (
          <g>
            <Both>
              <path d="M113 300 L151 300 L151 336 Q149 390 147 440 Q144 492 146 552 L111 552 Q121 492 121 440 Q113 380 113 300 Z" fill={DENIM} stroke={DENIM_D} strokeWidth="1.2" />
              <path d="M140 352 Q138 420 138 548" stroke={STITCH} strokeWidth="0.9" strokeDasharray="3 2" fill="none" opacity="0.8" />
            </Both>
            <PantsHip fill={DENIM} stroke={DENIM_D} />
            <path d="M117 288 L183 288 L184 296 L116 296 Z" fill={DENIM_D} />
            <path d="M116 292 L184 292" stroke="#FF7EB9" strokeWidth="5" />
            <path d={heartPath(150, 292, 5)} fill="#F5D27A" stroke="#C99A3F" strokeWidth="0.8" />
            <path d="M120 300 Q128 312 140 304 M180 300 Q172 312 160 304" stroke={STITCH} strokeWidth="1" fill="none" strokeDasharray="3 2" />
          </g>
        ),
      },
    ],
  },
  "bottom-cargo": {
    parts: [
      {
        layer: "bottom",
        render: () => (
          <g>
            <Both>
              <path d="M113 294 L151 294 L151 336 Q150 400 148 450 L147 550 L116 550 L116 450 Q111 380 113 294 Z" fill="#B7C2A6" stroke="#7F8B6C" strokeWidth="1.2" />
              <rect x="112" y="382" width="16" height="24" rx="2.5" fill="#A6B293" stroke="#7F8B6C" />
              <path d="M112 388 L128 388" stroke="#7F8B6C" />
              <path d="M116 540 L147 540" stroke="#7F8B6C" strokeWidth="1.2" />
            </Both>
            <PantsHip fill="#B7C2A6" stroke="#7F8B6C" top={282} />
            <rect x="116" y="280" width="68" height="10" rx="2" fill="#A6B293" stroke="#7F8B6C" />
            <rect x="141" y="281" width="18" height="8" rx="1.5" fill="none" stroke="#3C3C3C" strokeWidth="1.5" />
          </g>
        ),
      },
    ],
  },
  "bottom-midi": {
    parts: [
      {
        layer: "bottom",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-midi`} x1="0" x2="1">
                <stop offset="0" stopColor="#F2A9C9" />
                <stop offset="0.4" stopColor="#FFD9E9" />
                <stop offset="0.6" stopColor="#FFE9F2" />
                <stop offset="1" stopColor="#F2A9C9" />
              </linearGradient>
            </defs>
            <path d="M120 278 L180 278 Q194 330 202 456 Q150 466 98 456 Q106 330 120 278 Z" fill={`url(#${uid}-midi)`} stroke="#E28CB3" strokeWidth="1.2" />
            <path d="M138 290 Q132 380 126 458 M162 290 Q168 380 174 458" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
            <rect x="119" y="276" width="62" height="7" rx="3" fill="#E28CB3" />
          </g>
        ),
      },
    ],
  },
  "bottom-shorts": {
    parts: [
      {
        layer: "bottom",
        render: () => (
          <g>
            <Both>
              <path d="M113 296 L151 296 L151 336 L150 360 L146 364 L142 360 L138 364 L134 360 L130 364 L126 360 L122 364 L118 360 L113 363 Z" fill={DENIM} stroke={DENIM_D} strokeWidth="1.2" />
            </Both>
            <PantsHip fill={DENIM} stroke={DENIM_D} top={286} />
            <path d="M117 286 L183 286 L184 294 L116 294 Z" fill={DENIM_D} />
            <path d="M120 298 Q128 310 140 302 M180 298 Q172 310 160 302" stroke={STITCH} strokeWidth="1" fill="none" strokeDasharray="3 2" />
            <circle cx="150" cy="290" r="2.4" fill="#E7B93E" />
          </g>
        ),
      },
    ],
  },
  "bottom-veludo": {
    parts: [
      {
        layer: "bottom",
        render: () => (
          <g>
            <Both>
              <path d="M113 294 L151 294 L151 336 Q149 400 147 450 Q146 500 147 550 L114 550 Q118 500 119 450 Q112 380 113 294 Z" fill="#FF6FB0" stroke="#E0408A" strokeWidth="1.2" />
              <path d="M126 320 Q130 420 128 545" stroke="#FF9CCB" strokeWidth="3" fill="none" opacity="0.6" />
            </Both>
            <PantsHip fill="#FF6FB0" stroke="#E0408A" top={282} />
            <rect x="116" y="280" width="68" height="9" rx="4" fill="#E0408A" />
            <path d="M147 288 L144 304 M153 288 L156 304" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            {[134, 140, 160, 166].map((x) => (
              <circle key={x} cx={x} cy={300} r="1.4" fill="#FFF6C7" />
            ))}
          </g>
        ),
      },
    ],
  },
  "bottom-saiajeans": {
    parts: [
      {
        layer: "bottom",
        render: () => (
          <g>
            <path d="M118 288 L182 288 L191 345 Q150 350 109 345 Z" fill={DENIM} stroke={DENIM_D} strokeWidth="1.2" />
            <path d="M117 288 L183 288 L184 296 L116 296 Z" fill={DENIM_D} />
            <path d="M150 296 L150 348" stroke={DENIM_D} strokeWidth="1.3" />
            <path d="M152 298 L152 346 M112 340 Q150 345 188 340" stroke={STITCH} strokeWidth="1" strokeDasharray="3 2" fill="none" />
            <path d="M121 300 Q130 312 141 304 M179 300 Q170 312 159 304" stroke={STITCH} strokeWidth="1" fill="none" strokeDasharray="3 2" />
            <path d="M109 345 L112 350 L116 346 L120 351 L124 347 L128 351 L132 347 L136 351 L140 347 L144 351 L148 347 L152 351 L156 347 L160 351 L164 347 L168 351 L172 347 L176 351 L180 347 L184 351 L188 347 L191 345" fill="none" stroke="#B9D1F2" strokeWidth="1.4" />
          </g>
        ),
      },
    ],
  },
};

export const DRESS_ART: Record<string, ArtEntry> = {
  "dress-slip": {
    parts: [
      {
        layer: "dress",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-slip`} x1="0" x2="1">
                <stop offset="0" stopColor="#E9C79A" />
                <stop offset="0.45" stopColor="#FFF0D6" />
                <stop offset="0.6" stopColor="#F8DDB7" />
                <stop offset="1" stopColor="#E3BC8A" />
              </linearGradient>
            </defs>
            <Both>
              <line x1="131" y1="168" x2="127" y2="212" stroke="#D9AE76" strokeWidth="1.8" />
            </Both>
            <path d="M110 210 Q130 202 150 214 Q170 202 190 210 Q186 240 179 268 Q194 310 200 362 Q150 370 100 362 Q106 310 121 268 Q114 240 110 210 Z" fill={`url(#${uid}-slip)`} stroke="#D9AE76" strokeWidth="1.2" />
            <path d="M110 210 Q130 202 150 214 Q170 202 190 210" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeDasharray="1.5 2" />
            <path d="M100 362 Q150 370 200 362" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeDasharray="3 2" />
            <path d="M140 280 Q136 320 132 360" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.6" />
          </g>
        ),
      },
    ],
  },
  "dress-baile": {
    parts: [
      {
        layer: "dress",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-gown`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FF7EB9" />
                <stop offset="1" stopColor="#FFB6D5" />
              </linearGradient>
            </defs>
            <path d="M122 262 L178 262 Q232 360 255 540 Q150 562 45 540 Q68 360 122 262 Z" fill={`url(#${uid}-gown)`} stroke="#E04E93" strokeWidth="1.2" />
            <path d="M126 268 L174 268 Q214 360 232 528 Q150 546 68 528 Q86 360 126 268 Z" fill="#FFFFFF" opacity="0.28" />
            <path d="M45 540 Q57 552 70 543 Q83 556 97 546 Q110 558 123 548 Q136 560 150 549 Q164 560 177 548 Q190 558 203 546 Q217 556 230 543 Q243 552 255 540" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M108 206 Q128 198 150 210 Q172 198 192 206 Q190 240 178 266 L122 266 Q110 240 108 206 Z" fill="#FF5FA2" stroke="#E04E93" strokeWidth="1.2" />
            <Both>
              <ellipse cx="108" cy="202" rx="13" ry="9" fill="#FFB6D5" stroke="#E04E93" strokeWidth="1" />
            </Both>
            <path d="M122 264 L178 264" stroke="#FFFFFF" strokeWidth="4" />
            {[
              [90, 470],
              [120, 400],
              [176, 430],
              [210, 500],
              [150, 340],
              [138, 490],
              [196, 380],
              [104, 520],
            ].map(([x, y]) => (
              <Star key={`${x}${y}`} x={x} y={y} r={4.5} />
            ))}
          </g>
        ),
      },
    ],
  },
  "dress-xadrez": {
    parts: [
      {
        layer: "dress",
        render: ({ uid }) => (
          <g>
            <defs>
              <pattern id={`${uid}-vichy`} width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#FFFFFF" />
                <rect width="6" height="12" fill="#FF8FC4" opacity="0.6" />
                <rect width="12" height="6" fill="#FF8FC4" opacity="0.6" />
              </pattern>
            </defs>
            <path d="M122 262 L178 262 Q206 340 215 432 Q150 445 85 432 Q94 340 122 262 Z" fill={`url(#${uid}-vichy)`} stroke="#E04E93" strokeWidth="1.2" />
            <path d="M141 160 L159 160 L178 212 Q190 230 179 266 L121 266 Q110 230 122 212 Z" fill={`url(#${uid}-vichy)`} stroke="#E04E93" strokeWidth="1.2" />
            <path d="M141 160 L159 160" stroke="#E04E93" strokeWidth="4" strokeLinecap="round" />
            <path d="M85 432 Q150 445 215 432" stroke="#FFFFFF" strokeWidth="5" fill="none" />
            <path d="M85 432 Q150 445 215 432" stroke="#E04E93" strokeWidth="1" fill="none" strokeDasharray="3 3" />
            <rect x="120" y="260" width="60" height="8" rx="3" fill="#E04E93" />
            <path d="M150 264 L134 254 L134 274 Z M150 264 L166 254 L166 274 Z" fill="#E04E93" />
            <circle cx="150" cy="264" r="4" fill="#FF5FA2" />
          </g>
        ),
      },
    ],
  },
  "dress-paete": {
    parts: [
      {
        layer: "dress",
        render: ({ uid }) => (
          <g>
            <defs>
              <pattern id={`${uid}-seq`} width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#F23C93" />
                <circle cx="2" cy="2" r="2" fill="#FF8FC4" />
                <circle cx="6" cy="6" r="2" fill="#FFB6D5" />
                <circle cx="6.5" cy="5.3" r="0.7" fill="#FFFFFF" />
              </pattern>
            </defs>
            <path d="M108 212 L168 164 L184 172 Q193 200 186 226 Q180 250 177 268 Q188 300 192 340 Q150 348 108 340 Q112 300 123 268 Q116 240 108 212 Z" fill={`url(#${uid}-seq)`} stroke="#B0105C" strokeWidth="1.2" />
            <path d="M108 212 L168 164" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
            <Star x={130} y={250} r={6} />
            <Star x={170} y={300} r={5} />
            <Star x={160} y={210} r={4} />
            <Star x={124} y={322} r={3.5} />
          </g>
        ),
      },
    ],
  },
  "dress-macacao": {
    parts: [
      {
        layer: "dress",
        render: () => (
          <g>
            <Both>
              <path d="M113 300 L151 300 L151 336 Q149 400 146 460 L145 552 L106 552 Q112 460 112 400 Z" fill="#9FD8FF" stroke="#4FA3DE" strokeWidth="1.2" />
              <path d="M131 330 Q128 440 126 548" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.5" />
            </Both>
            <path d="M124 172 L134 172 L136 208 Q150 214 164 208 L166 172 L176 172 Q180 200 190 214 Q186 240 179 268 Q188 290 187 312 L150 340 L113 312 Q112 290 121 268 Q114 240 110 214 Q120 200 124 172 Z" fill="#9FD8FF" stroke="#4FA3DE" strokeWidth="1.2" />
            <rect x="120" y="262" width="60" height="9" rx="4" fill="#FFFFFF" />
            <circle cx="150" cy="266.5" r="4" fill="#FF7EB9" />
            <Both>
              <circle cx="130" cy="180" r="2.6" fill="#FFFFFF" />
            </Both>
          </g>
        ),
      },
    ],
  },
  "dress-babydoll": {
    parts: [
      {
        layer: "dress",
        render: () => (
          <g>
            <Both>
              <ellipse cx="109" cy="197" rx="13" ry="11" fill="#CDEBFF" stroke="#7FC0EE" strokeWidth="1" />
              <path d="M98 204 Q109 212 120 204" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            </Both>
            <path d="M112 224 L188 224 Q206 280 210 336 Q150 346 90 336 Q94 280 112 224 Z" fill="#CDEBFF" stroke="#7FC0EE" strokeWidth="1.2" />
            <path d="M90 336 Q96 346 102 338 Q108 348 114 339 Q120 349 126 340 Q132 350 138 340 Q144 350 150 341 Q156 350 162 340 Q168 350 174 340 Q180 349 186 339 Q192 348 198 338 Q204 346 210 336" fill="#FFFFFF" stroke="#7FC0EE" strokeWidth="1" />
            <path d="M110 206 Q130 198 150 208 Q170 198 190 206 L188 228 L112 228 Z" fill="#CDEBFF" stroke="#7FC0EE" strokeWidth="1.2" />
            <path d="M110 206 Q130 198 150 208 Q170 198 190 206" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
            <path d="M112 228 L188 228" stroke="#FF8FC4" strokeWidth="3" />
            <path d="M150 228 L138 220 L138 236 Z M150 228 L162 220 L162 236 Z" fill="#FF7EB9" />
            <circle cx="150" cy="228" r="3" fill="#FF5FA2" />
            <path d="M134 250 Q130 290 124 330 M166 250 Q170 290 176 330" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
          </g>
        ),
      },
    ],
  },
  "dress-sereia": {
    parts: [
      {
        layer: "dress",
        render: ({ uid }) => (
          <g>
            <defs>
              <linearGradient id={`${uid}-mer`} x1="0" x2="1">
                <stop offset="0" stopColor="#B80F55" />
                <stop offset="0.45" stopColor="#F2287A" />
                <stop offset="0.55" stopColor="#FF6FA8" />
                <stop offset="1" stopColor="#B80F55" />
              </linearGradient>
            </defs>
            <path d="M110 206 Q130 198 150 210 Q170 198 190 206 Q186 240 179 268 Q190 300 188 340 Q182 400 174 450 Q200 500 216 558 Q150 572 84 558 Q100 500 126 450 Q118 400 112 340 Q110 300 121 268 Q114 240 110 206 Z" fill={`url(#${uid}-mer)`} stroke="#8E0B42" strokeWidth="1.2" />
            <path d="M126 450 Q150 458 174 450" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M110 206 Q130 198 150 210 Q170 198 190 206" stroke="#FFD1E3" strokeWidth="2.5" fill="none" />
            {[
              [136, 250],
              [164, 300],
              [140, 380],
              [160, 430],
              [128, 520],
              [180, 530],
              [150, 480],
            ].map(([x, y]) => (
              <Star key={`${x}${y}`} x={x} y={y} r={3.6} />
            ))}
          </g>
        ),
      },
    ],
  },
};

export const SHOE_ART: Record<string, ArtEntry> = {
  "shoes-tenis": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <path d="M124 540 Q125 529 135 529 Q145 529 146 540 L149 555 L121 555 Z" fill="#FFFFFF" stroke="#D9C9D6" strokeWidth="1.2" />
            <path d="M129 535 L141 535 M128 540 L142 540 M128 545 L142 545" stroke="#FF7EB9" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="118" y="552" width="34" height="13" rx="4" fill="#FF8FC4" stroke="#E04E93" />
            <rect x="118" y="557" width="34" height="3" fill="#FFFFFF" />
          </Both>
        ),
      },
    ],
  },
  "shoes-salto": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <rect x="139" y="555" width="3.5" height="12" fill="#B0105C" />
            <path d="M125 545 Q135 539 145 545 L148 557 Q135 566 122 557 Z" fill="#FF3D94" stroke="#B0105C" strokeWidth="1.2" />
            <path d="M127 546 Q135 551 143 546" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.7" />
            <path d="M135 548 l-5 -3 l0 6 Z M135 548 l5 -3 l0 6 Z" fill="#FFC4DE" />
          </Both>
        ),
      },
    ],
  },
  "shoes-gogo": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <path d="M120 434 L149 434 L146 540 Q150 552 148 563 L122 563 Q119 552 124 540 Z" fill="#FFFFFF" stroke="#CFC6DA" strokeWidth="1.4" />
            <rect x="119" y="430" width="31" height="9" rx="3" fill="#F5F0FF" stroke="#CFC6DA" />
            <path d="M128 446 Q127 500 130 540" stroke="#E6DFF0" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="121" y="560" width="28" height="6" rx="2" fill="#E6DFF0" />
          </Both>
        ),
      },
    ],
  },
  "shoes-boneca": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <path d="M126.5 526 L143.5 526 L144.5 548 L125.5 548 Z" fill="#FFFFFF" stroke="#EADDE5" />
            <path d="M124 527 Q127 522 130 527 Q133 522 136 527 Q139 522 142 527 Q145 522 146 527" fill="#FFFFFF" stroke="#FFB6D3" strokeWidth="1.2" />
            <path d="M123 546 Q135 538 147 546 L148.5 558 Q135 566 121.5 558 Z" fill="#2B1B24" />
            <path d="M125 544 L145 544" stroke="#2B1B24" strokeWidth="3" />
            <rect x="141" y="541.5" width="4" height="4" rx="1" fill="#E7B93E" />
            <path d="M127 550 Q135 546 143 550" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.4" />
          </Both>
        ),
      },
    ],
  },
  "shoes-sandalia": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <rect x="139" y="556" width="3" height="10" fill="#C99A3F" />
            <ellipse cx="135" cy="557" rx="13" ry="3.5" fill="#E7B93E" />
            <path d="M126 548 L144 548 M127 553 L143 553" stroke="#E7B93E" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M128 540 L142 540" stroke="#E7B93E" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M135 540 L135 553" stroke="#E7B93E" strokeWidth="2" />
            <circle cx="135" cy="540" r="2" fill="#FFF0B8" />
          </Both>
        ),
      },
    ],
  },
  "shoes-pelucia": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <path d="M120 490 L150 490 Q152 520 151 546 Q153 562 149 567 L121 567 Q117 562 119 546 Q118 520 120 490 Z" fill="#DDBA93" stroke="#B8946D" strokeWidth="1.2" />
            <path d="M126 500 Q125 530 127 560" stroke="#E9CDAE" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="135" cy="490" rx="18" ry="7" fill="#FFF4E6" />
            {[122, 129, 136, 143, 149].map((x) => (
              <circle key={x} cx={x} cy={486 + (x % 3)} r="4" fill="#FFF4E6" />
            ))}
            <circle cx="122" cy="500" r="5" fill="#FF8FC4" />
            <circle cx="120" cy="498" r="1.6" fill="#FFFFFF" />
          </Both>
        ),
      },
    ],
  },
  "shoes-cristal": {
    parts: [
      {
        layer: "shoes",
        render: () => (
          <Both>
            <rect x="119" y="552" width="32" height="15" rx="4" fill="#C9EBFF" fillOpacity="0.55" stroke="#7FC0EE" strokeWidth="1.2" />
            <path d={heartPath(135, 559, 4.5)} fill="#FF7EB9" />
            <path d="M125 543 Q135 537 145 543 L147 553 L123 553 Z" fill="#E6F6FF" fillOpacity="0.55" stroke="#7FC0EE" strokeWidth="1.2" />
            <path d="M128 545 L131 551" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </Both>
        ),
      },
    ],
  },
};
