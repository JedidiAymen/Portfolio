/* Flat, friendly illustrations for Smart CapEx (the real dashboards hold Orange data and stay private).
   Orange-style palette: orange, black, white and warm neutrals. Light motion, no text-heavy UI. */

const O = "#FF7900", K = "#141414", W = "#FFFFFF", CREAM = "#FFF4E8", SAND = "#F3E3CF", GREY = "#D9D4CC", DARK = "#3A3A3A";

const css = `
.sc-ring{transform-box:fill-box;transform-origin:center;animation:sc-ring 2.6s ease-out infinite}
.sc-ring.d2{animation-delay:.85s}.sc-ring.d3{animation-delay:1.7s}
@keyframes sc-ring{0%{transform:scale(.4);opacity:.9}100%{transform:scale(1.6);opacity:0}}
.sc-blink{animation:sc-blink 3s steps(2) infinite}.sc-blink.b2{animation-delay:1.1s}.sc-blink.b3{animation-delay:2s}
@keyframes sc-blink{50%{opacity:.25}}
.sc-float{animation:sc-float 5s ease-in-out infinite}
@keyframes sc-float{50%{transform:translateY(-14px)}}
.sc-car{animation:sc-car 9s linear infinite}
@keyframes sc-car{from{transform:translateX(-260px)}to{transform:translateX(1860px)}}
.sc-draw{stroke-dasharray:1400;stroke-dashoffset:1400;animation:sc-draw 4s ease-out infinite}
@keyframes sc-draw{60%,100%{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){.sc-ring,.sc-blink,.sc-float,.sc-car,.sc-draw{animation:none;stroke-dashoffset:0}}
`;

function Person({ x, y, s = 1, shirt = O, skin = "#E8B48A", hair = K, phone = true, flip = false }: { x: number; y: number; s?: number; shirt?: string; skin?: string; hair?: string; phone?: boolean; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <rect x="-22" y="70" width="18" height="70" rx="9" fill={K} />
      <rect x="4" y="70" width="18" height="70" rx="9" fill={K} />
      <rect x="-34" y="-6" width="68" height="92" rx="30" fill={shirt} />
      <circle cx="0" cy="-34" r="30" fill={skin} />
      <path d="M-30 -38 C-30 -70 30 -72 30 -40 C18 -52 -10 -54 -30 -38 Z" fill={hair} />
      {phone ? (
        <>
          <path d="M26 20 C46 10 52 -6 44 -18" stroke={skin} strokeWidth="14" strokeLinecap="round" fill="none" />
          <rect x="34" y="-40" width="22" height="36" rx="5" fill={K} />
          <rect x="37" y="-36" width="16" height="26" rx="2" fill={O} className="sc-blink" />
        </>
      ) : <path d="M26 20 C40 34 40 56 30 70" stroke={skin} strokeWidth="14" strokeLinecap="round" fill="none" />}
      <path d="M-26 20 C-38 34 -38 56 -28 70" stroke={skin} strokeWidth="14" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Tower({ x, y, h = 420 }: { x: number; y: number; h?: number }) {
  const w = h * 0.32;
  const rungs = Array.from({ length: 7 }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w / 2} 0 L0 ${-h} L${w / 2} 0`} fill="none" stroke={K} strokeWidth="10" strokeLinejoin="round" />
      {rungs.map((i) => {
        const t0 = i / 7, t1 = (i + 1) / 7, a = (w / 2) * (1 - t0), b = (w / 2) * (1 - t1);
        return <path key={i} d={`M${-a} ${-h * t0} L${b} ${-h * t1} M${a} ${-h * t0} L${-b} ${-h * t1}`} stroke={K} strokeWidth="5" />;
      })}
      <rect x="-34" y={-h + 30} width="16" height="60" rx="4" fill={W} stroke={K} strokeWidth="5" />
      <rect x="18" y={-h + 30} width="16" height="60" rx="4" fill={W} stroke={K} strokeWidth="5" />
      <circle cx="0" cy={-h - 6} r="10" fill={O} className="sc-blink" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M-70 ${-h + 20} A90 90 0 0 1 -70 ${-h + 120}`} transform={`translate(${-k * 34} 0)`} fill="none" stroke={O} strokeWidth="9" strokeLinecap="round" className={`sc-ring d${k + 1}`} />
          <path d={`M70 ${-h + 20} A90 90 0 0 0 70 ${-h + 120}`} transform={`translate(${k * 34} 0)`} fill="none" stroke={O} strokeWidth="9" strokeLinecap="round" className={`sc-ring d${k + 1}`} />
        </g>
      ))}
    </g>
  );
}

