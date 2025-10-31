import { useState, useCallback } from 'react'

export const useGeolocation = () => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = new Error('Geolocation is not supported')
        setError(error)
        reject(error)
        return
      }

      setIsLoading(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
          setLocation(location)
          setIsLoading(false)
          resolve(location)
        },
        (error) => {
          setError(error)
          setIsLoading(false)
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  }, [])

  return {
    location,
    error,
    isLoading,
    getLocation
  }
}