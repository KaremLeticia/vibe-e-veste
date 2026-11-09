import type { ReactNode } from "react";

/** Mirror children across the doll's vertical center line (x = 150). */
export function Mirror({ children }: { children: ReactNode }) {
  return <g transform="translate(300 0) scale(-1 1)">{children}</g>;
}

/** Draw a left-side shape and its mirrored twin on the right. */
export function Both({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Mirror>{children}</Mirror>
    </>
  );
}

/** 4-point sparkle star path. */
export function starPath(cx: number, cy: number, r: number) {
  const k = r * 0.28;
  return `M${cx} ${cy - r} Q${cx + k} ${cy - k} ${cx + r} ${cy} Q${cx + k} ${cy + k} ${cx} ${cy + r} Q${cx - k} ${cy + k} ${cx - r} ${cy} Q${cx - k} ${cy - k} ${cx} ${cy - r} Z`;
}

export function Star({ x, y, r, fill = "#FFFFFF", opacity = 1 }: { x: number; y: number; r: number; fill?: string; opacity?: number }) {
  return <path d={starPath(x, y, r)} fill={fill} opacity={opacity} />;
}

export function heartPath(cx: number, cy: number, s: number) {
  // s = half width
  return `M${cx} ${cy + s * 0.9} C${cx - s * 1.4} ${cy - s * 0.1} ${cx - s * 0.7} ${cy - s * 1.2} ${cx} ${cy - s * 0.45} C${cx + s * 0.7} ${cy - s * 1.2} ${cx + s * 1.4} ${cy - s * 0.1} ${cx} ${cy + s * 0.9} Z`;
}

/** Point on a quadratic bezier. */
export function qPoint(p0: [number, number], c: [number, number], p1: [number, number], t: number): [number, number] {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
}

// Shared body geometry (viewBox 0 0 300 600)
export const LEG_LEFT =
  "M116 318 Q114 380 124 440 Q128 490 128 545 L142 545 Q144 490 146 440 Q150 380 151 326 Z";
export const TORSO =
  "M140 168 Q118 172 110 184 Q106 200 114 226 Q120 250 126 268 Q116 292 114 322 L186 322 Q184 292 174 268 Q180 250 186 226 Q194 200 190 184 Q182 172 160 168 Z";
export const ARM_LEFT = "113,186 102,256 96,318";

export const SHIRT_CROP =
  "M138 166 Q116 170 106 184 Q102 202 110 228 Q114 240 116 250 Q150 256 184 250 Q186 240 190 228 Q198 202 194 184 Q184 170 162 166 Q150 178 138 166 Z";
export const SHIRT_HIP =
  "M138 166 Q116 170 106 184 Q102 202 110 228 Q118 250 122 268 Q114 284 113 302 Q150 308 187 302 Q186 284 178 268 Q182 250 190 228 Q198 202 194 184 Q184 170 162 166 Q150 178 138 166 Z";
export const STRAPLESS =
  "M107 206 Q128 199 150 209 Q172 199 193 206 Q196 218 190 230 Q184 250 182 262 Q150 268 118 262 Q116 250 110 230 Q104 218 107 206 Z";

export function LongSleeve({ fill, stroke, width = 19 }: { fill: string; stroke?: string; width?: number }) {
  return (
    <Both>
      {stroke && (
        <polyline points="113,184 102,256 96,311" fill="none" stroke={stroke} strokeWidth={width + 2.5} strokeLinecap="round" strokeLinejoin="round" />
      )}
      <polyline points="113,184 102,256 96,311" fill="none" stroke={fill} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </Both>
  );
}

export function ShortSleeve({ fill, stroke }: { fill: string; stroke?: string }) {
  return (
    <Both>
      {stroke && <line x1="113" y1="184" x2="107" y2="218" stroke={stroke} strokeWidth={25.5} strokeLinecap="round" />}
      <line x1="113" y1="184" x2="107" y2="218" stroke={fill} strokeWidth={23} strokeLinecap="round" />
    </Both>
  );
}
