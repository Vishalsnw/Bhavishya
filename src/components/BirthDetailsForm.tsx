import { useTranslation } from 'react-i18next';

interface BirthDetailsFormProps {
  onSubmit: (data: {
    name: string;
    birth_date: string;
    birth_time: string;
    birth_place: string;
  }) => void;
}

export default function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      birth_date: formData.get('birth_date') as string,
      birth_time: formData.get('birth_time') as string,
      birth_place: formData.get('birth_place') as string,
    };
    onSubmit(data);
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="card header-section">
        <div className="celestial-container">
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0s' }}>&#9788;</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.3s' }}>&#9790;</div>
          <div className="celestial-symbol animate-float" style={{ animationDelay: '0.6s' }}>&#9795;</div>
        </div>

        <h1>{t('birthDetailsForm.title')}</h1>
        <p className="text-lg mt-3">{t('birthDetailsForm.subtitle')}</p>

        <div className="trust-badge">{t('birthDetailsForm.trustedBy')}</div>
      </div>

      <div className="card mt-6">
        <div className="flex justify-end mb-8">
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-full sm:w-auto sm:min-w-[160px]"
          >
            <option value="hi">&#2361;&#2367;&#2306;&#2342;&#2368;</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="mb-8 p-4 rounded-lg bg-gradient-aurora border-2 border-celestial-main/30 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">&#9733;</span>
          <span className="text-base leading-relaxed">{t('birthDetailsForm.accurateDetails')}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name">{t('birthDetailsForm.nameLabel')}</label>
            <div className="input-wrapper">
              <span className="input-icon">&#9787;</span>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={t('birthDetailsForm.namePlaceholder')}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="birth_date">{t('birthDetailsForm.dateLabel')}</label>
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
              <label htmlFor="birth_time">{t('birthDetailsForm.timeLabel')}</label>
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
            <label htmlFor="birth_place">{t('birthDetailsForm.placeLabel')}</label>
            <div className="input-wrapper">
              <span className="input-icon">&#128205;</span>
              <input
                type="text"
                id="birth_place"
                name="birth_place"
                required
                placeholder={t('birthDetailsForm.placePlaceholder')}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary">
              {t('birthDetailsForm.submit')}
            </button>
          </div>
        </form>
      </div>

      <div className="trust-grid mt-8">
        <div className="trust-item">
          <div className="trust-item-icon">&#9650;</div>
          <div className="trust-item-text">{t('birthDetailsForm.trustItems.vedic')}</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#931;</div>
          <div className="trust-item-text">{t('birthDetailsForm.trustItems.numerology')}</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#9768;</div>
          <div className="trust-item-text">{t('birthDetailsForm.trustItems.book')}</div>
        </div>
        <div className="trust-item">
          <div className="trust-item-icon">&#10038;</div>
          <div className="trust-item-text">{t('birthDetailsForm.trustItems.multi')}</div>
        </div>
      </div>
    </div>
  );
}
