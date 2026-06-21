import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BirthDetailsForm from './components/BirthDetailsForm';
import QuestionInput from './components/QuestionInput';
import AnswerDisplay from './components/AnswerDisplay';
import { generateAstrologyAnswer } from './services/geminiAI';
import type { BirthDetails, Question, Language } from './types/database';

export default function App() {
  const { t, i18n } = useTranslation();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [randomFact, setRandomFact] = useState<string>('');

  const handleBirthDetailsSubmit = (data: Omit<BirthDetails, 'language_preference'>) => {
    setBirthDetails({
      ...data,
      language_preference: i18n.language as Language,
    });
  };

  const handleQuestionSubmit = async (questionText: string) => {
    if (!birthDetails) return;

    setIsSubmittingQuestion(true);
    setError(null);
    setCurrentStep(0);

    const steps = t('loadingSteps', { returnObjects: true }) as string[];
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    try {
      const answer = await generateAstrologyAnswer(birthDetails, questionText, i18n.language as Language);

      const newQuestion: Question = {
        id: crypto.randomUUID(),
        question: questionText,
        answer,
        language: i18n.language as Language,
        created_at: new Date().toISOString(),
      };

      setQuestions([newQuestion, ...questions]);
    } catch (err) {
      console.error('Error getting answer:', err);
      setError(t('error.fetchAnswer'));
    } finally {
      clearInterval(stepInterval);
      setIsSubmittingQuestion(false);
    }
  };

  const handleReset = () => {
    setBirthDetails(null);
    setQuestions([]);
    setError(null);
  };

  useEffect(() => {
    let factInterval: number;
    if (isSubmittingQuestion) {
      const facts = t('astrologicalFacts', { returnObjects: true }) as string[];
      setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
      factInterval = window.setInterval(() => {
        setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
      }, 5000);
    }
    return () => window.clearInterval(factInterval);
  }, [isSubmittingQuestion, t]);

  if (!birthDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl">
          <BirthDetailsForm onSubmit={handleBirthDetailsSubmit} />
        </div>
      </div>
    );
  }

  const steps = t('loadingSteps', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="card card-glass animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-celestial-dark text-xl">
                {t('app.welcome')}, <span className="font-bold">{birthDetails.name}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="min-w-[140px]"
              >
                <option value="hi">&#2361;&#2367;&#2306;&#2342;&#2368;</option>
                <option value="en">English</option>
              </select>
              <button onClick={handleReset} className="btn-secondary">
                {t('app.newSession')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="summary-box">
              <div className="summary-box-label">{t('app.birthInfo')}</div>
              <div className="summary-box-value">{birthDetails.name}</div>
            </div>
            <div className="summary-box">
              <div className="summary-box-label">DOB</div>
              <div className="summary-box-value">{birthDetails.birth_date}</div>
            </div>
            <div className="summary-box">
              <div className="summary-box-label">Time</div>
              <div className="summary-box-value">{birthDetails.birth_time}</div>
            </div>
            <div className="summary-box">
              <div className="summary-box-label">Place</div>
              <div className="summary-box-value">{birthDetails.birth_place}</div>
            </div>
          </div>
        </div>

        {isSubmittingQuestion && (
          <div className="card animate-fade-in border border-celestial-main/30">
            <div className="text-center mb-6">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-3 border-celestial-main/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-3 border-t-celestial-main border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl text-celestial-main animate-float">&#9788;</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 transition-all duration-300 px-4 ${
                    index <= currentStep ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    index < currentStep
                      ? 'bg-celestial-main text-white'
                      : index === currentStep
                      ? 'border-2 border-celestial-main animate-pulse'
                      : 'border-2 border-gray-300'
                  }`}>
                    {index < currentStep && <div dangerouslySetInnerHTML={{ __html: '&#10003;' }} />}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep ? 'text-celestial-dark font-semibold' : 'text-muted'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {randomFact && (
              <div className="mt-6 pt-5 border-t border-zinc-800/50 text-center">
                <p className="text-sm text-zinc-500 italic">{randomFact}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="card animate-fade-in border border-red-500/30 bg-red-500/10">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="mb-6 text-celestial-dark">{t('app.askQuestion')}</h2>
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isSubmittingQuestion}
              birthDetails={birthDetails}
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {questions.length > 0 && (
              <>
                <h2 className="mb-6 text-celestial-dark">{t('app.previousQuestions')}</h2>
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
  );
}
