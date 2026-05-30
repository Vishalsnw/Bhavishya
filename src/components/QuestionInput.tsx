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
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t.loading}
            </>
          ) : (
            t.submit
          )}
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">
          {language === 'hindi' ? 'सुझाव:' : language === 'english' ? 'Suggestions:' : 'Suggestions:'}
        </p>
        <div className="flex flex-wrap gap-2">
          {t.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-sm rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
