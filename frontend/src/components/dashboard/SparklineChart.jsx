import React from 'react'

const SparklineChart = ({ data, height = 40, color = '#3b82f6' }) => {
  if (!data || data.length === 0) {
    return <div className="sparkline-empty">No data available</div>
  }

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - minValue) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="sparkline-chart">
      <svg 
        width="100%" 
        height={height} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default SparklineChart