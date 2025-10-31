import React from 'react'
import AudioPlayer from '../common/AudioPlayer'

const KPICard = ({ title, value, subtitle, trend, icon, color, language, audioText }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return '📈'
    if (trend === 'down') return '📉'
    return '➡️'
  }

  const getTrendColor = () => {
    if (trend === 'up') return '#22c55e'
    if (trend === 'down') return '#ef4444'
    return '#6b7280'
  }

  return (
    <div className="kpi-card" style={{ borderLeftColor: color }}>
      <div className="kpi-header">
        <div className="kpi-icon">{icon}</div>
        <div className="kpi-title">
          <span>{title}</span>
          <AudioPlayer text={audioText || title} language={language} />
        </div>
      </div>
      
      <div className="kpi-value">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      {subtitle && (
        <div className="kpi-subtitle">
          {subtitle}
          {trend && (
            <span className="trend-indicator" style={{ color: getTrendColor() }}>
              {getTrendIcon()}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default KPICard