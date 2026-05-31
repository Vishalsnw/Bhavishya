import { useState, useEffect } from 'react'
import BirthDetailsForm from './components/BirthDetailsForm'
import VedicChart from './components/VedicChart'
import QuestionInput from './components/QuestionInput'
import AnswerDisplay from './components/AnswerDisplay'
import { generateAIResponse, generateMockChartData } from './services/mockAI'
import type { BirthChart, ChartData, Question, Language } from './types/database'

const loadingSteps = [
  { key: 'details', text: { hindi: 'जन्म विवरण विश्लेषण', english: 'Analyzing Birth Details', hinglish: 'Birth Details Analyze' } },
  { key: 'charts', text: { hindi: 'कुंडली तैयार कर रहे हैं', english: 'Preparing Kundali Charts', hinglish: 'Kundali Charts Prepare' } },
  { key: 'positions', text: { hindi: 'ग्रह स्थिति की गणना', english: 'Calculating Planetary Positions', hinglish: 'Grah Sthiti Calculate' } },
  { key: 'yogas', text: { hindi: 'योग और दोष विश्लेषण', english: 'Analyzing Yogas & Doshas', hinglish: 'Yog-Dosh Analyze' } },
  { key: 'dashas', text: { hindi: 'दशा अवधि की गणना', english: 'Calculating Dasha Periods', hinglish: 'Dasha Period Calculate' } },
  { key: 'predictions', text: { hindi: 'भविष्यवाणियाँ तैयार कर रहे हैं', english: 'Generating Predictions', hinglish: 'Predictions Generate' } },
]

export default function App() {
  const [language, setLanguage] = useState<Language>('hinglish')
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedChart = localStorage.getItem('birthChart')
    const savedQuestions = localStorage.getItem('questions')
    if (savedChart) {
      try {
        const parsedChart = JSON.parse(savedChart)
        setBirthChart(parsedChart)
        setChartData(parsedChart.chart_data)
        setLanguage(parsedChart.language_preference)
      } catch (e) {
        console.error('Failed to parse saved chart')
      }
    }
    if (savedQuestions) {
      try {
        setQuestions(JSON.parse(savedQuestions))
      } catch (e) {
        console.error('Failed to parse saved questions')
      }
    }
  }, [])

  const handleBirthDetailsSubmit = async (data: {
    name: string
    birth_date: string
    birth_time: string
    birth_place: string
    language_preference: Language
  }) => {
    setIsLoading(true)
    setLanguage(data.language_preference)
    setCurrentStep(0)

    // Simulate step-by-step loading
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 600)

    try {
      const mockChart = generateMockChartData()
      setChartData(mockChart)

      const newChart: BirthChart = {
        id: crypto.randomUUID(),
        name: data.name,
        birth_date: data.birth_date,
        birth_time: data.birth_time,
        birth_place: data.birth_place,
        chart_data: mockChart,
        language_preference: data.language_preference,
        created_at: new Date().toISOString(),
      }

      localStorage.setItem('birthChart', JSON.stringify(newChart))
      setBirthChart(newChart)
    } catch (error) {
      console.error('Error creating birth chart:', error)
    } finally {
      clearInterval(stepInterval)
      setIsLoading(false)
    }
  }

  const handleQuestionSubmit = async (questionText: string) => {
    if (!birthChart || !chartData) return

    setIsSubmittingQuestion(true)

    try {
      const answer = await generateAIResponse(chartData, questionText, language)

      const newQuestion: Question = {
        id: crypto.randomUUID(),
        chart_id: birthChart.id,
        question: questionText,
        answer,
        language,
        created_at: new Date().toISOString(),
      }

      const updatedQuestions = [newQuestion, ...questions]
      setQuestions(updatedQuestions)
      localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    } catch (error) {
      console.error('Error submitting question:', error)
    } finally {
      setIsSubmittingQuestion(false)
    }
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
  }

  const handleReset = () => {
    localStorage.removeItem('birthChart')
    localStorage.removeItem('questions')
    setBirthChart(null)
    setChartData(null)
    setQuestions([])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center celestial-bg px-4">
        <div className="text-center max-w-md w-full">
          {/* Animated celestial symbol */}
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-gold-400/20 animate-pulse"></div>
            <div className="absolute inset-3 rounded-full border-2 border-gold-400/40 animate-spin" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-6 rounded-full border-2 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl text-gold-400 animate-float">☉</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gold-300 mb-6">
            {language === 'hindi' ? 'कुंडली बन रही है...' : language === 'english' ? 'Generating Your Kundali...' : 'Aapki Kundali Ban Rahi Hai...'}
          </h2>

          {/* Progress steps */}
          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={step.key}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index < currentStep
                    ? 'bg-gold-400 text-zinc-900'
                    : index === currentStep
                    ? 'border-2 border-gold-400 animate-pulse'
                    : 'border border-zinc-700'
                }`}>
                  {index < currentStep && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${
                  index === currentStep ? 'text-gold-300 font-medium' : 'text-zinc-400'
                }`}>
                  {step.text[language]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 mt-8">
            {language === 'hindi' ? 'कृपया इस विंडो को बंद न करें या रिफ्रेश न करें' : 'Please do not close or refresh this window'}
          </p>
        </div>
      </div>
    )
  }

  if (!birthChart || !chartData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 celestial-bg">
        <div className="w-full max-w-xl">
          <BirthDetailsForm
            onSubmit={handleBirthDetailsSubmit}
            language={language}
            onLanguageChange={handleLanguageChange}
          />

          {/* Trust indicators */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🕉️</div>
              <div className="text-xs text-zinc-500">100% Vedic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔒</div>
              <div className="text-xs text-zinc-500">Secure & Private</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs text-zinc-500">Instant Results</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs text-zinc-500">Accurate</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const translations = {
    hindi: {
      title: 'आपकी जन्म कुंडली',
      welcome: 'नमस्ते',
      askQuestion: 'अपना सवाल पूछें',
      previousQuestions: 'पिछले सवाल',
      newChart: 'नया चार्ट',
    },
    english: {
      title: 'Your Birth Chart',
      welcome: 'Hello',
      askQuestion: 'Ask Your Question',
      previousQuestions: 'Previous Questions',
      newChart: 'New Chart',
    },
    hinglish: {
      title: 'Aapki Janam Kundali',
      welcome: 'Namaste',
      askQuestion: 'Apna Sawal Poochein',
      previousQuestions: 'Pichle Sawal',
      newChart: 'Naya Chart',
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 celestial-bg">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="card animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="mb-2">{t.title}</h1>
              <p className="text-gold-200 text-lg">
                {t.welcome}, <span className="font-semibold">{birthChart.name}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="px-4 py-2.5 text-sm"
              >
                <option value="hindi">हिंदी</option>
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
              <button
                onClick={handleReset}
                className="btn-secondary text-sm"
              >
                {t.newChart}
              </button>
            </div>
          </div>

          <VedicChart chartData={chartData} language={language} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="mb-4 text-gold-300">{t.askQuestion}</h2>
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isSubmittingQuestion}
              language={language}
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {questions.length > 0 && (
              <>
                <h2 className="mb-4 text-gold-300">{t.previousQuestions}</h2>
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
