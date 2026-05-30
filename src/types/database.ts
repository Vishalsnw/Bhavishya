export type Language = 'hindi' | 'english' | 'hinglish'

export interface BirthChart {
  id: string
  name: string
  birth_date: string
  birth_time: string
  birth_place: string
  chart_data: ChartData
  language_preference: Language
  created_at: string
}

export interface ChartData {
  ascendant: string
  ascendant_sign: string
  planets: {
    name: string
    sign: string
    house: number
    degree: number
    retrograde?: boolean
  }[]
  houses: {
    number: number
    sign: string
    planets: string[]
  }[]
  moon_sign: string
  moon_nakshatra: string
  sun_sign: string
}

export interface Question {
  id: string
  chart_id: string
  question: string
  answer: string | null
  language: Language
  created_at: string
}

export interface BirthDetailsInput {
  name: string
  birth_date: string
  birth_time: string
  birth_place: string
  language_preference: Language
}
