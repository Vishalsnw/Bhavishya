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
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-4 gap-4 text-center mb-4">
          <div>
            <div className="text-sm text-gray-600">{t.ascendant}</div>
            <div className="text-xl font-bold text-blue-600">{chartData.ascendant}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">{t.moonSign}</div>
            <div className="text-xl font-bold text-blue-600">{chartData.moon_sign}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">{t.sunSign}</div>
            <div className="text-xl font-bold text-blue-600">{chartData.sun_sign}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">{t.nakshatra}</div>
            <div className="text-xl font-bold text-blue-600">{chartData.moon_nakshatra}</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-6">
        <svg viewBox="0 0 400 400" className="w-full max-w-lg mx-auto">
          <g stroke="#1e3a5f" strokeWidth="2" fill="none">
            <rect x="100" y="100" width="200" height="200" fill="white" />
            <rect x="100" y="50" width="200" height="50" fill="white" />
            <rect x="50" y="100" width="50" height="200" fill="white" />
            <rect x="100" y="250" width="200" height="50" fill="white" />
            <rect x="250" y="100" width="50" height="200" fill="white" />

            <line x1="100" y1="150" x2="50" y2="150" />
            <line x1="100" y1="200" x2="50" y2="200" />
            <line x1="100" y1="250" x2="50" y2="250" />

            <line x1="150" y1="50" x2="150" y2="100" />
            <line x1="200" y1="50" x2="200" y2="100" />
            <line x1="250" y1="50" x2="250" y2="100" />

            <line x1="300" y1="150" x2="350" y2="150" />
            <line x1="300" y1="200" x2="350" y2="200" />
            <line x1="300" y1="250" x2="350" y2="250" />

            <line x1="150" y1="300" x2="150" y2="350" />
            <line x1="200" y1="300" x2="200" y2="350" />
            <line x1="250" y1="300" x2="250" y2="350" />
          </g>

          {chartData.houses.map((house) => {
            const positions: Record<number, { x: number; y: number }> = {
              1: { x: 175, y: 70 },
              2: { x: 65, y: 140 },
              3: { x: 65, y: 210 },
              4: { x: 65, y: 280 },
              5: { x: 140, y: 330 },
              6: { x: 200, y: 330 },
              7: { x: 260, y: 330 },
              8: { x: 330, y: 280 },
              9: { x: 330, y: 210 },
              10: { x: 330, y: 140 },
              11: { x: 215, y: 70 },
              12: { x: 140, y: 70 },
            }

            const pos = positions[house.number]
            if (!pos) return null

            return (
              <g key={house.number}>
                <text
                  x={pos.x}
                  y={pos.y - 15}
                  fontSize="10"
                  textAnchor="middle"
                  fill="#6b7280"
                  fontWeight="bold"
                >
                  {house.number}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  fontSize="14"
                  textAnchor="middle"
                  fill="#1f2937"
                  fontWeight="bold"
                >
                  {house.planets.map(p => planetSymbols[p] || p).join(' ')}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {chartData.planets.map((planet) => (
          <div
            key={planet.name}
            className="bg-white rounded-lg shadow p-3 flex items-center justify-between animate-slide-in"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{planetSymbols[planet.name] || '●'}</span>
              <div>
                <div className="font-semibold text-gray-800">{planet.name}</div>
                <div className="text-sm text-gray-600">
                  {planet.sign} • {t.house} {planet.house}
                </div>
              </div>
            </div>
            {planet.retrograde && (
              <span className="text-red-500 font-bold text-xs">R</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