function Building({ x, w, h, base = 820, fill = W, lit = [] as number[] }: { x: number; w: number; h: number; base?: number; fill?: string; lit?: number[] }) {
  const cols = Math.max(2, Math.floor(w / 46)), rows = Math.max(2, Math.floor(h / 70));
  return (
    <g>
      <rect x={x} y={base - h} width={w} height={h} rx="10" fill={fill} stroke={K} strokeWidth="6" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const on = lit.includes(i);
        return <rect key={i} x={x + 16 + c * ((w - 32) / cols)} y={base - h + 22 + r * ((h - 40) / rows)} width={(w - 32) / cols - 14} height={(h - 40) / rows - 22} rx="4" fill={on ? O : SAND} className={on ? `sc-blink b${(i % 3) + 1}` : undefined} />;
      })}
    </g>
  );
}

/* 1. The network: people, phones, a tower, and data flowing to the platform */
export function CapexCity() {
  const flows = ["M380 690 C 520 520, 760 420, 905 360", "M1240 700 C 1150 520, 1000 420, 905 360", "M905 300 C 760 140, 520 110, 360 170"];
  return (
    <svg viewBox="0 0 1600 1000" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: people on their phones, a cell tower, and network data flowing to the Smart CapEx platform">
      <style>{css}</style>
      <rect width="1600" height="1000" fill={CREAM} />
      <circle cx="1330" cy="190" r="90" fill={O} opacity=".9" />
      {/* skyline far */}
      {[[80, 150, 300], [250, 120, 220], [1260, 140, 260], [1420, 160, 330], [600, 110, 200], [1080, 120, 240]].map(([x, w, h], i) => <rect key={i} x={x} y={820 - h} width={w} height={h} rx="8" fill={GREY} />)}
      {/* platform cloud */}
      <g className="sc-float">
        <path d="M250 200 a70 70 0 0 1 130 -40 a60 60 0 0 1 100 30 a55 55 0 0 1 -10 110 h-210 a55 55 0 0 1 -10 -100 z" fill={W} stroke={K} strokeWidth="7" />
        <rect x="290" y="215" width="150" height="16" rx="8" fill={O} /><rect x="290" y="245" width="100" height="16" rx="8" fill={SAND} />
      </g>
      <Building x={120} w={190} h={330} lit={[1, 4, 6]} />
      <Building x={330} w={150} h={220} lit={[0, 3]} />
      <Building x={1150} w={180} h={300} lit={[2, 5]} />
      <Building x={1350} w={200} h={380} fill="#FFE7CC" lit={[0, 4, 7, 9]} />
      <Tower x={905} y={820} h={470} />
      {/* data packets */}
      {flows.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={K} strokeOpacity=".18" strokeWidth="4" strokeDasharray="4 14" strokeLinecap="round" />
          {[0, 1, 2].map((k) => (
            <rect key={k} x="-9" y="-9" width="18" height="18" rx="4" fill={i === 2 ? K : O}>
              <animateMotion dur={`${3.2 + i * 0.4}s`} begin={`${k * 1.1}s`} repeatCount="indefinite" path={d} />
            </rect>
          ))}
        </g>
      ))}
      {/* ground and road */}
      <rect y="820" width="1600" height="180" fill={SAND} />
      <rect y="880" width="1600" height="70" fill={DARK} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={i * 110} y="910" width="60" height="9" rx="4" fill={W} />)}
      <g className="sc-car">
        <rect x="0" y="852" width="170" height="46" rx="20" fill={O} stroke={K} strokeWidth="6" />
        <path d="M30 856 Q50 816 90 816 L120 816 Q140 820 150 856 Z" fill={W} stroke={K} strokeWidth="6" />
        <circle cx="40" cy="900" r="18" fill={K} /><circle cx="130" cy="900" r="18" fill={K} />
      </g>
      <Person x={380} y={690} s={1.05} />
      <Person x={1240} y={700} shirt={K} skin="#C68B5E" flip />
      <Person x={1450} y={705} s={0.85} shirt={W} skin="#F0C8A0" hair="#7A4A24" phone={false} />
      <g transform="translate(560 120)">
        <rect width="250" height="86" rx="43" fill={K} />
        <text x="125" y="40" textAnchor="middle" fill={W} fontFamily="'JetBrains Mono', monospace" fontSize="22">380.4M rows</text>
        <text x="125" y="66" textAnchor="middle" fill={O} fontFamily="'JetBrains Mono', monospace" fontSize="18">→ 99.18M cell-hours</text>
      </g>
    </svg>
  );
}

