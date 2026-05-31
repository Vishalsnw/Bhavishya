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
    title: 'जन्म कुंडली',
    subtitle: 'अपने जन्म विवरण से जानें अपना भविष्य',
    trustedBy: '500000+ उपयोगकर्ताओं द्वारा विश्वसनीय',
    nameLabel: 'आपका नाम',
    namePlaceholder: 'अपना नाम लिखें',
    dateLabel: 'जन्म तिथि',
    timeLabel: 'जन्म समय',
    placeLabel: 'जन्म स्थान',
    placePlaceholder: 'जन्म स्थान लिखें',
    languageLabel: 'उत्तरों की भाषा',
    submit: 'कुंडली बनाएं',
    accurateDetails: 'सटीक भविष्यवाणी के लिए सही विवरण भरें',
  },
  english: {
    title: 'Birth Kundali',
    subtitle: 'Discover your destiny from your birth details',
    trustedBy: 'Trusted by 500000+ users',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your name',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Enter birth place',
    languageLabel: 'Answer Language',
    submit: 'Generate Kundali',
    accurateDetails: 'Enter accurate details for precise predictions',
  },
  hinglish: {
    title: 'Janam Kundali',
    subtitle: 'Birth details se jaanein apna bhavishya',
    trustedBy: '500000+ users ke dwara trusted',
    nameLabel: 'Aapka Naam',
    namePlaceholder: 'Naam likhein',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Birth place likhein',
    languageLabel: 'Answers ki Language',
    submit: 'Kundali Banayein',
    accurateDetails: 'Accurate details bharein sahi prediction ke liye',
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
    <div className="w-full animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Celestial icons */}
        <div className="flex justify-center gap-6 mb-5 text-4xl">
          <span className="animate-float text-orange-400" style={{ animationDelay: '0s' }}>☉</span>
          <span className="animate-float text-blue-300" style={{ animationDelay: '0.3s' }}>☽</span>
          <span className="animate-float text-yellow-400" style={{ animationDelay: '0.6s' }}>♃</span>
        </div>

        <h2 className="mb-3">{t.title}</h2>
        <p className="text-zinc-400 text-base">{t.subtitle}</p>

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/20">
          <span className="text-gold-400">✓</span>
          <span className="text-sm text-gold-300">{t.trustedBy}</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="card">
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

        {/* Accuracy note */}
        <div className="mb-6 p-3 rounded-lg bg-celestial-400/10 border border-celestial-400/20 flex items-center gap-3">
          <span className="text-xl">📋</span>
          <span className="text-sm text-zinc-300">{t.accurateDetails}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name">{t.nameLabel}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">👤</span>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={t.namePlaceholder}
                autoComplete="name"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="birth_date">{t.dateLabel}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">📅</span>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="birth_time">{t.timeLabel}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🕐</span>
                <input
                  type="time"
                  id="birth_time"
                  name="birth_time"
                  required
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="birth_place">{t.placeLabel}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">📍</span>
              <input
                type="text"
                id="birth_place"
                name="birth_place"
                required
                placeholder={t.placePlaceholder}
                autoComplete="off"
                className="pl-10"
              />
            </div>
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
