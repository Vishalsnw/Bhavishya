import type { Language } from '../types/database'

interface BirthDetailsFormProps {
  onSubmit: (data: {
    name: string
    birth_date: string
    birth_time: string
    birth_place: string
    language_preference: Language
  }) => void
  language: Language
  onLanguageChange: (lang: Language) => void
}

const translations = {
  hindi: {
    title: 'अपनी जन्म कुंडली के लिए विवरण भरें',
    nameLabel: 'आपका नाम',
    namePlaceholder: 'अपना नाम लिखें',
    dateLabel: 'जन्म तिथि',
    timeLabel: 'जन्म समय',
    placeLabel: 'जन्म स्थान',
    placePlaceholder: 'जन्म स्थान लिखें',
    languageLabel: 'उत्तरों की भाषा',
    submit: 'कुंडली बनाएं',
  },
  english: {
    title: 'Fill Your Birth Details for Kundali',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your name',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Enter birth place',
    languageLabel: 'Answer Language',
    submit: 'Generate Kundali',
  },
  hinglish: {
    title: 'Birth Details Bharein - Kundali ke liye',
    nameLabel: 'Aapka Naam',
    namePlaceholder: 'Naam likhein',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Birth place likhein',
    languageLabel: 'Answers ki Language',
    submit: 'Kundali Banayein',
  },
}

export default function BirthDetailsForm({ onSubmit, language, onLanguageChange }: BirthDetailsFormProps) {
  const t = translations[language]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      birth_date: formData.get('birth_date') as string,
      birth_time: formData.get('birth_time') as string,
      birth_place: formData.get('birth_place') as string,
      language_preference: formData.get('language_preference') as Language,
    }
    onSubmit(data)
  }

  return (
    <div className="max-w-2xl mx-auto p-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-6 flex justify-end">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hindi">हिंदी</option>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-2">
                {t.dateLabel}
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="birth_time" className="block text-sm font-medium text-gray-700 mb-2">
                {t.timeLabel}
              </label>
              <input
                type="time"
                id="birth_time"
                name="birth_time"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="birth_place" className="block text-sm font-medium text-gray-700 mb-2">
              {t.placeLabel}
            </label>
            <input
              type="text"
              id="birth_place"
              name="birth_place"
              required
              placeholder={t.placePlaceholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="language_preference" className="block text-sm font-medium text-gray-700 mb-2">
              {t.languageLabel}
            </label>
            <select
              id="language_preference"
              name="language_preference"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="english">English</option>
              <option value="hinglish">Hinglish (हिंग्लिश)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  )
}
