import { useId } from 'react'
import type { ArtKind } from '../data/products'

// Drawn stand-ins for product photos. A client site would use real photography here.
const GOLD = '#c9a24a'

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, v + amt))
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => c(v).toString(16).padStart(2, '0')).join('')}`
}

export function Art({ kind, colour = '#e6dcc6', tint = '#5b3a29', label }: { kind: ArtKind; colour?: string; tint?: string; label: string }) {
  const uid = useId().replace(/:/g, '')
  const dark = shade(colour, -38)
  const weave = (
    <defs>
      <pattern id={`w${uid}`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 3H6M3 0V6" stroke={dark} strokeWidth="0.7" opacity="0.35" />
      </pattern>
    </defs>
  )
  const border = (x: number, y: number, w: number, h: number) => (
    <g fill="none" stroke={GOLD}>
      <rect x={x} y={y} width={w} height={h} strokeWidth="3" />
      <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} strokeWidth="1.5" />
    </g>
  )
  const cloth = (x: number, y: number, w: number, h: number, withBorder = true) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={colour} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#w${uid})`} />
      {withBorder && border(x + 10, y + 10, w - 20, h - 20)}
    </g>
  )
  const fringe = (x: number, y: number, w: number) => (
    <g stroke={colour} strokeWidth="2" strokeLinecap="round">
      {Array.from({ length: Math.floor(w / 8) }, (_, i) => <line key={i} x1={x + 4 + i * 8} y1={y} x2={x + 4 + i * 8} y2={y + 16} />)}
    </g>
  )

  let body
  switch (kind) {
    case 'towel':
      body = <g>{cloth(120, 70, 160, 330)}{fringe(120, 400, 160)}<rect x="170" y="48" width="60" height="26" rx="4" fill={dark} /></g>
      break
    case 'handtowels':
      body = <g><g transform="rotate(-6 150 250)">{cloth(80, 90, 130, 250)}{fringe(80, 340, 130)}</g><g transform="rotate(5 260 250)">{cloth(190, 110, 130, 250)}{fringe(190, 360, 130)}</g></g>
      break
    case 'runner':
      body = <g><rect x="0" y="310" width="400" height="190" fill={shade('#e8e4dc', -6)} />{cloth(30, 170, 340, 150, false)}<g fill="none" stroke={GOLD}><rect x="46" y="184" width="308" height="122" strokeWidth="3" /><rect x="53" y="191" width="294" height="108" strokeWidth="1.5" /></g>{fringe(30, 320, 340)}</g>
      break
    case 'cushion':
      body = <g><rect x="70" y="120" width="260" height="260" rx="14" fill={dark} />{cloth(80, 130, 240, 240)}<circle cx="80" cy="130" r="4" fill={dark} /><circle cx="320" cy="130" r="4" fill={dark} /><circle cx="80" cy="370" r="4" fill={dark} /><circle cx="320" cy="370" r="4" fill={dark} /></g>
      break
    case 'throw':
      body = <g><path d="M40 120 C140 90 260 150 360 110 L360 380 C260 410 140 350 40 390 Z" fill={colour} /><path d="M40 120 C140 90 260 150 360 110 L360 380 C260 410 140 350 40 390 Z" fill={`url(#w${uid})`} />{[170, 210, 250].map((y) => <path key={y} d={`M40 ${y} C140 ${y - 30} 260 ${y + 30} 360 ${y - 10}`} fill="none" stroke={GOLD} strokeWidth="2.5" />)}{fringe(40, 380, 320)}</g>
      break
    case 'napkins':
      body = <g>{[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${i * 14} ${-i * 14}) rotate(${(i - 1.5) * 4} 200 260)`}>{cloth(95, 190, 170, 170, false)}<g stroke={GOLD} strokeWidth="2.5"><line x1="95" y1="206" x2="265" y2="206" /><line x1="95" y1="344" x2="265" y2="344" /></g></g>)}</g>
      break
    case 'apron':
      body = <g><path d="M150 70 L250 70 L270 160 L320 170 L320 420 L80 420 L80 170 L130 160 Z" fill={colour} /><path d="M150 70 L250 70 L270 160 L320 170 L320 420 L80 420 L80 170 L130 160 Z" fill={`url(#w${uid})`} /><path d="M150 70 C150 30 250 30 250 70" fill="none" stroke={dark} strokeWidth="6" /><rect x="150" y="290" width="100" height="70" fill={dark} opacity="0.35" /><rect x="150" y="290" width="100" height="70" fill="none" stroke={GOLD} strokeWidth="2.5" /></g>
      break
    case 'tea':
      body = <g><rect x="120" y="90" width="160" height="300" rx="16" fill={tint} /><rect x="130" y="70" width="140" height="34" rx="6" fill={shade(tint, -30)} /><rect x="136" y="170" width="128" height="160" rx="6" fill="#f4efe3" /><rect x="142" y="176" width="116" height="148" rx="3" fill="none" stroke={GOLD} strokeWidth="1.5" /><path d="M200 300 C170 270 172 230 200 205 C228 230 230 270 200 300 Z" fill={tint} /><path d="M200 300 L200 225" stroke="#f4efe3" strokeWidth="2" /></g>
      break
    case 'sampler':
      body = <g><rect x="60" y="150" width="280" height="230" fill={shade('#d9c9a3', -10)} />{['#5b3a29', '#5d8a4f', '#9b5a2a', '#6d8f3a'].map((c, i) => <g key={c}><rect x={78 + i * 64} y="170" width="52" height="170" rx="8" fill={c} /><rect x={84 + i * 64} y="226" width="40" height="54" rx="3" fill="#f4efe3" /></g>)}<rect x="60" y="340" width="280" height="40" fill={shade('#d9c9a3', -28)} /><g fill="none" stroke={GOLD}><rect x="70" y="350" width="260" height="20" strokeWidth="1.5" /></g></g>
      break
  }
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className="art" preserveAspectRatio="xMidYMid slice">
      {weave}
      <rect width="400" height="500" fill="#eef0f6" />
      <ellipse cx="200" cy="440" rx="130" ry="14" fill="#1b2250" opacity="0.08" />
      {body}
    </svg>
  )
}
