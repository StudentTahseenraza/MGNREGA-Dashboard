import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

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
        console.log(`Fetching data for district ${districtId} from: ${API_BASE}/data/district/${districtId}/summary`)
        const response = await fetch(`${API_BASE}/data/district/${districtId}/summary`)
        
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
      try {
        console.log('Fetching districts from:', `${API_BASE}/districts`)
        const response = await fetch(`${API_BASE}/districts`)
        
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