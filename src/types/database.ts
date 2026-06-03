export type Language = 'hindi' | 'english' | 'hinglish'

export interface BirthDetails {
  name: string
  birth_date: string
  birth_time: string
  birth_place: string
  language_preference: Language
}

export interface Question {
  id: string
  question: string
  answer: string | null
  language: Language
  created_at: string
}
