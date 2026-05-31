import type { Question } from '../types/database'

interface AnswerDisplayProps {
  question: Question
}

export default function AnswerDisplay({ question }: AnswerDisplayProps) {
  if (!question.answer) return null

  return (
    <div className="card animate-fade-in border-l-4 border-l-gold-400">
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-zinc-900 font-bold text-lg shadow-lg">
            Q
          </div>
          <div className="flex-1 pt-1">
            <p className="text-zinc-100 font-semibold text-lg leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-gold-400/40 via-gold-400/20 to-transparent my-6"></div>

      <div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-premium flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A
          </div>
          <div className="flex-1 pt-1">
            <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-base">
              {question.answer}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800 flex justify-end">
        <span className="text-xs text-zinc-600 font-medium">
          {new Date(question.created_at).toLocaleString(
            question.language === 'hindi' ? 'hi-IN' : 'en-IN'
          )}
        </span>
      </div>
    </div>
  )
}
