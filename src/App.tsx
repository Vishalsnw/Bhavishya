import { useState } from 'react'
import BirthDetailsForm from './components/BirthDetailsForm'
import QuestionInput from './components/QuestionInput'
import AnswerDisplay from './components/AnswerDisplay'
import { generateAstrologyAnswer } from './services/geminiAI'
import type { BirthDetails, Question, Language } from './types/database'

const loadingSteps = {
  hindi: [
    'जन्म विवरण विश्लेषण',
    'वैदिक चार्ट की गणना',
    'ग्रह स्थिति का विश्लेषण',
    'अंक ज्योतिष की जांच',
    'प्राचीन ज्ञान का संदर्भ',
    'उत्तर तैयार किया जा रहा है',
  ],
  english: [
    'Analyzing Birth Details',
    'Calculating Vedic Chart',
    'Analyzing Planetary Positions',
    'Checking Numerology',
    'Referencing Ancient Wisdom',
    'Preparing Your Answer',
  ],
  hinglish: [
    'Birth Details Analyze',
    'Vedic Chart Calculate',
    'Grah Sthiti Analyze',
    'Numerology Check',
    'Ancient Wisdom Reference',
    'Answer Prepare Ho Raha Hai',
  ],
}

export default function App() {
  const [language, setLanguage] = useState<Language>('hinglish')
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleBirthDetailsSubmit = (data: {
    name: string
    birth_date: string
    birth_time: string
    birth_place: string
    language_preference: Language
  }) => {
    setLanguage(data.language_preference)
    setBirthDetails(data)
  }

  const handleQuestionSubmit = async (questionText: string) => {
    if (!birthDetails) return

    setIsSubmittingQuestion(true)
    setError(null)
    setCurrentStep(0)

    const steps = loadingSteps[language]
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    try {
      const answer = await generateAstrologyAnswer(birthDetails, questionText, language)

      const newQuestion: Question = {
        id: crypto.randomUUID(),
        question: questionText,
        answer,
        language,
        created_at: new Date().toISOString(),
      }

      setQuestions([newQuestion, ...questions])
    } catch (err) {
      console.error('Error getting answer:', err)
      const errorMsg = language === 'hindi'
        ? 'उत्तर प्राप्त करने में त्रुटि। कृपया पुनः प्रयास करें।'
        : language === 'english'
        ? 'Error getting answer. Please try again.'
        : 'Answer lene mein error. Please dubara try karein.'
      setError(errorMsg)
    } finally {
      clearInterval(stepInterval)
      setIsSubmittingQuestion(false)
    }
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  const handleReset = () => {
    setBirthDetails(null)
    setQuestions([])
    setError(null)
  }

  if (!birthDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl">
          <BirthDetailsForm
            onSubmit={handleBirthDetailsSubmit}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    )
  }

  const translations = {
    hindi: {
      welcome: 'नमस्ते',
      askQuestion: 'अपना सवाल पूछें',
      previousQuestions: 'पिछले उत्तर',
      newSession: 'नया सत्र',
      birthInfo: 'जन्म विवरण',
    },
    english: {
      welcome: 'Hello',
      askQuestion: 'Ask Your Question',
      previousQuestions: 'Previous Answers',
      newSession: 'New Session',
      birthInfo: 'Birth Details',
    },
    hinglish: {
      welcome: 'Namaste',
      askQuestion: 'Apna Sawal Poochein',
      previousQuestions: 'Pichle Answers',
      newSession: 'Naya Session',
      birthInfo: 'Birth Details',
    },
  }

  const t = translations[language]
  const steps = loadingSteps[language]

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with birth details summary */}
        <div className="card animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-gold-200 text-xl">
                {t.welcome}, <span className="font-bold">{birthDetails.name}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="min-w-[140px]"
              >
                <option value="hindi">&#2361;&#2367;&#2306;&#2342;&#2368;</option>
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
              <button onClick={handleReset} className="btn-secondary">
                {t.newSession}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.birthInfo}</div>
              <div className="text-sm font-semibold text-gold-300">{birthDetails.name}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">DOB</div>
              <div className="text-sm font-semibold text-gold-300">{birthDetails.birth_date}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Time</div>
              <div className="text-sm font-semibold text-gold-300">{birthDetails.birth_time}</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Place</div>
              <div className="text-sm font-semibold text-gold-300">{birthDetails.birth_place}</div>
            </div>
          </div>
        </div>

        {/* Loading overlay */}
        {isSubmittingQuestion && (
          <div className="card animate-fade-in border border-gold-400/30">
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-3 border-gold-400/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-3 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl text-gold-400 animate-float">&#9788;</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-300 px-4 ${
                    index <= currentStep ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    index < currentStep
                      ? 'bg-gold-400 text-zinc-900'
                      : index === currentStep
                      ? 'border-2 border-gold-400 animate-pulse'
                      : 'border-2 border-zinc-700'
                  }`}>
                    {index < currentStep && '&#10003;'}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep ? 'text-gold-300 font-semibold' : 'text-zinc-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="card animate-fade-in border border-red-500/30 bg-red-500/5">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="mb-6 text-gold-300">{t.askQuestion}</h2>
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isSubmittingQuestion}
              language={language}
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {questions.length > 0 && (
              <>
                <h2 className="mb-6 text-gold-300">{t.previousQuestions}</h2>
                <div className="space-y-4">
                  {questions.map((q) => (
                    <AnswerDisplay key={q.id} question={q} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
