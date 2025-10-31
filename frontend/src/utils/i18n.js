const translations = {
  hi: {
    'Choose Your District': 'अपना जिला चुनें',
    'Auto-Detect My District': 'मेरा जिला ढूंढें',
    'Select District': 'जिला चुनें',
    'Selected District': 'चयनित जिला',
    'Location not found. Please select manually.': 'स्थान नहीं मिला। कृपया मैन्युअल चुनें।',
    'Home': 'होम',
    'Our Voice, Our Rights': 'हमारी आवाज़, हमारे अधिकार',
    'Selected Districts for Comparison': 'तुलना के लिए चयनित जिले',
    'Compare': 'तुलना करें',
    'Back': 'वापस',
    'Beneficiaries': 'लाभार्थी',
    'This Month': 'इस महीने',
    'Total Person-Days': 'कुल व्यक्ति-दिन',
    'Total Work Days': 'कुल कार्य दिवस',
    'Avg Work Days': 'औसत कार्य दिवस',
    'Per Person': 'प्रति व्यक्ति',
    'Wage Rate': 'मजदूरी दर',
    'Per Day': 'प्रतिदिन',
    'Last 12 Months': 'पिछले 12 महीने',
    'Highest': 'सर्वोच्च',
    'Lowest': 'न्यूनतम',
    'Average': 'औसत',
    'Important Information': 'महत्वपूर्ण जानकारी',
    'Helpline': 'हेल्पलाइन',
    'About MGNREGA': 'MGNREGA के बारे में',
    'District Comparison': 'जिला तुलना',
    'Note': 'नोट'
  },
  en: {
    // English is the base, so keys are the same as values
    'Choose Your District': 'Choose Your District',
    'Auto-Detect My District': 'Auto-Detect My District',
    'Select District': 'Select District',
    'Selected District': 'Selected District',
    'Location not found. Please select manually.': 'Location not found. Please select manually.',
    'Home': 'Home',
    'Our Voice, Our Rights': 'Our Voice, Our Rights',
    'Selected Districts for Comparison': 'Selected Districts for Comparison',
    'Compare': 'Compare',
    'Back': 'Back',
    'Beneficiaries': 'Beneficiaries',
    'This Month': 'This Month',
    'Total Person-Days': 'Total Person-Days',
    'Total Work Days': 'Total Work Days',
    'Avg Work Days': 'Avg Work Days',
    'Per Person': 'Per Person',
    'Wage Rate': 'Wage Rate',
    'Per Day': 'Per Day',
    'Last 12 Months': 'Last 12 Months',
    'Highest': 'Highest',
    'Lowest': 'Lowest',
    'Average': 'Average',
    'Important Information': 'Important Information',
    'Helpline': 'Helpline',
    'About MGNREGA': 'About MGNREGA',
    'District Comparison': 'District Comparison',
    'Note': 'Note'
  }
}

export const getCurrentLanguage = () => {
  return localStorage.getItem('language') || 'hi'
}

export const setLanguage = (language) => {
  localStorage.setItem('language', language)
}

export const translate = (key, language = getCurrentLanguage()) => {
  return translations[language]?.[key] || key
}