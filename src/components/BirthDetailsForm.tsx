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
    subtitle: 'ग्रहों की चाल से जानें अपना भविष्य',
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
    subtitle: 'Discover your destiny through planetary positions',
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
    subtitle: 'Grahon ki chaal se jaanein apna bhavishya',
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
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <div className="card">
        {/* Header with celestial icons */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 mb-4 text-3xl text-gold-400">
            <span className="animate-float" style={{ animationDelay: '0s' }}>☽</span>
            <span className="animate-float" style={{ animationDelay: '0.5s' }}>☉</span>
            <span className="animate-float" style={{ animationDelay: '1s' }}>♃</span>
          </div>
          <h2 className="mb-2">{t.title}</h2>
          <p className="text-zinc-400">{t.subtitle}</p>
        </div>

        {/* Language selector */}
        <div className="flex justify-end mb-6">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-auto min-w-[140px] text-sm"
          >
            <option value="hindi">हिंदी</option>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name">{t.nameLabel}</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t.namePlaceholder}
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="birth_date">{t.dateLabel}</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                required
              />
            </div>

            <div>
              <label htmlFor="birth_time">{t.timeLabel}</label>
              <input
                type="time"
                id="birth_time"
                name="birth_time"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="birth_place">{t.placeLabel}</label>
            <input
              type="text"
              id="birth_place"
              name="birth_place"
              required
              placeholder={t.placePlaceholder}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="language_preference">{t.languageLabel}</label>
            <select
              id="language_preference"
              name="language_preference"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
            >
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="english">English</option>
              <option value="hinglish">Hinglish (हिंग्लिश)</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
