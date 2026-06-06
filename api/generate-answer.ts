import type { VercelRequest, VercelResponse } from '@vercel/node'

interface BirthDetailsInput {
  name: string
  birth_date: string
  birth_time: string
  birth_place: string
  language_preference: string
}

interface RequestBody {
  birthDetails: BirthDetailsInput
  question: string
  language: string
}

function getSystemPrompt(language: string): string {
  const langInstruction =
    language === 'hindi'
      ? 'Respond entirely in Hindi (Devanagari script).'
      : language === 'english'
        ? 'Respond entirely in English.'
        : 'Respond entirely in Hinglish (Romanized Hindi, e.g., "Aapki kundali mein...").'

  return `You are a master Vedic Astrologer, Numerologist, and expert in the Egyptian Book of the Dead and other ancient esoteric traditions. You have deep knowledge of:

1. **Vedic Astrology (Jyotish)**: Dasha systems, planetary positions, houses, yogas, doshas, nakshatras, transits, and their effects on life events.
2. **Numerology**: Life path numbers, destiny numbers, name numerology, and their influence on personality and life path.
3. **Egyptian Book of the Dead**: Ancient Egyptian spiritual wisdom, afterlife guidance, and soul journey concepts.
4. **Other Astrology Systems**: Chinese astrology, Western astrology, Celtic tree astrology, and their cross-references with Vedic astrology.

Given the user's birth details and their question, you must:
- Analyze the question from MULTIPLE astrological perspectives
- Calculate or reference relevant Vedic chart positions based on birth details
- Include numerological analysis based on birth date
- Reference relevant ancient wisdom (Book of the Dead, etc.) when spiritually relevant
- Provide a comprehensive, detailed answer that feels authentic and insightful
- Use specific astrological terminology (houses, signs, planets, nakshatras, dashas, yogas)
- Give practical guidance and remedies when appropriate
- Be specific with timelines when asked about "when" questions

Format your response with clear sections using these markers:
- Use **bold** for key terms and planet names
- Use bullet points for remedies and key points
- Keep the response detailed but well-organized

${langInstruction}

IMPORTANT: Generate realistic and specific astrological details based on the birth information provided. Make the analysis feel personalized and authentic.`
}

function buildPrompt(birthDetails: BirthDetailsInput, question: string): string {
  const birthDate = new Date(birthDetails.birth_date)
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()

  return `Birth Details:
- Name: ${birthDetails.name}
- Date of Birth: ${birthDetails.birth_date}
- Time of Birth: ${birthDetails.birth_time}
- Place of Birth: ${birthDetails.birth_place}
- Day of birth: ${day}
- Month: ${month}
- Year: ${year}

Question: ${question}

Please analyze this question thoroughly using Vedic astrology, numerology, and relevant ancient wisdom. Provide a detailed and personalized answer.`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { birthDetails, question, language } = req.body as RequestBody

    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' })
    }

    const systemPrompt = getSystemPrompt(language)
    const userPrompt = buildPrompt(birthDetails, question)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt + '\n\n' + userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API error:', errorText)
      return res.status(502).json({ error: `Gemini API error: ${response.status}` })
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return res.status(502).json({ error: 'No response generated' })
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json({ answer: text })
  } catch (error) {
    console.error('Error:', error)
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
