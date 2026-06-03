import type { BirthDetails, Language } from '../types/database'

export async function generateAstrologyAnswer(
  birthDetails: BirthDetails,
  question: string,
  language: Language
): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase configuration missing')
  }

  const functionUrl = `${supabaseUrl}/functions/v1/generate-astrology-answer`

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      birthDetails,
      question,
      language,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Edge Function error:', error)
    throw new Error('Failed to get astrology answer')
  }

  const data = await response.json()
  if (!data.answer) {
    throw new Error('No answer received')
  }

  return data.answer
}


export { generateAstrologyAnswer }