import { useState, useEffect } from 'react'

// Production API URL - directly set for deployment
const PRODUCTION_API_BASE = 'https://mgnrega-dashboard-tf2o.onrender.com/api'
const API_BASE = import.meta.env.VITE_API_BASE_URL || PRODUCTION_API_BASE

console.log('API Base URL:', API_BASE) // Debug log

export const useDistrictData = (districtId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!districtId) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const url = `${API_BASE}/data/district/${districtId}/summary`
        console.log('Fetching from URL:', url)
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('API Response:', result)
        setData(result.data)
      } catch (err) {
        console.error('Error fetching district data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [districtId])

  return { data, loading, error }
}

export const useDistrictsList = () => {
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${API_BASE}/districts`
        console.log('Fetching districts from:', url)
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Districts API Response:', result)
        setDistricts(result.data)
      } catch (err) {
        console.error('Error fetching districts:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDistricts()
  }, [])

  return { districts, loading, error }
}