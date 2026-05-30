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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-blue-300 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white text-xl font-semibold">
            {language === 'hindi' ? 'कुंडली बन रही है...' : language === 'english' ? 'Generating your Kundali...' : 'Aapki Kundali ban rahi hai...'}
          </p>
        </div>
      </div>
    )
  }

  if (!birthChart || !chartData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
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
      newChart: 'नया चार्ट बनाएं',
    },
    english: {
      title: 'Your Birth Chart',
      welcome: 'Hello',
      askQuestion: 'Ask Your Question',
      previousQuestions: 'Previous Questions',
      newChart: 'Create New Chart',
    },
    hinglish: {
      title: 'Aapki Janam Kundali',
      welcome: 'Namaste',
      askQuestion: 'Apna Sawal Poochein',
      previousQuestions: 'Pichle Sawal',
      newChart: 'Naya Chart Banayein',
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600 mt-1">
                {t.welcome}, {birthChart.name}
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hindi">हिंदी</option>
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
              >
                {t.newChart}
              </button>
            </div>
          </div>

          <VedicChart chartData={chartData} language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{t.askQuestion}</h2>
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isSubmittingQuestion}
              language={language}
            />
          </div>

          <div>
            {questions.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-4">{t.previousQuestions}</h2>
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
