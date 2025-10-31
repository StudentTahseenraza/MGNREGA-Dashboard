import React from 'react'
import KPICard from './KPICard'
import AudioPlayer from '../common/AudioPlayer'

const ComparisonView = ({ districts, language }) => {
  if (!districts || districts.length === 0) {
    return (
      <div className="comparison-empty">
        <p>{language === 'hi' ? 'तुलना के लिए जिले चुनें' : 'Select districts to compare'}</p>
      </div>
    )
  }

  // Mock comparison data
  const comparisonData = [
    {
      title: language === 'hi' ? 'लाभार्थी' : 'Beneficiaries',
      key: 'people_benefited',
      icon: '👥',
      color: '#3b82f6'
    },
    {
      title: language === 'hi' ? 'कुल व्यक्ति-दिन' : 'Total Person-Days',
      key: 'person_days',
      icon: '📅',
      color: '#10b981'
    },
    {
      title: language === 'hi' ? 'औसत कार्य दिवस' : 'Avg Work Days',
      key: 'avg_days',
      icon: '⚡',
      color: '#f59e0b'
    }
  ]

  return (
    <div className="comparison-view">
      <div className="comparison-header">
        <h2>
          {language === 'hi' ? 'जिला तुलना' : 'District Comparison'}
          <AudioPlayer 
            text={language === 'hi' ? 'जिला तुलना' : 'District Comparison'} 
            language={language} 
          />
        </h2>
      </div>

      <div className="comparison-grid">
        {comparisonData.map((metric, index) => (
          <div key={metric.key} className="comparison-metric">
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <h3 className="metric-title">{metric.title}</h3>
            </div>
            
            <div className="districts-comparison">
              {districts.map((district, idx) => {
                // Mock values - in real app, these would come from API
                const values = {
                  people_benefited: [5200, 4800, 6100, 4300],
                  person_days: [12340, 11500, 14200, 9800],
                  avg_days: [2.37, 2.40, 2.33, 2.28]
                }
                
                const value = values[metric.key][idx % values[metric.key].length]
                const isHighest = value === Math.max(...districts.map((_, i) => 
                  values[metric.key][i % values[metric.key].length]
                ))

                return (
                  <div 
                    key={`${district.id}-${metric.key}`} 
                    className={`district-value ${isHighest ? 'highest' : ''}`}
                  >
                    <div className="district-name">
                      {language === 'hi' ? district.hiName : district.name}
                    </div>
                    <div className="value-display">
                      {typeof value === 'number' 
                        ? value % 1 === 0 
                          ? value.toLocaleString() 
                          : value.toFixed(2)
                        : value
                      }
                    </div>
                    {isHighest && <div className="best-indicator">🏆</div>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonView