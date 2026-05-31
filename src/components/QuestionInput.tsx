import { useState } from 'react'
import type { Language } from '../types/database'

interface QuestionInputProps {
  onSubmit: (question: string) => void
  isLoading: boolean
  language: Language
}

const translations = {
  hindi: {
    placeholder: 'अपना सवाल पूछें... (जैसे: मुझे नौकरी कब मिलेगी?)',
    submit: 'पूछें',
    loading: 'उत्तर आ रहा है...',
    suggestions: [
      'मेरे करियर में सफलता कब मिलेगी?',
      'क्या मुझे सरकारी नौकरी मिलेगी?',
      'मेरी शादी कब होगी?',
      'मेरा स्वास्थ्य कैसा रहेगा?',
    ],
    suggestionsLabel: 'सुझाव:',
  },
  english: {
    placeholder: 'Ask your question... (e.g., When will I get a job?)',
    submit: 'Ask',
    loading: 'Getting answer...',
    suggestions: [
      'When will I get success in career?',
      'Will I get a government job?',
      'When will I get married?',
      'How will be my health?',
    ],
    suggestionsLabel: 'Suggestions:',
  },
  hinglish: {
    placeholder: 'Apna sawal puchein... (jaise: Mujhe naukri kab milegi?)',
    submit: 'Poochein',
    loading: 'Answer aa raha hai...',
    suggestions: [
      'Mere career mein success kab milegi?',
      'Kya mujhe sarkari naukri milegi?',
      'Meri shadi kab hogi?',
      'Mera swasthya kaisa rahega?',
    ],
    suggestionsLabel: 'Suggestions:',
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
    <div className="card card-elevated animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
            disabled={isLoading}
            className="resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="btn-primary w-full"
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

      <div className="mt-5 pt-5 border-t border-zinc-800">
        <p className="text-sm text-zinc-500 mb-3">{t.suggestionsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {t.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-3 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-gold-300 hover:border-gold-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
