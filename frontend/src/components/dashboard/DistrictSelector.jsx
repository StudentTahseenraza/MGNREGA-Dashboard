import React, { useState, useEffect } from 'react'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useDistrictsList } from '../../hooks/useDistrictData'
import AudioPlayer from '../common/AudioPlayer'

const DistrictSelector = ({ onDistrictSelect, language }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)
  const { location, error: geoError, getLocation } = useGeolocation()
  const { districts, loading, error } = useDistrictsList()

  // Production API URL
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://mgnrega-dashboard-tf2o.onrender.com/api'

  useEffect(() => {
    if (location) {
      detectDistrictFromCoords(location.latitude, location.longitude)
    }
  }, [location])

  const detectDistrictFromCoords = async (lat, lng) => {
    setIsDetecting(true)
    try {
      const url = `${API_BASE}/geolocation/detect-district`
      console.log('Detecting district from:', url)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lng })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Geolocation API Response:', result)
      
      if (result.success && result.data) {
        setSelectedDistrict(result.data.districtId)
        onDistrictSelect(result.data)
      }
    } catch (error) {
      console.error('Error detecting district:', error)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleAutoDetect = async () => {
    setIsDetecting(true)
    await getLocation()
  }

  const handleManualSelect = (districtId) => {
    const district = districts.find(d => d.districtId === districtId)
    if (district) {
      setSelectedDistrict(districtId)
      onDistrictSelect(district)
    }
  }

  const districtName = language === 'hi' ? 'जिला' : 'District'
  const autoDetectText = language === 'hi' ? 'मेरा जिला ढूंढें' : 'Auto-Detect My District'
  const selectText = language === 'hi' ? 'जिला चुनें' : 'Select District'

  if (loading) {
    return <div className="loading">Loading districts...</div>
  }

  if (error) {
    return <div className="error">Error loading districts: {error}</div>
  }

  return (
    <div className="district-selector">
      <div className="selector-header">
        <h2>
          {language === 'hi' ? 'अपना जिला चुनें' : 'Choose Your District'}
          <AudioPlayer text={language === 'hi' ? 'अपना जिला चुनें' : 'Choose Your District'} />
        </h2>
      </div>

      <div className="detection-section">
        <button 
          className="detect-btn primary"
          onClick={handleAutoDetect}
          disabled={isDetecting}
        >
          {isDetecting ? '🔍 Detecting...' : '📍 ' + autoDetectText}
        </button>
        
        {geoError && (
          <div className="error-message">
            {language === 'hi' ? 'स्थान नहीं मिला। कृपया मैन्युअल चुनें।' : 'Location not found. Please select manually.'}
          </div>
        )}
      </div>

      <div className="manual-select-section">
        <label className="select-label">
          {selectText}
          <AudioPlayer text={selectText} />
        </label>
        <select 
          value={selectedDistrict} 
          onChange={(e) => handleManualSelect(Number(e.target.value))}
          className="district-dropdown"
        >
          <option value="">-- {language === 'hi' ? 'जिला चुनें' : 'Select District'} --</option>
          {districts.map(district => (
            <option key={district.districtId} value={district.districtId}>
              {language === 'hi' ? district.hiName : district.name}
            </option>
          ))}
        </select>
      </div>

      {selectedDistrict && (
        <div className="selected-district">
          <p>
            {language === 'hi' ? 'चयनित जिला:' : 'Selected District:'} 
            <strong> {districts.find(d => d.districtId === selectedDistrict)?.[language === 'hi' ? 'hiName' : 'name']}</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default DistrictSelector