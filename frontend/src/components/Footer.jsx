import React from 'react'

const Footer = () => {
//   const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>Our Voice, Our Rights - MGNREGA Performance Dashboard</p>
          <p className="last-updated">
            Data Source: data.gov.in | Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="footer-actions">
          <button className="feedback-btn">
            📝 Give Feedback
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer