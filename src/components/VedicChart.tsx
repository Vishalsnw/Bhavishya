import type { ChartData } from '../types/database'

interface VedicChartProps {
  chartData: ChartData
  language: 'hindi' | 'english' | 'hinglish'
}

const planetSymbols: Record<string, string> = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
  Rahu: '☊',
  Ketu: '☋',
}

const translations = {
  hindi: {
    ascendant: 'लग्न',
    moonSign: 'चंद्र राशि',
    sunSign: 'सूर्य राशि',
    nakshatra: 'नक्षत्र',
    planets: 'ग्रह',
    house: 'भाव',
  },
  english: {
    ascendant: 'Ascendant',
    moonSign: 'Moon Sign',
    sunSign: 'Sun Sign',
    nakshatra: 'Nakshatra',
    planets: 'Planets',
    house: 'House',
  },
  hinglish: {
    ascendant: 'Lagna',
    moonSign: 'Moon Sign',
    sunSign: 'Sun Sign',
    nakshatra: 'Nakshatra',
    planets: 'Planets',
    house: 'House',
  },
}

export default function VedicChart({ chartData, language }: VedicChartProps) {
  const t = translations[language]

  return (
    <div className="animate-fade-in space-y-6">
      {/* Key Chart Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.ascendant}</div>
          <div className="text-lg font-semibold text-gold-300">{chartData.ascendant}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.moonSign}</div>
          <div className="text-lg font-semibold text-celestial-200">{chartData.moon_sign}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.sunSign}</div>
          <div className="text-lg font-semibold text-orange-300">{chartData.sun_sign}</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.nakshatra}</div>
          <div className="text-lg font-semibold text-purple-300">{chartData.moon_nakshatra}</div>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="flex justify-center py-6">
        <div className="relative w-full max-w-sm aspect-square">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Outer glow effect */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.3"/>
              </linearGradient>
            </defs>

            <g stroke="#3f3f46" strokeWidth="1.5" fill="none">
              {/* Center square */}
              <rect x="100" y="100" width="200" height="200" fill="rgba(15,23,42,0.5)" stroke="rgba(251,191,36,0.2)" strokeWidth="2"/>

              {/* North houses */}
              <rect x="100" y="50" width="200" height="50" fill="rgba(30,58,95,0.2)" stroke="rgba(251,191,36,0.15)"/>
              <line x1="150" y1="50" x2="150" y2="100" />
              <line x1="200" y1="50" x2="200" y2="100" />
              <line x1="250" y1="50" x2="250" y2="100" />

              {/* West houses */}
              <rect x="50" y="100" width="50" height="200" fill="rgba(30,58,95,0.2)" stroke="rgba(251,191,36,0.15)"/>
              <line x1="50" y1="150" x2="100" y2="150" />
              <line x1="50" y1="200" x2="100" y2="200" />
              <line x1="50" y1="250" x2="100" y2="250" />

              {/* South houses */}
              <rect x="100" y="300" width="200" height="50" fill="rgba(30,58,95,0.2)" stroke="rgba(251,191,36,0.15)"/>
              <line x1="150" y1="300" x2="150" y2="350" />
              <line x1="200" y1="300" x2="200" y2="350" />
              <line x1="250" y1="300" x2="250" y2="350" />

              {/* East houses */}
              <rect x="300" y="100" width="50" height="200" fill="rgba(30,58,95,0.2)" stroke="rgba(251,191,36,0.15)"/>
              <line x1="300" y1="150" x2="350" y2="150" />
              <line x1="300" y1="200" x2="350" y2="200" />
              <line x1="300" y1="250" x2="350" y2="250" />
            </g>

            {/* Planets in each house */}
            {chartData.houses.map((house) => {
              const positions: Record<number, { x: number; y: number }> = {
                1: { x: 175, y: 75 },
                2: { x: 75, y: 140 },
                3: { x: 75, y: 210 },
                4: { x: 75, y: 280 },
                5: { x: 140, y: 330 },
                6: { x: 200, y: 330 },
                7: { x: 260, y: 330 },
                8: { x: 325, y: 280 },
                9: { x: 325, y: 210 },
                10: { x: 325, y: 140 },
                11: { x: 225, y: 75 },
                12: { x: 125, y: 75 },
              }

              const pos = positions[house.number]
              if (!pos) return null

              return (
                <g key={house.number}>
                  {/* House number */}
                  <text
                    x={pos.x}
                    y={pos.y - 20}
                    fontSize="11"
                    textAnchor="middle"
                    fill="#71717a"
                    fontWeight="500"
                  >
                    {house.number}
                  </text>
                  {/* Planets */}
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    fontSize="16"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontWeight="bold"
                    filter="url(#glow)"
                  >
                    {house.planets.map(p => planetSymbols[p] || p).join(' ')}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Planet Details */}
      <div className="space-y-3">
        <h3 className="text-sm text-zinc-400 font-medium tracking-wider">{t.planets}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {chartData.planets.map((planet, index) => (
            <div
              key={planet.name}
              className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-between animate-slide-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl text-gold-400">{planetSymbols[planet.name] || '●'}</span>
                <div>
                  <div className="font-medium text-zinc-200 text-sm">{planet.name}</div>
                  <div className="text-xs text-zinc-500">
                    {planet.sign} • {t.house} {planet.house}
                  </div>
                </div>
              </div>
              {planet.retrograde && (
                <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">R</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
