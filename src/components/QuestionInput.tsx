import { useState } from 'react'
import type { Language } from '../types/database'

interface QuestionInputProps {
  onSubmit: (question: string) => void
  isLoading: boolean
  language: Language
}

const translations = {
  hindi: {
    placeholder: 'अपना सवाल पूछें... जैसे: मुझे सरकारी नौकरी कब मिलेगी?',
    submit: 'प्रश्न पूछें',
    loading: 'उत्तर तैयार हो रहा है...',
    suggestions: 'सुझाव:',
    suggestionsArray: [
      'मेरे करियर में सफलता कब मिलेगी?',
      'क्या मुझे सरकारी नौकरी मिलेगी?',
      'मेरी शादी कब होगी?',
      'मेरा स्वास्थ्य कैसा रहेगा?',
    ],
  },
  english: {
    placeholder: 'Ask your question... e.g., When will I get a government job?',
    submit: 'Ask Question',
    loading: 'Getting answer...',
    suggestions: 'Suggestions:',
    suggestionsArray: [
      'When will I get success in career?',
      'Will I get a government job?',
      'When will I get married?',
      'How will my health be?',
    ],
  },
  hinglish: {
    placeholder: 'Apna Sawal Puchen... Jaise: Mujhe Sarkari Naukri Kab Milegi?',
    submit: 'Sawal Puchen',
    loading: 'Answer Tayyar Ho Raha Hai...',
    suggestions: 'Suggestions:',
    suggestionsArray: [
      'Mere Career Mein Success Kab Milegi?',
      'Kya Mujhe Sarkari Naukri Milegi?',
      'Meri Shadi Kab Hogi?',
      'Mera Swasthya Kaisa Rahega?',
    ],
  },
}

export default function QuestionInput({ onSubmit, isLoading, language }: QuestionInputProps) {
  const [question, setQuestion] = useState('')
  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim() && !isLoading) {
      onSubmit(question.trim())
      setQuestion('')
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion)
  }

  return (
    <div className="card animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t.placeholder}
          rows={4}
          disabled={isLoading}
          className="resize-none"
        />

        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin"></span>
              {t.loading}
            </span>
          ) : (
            t.submit
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-zinc-700">
        <p className="text-sm font-semibold text-zinc-400 mb-4">{t.suggestions}</p>
        <div className="flex flex-wrap gap-3">
          {t.suggestionsArray.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm rounded-lg bg-gradient-aurora border-2 border-celestial-main/30 text-celestial-light hover:border-celestial-main/60 hover:bg-gradient-aurora transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
