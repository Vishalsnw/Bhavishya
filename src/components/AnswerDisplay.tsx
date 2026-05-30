import type { Question } from '../types/database'

interface AnswerDisplayProps {
  question: Question
}

export default function AnswerDisplay({ question }: AnswerDisplayProps) {
  if (!question.answer) return null

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl p-6 animate-fade-in border-2 border-green-200">
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            Q
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-green-200 via-green-300 to-green-200 my-4"></div>

      <div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex-1">
            <p className="text-gray-900 leading-relaxed whitespace-pre-line">
              {question.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-green-200 text-right">
        <span className="text-xs text-gray-500">
          {new Date(question.created_at).toLocaleString(
            question.language === 'hindi' ? 'hi-IN' : 'en-IN'
          )}
        </span>
      </div>
    </div>
  )
}
