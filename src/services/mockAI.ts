import type { ChartData, Language } from '../types/database'

const responses = {
  hindi: {
    career_success: 'आपकी कुंडली के अनुसार, आपका 10वां घर मजबूत है। आपको अपने करियर में सफलता मिलेगी। आने वाले 2-3 महीनों में नया मौका मिल सकता है।',
    financial_stability: 'आपकी कुंडली में धन योग है। जुपिटर की स्थिति अच्छी है। इस साल आर्थिक स्थिति में सुधार होगा।',
    relationship: 'सातवें घर में शुक्र की स्थिति अच्छी है। आपको अच्छे रिश्ते मिलेंगे। परिवार से समर्थन मिलेगा।',
    health: 'छठवें घर के अनुसार, आपको पाचन तंत्र का ध्यान रखना होगा। नियमित व्यायाम करें। आहार पर ध्यान दें।',
    education: 'आपके पांचवें घर में बुध की स्थिति उत्तम है। आप शिक्षा में सफल होंगे। नया कौशल सीखने का समय अच्छा है।',
    general: 'आपकी कुंडली में अच्छे योग हैं। कोई बड़ी समस्या नहीं है। धैर्य रखें और कड़ी मेहनत करें।',
  },
  english: {
    career_success: 'According to your chart, your 10th house is strong. You will achieve success in your career. New opportunities may come in the next 2-3 months.',
    financial_stability: 'Your chart shows Dhana Yoga. Jupiter\'s position is favorable. Financial improvements are expected this year.',
    relationship: 'Venus in the 7th house indicates good relationships. You will receive support from family and partners.',
    health: 'Your 6th house suggests focusing on digestive health. Regular exercise and proper diet are recommended.',
    education: 'Mercury in your 5th house is excellent for education and learning. This is a good time to learn new skills.',
    general: 'Your chart has positive combinations. No major issues indicated. Have patience and work hard.',
  },
  hinglish: {
    career_success: 'Aapki kundali ke hisab se, 10th house strong hai. Career mein aapko success milegi. Agle 2-3 mahine mein naya opportunity mil sakta hai.',
    financial_stability: 'Aapki kundali mein Dhana Yoga hai. Jupiter ka position achha hai. Is saal financial condition improve hogi.',
    relationship: '7th house mein Venus achha hai. Aapko achhe relationships milenge. Family se support milega.',
    health: '6th house ke hisab se, digestive health ka dhyan rakhein. Regular exercise karein. Diet pe focus karein.',
    education: '5th house mein Mercury excellent hai. Education mein success milegi. Naya skill seekhne ka time achha hai.',
    general: 'Aapki kundali mein achhe yog hain. Koi badi problem nahi hai. Patience rakhein aur mehnat karein.',
  }
}

function analyzeQuestion(question: string): 'career_success' | 'financial_stability' | 'relationship' | 'health' | 'education' | 'general' {
  const q = question.toLowerCase()
  if (q.includes('career') || q.includes('job') || q.includes('naukri') || q.includes('kya kar') || q.includes('करियर') || q.includes('नौकरी')) {
    return 'career_success'
  }
  if (q.includes('money') || q.includes('paisa') || q.includes('dhan') || q.includes('financial') || q.includes('पैसा') || q.includes('धन')) {
    return 'financial_stability'
  }
  if (q.includes('relationship') || q.includes('marriage') || q.includes('pyar') || q.includes('shadi') || q.includes('रिश्ता') || q.includes('शादी')) {
    return 'relationship'
  }
  if (q.includes('health') || q.includes('swasthya') || q.includes('bimari') || q.includes('स्वास्थ्य') || q.includes('बीमारी')) {
    return 'health'
  }
  if (q.includes('education') || q.includes('study') || q.includes('padhai') || q.includes('exam') || q.includes('शिक्षा') || q.includes('पढ़ाई')) {
    return 'education'
  }
  return 'general'
}

export async function generateAIResponse(
  chartData: ChartData,
  question: string,
  language: Language
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const category = analyzeQuestion(question)
  let response = responses[language][category]

  const langPrefix = language === 'hindi' ? 'आपकी' : language === 'english' ? 'Your' : 'Aapki'
  const chartInfo = `\n\n${langPrefix} ${language === 'hindi' ? 'चंद्र राशि' : language === 'english' ? 'Moon sign' : 'Moon sign'}: ${chartData.moon_sign}\n`
  const nakshatraInfo = language === 'hindi'
    ? `नक्षत्र: ${chartData.moon_nakshatra}`
    : language === 'english'
    ? `Nakshatra: ${chartData.moon_nakshatra}`
    : `Nakshatra: ${chartData.moon_nakshatra}`

  return response + chartInfo + nakshatraInfo
}

export function generateMockChartData(): ChartData {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']

  const randomSign = () => signs[Math.floor(Math.random() * signs.length)]
  const randomNakshatra = () => nakshatras[Math.floor(Math.random() * nakshatras.length)]
  const randomDegree = () => Math.round((Math.random() * 30) * 100) / 100
  const randomHouse = () => Math.floor(Math.random() * 12) + 1

  const ascendantSign = randomSign()
  const moonSign = randomSign()

  const planets = [
    { name: 'Sun', sign: randomSign(), house: randomHouse(), degree: randomDegree() },
    { name: 'Moon', sign: moonSign, house: randomHouse(), degree: randomDegree() },
    { name: 'Mars', sign: randomSign(), house: randomHouse(), degree: randomDegree(), retrograde: Math.random() > 0.5 },
    { name: 'Mercury', sign: randomSign(), house: randomHouse(), degree: randomDegree(), retrograde: Math.random() > 0.5 },
    { name: 'Jupiter', sign: randomSign(), house: randomHouse(), degree: randomDegree() },
    { name: 'Venus', sign: randomSign(), house: randomHouse(), degree: randomDegree() },
    { name: 'Saturn', sign: randomSign(), house: randomHouse(), degree: randomDegree(), retrograde: Math.random() > 0.5 },
    { name: 'Rahu', sign: randomSign(), house: randomHouse(), degree: randomDegree(), retrograde: true },
    { name: 'Ketu', sign: randomSign(), house: randomHouse(), degree: randomDegree(), retrograde: true },
  ]

  const houses = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    sign: randomSign(),
    planets: planets.filter(p => p.house === i + 1).map(p => p.name),
  }))

  return {
    ascendant: ascendantSign,
    ascendant_sign: ascendantSign,
    planets,
    houses,
    moon_sign: moonSign,
    moon_nakshatra: randomNakshatra(),
    sun_sign: planets.find(p => p.name === 'Sun')?.sign || randomSign(),
  }
}
