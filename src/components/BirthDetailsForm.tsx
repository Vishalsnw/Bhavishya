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
    title: 'ज्योतिष सेवा',
    subtitle: 'अपने सवालों का उत्तर जानें ग्रहों के आधार पर',
    trustedBy: '5,00,000+ उपयोगकर्ताओं द्वारा विश्वसनीय',
    nameLabel: 'आपका पूरा नाम',
    namePlaceholder: 'नाम लिखें',
    dateLabel: 'जन्म तिथि',
    timeLabel: 'जन्म समय',
    placeLabel: 'जन्म स्थान',
    placePlaceholder: 'शहर का नाम',
    languageLabel: 'उत्तरों की भाषा',
    submit: 'सवाल पूछें',
    accurateDetails: 'सटीक उत्तर के लिए सही जन्म विवरण भरें',
  },
  english: {
    title: 'Astrology Service',
    subtitle: 'Get Answers Based on Vedic Astrology, Numerology & Ancient Wisdom',
    trustedBy: 'Trusted by 500,000+ Users Worldwide',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your name',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'City name',
    languageLabel: 'Response Language',
    submit: 'Ask Your Question',
    accurateDetails: 'Enter accurate birth details for precise answers',
  },
  hinglish: {
    title: 'Jyotish Seva',
    subtitle: 'Apne Sawalon Ka Answer Jaanein Grahon Ke Aadhar Par',
    trustedBy: '5,00,000+ Users ke Dwara Trusted',
    nameLabel: 'Aapka Pura Naam',
    namePlaceholder: 'Naam Likhen',
    dateLabel: 'Birth Date',
    timeLabel: 'Birth Time',
    placeLabel: 'Birth Place',
    placePlaceholder: 'Shahar ka Naam',
    languageLabel: 'Answers ki Language',
    submit: 'Sawal Poochein',
    accurateDetails: 'Accurate Answer Ke Liye Sahi Birth Details Bharein',
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
      <div className="card header-section">
        <div className="celestial-container">
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0s' }}>&#9788;</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.3s' }}>&#9790;</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.6s' }}>&#9795;</div>
        </div>

        <h1>{t.title}</h1>
        <p className="text-lg mt-3">{t.subtitle}</p>

        <div className="trust-badge">{t.trustedBy}</div>
      </div>

      <div className="card mt-6">
        <div className="flex justify-end mb-8">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="w-full sm:w-auto sm:min-w-[160px]"
          >
            <option value="hindi">&#2361;&#2367;&#2306;&#2342;&#2368;</option>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>
        </div>

        <div className="mb-8 p-4 rounded-lg bg-gradient-aurora border-2 border-celestial-main/30 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">&#9733;</span>
          <span className="text-base leading-relaxed">{t.accurateDetails}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name">{t.nameLabel}</label>
            <div className="input-wrapper">
              <span className="input-icon">&#9787;</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="birth_date">{t.dateLabel}</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128197;</span>
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
                <span className="input-icon">&#128336;</span>
                <input
                  type="time"
                  id="birth_time"
                  name="birth_time"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="birth_place">{t.placeLabel}</label>
            <div className="input-wrapper">
              <span className="input-icon">&#128205;</span>
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

          <div>
            <label htmlFor="language_preference">{t.languageLabel}</label>
            <select
              id="language_preference"
              name="language_preference"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
            >
              <option value="hindi">&#2361;&#2367;&#2306;&#2342;&#2368; (Hindi)</option>
              <option value="english">English</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary">
              {t.submit}
            </button>
          </div>
        </form>
      </div>

      <div className="trust-grid mt-8">
        <div className="trust-item">
          <div className="trust-item-icon">&#9650;</div>
          <div className="trust-item-text">Vedic Jyotish</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#931;</div>
          <div className="trust-item-text">Numerology</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#9768;</div>
          <div className="trust-item-text">Book of Dead</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#10038;</div>
          <div className="trust-item-text">Multi-System</div>
        </div>
      </div>
    </div>
  )
}