/* 2. The map: where demand is heading and which sites to upgrade */
export function CapexMap() {
  const sites: [number, number, boolean][] = [[300, 260, false], [520, 420, true], [760, 250, false], [980, 520, true], [1240, 330, false], [430, 720, false], [820, 760, true], [1180, 760, false], [1400, 600, false]];
  return (
    <svg viewBox="0 0 1600 1000" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: a city map with demand hotspots and pulsing upgrade candidates">
      <style>{css}</style>
      <defs>
        <radialGradient id="sc-heat"><stop offset="0" stopColor={O} stopOpacity=".55" /><stop offset="1" stopColor={O} stopOpacity="0" /></radialGradient>
        <pattern id="sc-hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(.9)">
          <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L28 97" fill="none" stroke={K} strokeOpacity=".06" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill="#F7EFE3" />
      <path d="M-20 640 C 260 560, 420 820, 760 700 S 1260 520, 1640 640 L1640 720 C 1260 600, 1100 800, 760 780 S 260 640, -20 720 Z" fill="#CFE3EA" />
      {[[160, 120, 240, 150], [1300, 80, 220, 170], [620, 860, 260, 120]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="60" fill="#DDEBD2" />)}
      {["M0 360 H1600", "M0 540 C 500 500, 1100 580, 1600 520", "M380 0 V1000", "M880 0 C 860 400, 920 600, 900 1000", "M1320 0 V1000"].map((d, i) => (
        <g key={i}><path d={d} stroke={W} strokeWidth="34" fill="none" /><path d={d} stroke={GREY} strokeWidth="2" strokeDasharray="14 14" fill="none" /></g>
      ))}
      <rect width="1600" height="1000" fill="url(#sc-hex)" />
      {[[520, 420, 230], [980, 520, 260], [820, 760, 200]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="url(#sc-heat)" />)}
      {sites.map(([x, y, up], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {up && [1, 2, 3].map((k) => <circle key={k} r="46" fill="none" stroke={O} strokeWidth="6" className={`sc-ring d${k}`} />)}
          <path d="M0 -58 C 30 -58 40 -30 40 -18 C 40 8 0 40 0 40 C 0 40 -40 8 -40 -18 C -40 -30 -30 -58 0 -58 Z" fill={up ? O : W} stroke={K} strokeWidth="6" />
          <path d="M-12 -6 L0 -36 L12 -6 M-7 -18 H7" stroke={up ? W : K} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <g transform="translate(1110 110)" className="sc-float">
        <rect width="380" height="230" rx="28" fill={W} stroke={K} strokeWidth="6" />
        <text x="32" y="56" fill={K} fontFamily="'Host Grotesk', sans-serif" fontSize="28" fontWeight="600">Upgrade candidates</text>
        {[0.86, 0.71, 0.58].map((v, i) => (
          <g key={i} transform={`translate(32 ${86 + i * 46})`}>
            <circle cx="12" cy="12" r="12" fill={O} />
            <rect x="38" y="4" width="280" height="16" rx="8" fill={SAND} />
            <rect x="38" y="4" width={280 * v} height="16" rx="8" fill={K} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* 3. The decision: forecast, budget, optimizer and an agent you can ask */
export function CapexDecide() {
  return (
    <svg viewBox="0 0 1600 1000" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration: a planner asks the agent which sites need capacity, and gets a forecast and a budgeted plan">
      <style>{css}</style>
      <rect width="1600" height="1000" fill={CREAM} />
      <circle cx="1460" cy="120" r="300" fill="#FFE2C2" />
      {/* desk + planner */}
      <rect x="120" y="760" width="620" height="28" rx="14" fill={K} />
      <rect x="160" y="788" width="22" height="200" fill={K} /><rect x="680" y="788" width="22" height="200" fill={K} />
      <rect x="320" y="600" width="250" height="160" rx="14" fill={DARK} /><rect x="300" y="752" width="290" height="16" rx="8" fill={K} />
      <circle cx="445" cy="680" r="20" fill={O} />
      <Person x={240} y={640} s={1.15} shirt={O} phone={false} />
      {/* question bubble */}
      <g transform="translate(110 250)" className="sc-float">
        <rect width="560" height="150" rx="40" fill={W} stroke={K} strokeWidth="6" />
        <path d="M120 150 L150 210 L190 150" fill={W} stroke={K} strokeWidth="6" strokeLinejoin="round" />
        <rect x="120" y="146" width="80" height="10" fill={W} />
        <text x="44" y="68" fill={K} fontFamily="'Host Grotesk', sans-serif" fontSize="34" fontWeight="600">Which sites need</text>
        <text x="44" y="112" fill={K} fontFamily="'Host Grotesk', sans-serif" fontSize="34" fontWeight="600">capacity next year?</text>
      </g>
      {/* answer card */}
      <g transform="translate(800 200)">
        <rect width="680" height="620" rx="36" fill={W} stroke={K} strokeWidth="6" />
        <circle cx="70" cy="70" r="28" fill={K} /><path d="M58 70 h24 M70 58 v24" stroke={O} strokeWidth="6" strokeLinecap="round" />
        <text x="118" y="80" fill={K} fontFamily="'Host Grotesk', sans-serif" fontSize="28" fontWeight="600">Agent · 19 tools</text>
        {/* forecast chart */}
        <g transform="translate(50 140)">
          <rect width="580" height="230" rx="18" fill="#FBF6EF" />
          <path d="M20 190 C 120 170, 200 150, 290 120 C 380 90, 470 70, 560 40 L560 110 C 470 130, 380 150, 290 160 Z" fill={O} opacity=".18" />
          <path d="M20 190 C 120 170, 200 160, 290 140" fill="none" stroke={K} strokeWidth="7" strokeLinecap="round" className="sc-draw" />
          <path d="M290 140 C 380 120, 470 100, 560 75" fill="none" stroke={O} strokeWidth="7" strokeDasharray="14 12" strokeLinecap="round" />
          <line x1="290" y1="20" x2="290" y2="215" stroke={K} strokeOpacity=".25" strokeWidth="3" strokeDasharray="6 8" />
          <text x="300" y="44" fill={K} fillOpacity=".6" fontFamily="'JetBrains Mono', monospace" fontSize="18">forecast</text>
        </g>
        {/* budget + plan */}
        <g transform="translate(50 410)">
          <text y="20" fill={K} fontFamily="'JetBrains Mono', monospace" fontSize="18" fillOpacity=".6">budget</text>
          <rect y="36" width="580" height="26" rx="13" fill={SAND} />
          <rect y="36" width="420" height="26" rx="13" fill={O} className="sc-blink" />
          {["Site A · add capacity", "Site B · new carrier", "Site C · wait a year"].map((t, i) => (
            <g key={t} transform={`translate(0 ${100 + i * 46})`}>
              <circle cx="14" cy="-6" r="14" fill={i < 2 ? O : GREY} />
              {i < 2 && <path d="M7 -6 l5 5 l9 -10" stroke={W} strokeWidth="4" fill="none" strokeLinecap="round" />}
              <text x="42" y="2" fill={K} fontFamily="'Host Grotesk', sans-serif" fontSize="24">{t}</text>
            </g>
          ))}
        </g>
      </g>
      {/* coins */}
      {[[700, 880], [740, 860], [780, 885]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="34" ry="14" fill={O} stroke={K} strokeWidth="5" /><ellipse cx={x} cy={y - 12} rx="34" ry="14" fill="#FFB066" stroke={K} strokeWidth="5" /></g>)}
    </svg>
  );
}
