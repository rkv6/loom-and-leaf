import { useId } from 'react'
import type { ArtKind } from '../data/products'

// Drawn stand-ins for product photos. A client site would use real photography here.
const GOLD = '#dba51c'

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, v + amt))
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => c(v).toString(16).padStart(2, '0')).join('')}`
}

export function Art({ kind, colour = '#e6dcc6', tint = '#5b3a29', label, fit = false }: { kind: ArtKind; colour?: string; tint?: string; label: string; fit?: boolean }) {
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
      body = <g><rect x="135" y="80" width="130" height="300" fill={colour} /><rect x="135" y="80" width="130" height="300" fill={`url(#w${uid})`} /><g stroke={GOLD} strokeWidth="3">{[104, 112, 348, 356].map((y) => <line key={y} x1="135" y1={y} x2="265" y2={y} />)}</g>{fringe(135, 380, 130)}</g>
      break
    case 'handtowels':
      body = <g><g transform="rotate(-6 150 250)">{cloth(80, 90, 130, 250)}{fringe(80, 340, 130)}</g><g transform="rotate(5 260 250)">{cloth(190, 110, 130, 250)}{fringe(190, 360, 130)}</g></g>
      break
    case 'runner':
      body = <g><path d="M120 110 L280 110 L280 300 L200 350 L120 300 Z" fill={colour} /><path d="M120 110 L280 110 L280 300 L200 350 L120 300 Z" fill={`url(#w${uid})`} /><g stroke={GOLD} strokeWidth="3"><line x1="120" y1="134" x2="280" y2="134" /><line x1="120" y1="142" x2="280" y2="142" /></g><g stroke={GOLD} strokeWidth="2.5" strokeLinecap="round">{[150, 175, 200, 225, 250].map((x, i) => <line key={x} x1={x} y1={318 + (i === 2 ? 28 : i % 2 === 1 ? 14 : 0) } x2={x} y2={338 + (i === 2 ? 28 : i % 2 === 1 ? 14 : 0)} />)}</g></g>
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
      body = <g><rect x="130" y="130" width="140" height="250" rx="6" fill="#1f4a36" /><rect x="122" y="106" width="156" height="30" rx="3" fill={GOLD} /><rect x="148" y="190" width="104" height="120" fill="#f4f6f0" stroke={GOLD} strokeWidth="2" /><path d="M200 282 C176 258 178 226 200 208 C222 226 224 258 200 282 Z" fill={tint} /><path d="M200 282 L200 222" stroke="#f4f6f0" strokeWidth="2" /><text x="200" y="300" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1f4a36" letterSpacing="1">HIGH GROWN</text></g>
      break
    case 'sampler':
      body = <g><rect x="70" y="170" width="260" height="190" fill="#f4f6f0" stroke="#14231c" strokeWidth="3" />{['#1f4a36', '#23306b', '#b42a1f', '#1f4a36'].map((c, i) => <g key={i}><rect x={88 + i * 60} y="196" width="50" height="116" rx="3" fill={c} /><rect x={86 + i * 60} y="188" width="54" height="14" rx="2" fill={GOLD} /></g>)}<text x="200" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#14231c" letterSpacing="1">4 • 50 g TINS</text></g>
      break
  }
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className="art" preserveAspectRatio={fit ? 'xMidYMid meet' : 'xMidYMid slice'}>
      {weave}
      <rect width="400" height="500" fill="#e4e9df" />
      <ellipse cx="200" cy="440" rx="130" ry="14" fill="#14231c" opacity="0.1" />
      {body}
    </svg>
  )
}
