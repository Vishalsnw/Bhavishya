import { useState } from 'react'
import BirthDetailsForm from './components/BirthDetailsForm'
import VedicChart from './components/VedicChart'
import QuestionInput from './components/QuestionInput'
import AnswerDisplay from './components/AnswerDisplay'
import { generateAIResponse, generateMockChartData } from './services/mockAI'
import type { BirthChart, ChartData, Question, Language } from './types/database'

export default function App() {
  const [language, setLanguage] = useState<Language>('hinglish')
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false)

  const handleBirthDetailsSubmit = async (data: {
    name: string
    birth_date: string
    birth_time: string
    birth_place: string
    language_preference: Language
  }) => {
    setIsLoading(true)
    setLanguage(data.language_preference)

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
      <div className="min-h-screen flex items-center justify-center celestial-bg">
        <div className="text-center px-4">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-gold-400/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full border-4 border-gold-400/50 animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-4 rounded-full border-4 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl animate-float">☉</span>
            </div>
          </div>
          <p className="text-gold-300 font-semibold text-lg tracking-wide">
            {language === 'hindi' ? 'कुंडली बन रही है...' : language === 'english' ? 'Generating your Kundali...' : 'Aapki Kundali ban rahi hai...'}
          </p>
        </div>
      </div>
    )
  }

  if (!birthChart || !chartData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 celestial-bg">
        <BirthDetailsForm
          onSubmit={handleBirthDetailsSubmit}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
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
