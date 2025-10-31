import React, { useState, useEffect } from 'react'
import KPICard from '../components/dashboard/KPICard'
import SparklineChart from '../components/dashboard/SparklineChart'
import { useDistrictData } from '../hooks/useDistrictData'
import { getCurrentLanguage } from '../utils/i18n'

const DistrictView = ({ district, onBack, onCompare }) => {
  const [historicalData, setHistoricalData] = useState([])
  const language = getCurrentLanguage()
  const { data: districtData, loading, error } = useDistrictData(district?.districtId)

  useEffect(() => {
    if (districtData && districtData.sparkline) {
      setHistoricalData(districtData.sparkline)
    }
  }, [districtData])

  if (!district) {
    return (
      <div className="district-view">
        <button className="back-btn" onClick={onBack}>
          ← {language === 'hi' ? 'वापस' : 'Back'}
        </button>
        <div className="error-state">
          <p>{language === 'hi' ? 'कोई जिला चयनित नहीं' : 'No district selected'}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="district-view">
        <button className="back-btn" onClick={onBack}>
          ← {language === 'hi' ? 'वापस' : 'Back'}
        </button>
        <div className="loading-state">
          <p>Loading district data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="district-view">
        <button className="back-btn" onClick={onBack}>
          ← {language === 'hi' ? 'वापस' : 'Back'}
        </button>
        <div className="error-state">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    )
  }

  const kpiCards = [
    {
      title: language === 'hi' ? 'लाभार्थी' : 'Beneficiaries',
      value: districtData?.lastMonth?.peopleBenefited || 0,
      subtitle: language === 'hi' ? 'इस महीने' : 'This Month',
      trend: districtData?.lastMonth?.trend || 'stable',
      icon: '👥',
      color: '#3b82f6',
      audioText: language === 'hi' ? 'इस महीने लाभार्थी' : 'Beneficiaries this month'
    },
    {
      title: language === 'hi' ? 'कुल व्यक्ति-दिन' : 'Total Person-Days',
      value: districtData?.lastMonth?.personDays || 0,
      subtitle: language === 'hi' ? 'कुल कार्य दिवस' : 'Total Work Days',
      trend: districtData?.lastMonth?.trend || 'stable',
      icon: '📅',
      color: '#10b981',
      audioText: language === 'hi' ? 'कुल व्यक्ति दिन' : 'Total person days'
    },
    {
      title: language === 'hi' ? 'औसत कार्य दिवस' : 'Avg Work Days',
      value: districtData?.lastMonth?.avgDays ? districtData.lastMonth.avgDays.toFixed(1) : 0,
      subtitle: language === 'hi' ? 'प्रति व्यक्ति' : 'Per Person',
      trend: 'stable',
      icon: '⚡',
      color: '#f59e0b',
      audioText: language === 'hi' ? 'औसत कार्य दिवस' : 'Average work days'
    },
    {
      title: language === 'hi' ? 'मजदूरी दर' : 'Wage Rate',
      value: districtData?.lastMonth?.wageRate ? `₹${districtData.lastMonth.wageRate.toFixed(0)}` : '₹0',
      subtitle: language === 'hi' ? 'प्रतिदिन' : 'Per Day',
      trend: 'up',
      icon: '💰',
      color: '#8b5cf6',
      audioText: language === 'hi' ? 'मजदूरी दर' : 'Wage rate'
    }
  ]

  return (
    <div className="district-view">
      <div className="district-header">
        <button className="back-btn" onClick={onBack}>
          ← {language === 'hi' ? 'वापस' : 'Back'}
        </button>
        
        <div className="district-title">
          <h1>{language === 'hi' ? district.hiName : district.name}</h1>
          <p className="district-state">{district.state}</p>
          {districtData?.dataSource && (
            <p className="data-source">
              Data: {districtData.dataSource === 'official' ? 'Official' : 'Sample'}
            </p>
          )}
        </div>

        <button 
          className="compare-btn secondary"
          onClick={() => onCompare([district])}
        >
          {language === 'hi' ? 'तुलना करें' : 'Compare'}
        </button>
      </div>

      <div className="kpi-grid">
        {kpiCards.map((card, index) => (
          <KPICard
            key={index}
            {...card}
            language={language}
          />
        ))}
      </div>

      <div className="historical-section">
        <h3>{language === 'hi' ? 'पिछले 12 महीने' : 'Last 12 Months'}</h3>
        <div className="sparkline-container">
          <SparklineChart data={historicalData} />
        </div>
        
        <div className="historical-stats">
          <div className="stat-item">
            <span>{language === 'hi' ? 'सर्वोच्च' : 'Highest'}:</span>
            <strong>{historicalData.length > 0 ? Math.max(...historicalData).toLocaleString() : '0'}</strong>
          </div>
          <div className="stat-item">
            <span>{language === 'hi' ? 'न्यूनतम' : 'Lowest'}:</span>
            <strong>{historicalData.length > 0 ? Math.min(...historicalData).toLocaleString() : '0'}</strong>
          </div>
          <div className="stat-item">
            <span>{language === 'hi' ? 'औसत' : 'Average'}:</span>
            <strong>
              {historicalData.length > 0 
                ? Math.round(historicalData.reduce((a, b) => a + b, 0) / historicalData.length).toLocaleString()
                : '0'
              }
            </strong>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>{language === 'hi' ? 'महत्वपूर्ण जानकारी' : 'Important Information'}</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>📞 {language === 'hi' ? 'हेल्पलाइन' : 'Helpline'}</h4>
            <p>1800-345-2345</p>
          </div>
          <div className="info-card">
            <h4>ℹ️ {language === 'hi' ? 'MGNREGA के बारे में' : 'About MGNREGA'}</h4>
            <p>
              {language === 'hi' 
                ? 'ग्रामीण परिवारों को 100 दिन का रोजगार'
                : '100 days employment for rural households'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistrictView