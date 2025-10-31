import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DistrictView from './pages/DistrictView'
import CompareView from './pages/CompareView'
import { getCurrentLanguage, setLanguage } from './utils/i18n'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [compareDistricts, setCompareDistricts] = useState([])
  const [language, setAppLanguage] = useState(getCurrentLanguage())

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setAppLanguage(lang)
  }

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district)
    setCurrentView('district')
  }

  const handleCompare = (districts) => {
    setCompareDistricts(districts)
    setCurrentView('compare')
  }

  const renderView = () => {
    switch (currentView) {
      case 'district':
        return <DistrictView 
          district={selectedDistrict} 
          onBack={() => setCurrentView('home')}
          onCompare={handleCompare}
        />
      case 'compare':
        return <CompareView 
          districts={compareDistricts}
          onBack={() => setCurrentView('home')}
        />
      default:
        return <Home 
          onDistrictSelect={handleDistrictSelect}
          onCompare={handleCompare}
        />
    }
  }

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main className="main-content">
        {renderView()}
      </main>
      <Footer />
    </div>
  )
}

export default App