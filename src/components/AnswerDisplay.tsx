import type { Question } from '../types/database'

interface AnswerDisplayProps {
  question: Question
}

export default function AnswerDisplay({ question }: AnswerDisplayProps) {
  if (!question.answer) return null

  return (
    <div className="card animate-fade-in border-l-4 border-l-gold-400">
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-celestial-400 to-celestial-300 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            Q
          </div>
          <div className="flex-1 pt-1">
            <p className="text-zinc-200 font-medium leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-gold-400/40 via-gold-400/20 to-transparent my-5"></div>

      <div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-zinc-900 font-bold text-sm shadow-lg">
            A
          </div>
          <div className="flex-1 pt-1">
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
              {question.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-zinc-800 flex justify-end">
        <span className="text-xs text-zinc-600">
          {new Date(question.created_at).toLocaleString(
            question.language === 'hindi' ? 'hi-IN' : 'en-IN'
          )}
        </span>
      </div>
    </div>
  )
}
