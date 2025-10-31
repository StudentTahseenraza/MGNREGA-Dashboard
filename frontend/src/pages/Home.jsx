import React, { useState } from 'react'
import DistrictSelector from '../components/dashboard/DistrictSelector'
import ComparisonView from '../components/dashboard/ComparisonView'
import { getCurrentLanguage } from '../utils/i18n'

const Home = ({ onDistrictSelect, onCompare }) => {
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const language = getCurrentLanguage()

  const handleDistrictSelect = (district) => {
    onDistrictSelect(district)
  }

  const handleAddToCompare = (district) => {
    if (selectedDistricts.length < 4 && !selectedDistricts.find(d => d.id === district.id)) {
      setSelectedDistricts(prev => [...prev, district])
    }
  }

  const handleRemoveFromCompare = (districtId) => {
    setSelectedDistricts(prev => prev.filter(d => d.id !== districtId))
  }

  const handleCompareSelected = () => {
    if (selectedDistricts.length >= 2) {
      onCompare(selectedDistricts)
    }
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {language === 'hi' 
              ? 'हमारी आवाज़, हमारे अधिकार' 
              : 'Our Voice, Our Rights'
            }
          </h1>
          <p className="hero-subtitle">
            {language === 'hi'
              ? 'अपने जिले का MGNREGA प्रदर्शन समझें - सरल भाषा में, आसान विज़ुअल्स के साथ'
              : 'Understand your district\'s MGNREGA performance - in simple language, with easy visuals'
            }
          </p>
        </div>
      </section>

      <section className="district-section">
        <DistrictSelector 
          onDistrictSelect={handleDistrictSelect}
          language={language}
        />
      </section>

      {selectedDistricts.length > 0 && (
        <section className="compare-section">
          <div className="compare-header">
            <h2>
              {language === 'hi' ? 'तुलना के लिए चयनित जिले' : 'Selected Districts for Comparison'}
            </h2>
            <button 
              className="compare-btn primary"
              onClick={handleCompareSelected}
              disabled={selectedDistricts.length < 2}
            >
              {language === 'hi' ? 'तुलना करें' : 'Compare'} ({selectedDistricts.length})
            </button>
          </div>
          
          <div className="selected-districts-list">
            {selectedDistricts.map(district => (
              <div key={district.id} className="selected-district-tag">
                <span>{language === 'hi' ? district.hiName : district.name}</span>
                <button 
                  onClick={() => handleRemoveFromCompare(district.id)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Home