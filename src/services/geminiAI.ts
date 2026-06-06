import type { BirthDetails, Language } from '../types/database'

export async function generateAstrologyAnswer(
  birthDetails: BirthDetails,
  question: string,
  language: Language
): Promise<string> {
  const response = await fetch('/api/generate-answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      birthDetails,
      question,
      language,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('API error:', error)
    throw new Error('Failed to get astrology answer')
  }

  const data = await response.json()
  if (!data.answer) {
    throw new Error('No answer received')
  }

  return data.answer
}
