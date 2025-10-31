import React from 'react'
import ComparisonView from '../components/dashboard/ComparisonView'
import { getCurrentLanguage } from '../utils/i18n'

const CompareView = ({ districts, onBack }) => {
  const language = getCurrentLanguage()

  return (
    <div className="compare-page">
      <div className="compare-header">
        <button className="back-btn" onClick={onBack}>
          ← {language === 'hi' ? 'वापस' : 'Back'}
        </button>
        <h1>
          {language === 'hi' ? 'जिला तुलना' : 'District Comparison'}
        </h1>
      </div>

      <ComparisonView districts={districts} language={language} />

      <div className="comparison-notes">
        <h3>{language === 'hi' ? 'नोट' : 'Note'}</h3>
        <p>
          {language === 'hi'
            ? '🏆 वह जिला जो प्रत्येक मीट्रिक में सर्वश्रेष्ठ प्रदर्शन कर रहा है'
            : '🏆 District performing best in each metric'
          }
        </p>
      </div>
    </div>
  )
}

export default CompareView