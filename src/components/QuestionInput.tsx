import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { BirthDetails } from '../types/database';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
  birthDetails: BirthDetails;
}

export default function QuestionInput({ onSubmit, isLoading, birthDetails }: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  const { t } = useTranslation();

  const getAge = (birthDate: string) => {
    const today = new Date();
    const [day, month, year] = birthDate.split('-').map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(birthDetails.birth_date);

  let suggestions: string[];
  if (age < 30) {
    suggestions = t('questionInput.suggestions_young', { returnObjects: true }) as string[];
  } else if (age >= 30 && age <= 50) {
    suggestions = t('questionInput.suggestions_mid', { returnObjects: true }) as string[];
  } else {
    suggestions = t('questionInput.suggestions_senior', { returnObjects: true }) as string[];
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <div className="card animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('questionInput.placeholder')}
          rows={4}
          disabled={isLoading}
          className="resize-none"
        />

        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin"></span>
              {t('questionInput.loading')}
            </span>
          ) : (
            t('questionInput.submit')
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-zinc-700">
        <p className="text-sm font-semibold text-zinc-400 mb-4">{t('questionInput.suggestions')}</p>
        <div className="flex flex-wrap gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm rounded-lg bg-gradient-aurora border-2 border-celestial-main/30 text-celestial-light hover:border-celestial-main/60 hover:bg-gradient-aurora transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
