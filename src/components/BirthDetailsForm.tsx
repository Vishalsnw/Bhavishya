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
    subtitle: 'अपने ग्रहों से जानें पूरा भविष्य',
    trustedBy: '5,00,000+ उपयोगकर्ताओं द्वारा विश्वसनीय',
    nameLabel: 'आपका पूरा नाम',
    namePlaceholder: 'नाम लिखें',
    dateLabel: 'जन्म तिथि',
    timeLabel: 'जन्म समय',
    placeLabel: 'जन्म स्थान',
    placePlaceholder: 'शहर का नाम',
    languageLabel: 'उत्तरों की भाषा',
    submit: 'कुंडली बनाएं',
    accurateDetails: 'सटीक भविष्यवाणी के लिए सही विवरण भरें',
  },
  english: {
    title: 'Birth Kundali',
    subtitle: 'Discover Your Destiny Through Stars',
    trustedBy: 'Trusted by 500,000+ Users Worldwide',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your name',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'City name',
    languageLabel: 'Response Language',
    submit: 'Generate Kundali',
    accurateDetails: 'Enter accurate details for precise predictions',
  },
  hinglish: {
    title: 'Janam Kundali',
    subtitle: 'Jaanein Apna Pura Bhavishya',
    trustedBy: '5,00,000+ Users ke Dwara Trusted',
    nameLabel: 'Aapka Pura Naam',
    namePlaceholder: 'Naam Likhen',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Shahar ka Naam',
    languageLabel: 'Answers ki Language',
    submit: 'Kundali Banayein',
    accurateDetails: 'Accurate Details Bharein Perfect Prediction Ke Liye',
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
      {/* Header Section with Background */}
      <div className="card header-section">
        {/* Celestial symbols */}
        <div className="celestial-container">
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0s' }}>☉</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.3s' }}>☽</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.6s' }}>♃</div>
        </div>

        <h1>{t.title}</h1>
        <p className="text-lg mt-3">{t.subtitle}</p>

        {/* Trust badge */}
        <div className="trust-badge">{t.trustedBy}</div>
      </div>

      {/* Main Form Card */}
      <div className="card mt-6">
        {/* Language selector */}
        <div className="flex justify-end mb-8">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-full sm:w-auto sm:min-w-[160px]"
          >
            <option value="hindi">हिंदी</option>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

        {/* Accuracy note */}
        <div className="mb-8 p-4 rounded-lg bg-gradient-aurora border-2 border-celestial-main/30 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📋</span>
          <span className="text-base leading-relaxed">{t.accurateDetails}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name">{t.nameLabel}</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={t.namePlaceholder}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="birth_date">{t.dateLabel}</label>
              <div className="input-wrapper">
                <span className="input-icon">📅</span>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="birth_time">{t.timeLabel}</label>
              <div className="input-wrapper">
                <span className="input-icon">🕐</span>
                <input
                  type="time"
                  id="birth_time"
                  name="birth_time"
                  required
                />
              </div>
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label htmlFor="birth_place">{t.placeLabel}</label>
            <div className="input-wrapper">
              <span className="input-icon">📍</span>
              <input
                type="text"
                id="birth_place"
                name="birth_place"
                required
                placeholder={t.placePlaceholder}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Language Preference */}
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

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn-primary">
              {t.submit}
            </button>
          </div>
        </form>
      </div>

      {/* Trust indicators grid */}
      <div className="trust-grid mt-8">
        <div className="trust-item">
          <div className="trust-item-icon">🕉️</div>
          <div className="trust-item-text">100% Vedic</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">🔒</div>
          <div className="trust-item-text">Secure</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">⚡</div>
          <div className="trust-item-text">Instant</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">✨</div>
          <div className="trust-item-text">Accurate</div>
        </div>
      </div>
    </div>
  )
}
