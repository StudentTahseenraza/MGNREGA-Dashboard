import React from 'react'

const Header = ({ currentView, onNavigate, language, onLanguageChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">🛠️</div>
          <h1 className="app-title">
            {language === 'hi' ? 'एमजीएनआरईजीए डैशबोर्ड' : 'MGNREGA Dashboard'}
          </h1>
        </div>
        
        <nav className="navigation">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            {language === 'hi' ? 'होम' : 'Home'}
          </button>
        </nav>

        <div className="header-controls">
          <select 
            value={language} 
            onChange={(e) => onLanguageChange(e.target.value)}
            className="language-select"
          >
            <option value="hi">हिन्दी</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header